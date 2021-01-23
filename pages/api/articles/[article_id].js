import { sendJson } from "next/dist/next-server/server/api-utils";
import { articles } from "./data";

export default function handler(req, res) {
  const {
    query: { article_id },
  } = req;

  const article = articles.find((e) => e.id == article_id);

  sendJson(res, article);
}
