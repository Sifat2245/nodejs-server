import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config/index.ts";
import { routes, type RouteHandler } from "./helper/routeHandler.ts";
import "./routes/index.ts";
import findDynamicRoute from "./helper/dynamicRoute.ts";


const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("server is initialized...");

    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";
    const methodMap = routes.get(method);
    const handler: RouteHandler | undefined = methodMap?.get(path);
    if (handler) {
      handler(req, res);
    } 
    else if(findDynamicRoute(method, path)){
      const match = findDynamicRoute(method, path);
      match?.handler(req, res);

      (req as any).params = match?.params
    }
    
    else {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          message: "route not found",
          path,
        })
      );
    }
  }
);

server.listen(config.port, () => {
  console.log(`server is running in port ${config.port}`);
});
