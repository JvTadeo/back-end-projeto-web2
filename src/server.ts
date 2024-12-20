import express from "express";
import cors from "cors";
import router from "./routes";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
  origin: ['https://back-end-projeto-web2.onrender.com', 'localhost:3000'],
}));
app.use(express.json());

app.use(router);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
