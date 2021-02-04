// / <reference path="../types/@editorjs/header/index.d.ts" />
import EditorJS, { EditorConfig } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "./Button";
import styles from "./Editor.module.scss";

enum LogLevels {
  VERBOSE = "VERBOSE",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

enum postType {
  NEWS,
  ARTICLE,
}

export default function EditorPrep() {
  const [fullData, setFullData] = useState({
    title: "",
    url: "",
    previewText: "",
    type: postType.ARTICLE,
    published: false,
    content: {},
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFullData({
      ...fullData,
      [name]: value,
    });
  };

  // prepare Editor
  const [editor] = useState(
    () =>
      new EditorJS({
        holder: "editorjs",
        // autofocus: true,
        // minHeight: 0,
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
      })
  );

  // destroy editor-instance after unmount
  useEffect(() => {
    return function cleanUp() {
      if (editor.destroy) editor.destroy();
    };
  }, []);

  // Save data
  const saveData = async () => {
    console.log("Data saved!");

    const data = await editor.save();

    data.blocks.forEach(block => console.log(block.data.text));

    // TODO: API-Call to save data to db
  };

  // Empty current editor
  const clearData = () => {
    // TODO: Ask user to confirm clearing

    editor.clear();
  };

  const generateTitle = async () => {
    // get index of current Block
    const blockIndex = editor.blocks.getCurrentBlockIndex();

    // save to get data and find current block via index
    const data = await editor.save();
    const block = data.blocks[blockIndex];

    if (block) {
      setFullData({
        ...fullData,
        title: block.data.text,
      });
    } else {
      // TODO: Display error to user
      console.log("No valid block chosen");
    }
  };

  const generatePreviewText = async () => {
    // get index of current Block
    const blockIndex = editor.blocks.getCurrentBlockIndex();

    // save to get data and find current block via index
    const data = await editor.save();
    const block = data.blocks[blockIndex];

    if (block) {
      console.log("This is working");
      setFullData({
        ...fullData,
        previewText: block.data.text,
      });
    } else {
      // TODO: Display error to user
      console.log("No valid block chosen");
    }
  };

  const generateURL = () => {
    // matches all spaces (p1) and all other special chars (p2)
    const regex = /(\s+)|(\W)/g;

    // takes the title and replaces spaces with "-" and other special chars with ""
    const url = fullData.title
      .replaceAll(regex, (_, p1, p2) => {
        if (p1) {
          return "-";
        } else {
          return "";
        }
      })
      .toLowerCase();

    // update fullData
    setFullData({
      ...fullData,
      url,
    });
  };

  return (
    <div className={styles.editorPage}>
      <details>
        <summary>Advanced</summary>
        <div className={styles.inputBox}>
          <label htmlFor="editor__input__title">Title:</label>
          <input
            id="editorPage__title"
            type="text"
            value={fullData.title}
            onChange={handleChange}
            name="title"
          />
          <Button
            text="Generate title"
            tooltip="Click on a block in the editor and then this button"
            onClick={generateTitle}
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="editor__input__preview">Preview Text:</label>
          <textarea
            onChange={handleChange}
            name="previewText"
            value={fullData.previewText}
          ></textarea>
          <Button
            text="Generate preview text"
            tooltip="Click on a block in the editor and then this button"
            onClick={generatePreviewText}
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="editorPage__title">URL: (must be unique)</label>
          <input
            type="text"
            value={fullData.url}
            onChange={handleChange}
            name="url"
          />
          <Button
            text="Generate URL"
            tooltip="Generate from current title"
            onClick={generateURL}
          />
        </div>
      </details>

      <div className={styles.buttonBox}>
        <Button text="Save!" tooltip="Save article" onClick={saveData} />
        <Button text="Clear!" tooltip="Delete everything" onClick={clearData} />
      </div>

      <div className={styles.editor} id="editorjs"></div>
    </div>
  );
}
