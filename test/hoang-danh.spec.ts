import axios from "axios";
import { describe, expect, it, beforeAll, afterAll } from "@jest/globals";
import io from "socket.io-client";

describe("[ProjectName]", () => {
  describe("[Kịch bản 1]", () => {
    const accumulation = {};

    it("API get token", async () => {
      let result /** Variable naming */;
      let response /** Variable naming */;

      const headers = { Accept: "*/*" };

      const payload = {
        strategy: "local",
        email: "hi@ftech.ltd",
        password: "123123123",
      };

      response = await axios.post(
        "http://localhost:3030/authentication",
        payload,
        { headers }
      );
      result = response.data.authentication;

      try {
        expect(result).toBeDefined();
      } catch (err) {
        console.log("Fail with response", response);
        throw err;
      }
      accumulation["accessToken"] = result.accessToken;
      accumulation["danh"] = result.danh;
    }, 10000);

    it("API get traders", async () => {
      let result /** Variable naming */;
      let response /** Variable naming */;

      const headers = {};
      (headers[`Authorization`] = (" " + accumulation["accessToken"]).trim()),
        (headers[`Authorization2`] = (
          "Beare2r " + accumulation["accessToken"]
        ).trim());

      const payload = {};

      (payload["token"] = accumulation["token"]),
        (payload["Token1"] = accumulation["Token1"]);
      response = await axios.get("http://localhost:3030/trader", { headers });
      result = response.data.data;

      try {
        expect(result).toBeDefined();
      } catch (err) {
        console.log("Fail with response", response);
        throw err;
      }
    }, 10000);

    it("API create trader by socket", async () => {
      let result /** Variable naming */;
      let response /** Variable naming */;

      const socket = io.connect("ws://localhost:3030", {
        forceNew: true,
        reconnection: false,
        transports: ["polling"],
        extraHeaders: {
          Authorization: "Bearer " + accumulation["accessToken"],
        },
      });

      response = (await new Promise((resolve) => {
        socket.on("connect", async () => {
          await new Promise(() => {
            socket.emit(
              "create",
              "trader",
              {
                init_balance: 50,
                full_name: "Nguyen Hoang Danh",
                email: " 8X9r9vEGcOy@gmail.com",
                telephone: 584940013,
                secret_key: " zsBlJDK0iz5",
                api_key: " 29o8a3hjonQ",
                subscribed_callback: " gI3PPRfptJo",
              },
              (err, data) => {
                if (err) {
                  resolve(err);
                }
                resolve(data);
              }
            );
          });
        });
      })) as any;
      socket.close();
      result = response._id;

      try {
        expect(result).toBeDefined();
      } catch (err) {
        console.log("Fail with response", response);
        throw err;
      }
    }, 10000);
  });

  describe("[Kịch bản 2 lỗi đăng nhập]", () => {
    const accumulation = {};

    it("Fail to login", async () => {
      let result /** Variable naming */;
      let response /** Variable naming */;

      const headers = { Accept: "*/*" };

      const payload = {
        strategy: "local",
        email: "hi@ftech.ltd",
        password: "1123123123",
      };

      response = await axios.post(
        "http://localhost:3030/authentication",
        payload,
        { headers }
      );
      result = response.data;

      try {
        expect(result).toMatchObject({
          message: "Thông tin đăng nhập không đúng",
        });
      } catch (err) {
        console.log("Fail with response", response);
        throw err;
      }
    }, 10000);

    it("API update trader fail authenticate", async () => {
      let result /** Variable naming */;
      let response /** Variable naming */;

      try {
        const headers = {};

        const payload = { full_name: "hoangdanh" };

        response = await axios.put(
          "http://localhost:3030/trader/630dd7e6674c0c54111acbbe",
          payload,
          { headers }
        );
      } catch (err) {
        if (err.message.includes("ECONNREFUSED")) {
          throw err;
        }
        result = err.response.status;
      }
      //Request
      //Result

      try {
        expect(result).toBe(401);
      } catch (err) {
        console.log("Fail with response", response);
        throw err;
      }
    }, 10000);
  });
});
