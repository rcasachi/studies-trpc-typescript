import { z } from "zod";

const personSchema = z.object({
  name: z.string(),
  age: z.string().transform((age) => Number(age)),
  email: z.string().email().nullable(),
});

const person = {
  name: "Rafael",
  age: "32",
  email: "rafa@example.com",
};

type PersonSchemaOutput = z.infer<typeof personSchema>;
// type PersonSchemaOutput = z.output<typeof personSchema>;
type PersonSchemaInput = z.input<typeof personSchema>;

const { name, email, age } = personSchema.parse(person);

function createPersonInDatabase(person: PersonSchemaOutput) {}
