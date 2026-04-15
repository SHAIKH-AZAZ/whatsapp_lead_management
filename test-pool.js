import { config } from 'dotenv';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

config({ path: '.env' });
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;
console.log("Using:", connectionString);

const pool = new Pool({ connectionString });
pool.query('SELECT now()').then(res => {
  console.log("Success!", res.rows);
  process.exit(0);
}).catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
