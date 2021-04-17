import withSession from "@utils/withSession";
import Layout from "components/layout/Layout";
import { connectToDatabase } from "utils/mongodb";
import Card from "components/card/Card";
import Link from "next/link";
import EditIcon from "components/icons/edit";
import EyeIcon from "components/icons/eye";

export default function CmsPage({ articles }) {
  return (
    <Layout>
      <div className="row m-3 d-flex justify-content-end">
        <Link href="/admin/editor">
          <a className="btn btn-primary col-sm-2 col- shadow-sm">Yeni ekle</a>
        </Link>
      </div>
      <Card>
        <div className="table-responsive">
          <table
            className="table table-bordered"
            style={{ tableLayout: "auto" }}
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <thead>
              <tr>
                <th>Başlık</th>
                <th>Taslak</th>
                <th>İşlevler</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr>
                  <td style={{ width: "100%" }}>{article.title}</td>
                  <td>{article.draft ? "X" : ""}</td>
                  <td>
                    <div class="btn-group ">
                      <a href="#" class="btn btn-sm btn-primary">
                        <EyeIcon height="18" />
                      </a>
                      <Link href={`/admin/editor?slug=${article.slug}`}>
                        <a class="btn btn-sm btn-primary">
                          <EditIcon height="18" />
                        </a>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Layout>
  );
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  console.log(user);

  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const { db } = await connectToDatabase();

  const articles = await db
    .collection("articles")
    .find(
      { type: "project" },
      { _id: 0, title: 1, abstract: 1, slug: 1, project: "project" }
    )
    .map((article) => {
      article._id = article._id.toString();
      return article;
    })
    .toArray();

  return {
    props: { user, articles },
  };
});
