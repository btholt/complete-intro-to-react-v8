import { readFileSync } from "fs";
import path from "path";

const buffer = readFileSync(path.join(process.cwd(), "./course.json"));
const course = JSON.parse(buffer);
const BASE_URL = course?.productionBaseUrl || "";

const config = {
  basePath: BASE_URL,
  env: {
    BASE_URL,
  },
  async redirects() {
    if (BASE_URL) {
      return [
        {
          source: "/",
          destination: BASE_URL,
          basePath: false,
          permanent: false,
        },
      ];
    }
    return [];
  },
};

export default config;
