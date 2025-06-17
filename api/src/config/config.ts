import 'dotenv/config'

// TODO: validate with zod
function validateConfig() {
  return {
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.DB_FILENAME,
  };
}

export const config = validateConfig();
