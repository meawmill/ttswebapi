import { pool, poolHRM, poolSaleChkQR } from "./db";

type PoolType = "main" | "hrm" | "salechkqr";

export const getClient = async (poolType: PoolType) => {
  switch (poolType) {
    case "hrm":
      return await poolHRM.connect();
    case "salechkqr":
      return await poolSaleChkQR.connect();
    default:
      return await pool.connect();
  }
};

export const query = async (
  poolType: PoolType,
  text: string,
  params?: any[]
) => {
  const client = await getClient(poolType);
  try {
    const result = await client.query(text, params);
    return result;
  } catch (err) {
    console.error("Database error:", err);
    throw err;
  } finally {
    client.release();
  }
};

export const safeQuery = async (
  poolType: "main" | "hrm" | "salechkqr",
  text: string,
  params?: any[],
  retries = 3
) => {
  while (retries > 0) {
    try {
      return await query(poolType, text, params);
    } catch (err) {
      retries--;
      if (retries <= 0) throw err;
      await new Promise((res) => setTimeout(res, 500)); // wait 500ms
    }
  }
};
