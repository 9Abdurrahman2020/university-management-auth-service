import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DBURL,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    secret_expire_in: process.env.JWT_SECRET_EXPIRE_IN,
    refresh_secret_expire_in: process.env.JWT_REFRESH_SECRET_EXPIRE_IN,
  },
};
