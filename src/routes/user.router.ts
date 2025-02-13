import { Router } from "express";

/* 5 middleware a nivel router */
const routerUser = Router();

routerUser.use((req, res, next) => {
  console.log("Middleware de routerUser");
  next();
});

routerUser.get("/user", (req, res) => {
  res.send("User route");
});

export default routerUser;
