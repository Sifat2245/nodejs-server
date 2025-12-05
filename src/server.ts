import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config/index.ts";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("server is initialized...");

    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "hello from node js server which is build with typescript",
          path: req.url,
        })
      );
    }

    if (req.url === "/api" && req.method === "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "hello!!! status ok",
          path: req.url,
        })
      );
    }

    if (req.url === "/api/user" && req.method === "POST") {
      //   const user = {
      //     id: 1,
      //     name: "alice",
      //   };
      //   res.writeHead(200, { "content-type": "application/json" });
      //   res.end(JSON.stringify(user));

      let body = "";
      // listen for data chunk

      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        try {
          const parseBody = JSON.parse(body);
          console.log(parseBody);
          console.log('hello');
          res.end(JSON.stringify(parseBody));
        } catch (err: any) {
          console.log(err);
        }
      });
    }
  }
);

server.listen(config.port, () => {
  console.log(`server is running in port ${config.port}`);
});
