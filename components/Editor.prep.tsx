// / <reference path="../types/@editorjs/header/index.d.ts" />
import EditorJS, { EditorConfig } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { useEffect } from "react";
import styles from "./Editor.module.scss";

export default function EditorPrep() {
  let editor: EditorJS;
  const config: EditorConfig = {
    holder: "editorjs",
    autofocus: true,
    tools: {
      heading: {
        class: Header,
        config: {
          placeholder: "Create a heading",
          levels: [1, 2, 3],
          defaultLevel: 2,
        },
      },
    },
  };

  useEffect(() => {
    editor = new EditorJS(config);

    return function cleanUp() {
      if (editor.destroy) editor.destroy();
    };
  }, []);

  const saveData = async () => {
    console.log("Data saved!");
  };

  return (
    <div className={styles.editor}>
      <div className={styles.window} id="editorjs"></div>
      <button onClick={saveData}>Save!</button>
    </div>
  );
}
