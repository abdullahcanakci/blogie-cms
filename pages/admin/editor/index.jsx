import { HOST } from "@config/index";
import { ObjectId } from "mongodb";
import dynamic from "next/dynamic";
import Card from "components/card/Card";
import Layout from "components/layout/Layout";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import React, { useMemo, useRef } from "react";
import fetcJson from "utils/fetchJson";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);

const Editor = ({ article }) => {
  const imageHandler = (a) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // Listen upload local image and save to server
    input.onchange = () => {
      const file = input.files[0];

      // file type is only image.
      if (/^image\//.test(file.type)) {
        saveToServer(file);
      } else {
        console.warn("You could only upload images.");
      }
    };
  };
  const editorRef = useRef(null);

  function saveToServer(file) {
    const fd = new FormData();
    fd.append("upload", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/media", true);
    xhr.onload = () => {
      if (xhr.status === 201) {
        // this is callback data: url
        const url = JSON.parse(xhr.responseText).url;
        console.log(url);
        insertToEditor(url);
      }
    };
    xhr.send(fd);
  }

  function insertToEditor(url) {
    // push image url to rich editor.
    console.log(editorRef);
    editorRef.current.getEditor().insertEmbed(null, "image", url);
  }

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],

      handlers: {
        image: imageHandler,
      },
    },
  }));

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    formData._id = article._id;
    storeArticle(formData);
  };

  return (
    <Layout>
      <Card className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="mb-3 col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Başlık"
                defaultValue={article.title}
                {...register("title", { required: true })}
              />
              {errors.titleRequired && (
                <div class="invalid-feedback">Başlık alanı gereklidir.</div>
              )}
            </div>
            <div className="mb-3 col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Slug"
                defaultValue={article.slug}
                {...register("slug", { required: true })}
              />
              {errors.slugRequired && (
                <div class="invalid-feedback">Slug alanı gereklidir.</div>
              )}
            </div>
            <div className="mb-3 col-md-6">
              <select
                class="form-select form-control"
                aria-label="Default select example"
                defaultValue={article.type}
                {...register("type", { required: true })}
              >
                <option value="blog">Blog Post</option>
                <option value="project">Project</option>
              </select>
            </div>
            <div className="mb-3 col-md-6 d-flex justify-content-center flex-column">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  defaultChecked={article.draft}
                  {...register("draft")}
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Taslak
                </label>
              </div>
            </div>
            <div className="mb-3 col-md-6">
              <textarea
                className="form-control"
                placeholder="Özet"
                defaultValue={article.summary}
                {...register("summary", { required: true })}
              />
            </div>
          </div>
          <div>
            <Controller
              name="body"
              control={control}
              rules={{ required: true }}
              defaultValue={article.body}
              render={({ field }) => (
                <ReactQuill
                  modules={modules}
                  formats={formats}
                  {...field}
                  forwardedRef={editorRef}
                />
              )}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-user btn-block mt-2"
          >
            Kaydet
          </button>
        </form>
      </Card>
    </Layout>
  );
};

export default Editor;

const storeArticle = async (data) => {
  await fetch(`/api/admin/articles/store`, {
    method: "POST",
    "content-type": "application/json",
    body: JSON.stringify(data),
  });
};

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const res = await fetch(`${HOST}/api/articles/${slug}`);
  var article;

  try {
    article = await res.json();
  } catch (error) {}

  if (!article) {
    article = { _id: new ObjectId().toHexString() };
  }

  return {
    props: { article },
  };
}
