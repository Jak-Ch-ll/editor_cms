import EditorJS from "@editorjs/editorjs";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "./Button";
import { EditorData } from "./Editor";
import styles from "./Editor.module.scss";

interface EditorMetaProps {
  editorData: EditorData;
  setOnSave: (onSave: () => EditorData) => void;
}

export default function EditorMeta({ editorData, setOnSave }: EditorMetaProps) {
  const [metaData, setMetaData] = useState(editorData);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setMetaData({
      ...metaData,
      [name]: value,
    });
  };

  const generateTitle = () => {
    // get first header
    const firstHeader = document.querySelector(".ce-header");

    if (firstHeader instanceof HTMLHeadingElement) {
      return firstHeader.innerText;
    } else {
      // TODO: Display error to user
      console.log("No valid block chosen");
      return "";
    }
  };

  const setTitle = () => {
    setMetaData({
      ...metaData,
      title: generateTitle(),
    });
  };

  const generatePreviewText = () => {
    // get first paragraph
    const firstPara = document.querySelector(".ce-paragraph");

    if (firstPara instanceof HTMLDivElement) {
      return firstPara.innerText;
    } else {
      // TODO: Display error to user
      console.log("No valid block chosen");
      return "";
    }
  };

  const setPreviewText = () => {
    setMetaData({
      ...metaData,
      previewText: generatePreviewText(),
    });
  };

  const generateURL = () => {
    // matches all spaces (p1), regional chars (p2; only german for now) and all other special chars (p3)
    const regex = /(\s+)|(ä|ö|ü|ß)|(\W)/g;

    const title = metaData.title ? metaData.title : generateTitle();

    // takes the title and replaces spaces with "-" and other special chars with ""
    return title.toLowerCase().replaceAll(regex, (_, p1, p2, p3) => {
      if (p1) {
        return "-";
      } else if (p2) {
        switch (p2) {
          case "ä":
            return "ae";
          case "ö":
            return "oe";
          case "ü":
            return "ue";
          case "ß":
            return "ss";
          default:
            return "";
        }
      } else {
        return "";
      }
    });
  };

  const setURL = () => {
    setMetaData({
      ...metaData,
      url: generateURL(),
    });
  };

  const onSave = (): EditorData => {
    console.log(metaData, setMetaData);

    setMetaData({
      ...metaData,
      title: metaData.title ? metaData.title : generateTitle(),
      previewText: metaData.previewText
        ? metaData.previewText
        : generatePreviewText(),
      url: metaData.url ? metaData.url : generateURL(),
    });

    return {
      ...metaData,
      title: metaData.title ? metaData.title : generateTitle(),
      previewText: metaData.previewText
        ? metaData.previewText
        : generatePreviewText(),
      url: metaData.url ? metaData.url : generateURL(),
    };
  };

  setOnSave(onSave);

  return (
    <div className={styles.editorPage}>
      <details>
        <summary>Advanced</summary>
        <div className={styles.inputBox}>
          <label htmlFor="editor__input__title">Title:</label>
          <input
            id="editorPage__title"
            type="text"
            value={metaData.title}
            onChange={handleChange}
            name="title"
          />
          <Button
            text="Generate title"
            tooltip="Click on a block in the editor and then this button"
            onClick={setTitle}
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="editor__input__preview">Preview Text:</label>
          <textarea
            onChange={handleChange}
            name="previewText"
            value={metaData.previewText}
          ></textarea>
          <Button
            text="Generate preview text"
            tooltip="Click on a block in the editor and then this button"
            onClick={setPreviewText}
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="editorPage__title">URL: (must be unique)</label>
          <input
            type="text"
            value={metaData.url}
            onChange={handleChange}
            name="url"
          />
          <Button
            text="Generate URL"
            tooltip="Generate from current title"
            onClick={setURL}
          />
        </div>
      </details>
    </div>
  );
}
