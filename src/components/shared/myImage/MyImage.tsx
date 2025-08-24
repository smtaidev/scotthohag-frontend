"use client";
import Image from "next/image";
import React from "react";

const MyImage = ({
  imageSrc,
  height,
  width,
}: {
  imageSrc: string;
  height: number;
  width: number;
}) => {
  return (
    <Image
      src={imageSrc}
      height={height}
      width={width}
      alt="auth side image"
      className=" rounded-lg w-[628px] h-[865px]  object-cover"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZWVlZWVlIi8+PC9zdmc+"
      placeholder="blur"
      loading="lazy"
      onError={(e) => {
        const img = e.currentTarget;
        if (!img.dataset.fallback) {
          img.srcset =
            "https://img.freepik.com/free-photo/red-hardcover-book-front-cover_1101-833.jpg";
          img.dataset.fallback = "true";
        }
      }}
      // sizes="(max-width: 768px) 100vw, 129px" // Helps with responsive loading
    />
  );
};

export default MyImage;
