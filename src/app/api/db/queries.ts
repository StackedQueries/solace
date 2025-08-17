import db from "../../../db";
import {
  advocates,
  specialties,
  advocates_specialties,
} from "../../../db/schema";
import { eq } from "drizzle-orm";
import { mapAdvocatesPublic } from "./mappers";

async function getAllAdvocateData() {
  return await db
    .select()
    .from(advocates)
    .innerJoin(
      advocates_specialties,
      eq(advocates.id, advocates_specialties.advocateId)
    )
    .innerJoin(
      specialties,
      eq(advocates_specialties.specialtyId, specialties.id)
    );
}

export { getAllAdvocateData };
