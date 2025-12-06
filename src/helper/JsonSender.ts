import type { ServerResponse } from "http";

const SendJson = (res: ServerResponse, status: number, data: any) => {
  res.writeHead(200, { "content-type": "application/json" });
  res.end(
    JSON.stringify(data)
  );
};

export default SendJson