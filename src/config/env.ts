import z from "zod";

const EnvSchema = z.object({
  VITE_SERVER_ORIGIN: z.string()
})

const env = EnvSchema.parse(import.meta.env)

export default env;