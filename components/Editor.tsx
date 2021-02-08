import EditorJS, { OutputData } from "@editorjs/editorjs";
import { Article } from "@prisma/client";
import dynamic from "next/dynamic";
import { ChangeEvent, useState } from "react";
import EditorMeta from "./Editor.meta";
import styles from "./Editor.module.scss";

export interface EditorProps {
  article?: EditorData;
}

export interface EditorData {
  id?: number;
  url: string;
  title: string;
  previewText: string;
  content?: OutputData;
}

const EditorConf = dynamic(
  () => {
    return import("./Editor.conf");
  },
  {
    ssr: false,
  }
);

export default function Editor({
  article = { url: "", title: "", previewText: "" },
}: EditorProps) {
  let editor: EditorJS;
  let onSave: () => EditorData;

  const save = async () => {
    try {
      const newMetaData = onSave();
      const content = await editor.save();

      const article = {
        ...newMetaData,
        content,
      };

      const body = JSON.stringify(article);

      if (newMetaData.id) {
        await fetch(`/api/articles/${newMetaData.id}`, {
          method: "PATCH",
          body,
        });
      } else {
        await fetch(`/api/articles`, {
          method: "POST",
          body,
        });
      }
    } catch (err) {
      console.log("Error while saving to database: ", err);
    }
  };

  const onChange = () => {
    onSave();
  };

  return (
    <div className={styles.editorPage}>
      <button onClick={save}>Save!</button>
      <EditorConf
        data={article.content}
        setEditor={instance => {
          editor = instance;
        }}
        onChange={onChange}
      />
      <EditorMeta
        editorData={article}
        setOnSave={saveFunc => {
          onSave = saveFunc;
        }}
      />
    </div>
  );
}
