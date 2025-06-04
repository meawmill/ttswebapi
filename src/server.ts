import "module-alias/register";
import app from "./app";
import dotenvFlow from "dotenv-flow";
dotenvFlow.config();

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
