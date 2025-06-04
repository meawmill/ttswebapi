import { Request, Response } from "express";
import { omit, pick } from "lodash";
import jwt from "jsonwebtoken";
import { query } from "@/modules/main/db/query";
import bcrypt from "bcryptjs";
import { Result } from "pg";
import dotenvFlow from "dotenv-flow";
dotenvFlow.config();

export const login = async (req: Request, res: Response) => {
  const { username, password, system_name } = req.body;
  try {
    const { rowCount, rows } = await query(
      "main",
      "SELECT * FROM view_systemusers WHERE username = $1 AND system_name = $2",
      [username, system_name]
    );

    if (rowCount === 0)
      res.status(401).json({ message: `Invalid user or password`, data: null });

    const [user] = rows;

    if (user.user_status == "L")
      res.status(423).json({ message: `This account is locked.`, data: null });

    if (user.user_status == "D")
      res
        .status(423)
        .json({ message: `This account has been deleted.`, data: null });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      res.status(401).json({ message: `Invalid user or password`, data: null });

    await query(
      "main",
      "UPDATE systemusers SET lasted_login = NOW() WHERE username = $1 AND system_name = $2",
      [username, system_name]
    );

    const userSafe = pick(user, [
      "username",
      "user_role",
      "user_company_id",
      "user_company_en",
      "user_company_th",
      "user_company_code",
      "employee_id",
      "first_name_en",
      "last_name_en",
      "full_name_en",
      "first_name_th",
      "last_name_th",
      "full_name_th",
      "start_work_date",
      "email",
      "create_date",
      "lasted_login",
      "system_name",
    ]);

    const token = jwt.sign({ ...userSafe }, process.env.AUTH_SECRET!, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "User login successfully",
      data: { user: { ...userSafe, token } },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", data: null });
  }
};

export const register = async (req: Request, res: Response) => {
  const {
    username,
    password,
    employee_id,
    user_role,
    user_company_id,
    system_name,
  } = await req.body;

  const hpw = await bcrypt.hash(password, 10);

  try {
    const result = await query(
      "main",
      `INSERT INTO systemusers(username, password, employee_id, user_role, user_company_id, system_name)
      VALUES($1, $2, $3, $4, $5, $6, $7);`,
      [username, hpw, employee_id, user_role, user_company_id, system_name]
    );

    res
      .status(201)
      .json({ message: "User created successfully", data: result });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", data: null });
  }
};

export const checkUser = async (req: Request, res: Response) => {
  const { username, system_name } = req.body;
  try {
    const result = await query(
      "main",
      "SELECT * FROM systemusers WHERE username = $1 AND system_name = $2",
      [username, system_name]
    );
    const { rows, rowCount } = result;
    if (rowCount && rowCount > 0) {
      res.status(200).json({
        message: `Username '${username}' in '${system_name}' system is already exists.`,
        data: { isExists: true, user: rows[0] },
      });
    }
    res.status(200).json({
      message: `Username '${username}' in '${system_name}' system is not exists.`,
      data: { isExists: false, user: null },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", data: null });
  }
};

export const getMe = (req: Request, res: Response) => {
  const data = (req as any).user;
  res.status(200).json({ message: "Get user success.", data });
};
