import { HOST } from "@config/index";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import CmsLayout from "@components/layouts/CmsLayout";
import Input from "components/form/Input";
import Textarea from "components/form/Textarea";
const Form = dynamic(() => import("components/form/Form"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";
const TextEditor = dynamic(() => import("components/form/TextEditor"), {
  ssr: false,
});

export default function EditorPage({ article: prevArticle }) {
  const [article, setArticle] = useState(prevArticle ?? {});
  console.log(HOST);
  useEffect(async () => {
    await checkSlug(article.slug, article._id);
  }, [article.slug]);

  const saveArticle = async (value) => {
    const response = await storeArticle(value);
    console.log(response);
  };

  return (
    <CmsLayout>
      <div className="flex flex-col sm:min-w-full md:max-w-1/2">
        <Form value={article} setValue={setArticle} onSave={saveArticle}>
          <Input label="Title" placeholder="Enter your post title" />
          <Input
            label="Slug"
            placeholder="Your post slug"
            hint="Your post slug will appear here."
          />
          <Textarea label="Abstract" hint="This will show up on lists etc." />
          <TextEditor
            label="Content"
            hint="Content of your article."
            placeholder="Your articles content"
          />
        </Form>
      </div>
    </CmsLayout>
  );
}

async function checkSlug(slug, id) {
  console.log(slug, id);
}

async function storeArticle(data) {
  console.log("host", HOST);
  const res = await fetch(`${HOST}/api/admin/articles/store`, {
    method: "POST",
    "content-type": "application/json",
    body: JSON.stringify(data),
  }).then(async (res) => await res.json());
  console.log(res);
  var article;
}

export async function getServerSideProps(context) {
  const { article_slug } = context.query;
  console.log(HOST);
  const res = await fetch(`${HOST}/api/articles/${article_slug}`);
  var article;
  try {
    article = await res.json();
  } catch (error) {}
  if (!article) {
    article = {};
  }

  return {
    props: { article },
  };
}
