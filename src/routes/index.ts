import SendJson from "../helper/JsonSender.ts";
import { parseBody } from "../helper/parseBody.ts";
import addRoutes from "../helper/routeHandler.ts";

addRoutes("GET", "/", (req, res) => {
  SendJson(res, 200, {
    message: "hello from handler",
    path: req.url,
  });
});

addRoutes("POST", "/api/users", async(req, res) =>{
  const body = await parseBody(req);
  SendJson(res, 201, {data: body, success: true})
})
