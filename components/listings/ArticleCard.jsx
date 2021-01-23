import Link from "next/link";

export default function ArticleCard({ article }) {
  return (
    <div className="shadow sm:rounded-lg bg-gray-600 my-4 p-4 text-white hover:shadow-lg">
      {/* Card Header */}
      <div className="pt-2 pb-4 sm:px-6">
        <h3>{article.title}</h3>
      </div>
      {/* Card Body */}
      <div className="pb-2">
        <p className="text-justify">{article.abstract}</p>
      </div>
      {/* Card Footer */}
      <div className="flex justify-end">
        <Link
          className="text-right cursor-pointer"
          href={`/articles/${article.id}`}
        >
          Read more...
        </Link>
      </div>
    </div>
  );
}
