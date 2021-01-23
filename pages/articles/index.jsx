import { ArticleList } from "@components/index";
import Layout from "@components/layouts/Layout";
import { HOST } from "../../config/index";

export default function ArticlesIndex({ articles }) {
  return (
    <Layout>
      <ArticleList articles={articles} />
    </Layout>
  );
}

export async function getServerSideProps({ ctx }) {
  const res = await fetch(`${HOST}/api/articles`);
  const articles = await res.json();

  if (!articles) {
    return { notFound: true };
  }

  return {
    props: { articles },
  };
}
