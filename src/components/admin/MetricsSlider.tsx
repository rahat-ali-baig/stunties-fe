// components/admin/MetricsSlider.tsx
'use client';
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import StatsCard from "../addons/StatsCard";
import { GrNext, GrPrevious } from "react-icons/gr";

interface MetricCard {
  title: string;
  value: string;
  change: string;
  icon: any;
  background?: string;
  color?: string;
  invBg: string;
  invClr: string;
}

interface MetricsSliderProps {
  cards: MetricCard[];
  cardsPerView?: number;
  autoSlide?: boolean;
  autoSlideDelay?: number;
}

const MetricsSlider: React.FC<MetricsSliderProps> = ({
  cards,
  cardsPerView = 3,
  autoSlide = true,
  autoSlideDelay = 3000
}) => {
  return (
    <div className="relative px-6">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={12}
        slidesPerView={cardsPerView}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        autoplay={
          autoSlide ? {
            delay: autoSlideDelay,
            disableOnInteraction: false, // Continue autoplay after user interaction
            pauseOnMouseEnter: true, // Pause on hover for better UX
          } : false
        }
        loop={true} // Enable infinite loop
        speed={600} // Slide transition speed in ms
        grabCursor={true} // Show grab cursor when hovered
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 8,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: cardsPerView,
            spaceBetween: 12,
          },
        }}
        className="metrics-swiper"
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index} className="px-1">
            <StatsCard {...card} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="swiper-button-prev w-7! h-7! flex items-center justify-center absolute -left-4! top-1/2!">
        <GrPrevious className="text-primary!" />
      </button>

      <button className="swiper-button-next w-7! h-7! flex items-center justify-center absolute -right-4! top-1/2">
        <GrNext className="text-primary!" />
      </button>
    </div>
  );
};

export default MetricsSlider;