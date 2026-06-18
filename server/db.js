import mysql from "mysql2/promise";

let pool = null;

const databaseState = {
  configured: false,
  connected: false,
  message: "Database not configured.",
};

function configFromUrl(databaseUrl) {
  const parsed = new URL(databaseUrl);

  return {
    host: parsed.hostname,
    port: Number(parsed.port || 3306),
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: parsed.pathname.replace(/^\//, ""),
  };
}

function resolveDatabaseConfig() {
  const databaseUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;

  if (databaseUrl) {
    return configFromUrl(databaseUrl);
  }

  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  if (!DB_HOST || !DB_USER || !DB_NAME) {
    return null;
  }

  return {
    host: DB_HOST,
    port: Number(DB_PORT || 3306),
    user: DB_USER,
    password: DB_PASSWORD || "",
    database: DB_NAME,
  };
}

export function getDatabaseState() {
  return { ...databaseState };
}

export async function initializeDatabase() {
  const config = resolveDatabaseConfig();

  if (!config) {
    databaseState.message = "Database variables are missing. Configure MySQL when ready.";
    return;
  }

  try {
    pool = mysql.createPool({
      ...config,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    await pool.query("SELECT 1");
    await ensureSchema();

    databaseState.configured = true;
    databaseState.connected = true;
    databaseState.message = "Database connected.";
  } catch (error) {
    databaseState.configured = true;
    databaseState.connected = false;
    databaseState.message = error instanceof Error ? error.message : "Unable to connect to MySQL.";
    console.warn("[db] startup skipped:", databaseState.message);
  }
}

export async function query(sql, params = []) {
  if (!pool || !databaseState.connected) {
    throw new Error("Database is not available yet.");
  }

  const [rows] = await pool.execute(sql, params);
  return rows;
}

export async function ensureSchema() {
  if (!pool) {
    return;
  }

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS signatories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      email VARCHAR(300) NOT NULL UNIQUE,
      country VARCHAR(100),
      role VARCHAR(100),
      signed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS movement_joiners (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      email VARCHAR(300) NOT NULL,
      audience_type VARCHAR(100) NOT NULL,
      country VARCHAR(100),
      organisation VARCHAR(200),
      joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await ensureIndex("signatories", "idx_signatories_signed_at", "signed_at");
  await ensureIndex("movement_joiners", "idx_joiners_joined_at", "joined_at");
  await ensureIndex("movement_joiners", "idx_joiners_audience_type", "audience_type");
}

async function ensureIndex(tableName, indexName, columnName) {
  if (!pool) {
    return;
  }

  const [rows] = await pool.query(`SHOW INDEX FROM ${tableName} WHERE Key_name = ?`, [indexName]);

  if (Array.isArray(rows) && rows.length > 0) {
    return;
  }

  await pool.execute(`CREATE INDEX ${indexName} ON ${tableName} (${columnName})`);
}
