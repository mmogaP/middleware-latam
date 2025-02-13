import express, { Router } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routerUser from "./routes/user.router";
import { Request, Response, NextFunction } from "express";
import { globalMiddleware } from "./middlewares/global.middleware";

const app = express();

// 1 y 2 Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// 3 Custom Middleware
app.use(globalMiddleware);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

/* 5 Declaracion ruta */
app.use("/api", routerUser);

/* 6 y 7 */
const messages: string[] = [];

app.post("/message", (req, res) => {
  const { message } = req.body;
  messages.push(message);
  res.send("Message added");
});

app.get("/message", (req, res) => {
  const message = messages.shift();
  if (message) {
    return void res.send(message);
  }
  if (!messages.length || !message) {
    return void res.send("No messages");
  }
  res.status(204).end();
});

/* 4 y 8 */
app.get("/error", (req, res) => {
  throw new Error("Error route");
});

/*4 y 8 Middleware de errores */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
