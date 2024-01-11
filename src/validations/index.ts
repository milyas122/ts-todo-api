// import { InferType, ObjectSchema } from "yup";

// export async function validate<T extends object>(
//   schema: ObjectSchema<T>,
//   fields: InferType<typeof schema>
// ): Promise<InferType<typeof schema>> {
//   try {
//     const validatedFields = await schema.validate(fields, {
//       abortEarly: false,
//       stripUnknown: true,
//     });
//     return validatedFields;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// The code above generates a types conflict error,
//  and unfortunately, I couldn't resolve it. So that it why, the `validate` method below accepts `schema` and `fields` as any.

import { BadRequest } from "@/utils/errors/custom-errors";

async function validate(schema, fields) {
  try {
    return await schema.validate(fields, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (e) {
    throw new BadRequest({ message: e.errors });
  }
}

export { validate };
