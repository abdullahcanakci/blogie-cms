import { connectToDatabase } from "@utils/mongodb";
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    var article = upsertArticle(data);

    res.json(article);
  } else {
    res.abort("Method not available");
  }
}

async function checkSlug(slug) {
  const article = await db
    .collection("articles")
    .findOne({ slug: article_slug });

  return article == null;
}

async function upsertArticle(data) {
  const { db } = await connectToDatabase();
  const article = await db
    .collection("articles")
    .findOne({ _id: ObjectId(data._id) });

  if (article === null) {
    return createArticle(data);
  }

  const filter = {};

  if (article !== null) {
    filter._id = ObjectId(article._id);
    delete data._id;
  }

  const isSlugValid =
    article?.slug == data.slug || (await checkSlug(data.slug));

  if (!isSlugValid) {
    return { errors: { slug: ["Slug is already being used"] } };
  }

  const newArticle = await db
    .collection("articles")
    .updateOne(filter, { $set: data }, { upsert: true });

  return newArticle;
}
