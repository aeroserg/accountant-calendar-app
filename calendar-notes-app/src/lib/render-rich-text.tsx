// src/lib/render-rich-text.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ApiHelper } from "./api-helper";
import { RichTextElement, RichTextTextChild } from "@/types/rich-text.interface";

export function renderRichText(
  element: RichTextElement,
  className: string = ""
): React.ReactNode {
  const { type, level, children, format, image } = element;

  const renderChildren = () =>
    children.map((child, i) => {
      if (typeof child !== "object") return null;

      if ("type" in child && child.type === "link" && "url" in child) {
        return (
          <Link
            key={i}
            href={new URL(child.url ?? "")}
            className={`text-blue-600 underline ${className}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {child.children.map((c, j) =>
              renderStyledText(c as RichTextTextChild, j)
            )}
          </Link>
        );
      }

      if (
        "type" in child &&
        ["list-item", "heading", "paragraph", "quote"].includes(
          child.type ?? ""
        )
      ) {
        return (
          <React.Fragment key={i}>
            {renderRichText(child as RichTextElement)}
          </React.Fragment>
        );
      }

      if (type && type === "image") {
        const rawUrl = (
          image.formats?.large?.url ||
          image.formats?.medium?.url ||
          image.formats?.small?.url ||
          image.url ||
          ""
        );
        if (!rawUrl) return null;
        let imageUrl = rawUrl;
        if (rawUrl.startsWith("/")) {
          const base = ApiHelper.baseMediaUrl
          imageUrl = base + rawUrl;
        }
      
        console.log("imageUrl:", imageUrl);
      

        return (
          <Image
            key={i}
            src={imageUrl}
            alt={image.hash ?? ""}
            width={image.width ?? 650}
            height={image.height ?? 400}
            className={`max-w-[650px] !w-full object-contain h-auto lg:mb-6 mb-4 rounded-[8px]`}
          />
        );
      }

      return renderStyledText(child as RichTextTextChild, i);
    });

  const renderStyledText = (child: RichTextTextChild, key: number) => {
    let textElement: React.ReactNode = child.text;

    if (child.code) {
      textElement = (
        <code
          key={key}
          className={`bg-gray-100 px-1 py-0.5 rounded text-sm font-mono ${className}`}
        >
          {textElement}
        </code>
      );
    }
    if (child.strikethrough) {
      textElement = <s key={key}>{textElement}</s>;
    }
    if (child.underline) {
      textElement = <u key={key}>{textElement}</u>;
    }
    if (child.italic) {
      textElement = <i key={key}>{textElement}</i>;
    }
    if (child.bold) {
      textElement = <b key={key}>{textElement}</b>;
    }

    return textElement;
  };

  switch (type) {
    case "heading":
      switch (level) {
        case 1:
          return (
            <h1
              className={`text-[24px] sm:text-[28px] xl:text-[32px] font-inter font-semibold text-gray-900 !leading-tight tracking-[-1px] sm:tracking-[-2px] ${className}`}
            >
              {renderChildren()}
            </h1>
          );
        case 2:
          return (
            <h2
              className={`text-[20px] sm:text-[24px] xl:text-[28px] font-inter font-semibold text-gray-900 !leading-tight tracking-tight ${className}`}
            >
              {renderChildren()}
            </h2>
          );
        case 3:
          return (
            <h3
              className={`text-[18px] sm:text-[22px] xl:text-[26px] font-inter font-semibold text-gray-900 !leading-tight ${className}`}
            >
              {renderChildren()}
            </h3>
          );
        default:
          return (
            <h4
              className={`text-lg sm:text-xl font-inter font-semibold text-gray-900 ${className}`}
            >
              {renderChildren()}
            </h4>
          );
      }
    case "paragraph":
      return (
        <p
          className={`text-[14px] sm:text-[16px]  text-gray-700 max-w-2xl mx-auto font-inter leading-tight ${className}`}
        >
          {renderChildren()}
        </p>
      );
    case "article":
      return <article>{renderChildren()}</article>;
    case "list":
      return format === "unordered" ? (
        <ul
          className={`list-disc list-inside space-y-1 font-inter text-gray-800 text-[14px] sm:text-[16px] ${className}`}
        >
          {renderChildren()}
        </ul>
      ) : (
        <ol
          className={`list-decimal list-inside space-y-1 font-inter text-gray-800 text-[14px] sm:text-[16px] ${className}`}
        >
          {renderChildren()}
        </ol>
      );
    case "list-item":
      return <li>{renderChildren()}</li>;
    case "quote":
      return (
        <blockquote
          className={`border-l-4 border-[var(--color-main)] pl-4 italic text-gray-800 font-inter text-[14px] sm:text-[16px] leading-tight my-4 max-w-2xl mx-auto ${className}`}
        >
          {renderChildren()}
        </blockquote>
      );
    default:
      return <span>{renderChildren()}</span>;
  }
}
