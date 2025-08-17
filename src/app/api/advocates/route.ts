import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { getAllAdvocateData } from "../db/queries";
import { mapAdvocatesPublic } from "../db/mappers";

export async function GET() {
  //Uncomment this line to use a database
  const data = mapAdvocatesPublic(await getAllAdvocateData());
  //const data = advocateData;

  return Response.json({ data });
}
