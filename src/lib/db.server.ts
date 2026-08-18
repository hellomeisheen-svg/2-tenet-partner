import pg from 'pg';

const { Pool } = pg;

// We use a singleton pool to manage connections
let pool: pg.Pool | null = null;

export function getPool() {
  if (pool) return pool;

  const connectionString = process.env['DATABASE_URL'];
  
  if (!connectionString) {
    // In dev/preview without DB, we might want to throw or return a mock
    // For now, let's try to connect and let it fail if missing, 
    // but we can add a check in the callers.
    console.warn('DATABASE_URL is not set. Database operations will fail.');
  }

  pool = new Pool({
    connectionString,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  return pool;
}

export async function query<T = any>(text: string, params?: any[]) {
  if (!process.env['DATABASE_URL']) {
    console.warn('Query skipped: DATABASE_URL not set');
    return { rows: [], rowCount: 0 } as any;
  }
  
  const start = Date.now();
  try {
    const res = await getPool().query(text, params);
    const duration = Date.now() - start;
    if (process.env['NODE_ENV'] !== 'production') {
      console.log('executed query', { text, duration, rows: res.rowCount });
    }
    return res;
  } catch (err) {
    console.error('Database query error', err);
    return { rows: [], rowCount: 0 } as any;
  }
}
