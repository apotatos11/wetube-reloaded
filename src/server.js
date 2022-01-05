import express from "express";

//exxpress 어플리케이션을 만든다
const PORT = 4000;
const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log(req.protocol);
  const logDate = new Date();
  console.log(
    "Time :",
    `${logDate.getFullYear()}.${logDate.getMonth() + 1}.${logDate.getDate()}`
  );
  next();
};

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    return res.send("<h1>Not allowed</h1>");
  }
  console.log("Allowed, you may continue ");
  next();
};

const handleHome = (req, res) => {
  return res.send("I love you");
};

const handleLogin = (req, res) => {
  return res.send("Login Here!!");
};

const handleProtectd = (req, res) => {
  return res.send("Welcome to the private lounge.");
};

app.use(logger);
app.use(privateMiddleware);
app.get("/", handleHome);
app.get("/protected", handleProtectd);

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(4000, handleListening);
