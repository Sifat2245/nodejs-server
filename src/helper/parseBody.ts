import type { IncomingMessage } from "http";

export const parseBody = async (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err: any) {
        reject(err);
      }
    });

    req.on('error', reject)
  });
};

