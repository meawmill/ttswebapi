import express from "express";
import dotenvFlow from "dotenv-flow";
import { customCors } from "./modules/main/middleware/cors";

import authRoutes from "@/modules/main/auth/auth.routes";
// import saleCheckQRCode from "@/modules/SaleChkQR/routes/saleCheckQRCode";

dotenvFlow.config();
const app = express();

app.use(customCors); // ✅ จัดการ CORS
app.use(express.json());

const mainPath = "/ttswebapi";
app.use(`${mainPath}/auth`, authRoutes);
// app.use(`${mainPath}/SaleCheckQRCode`, saleCheckQRCode);

export default app;
