"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function ProjectDetailSlider({ images, title }: { images: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full aspect-video sm:aspect-[21/9] group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={800}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom",
          bulletClass: "swiper-bullet-custom",
          bulletActiveClass: "swiper-bullet-active-custom",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx} className="w-full h-full">
            <div className="relative w-full h-full">
               <Image
                 src={img}
                 alt={`${title} - image ${idx + 1}`}
                 fill
                 className="object-cover"
                 priority={idx === 0}
               />
               
               {/* Subtle overlay for active slide styling if needed */}
               <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <button className="swiper-button-prev-custom absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur text-slate-800 dark:text-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 shadow-lg cursor-pointer border border-transparent dark:border-slate-700/50">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button className="swiper-button-next-custom absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur text-slate-800 dark:text-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 shadow-lg cursor-pointer border border-transparent dark:border-slate-700/50">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
      </button>

      {/* Custom Pagination Container */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
         <div className="swiper-pagination-custom flex items-center justify-center gap-2 px-4 py-2 bg-slate-900/60 backdrop-blur-md rounded-full !w-fit !static !transform-none !m-0 pointer-events-auto"></div>
      </div>

      {/* Global styles for pagination bullets to override swiper specific classes */}
      <style jsx global>{`
        .swiper-bullet-custom {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .swiper-bullet-active-custom {
          width: 24px;
          background-color: white;
        }
      `}</style>
      
      {/* Counter Badge */}
      <div className="absolute top-6 right-6 z-20 bg-slate-900/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
        {activeIndex + 1} / {images.length}
      </div>
    </div>
  );
}
