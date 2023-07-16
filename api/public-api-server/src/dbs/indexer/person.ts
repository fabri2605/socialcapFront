import { logger, prisma } from "~/global";
import { Person } from "@prisma/client";
import { Errors, raiseError } from "~/routes/errors"
import { PersonSchema, PersonSchemaPartial } from "~/models/zod-schemas";

export async function getPersonOrRaise(
  uid: string
): Promise<Person> {
  const p = await prisma.person.findUnique({
    where: { uid: uid }
  });
  if (!p) raiseError(`Person %{uid} not found`);
  return p as Person;
}

export async function updatePersonOrRaise(
  uid: string, 
  unsafeParams: any
): Promise<Person> {
  let params = PersonSchemaPartial.safeParse(unsafeParams);
  const p = await prisma.person.update({
    where: { uid: uid },
    data: { ...params },
  });
  if (!p) raiseError(`Update person ${uid} failed`);
  return p as Person;
}