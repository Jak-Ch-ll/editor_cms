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
  setOnChange: (onChange: () => void) => void;
}

export default function EditorMeta({
  editorData,
  setOnSave,
  setOnChange,
}: EditorMetaProps) {
  const [title, setTitle] = useState(editorData.title);
  const [previewText, setPreviewText] = useState(editorData.previewText);
  const [url, setURL] = useState(editorData.url);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    if (name === "title") setTitle(value);
    else if (name === "previewText") setPreviewText(value);
    else if (name === "url") setURL(value);
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

  const generateURL = () => {
    // matches all spaces (p1), regional chars (p2; only german for now) and all other special chars (p3)
    const regex = /(\s+)|(ä|ö|ü|ß)|(\W)/g;

    const currentTitle = generateTitle();

    // takes the title and replaces spaces with "-" and other special chars with ""
    return currentTitle.toLowerCase().replaceAll(regex, (_, p1, p2, p3) => {
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

  const onSave = (): EditorData => {
    return {
      title,
      previewText,
      url,
    };
  };

  setOnSave(onSave);

  const onChange = () => {
    console.log("Something else changed");
    setTitle(generateTitle());
    setPreviewText(generatePreviewText());
    setURL(generateURL());

    // setMetaData({
    //   ...metaData,
    //   title: generateTitle(),
    //   previewText: generatePreviewText(),
    //   url: generateURL(),
    // });
  };

  setOnChange(onChange);

  return (
    <div className={styles.editorPage}>
      <details>
        <summary>Advanced</summary>
        <div className={styles.inputBox}>
          <label htmlFor="editor__input__title">Title:</label>
          <input
            id="editorPage__title"
            type="text"
            value={title}
            onChange={handleChange}
            name="title"
          />
          <Button
            text="Generate title"
            tooltip="Click on a block in the editor and then this button"
            onClick={() => setTitle(generateTitle())}
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="editor__input__preview">Preview Text:</label>
          <textarea
            onChange={handleChange}
            name="previewText"
            value={previewText}
          ></textarea>
          <Button
            text="Generate preview text"
            tooltip="Click on a block in the editor and then this button"
            onClick={() => {
              setPreviewText(generatePreviewText());
            }}
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="editorPage__title">URL: (must be unique)</label>
          <input type="text" value={url} onChange={handleChange} name="url" />
          <Button
            text="Generate URL"
            tooltip="Generate from current title"
            onClick={() => setURL(generateURL())}
          />
        </div>
      </details>
    </div>
  );
}

// export default function EditorMeta({
//   editorData,
//   setOnSave,
//   setOnChange,
// }: EditorMetaProps) {
//   const [metaData, setMetaData] = useState(editorData);

//   const handleChange = (
//     event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     console.log("Something changed ...");

//     const { name, value } = event.target;

//     setMetaData({
//       ...metaData,
//       [name]: value,
//     });
//   };

//   const generateTitle = () => {
//     // get first header
//     const firstHeader = document.querySelector(".ce-header");

//     if (firstHeader instanceof HTMLHeadingElement) {
//       return firstHeader.innerText;
//     } else {
//       // TODO: Display error to user
//       console.log("No valid block chosen");
//       return "";
//     }
//   };

//   const setTitle = () => {
//     console.log("Setting title");
//     console.log(setMetaData);
//     const title = generateTitle();
//     setMetaData({
//       ...metaData,
//       title,
//     });
//   };

//   const generatePreviewText = () => {
//     // get first paragraph
//     const firstPara = document.querySelector(".ce-paragraph");

//     if (firstPara instanceof HTMLDivElement) {
//       return firstPara.innerText;
//     } else {
//       // TODO: Display error to user
//       console.log("No valid block chosen");
//       return "";
//     }
//   };

//   const setPreviewText = () => {
//     setMetaData({
//       ...metaData,
//       previewText: generatePreviewText(),
//     });
//   };

//   const generateURL = () => {
//     // matches all spaces (p1), regional chars (p2; only german for now) and all other special chars (p3)
//     const regex = /(\s+)|(ä|ö|ü|ß)|(\W)/g;

//     // takes the title and replaces spaces with "-" and other special chars with ""
//     return metaData.title.toLowerCase().replaceAll(regex, (_, p1, p2, p3) => {
//       if (p1) {
//         return "-";
//       } else if (p2) {
//         switch (p2) {
//           case "ä":
//             return "ae";
//           case "ö":
//             return "oe";
//           case "ü":
//             return "ue";
//           case "ß":
//             return "ss";
//           default:
//             return "";
//         }
//       } else {
//         return "";
//       }
//     });
//   };

//   const setURL = () => {
//     setMetaData({
//       ...metaData,
//       url: generateURL(),
//     });
//   };

//   const onSave = (): EditorData => {
//     return metaData;
//   };

//   setOnSave(onSave);

//   const onChange = () => {
//     console.log("Something changed");
//     setTitle();
//     setPreviewText();
//     setURL();

//     // setMetaData({
//     //   ...metaData,
//     //   title: generateTitle(),
//     //   previewText: generatePreviewText(),
//     //   url: generateURL(),
//     // });
//   };

//   setOnChange(onChange);

//   return (
//     <div className={styles.editorPage}>
//       <details>
//         <summary>Advanced</summary>
//         <div className={styles.inputBox}>
//           <label htmlFor="editor__input__title">Title:</label>
//           <input
//             id="editorPage__title"
//             type="text"
//             value={metaData.title}
//             onChange={handleChange}
//             name="title"
//           />
//           <Button
//             text="Generate title"
//             tooltip="Click on a block in the editor and then this button"
//             onClick={setTitle}
//           />
//         </div>

//         <div className={styles.inputBox}>
//           <label htmlFor="editor__input__preview">Preview Text:</label>
//           <textarea
//             onChange={handleChange}
//             name="previewText"
//             value={metaData.previewText}
//           ></textarea>
//           <Button
//             text="Generate preview text"
//             tooltip="Click on a block in the editor and then this button"
//             onClick={setPreviewText}
//           />
//         </div>

//         <div className={styles.inputBox}>
//           <label htmlFor="editorPage__title">URL: (must be unique)</label>
//           <input
//             type="text"
//             value={metaData.url}
//             onChange={handleChange}
//             name="url"
//           />
//           <Button
//             text="Generate URL"
//             tooltip="Generate from current title"
//             onClick={setURL}
//           />
//         </div>
//       </details>
//     </div>
//   );
// }
