import { Request, Response } from "express";
import { omit, pick } from "lodash";
import jwt from "jsonwebtoken";
import { query, queryHRM } from "@/modules/main/db/query";
import bcrypt from "bcryptjs";
import { Result } from "pg";
import dotenvFlow from "dotenv-flow";
dotenvFlow.config();

export const saveSystem = async (req: Request, res: Response) => {
  const { systemname, systemdb } = await req.body;

  const hpw = await bcrypt.hash(password, 10);

  try {
    const result = await query(
      `INSERT INTO systemlist (systemname, systemdb, systemstatus)
VALUES ('SaleCheckQRCode', 'salechkqrc', true)
ON CONFLICT (systemname)
DO UPDATE SET 
    systemdb = EXCLUDED.systemdb,
    systemstatus = EXCLUDED.systemstatus,
    systemcreatedate = CURRENT_TIMESTAMP;`,
      [username, hpw, employee_id, user_role, user_company_id, system_name]
    );

    res
      .status(201)
      .json({ message: "User created successfully", data: result });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", data: null });
  }
};
