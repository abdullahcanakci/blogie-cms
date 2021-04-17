import { HOST } from "@config/index";
import { ObjectId } from "mongodb";
import dynamic from "next/dynamic";
import Card from "components/card/Card";
import Layout from "components/layout/Layout";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const Editor = ({ article }) => {
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
            <div className="form-group col-md-6">
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
            <div className="form-group col-md-6">
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
            <div className="form-group col-md-6">
              <select
                class="form-select form-control"
                aria-label="Default select example"
                {...register("type", { required: true })}
              >
                <option value="blog">Blog Post</option>
                <option value="project">Project</option>
              </select>
            </div>
          </div>
          <div>
            <Controller
              name="body"
              control={control}
              rules={{ required: true }}
              defaultValue={article.body}
              render={({ field }) => (
                <ReactQuill theme="snow" className="bg-white" {...field} />
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
