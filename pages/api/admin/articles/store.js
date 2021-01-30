import { connectToDatabase } from "@utils/mongodb";
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    var article = await upsertArticle(data);
    console.log(article);
    res.json(article);
  } else {
    res.abort("Method not available");
  }
}

async function checkSlug(slug) {
  const { db } = await connectToDatabase();
  const article = await db.collection("articles").findOne({ slug });

  return article == null;
}

async function upsertArticle(data) {
  const { db } = await connectToDatabase();

  const article = await db
    .collection("articles")
    .findOne({ _id: ObjectId(data._id) });

  const filter = { _id: ObjectId(data._id) };
  delete data._id;

  const isSlugValid =
    article?.slug == data.slug || (await checkSlug(data.slug));

  if (!isSlugValid) {
    return { errors: { slug: ["Slug is already being used"] } };
  }
  console.log(filter);
  const newArticle = await db
    .collection("articles")
    .updateOne(filter, { $set: data }, { upsert: true });

  return newArticle;
}
