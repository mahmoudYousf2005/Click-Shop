
"use client";
import  Image  from "next/image";
import { useState } from "react";

const ProductGallery = ({ images, title }) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div>
      <div className=" relative  aspect-square mb-3 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden shadow-xl">
          <Image
          src={activeImage}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain"
        />
      </div>

      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(img)}
              className={`shrink-0 w-16 h-16 rounded-md border-2 overflow-hidden ${
                activeImage === img
                  ? "border-orange-400"
                  : "border-gray-200"
              }`}
            >
              <Image
                src={img}
                alt={`${title} ${i + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;

