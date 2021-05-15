import { useController } from "react-hook-form";
import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Figma } from "react-feather";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  { ssr: false }
);

const Editor = ({ label, name, rules = {}, defaultValue = "", control }) => {
  const { field } = useController({ name, control, rules, defaultValue });

  const editorRef = useRef(null);

  const imageHandler = (a) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];

      if (/^image\//.test(file.type)) {
        saveToServer(file);
      } else {
        alert("You could only upload images.");
      }
    };
  };
  const saveToServer = (file) => {
    const fd = new FormData();
    fd.append("upload", file);
    // TODO: move over to fetch
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/media", true);
    xhr.onload = () => {
      if (xhr.status === 201) {
        const url = JSON.parse(xhr.responseText).url;
        insertToEditor(url);
      }
    };
    xhr.send(fd);
  };

  const insertToEditor = (imageUrl) => {
    // TODO: get current cursor position and embed there
    editorRef.current.getEditor().insertEmbed(null, "image", imageUrl);
  };

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

  const formats = useMemo(() => [
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
  ]);

  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      placeholder={label}
      {...field}
      forwardedRef={editorRef}
    />
  );
};

export default Editor;
