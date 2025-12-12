import { readUsers, writeUsers } from "../helper/fileDB.ts";
import SendJson from "../helper/JsonSender.ts";
import { parseBody } from "../helper/parseBody.ts";
import addRoutes from "../helper/routeHandler.ts";

addRoutes("GET", "/", (req, res) => {
  SendJson(res, 200, {
    message: "hello from handler",
    path: req.url,
  });
});

addRoutes("POST", "/api/users", async (req, res) => {
  const body = await parseBody(req);

  //reading users json
  const users = readUsers();

  const newUser = {
    ...body,
  };

  users.push(newUser);

  writeUsers(users);

  SendJson(res, 201, { data: body, success: true });
});

addRoutes("PUT", "/api/users/:id", async (req, res) => {
  const { id } = (req as any).params;

  const body = await parseBody(req);

  const users = readUsers();

  const index = users.findIndex((user: any) => user?.id == id);

  if(index === -1 ){
    SendJson(res, 404, {success: false, status: 404, message: "user not found"})
  }

  users[index] = {
   ...users[index],
   ...body
  }

  writeUsers(users)

  SendJson(res, 200, {success: true, message: "user updated", data: users[index]})
});
