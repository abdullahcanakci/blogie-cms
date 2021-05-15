import withSession from "@utils/withSession";
import { connectToDatabase } from "utils/mongodb";
import Dashboard from "components/layout/Dashboard";
import Table from "components/Table/Table";
import Row from "components/Row";
import { Cell } from "components/Table";
import { Edit2, Eye, Trash2 } from "react-feather";
import classNames from "classnames";
import Card from "components/card/Card";
import Link from "next/link";
import Button from "../../components/Button";
import { useRouter } from "next/router";

export default function CmsPage({ articles, slug }) {
  const router = useRouter();

  return (
    <Dashboard current={`content.${slug}`}>
      <Row end={true}>
        <Button
          label="Oluştur"
          onClick={() => router.push(`/content/editor/new`)}
        />
      </Row>
      <Card>
        <Table data={articles}>
          <Cell label="Başlık" name="title" />
          <Cell
            label="Taslak"
            name="draft"
            center
            render={(data) => (
              <span
                className={classNames("pill", {
                  "bg-purple-200": data,
                  "bg-green-200": !data,
                })}
              >
                {data ? "Aktif" : "Şablon"}
              </span>
            )}
          />
          <Cell
            label="Islevler"
            name="_id"
            center
            render={(data) => (
              <>
                <Eye className="w-4 mx-2 transform hover:text-purple-500 hover:scale-110" />
                <Link href={`/content/editor/${data}`}>
                  <a href={`/content/editor/${data}`}>
                    <Edit2 className="w-4 mx-2 transform hover:text-purple-500 hover:scale-110" />
                  </a>
                </Link>
                <Trash2 className="w-4 mx-2 transform hover:text-purple-500 hover:scale-110" />
              </>
            )}
          />
        </Table>
      </Card>
    </Dashboard>
  );
}

export const getServerSideProps = withSession(async function ({
  req,
  res,
  query,
}) {
  const user = req.session.get("user");
  const { slug } = query;

  if (!["blog", "project"].includes(slug)) {
    res.statusCode = 404;
    return {
      props: { notFound: true },
    };
  }

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
      { type: slug },
      { _id: 0, title: 1, abstract: 1, slug: 1, draft: 1, project: "project" }
    )
    .map((article) => {
      article._id = article._id.toString();
      return article;
    })
    .toArray();

  return {
    props: { user, articles, slug },
  };
});
