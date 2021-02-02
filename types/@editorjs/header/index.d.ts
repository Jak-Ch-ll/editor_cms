/// <reference path="../../../node_modules/@editorjs/editorjs/types/index.d.ts" />

declare module "@editorjs/header" {
  import {
    BlockToolConstructable,
    ToolConstructable,
  } from "@editorjs/editorjs";

  class Header implements BlockToolConstructable {
    save(): {
      text: string;
      level: number;
    };
    render(): HTMLHeadingElement;
  }
  export default Header;
}

// // declare class Header {}

// export as namespace Header;

// declare class Header extends ToolConstructable {}

// export interface Header extends ToolConstructable {}
