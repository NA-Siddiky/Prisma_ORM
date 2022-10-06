import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const PORT = 3001;
const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });
  res.json(user);
});

app.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.put("/", async (req: Request, res: Response) => {
  const { id, username } = req.body;
  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      username: username,
    },
  });
});

app.delete("/:id", async (req: Request, res: Response) => {});

app.listen(PORT, () => {
  console.log(`app is running at http://localhost:${PORT}`);
});
