import { connectToDatabase } from "@utils/mongodb";

export default async function handler(req, res) {
  const {
    query: { article_slug },
  } = req;

  const { db } = await connectToDatabase();

  const article = await db
    .collection("articles")
    .findOne({ slug: article_slug });

  res.json({ available: article == null });
}
