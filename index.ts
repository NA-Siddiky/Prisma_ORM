import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const PORT = 3001;
const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log("req.body>>", req.body);
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });
  res.json(user);
});

app.post("/manyUsers", async (req: Request, res: Response) => {
  const { userList } = req.body;
  console.log("req.body>>", userList);
  const users = await prisma.user.createMany({
    data: userList,
  });
  res.json(users);
});

app.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/byId/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
});

app.put("/", async (req: Request, res: Response) => {
  const { id, username } = req.body;
  console.log("req.body", req.body);
  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      username: username,
    },
  });
  res.json(updatedUser);
});

app.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedUser = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(deletedUser);
});

app.listen(PORT, () => {
  console.log(`app is running at http://localhost:${PORT}`);
});
