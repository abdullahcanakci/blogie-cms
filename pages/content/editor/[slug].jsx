import { ObjectId } from "mongodb";
import { HOST } from "config";
import Dashboard from "components/layout/Dashboard";
import { useForm } from "react-hook-form";
import Card from "components/card/Card";
import Input from "components/Form/Inpux";
import Button from "components/Button";
import { default as TextEditor } from "components/Form/Editor";
import Checkbox from "components/Form/Checkbox";
import Select from "components/Form/Select";

const Editor = ({ article }) => {
  const { control, handleSubmit } = useForm({ defaultValues: article });

  const onSubmit = async (formData) => {
    console.log(formData);
    await storeArticle(formData);
  };

  return (
    <Dashboard>
      <Card>
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input label="Başlık" name="title" control={control} />
            <Input label="Slug" name="slug" control={control} />
            <Select label="type" name="type" control={control}>
              <Select.Option label="blog" />
              <Select.Option label="project" />
            </Select>
            <Checkbox
              label="Görünüm"
              name="draft"
              type="radio"
              control={control}
            >
              <Checkbox.Option label="Taslak" value="draft" />
              <Checkbox.Option label="Public" value="public" />
            </Checkbox>
            <TextEditor label="Content" name="body" control={control} />
            <Button label="Save" type="submit" />
          </form>
        </Card.Body>
      </Card>
    </Dashboard>
  );
};

const storeArticle = async (data) => {
  await fetch(`/api/admin/articles/store`, {
    method: "POST",
    "content-type": "application/json",
    body: JSON.stringify(data),
  });
};

export default Editor;

export async function getServerSideProps(context) {
  const { slug } = context.query;
  var article;

  if (slug != "new") {
    const res = await fetch(`${HOST}/api/articles/${slug}`);

    try {
      article = await res.json();
    } catch (error) {}
  }

  if (!article) {
    article = { _id: new ObjectId().toHexString() };
  }

  return {
    props: { article },
  };
}
