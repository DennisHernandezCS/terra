import mysql from 'mysql2/promise';

export async function query({
  query,
  values = [],
}: {
  query: string;
  values?: unknown[];
}) {
  const connection = await mysql.createConnection({
    host: 'localhost', // Or '127.0.0.1', if you prefer
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  try {
    const [results] = await connection.execute(query, values);
    return results;
  } catch (error: unknown) {
    console.error('Database query error:', error);
    throw new Error('Error executing query');
  } finally {
    await connection.end();
  }
}
