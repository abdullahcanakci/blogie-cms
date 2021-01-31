import withSession from "@utils/withSession";
import Layout from "components/layouts/CmsLayout";
import Dropdown from "components/form/Dropdown";
import { connectToDatabase } from "utils/mongodb";

export default function CmsPage({ user, articles }) {
  return (
    <Layout>
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th className="w-1/4">Title</th>
            <th className="w-1/2">Abstract</th>
            <th className="w-1/4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article._id}>
              <td>{article.title}</td>
              <td>{article.abstract}</td>
              <td>
                <Dropdown
                  primaryLabel="Show"
                  buttonClasses="is-small primary"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
