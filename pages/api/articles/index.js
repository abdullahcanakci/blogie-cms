import { sendJson } from "next/dist/next-server/server/api-utils";
import { articles } from "./data";

export default function handler(req, res) {
  sendJson(res, articles);
}
