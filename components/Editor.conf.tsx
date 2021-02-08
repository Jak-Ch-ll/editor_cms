// / <reference path="../types/@editorjs/header/index.d.ts" />
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { Dispatch, useEffect, useState } from "react";
import styles from "./Editor.module.scss";

interface EditorConfProps {
  data?: OutputData;
  setEditor: (instance: EditorJS) => void;
  onChange: () => void;
}

export default function EditorConf({
  data,
  setEditor,
  onChange,
}: EditorConfProps) {
  // prepare Editor
  const [editor] = useState(
    () =>
      new EditorJS({
        holder: "editorjs",
        // autofocus: true,
        // minHeight: 0,
        data,
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
        onChange: onChange,
      })
  );

  setEditor(editor);

  // destroy editor-instance after unmount
  useEffect(() => {
    return function cleanUp() {
      if (editor.destroy) editor.destroy();
    };
  }, []);

  return <div className={styles.editor} id="editorjs"></div>;
}
