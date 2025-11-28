"use client";

import Image from "next/image";

const Rating = () => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <Image
          key={index}
          width={20}
          height={20}
          src={"/assets/icons/registration/rating-star.svg"}
          alt="star"
        />
      ))}
    </div>
  );
};

export default Rating;
