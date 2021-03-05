// / <reference path="../types/@editorjs/header/index.d.ts" />
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { type } from "os";
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
  // default data
  const defaultData: OutputData = {
    blocks: [
      {
        type: "heading",
        data: {
          text: "",
          level: 1,
        },
      },
      {
        type: "paragraph",
        data: {
          text: "",
        },
      },
    ],
  };

  // prepare Editor
  const [editor] = useState(
    () =>
      new EditorJS({
        holder: "editorjs",
        // autofocus: true,
        // minHeight: 0,
        data: data || defaultData,
        tools: {
          heading: {
            class: Header,
            config: {
              placeholder: "Create your heading",
              levels: [1, 2, 3],
              defaultLevel: 2,
            },
            inlineToolbar: true,
          },
        },
        onChange: onChange,
        onReady: () => {
          editor.caret.setToLastBlock();
        },
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
