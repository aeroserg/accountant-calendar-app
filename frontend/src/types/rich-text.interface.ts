
export interface RichTextTextChild {
    text: string;
    type: "text";
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strikethrough: boolean;
    code: boolean;
  }
  
  export interface RichTextLink {
    type: "link";
    url: string;
    children: RichTextTextChild[];
  }
  
  export interface RichTextImage {
    type: "image";
    url: string;
    hash?: string;
    height?: number;
    width?: number;
    formats: Record<
      "large" | "small" | "medium" | "thumbnail",
      {
        ext: string;
        url: string;
        width: number;
        height: number;
        hash: string;
      }
    >;
  }
  
  export type RichTextChild = RichTextTextChild | RichTextLink | RichTextElement;
  
  export interface RichTextElement {
    type:
      | "heading"
      | "paragraph"
      | "article"
      | "list"
      | "list-item"
      | "link"
      | "quote"
      | "image";
    level?: 1 | 2 | 3 | 4;
    format?: "unordered" | "ordered";
    url?: string;
    children: RichTextChild[];
    image: RichTextImage;
  }
  