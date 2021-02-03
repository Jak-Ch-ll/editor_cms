/// <reference path="../../../node_modules/@editorjs/editorjs/types/index.d.ts" />

// This type definition file is incomplete and experimental

declare module "@editorjs/header" {
  import {
    BlockToolConstructable,
    BlockToolConstructorOptions,
    BlockToolData,
    ToolConfig,
    ToolConstructable,
    API,
  } from "@editorjs/editorjs";

  // export interface HeaderConstructor<
  //   D extends object = any,
  //   C extends object = any
  // > extends BlockToolConstructorOptions {
  //   api: API;
  //   data?: BlockToolData<D>;
  //   config?: ToolConfig<C>;
  //   readOnly?: boolean;
  // }
  // export type HeaderConfig = {
  //   placeholder: number;
  // };

  // type ToolConfig = {
  //   placeholder: number;
  // };

  // export interface HeaderData extends BlogToolData {}

  class Header implements BlockToolConstructable {
    // constructor(headerConstructor: HeaderConstructor<HeaderData, HeaderConfig>);
    // public api: API;
    // public config: HeaderConfig;
    // public readOnly: boolean;

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
