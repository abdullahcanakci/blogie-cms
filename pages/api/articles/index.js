import { connectToDatabase } from "@utils/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const {
    query: { after },
  } = req;
  console.log(after);

  const articles = await db
    .collection("articles")
    .find({}, { _id: 0, title: 1, abstract: 1, slug: 1 })
    .limit(10)
    .toArray();

  res.json(articles);
}
