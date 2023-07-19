import { logger, prisma } from "~/global";
import { Person } from "@prisma/client";
import { raiseError } from "~/core/responses"
import { PersonSchema, PersonPartialSchema } from "../../../prisma/generated/zod";
import { EntityState } from "~/models/entity-state";


const PERSON_STATES = [
  "REVISION", "APPROVED", "PAYMENT", "ACTIVE", 
  "DELETED","CANCELED","PAUSED"
];

export const PersonState = new EntityState(PERSON_STATES);


export async function getPersonOrRaise(
  uid: string
): Promise<Person> {
  const p = await prisma.person.findUnique({
    where: { uid: uid }
  });
  if (!p) raiseError.NotFound(`Person %{uid} not found`);
  return p as Person;
}


export async function updatePersonOrRaise(
  uid: string, 
  unsafeParams: any
): Promise<Person> {
  let params = PersonPartialSchema.safeParse(unsafeParams);
  const p = await prisma.person.update({
    where: { uid: uid },
    data: { ...params },
  });
  if (!p) raiseError.DatabaseEngine(`Update person ${uid} failed`);
  return p as Person;
}
