import { test, describe, expect, it, beforeAll, afterAll } from "@jest/globals";
const { createServer } = require("http");
import io from "socket.io-client";

describe("my awesome project", () => {
  let socket: any;

  beforeAll((done) => {
      socket = io.connect(
      "ws://localhost:3030",
      { forceNew: true,
        transports: ['polling'],
        query: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJvYXQiOjE2NjA1NDk5ODksImlhdCI6MTY2MDU0OTk4OCwiZXhwIjoxNjYwNzIyNzg4LCJhdWQiOiJodHRwczovL3lvdXJkb21haW4uY29tIiwiaXNzIjoiZmVhdGhlcnMiLCJzdWIiOiI2MWEwOWM4OWIzNDk5ZjM4NDE1NmZlZTYiLCJqdGkiOiIwMmVlNjUwYS0yNjliLTQ4YTItYTQ5ZS0yOTE0N2ZmOTAwOTEifQ.dQLZG2vmu_swJztQZDHAlCShrCY_zh_wkhNT58Chdsk'
      } }
    );
    

    socket.on("connect_error", (err) => {
      // console.log("connect_error-log");
      // console.log("📖 ~ file: hoang-danh.spec.ts ~ line 25 ~ socket.on ~ err", err)
    });

    socket.on("connect", () => {
      done()
      // console.log("connect-log");
    });

    socket.on("disconnect", (reason) => {
      // console.log("disconnect-log", reason);
      if (reason === "io server disconnect") {
        // the disconnection was initiated by the server, you need to reconnect manually
        // socket.connect();
      }
    });
    
    socket.on("reconnect_failed", () => {
      console.log("reconnect_failed-log");
      
    });
  }, 10000);

  afterAll((done) => {
    socket.close();
    done();
  });

  test("should work", (done) => {
    // console.log('connected-log', socket.connected);
    // console.log('disconnected-log', socket.disconnected);
    if (socket.connected) {
      socket.emit("find", "trader", (arg) => {
        console.log("📖 ~ file: test.spec.ts ~ line 58 ~ socket.emit ~ arg", arg)
        expect(1).toBe(1);
        done();
      });
    }
  });
});
