import dynamic from "next/dynamic";

const EditorPrep = dynamic(
  () => {
    return import("./Editor.prep");
  },
  {
    ssr: false,
  }
);

export default function Editor() {
  return <EditorPrep />;
}
