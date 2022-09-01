import * as fs from "fs";
import * as os from "os";

export const logger = (
  req: { url: string; method: string },
  res: any,
  next: () => void
) => {
  const { url, method } = req;

  const data = {
    date: new Date().toISOString(),
    method: method,
    url: url,
  };

  fs.appendFile("logs/server.log", JSON.stringify(data) + os.EOL, (err) => {
    if (err) throw err;
  });

  next();
};
