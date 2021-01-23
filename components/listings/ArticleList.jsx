import ArticleCard from "./ArticleCard";

export default function ArticleList({ articles }) {
  return (
    <div>
      {articles.map((article) => (
        <ArticleCard article={article} key={article.id} />
      ))}
    </div>
  );
}
