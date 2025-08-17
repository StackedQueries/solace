import db from "../../../db";
import {
  advocates,
  specialties,
  advocates_specialties,
} from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { specialtyData } from "../../../db/seed/specialties";
import { getAllAdvocateData } from "../db/queries";

export async function POST() {
  const records = await db.insert(advocates).values(advocateData).returning();
  const specialtyRecords = await db
    .insert(specialties)
    .values(specialtyData.map((name: string) => ({ name })))
    .returning();

  for (const record of records) {
    const specialtyMax = Math.floor(Math.random() * 4);
    let specialtyCount = 0;
    for (const specialtyRecord of specialtyRecords) {
      if (specialtyCount > specialtyMax) break;
      const useSpecialty = Math.random() > 0.7;

      if (useSpecialty) {
        await db.insert(advocates_specialties).values({
          advocateId: record.id,
          specialtyId: specialtyRecord.id,
        });

        specialtyCount++;
      }
    }
  }

  const advocateRecords = await getAllAdvocateData();

  return Response.json({ advocates: advocateRecords });
}
