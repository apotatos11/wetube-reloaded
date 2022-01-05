import express from "express";

//exxpress 어플리케이션을 만든다
const PORT = 4000;
const app = express();

// 서버는 항상 커져있는 컴퓨터와 같다. 인터넷에 연결된 컴퓨터
// request는 무엇인가? 서버에 뭔가 대답을 요청하는 것
// listening? 서버가 request가 오는지 계속 확인
// 서버는 듣고 답하는게 일이다. 서버는 클라이언트를 항상 기다리고 있음

// application 설정 부분

const handleHome = (req, res) => {
  return res.send("I love you ");
};

const handleLogin = (req, res) => {
  return res.send("Login Here!!");
};

app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(4000, handleListening);
// app.listen(포트넘버, 콜백함수)
//port? 컴퓨터의 문 같은 것

// GET은 http 메소드이다. get this page의미
// GET / ,여기서 /는 루트페이지

//http는 서버랑 클라이언트가 소통하는 방식이다.

// request? 브라우저가 서버에 뭔가 요청하는 것
