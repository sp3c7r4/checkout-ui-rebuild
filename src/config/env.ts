import z from "zod";

const EnvSchema = z.object({
  VITE_SERVER_ORIGIN: z.string(),
  // root origin (no /api/v1) - better-auth lives at /api/auth on the server
  VITE_API_ORIGIN: z.string().optional(),
  VITE_TELEGRAM_BOT_URL: z.string(),
  // "true" to show social sign-in; backend must also have Google credentials
  VITE_GOOGLE_AUTH: z.string().optional()
})

const parsed = EnvSchema.parse(import.meta.env)

const env = {
  ...parsed,
  VITE_API_ORIGIN: parsed.VITE_API_ORIGIN ?? new URL(parsed.VITE_SERVER_ORIGIN).origin,
}

export default env;