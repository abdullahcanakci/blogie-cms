export default function Article({ article }) {
  return (
    <div className="prose">
      <h1>{article.title}</h1>
      <div className="text-gray-200 text-justify">{article.content}</div>
    </div>
  );
}
