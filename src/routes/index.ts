import SendJson from "../helper/JsonSender.ts";
import addRoutes from "../helper/routeHandler.ts";

addRoutes("GET", "/", (req, res) => {
  SendJson(res, 200, {
    message: "hello from handler",
    path: req.url,
  });
});
