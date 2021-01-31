import withSession from "@utils/withSession";
import Layout from "components/layouts/CmsLayout";
import Dropdown from "components/form/Dropdown";
import { connectToDatabase } from "utils/mongodb";
import Table from "components/table/table";
import ArticleRow from "components/table/ArticleRow";

export default function CmsPage({ user, articles }) {
  const columnInfo = [
    { className: "w-1/4", title: "Title" },
    { className: "w-1/2", title: "Abstract" },
    { className: "w-1/4", title: "Actions" },
  ];

  return (
    <Layout>
      <Table renderer={ArticleRow} entries={articles} columns={columnInfo} />
    </Layout>
  );
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  console.log(user);

  if (!user) {
    return {
      redirect: {
        destination: "/cms/login",
        permanent: false,
      },
    };
  }

  const { db } = await connectToDatabase();

  const articles = await db
    .collection("articles")
    .find({}, { _id: 0, title: 1, abstract: 1, slug: 1 })
    .limit(10)
    .map((article) => {
      article._id = article._id.toString();
      return article;
    })
    .toArray();

  return {
    props: { user, articles },
  };
});
