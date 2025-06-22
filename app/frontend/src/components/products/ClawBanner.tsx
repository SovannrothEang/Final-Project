"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";

const banners = [
    {
        img: "/Claw.png",
        title: "CLAW & AI",
        desc: "GRIP AND GAME",
    },
    {
        img: "/Claw.png",
        title: "NEXT GEN CLAW",
        desc: "UNLEASH THE POWER",
    },
    {
        img: "/Claw.png",
        title: "CLAW PRO",
        desc: "PRECISION GAMING",
    },
];

export function ClawBanner() {
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState<number | null>(null);
    const [animating, setAnimating] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (animating) return;
        timeoutRef.current = setTimeout(() => {
            setPrev(current);
            setCurrent((prevIdx) => (prevIdx + 1) % banners.length);
            setAnimating(true);
        }, 5000);
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [current, animating]);

    // End animation after transition
    useEffect(() => {
        if (animating) {
            const timer = setTimeout(() => setAnimating(false), 700);
            return () => clearTimeout(timer);
        }
    }, [animating]);

    return (
        <section className="relative w-full sm:h-[250px] lg:h-[300px] rounded-xl overflow-hidden my-5">
            {/* Animation container */}
            <div className="absolute inset-0 w-full h-full">
                {/* Previous image (slide out left) */}
                {prev !== null && animating && (
                    <Image
                        key={banners[prev].img + "-prev"}
                        src={banners[prev].img}
                        alt={banners[prev].title}
                        fill
                        className="object-cover w-full h-full absolute inset-0 transition-transform duration-700 ease-in-out z-0 animate-banner-slide-out"
                        style={{}}
                        priority
                        sizes="100vw"
                    />
                )}
                {/* Current image (slide in from right) */}
                <Image
                    key={banners[current].img + "-current"}
                    src={banners[current].img}
                    alt={banners[current].title}
                    fill
                    className={`object-cover w-full h-full absolute inset-0 transition-transform duration-700 ease-in-out z-10 ${
                        animating ? "animate-banner-slide-in" : ""
                    }`}
                    style={{}}
                    priority
                    sizes="100vw"
                />
            </div>
            {/* Overlay content */}
            <div className="relative z-20 flex flex-col justify-center items-start h-full text-white px-4 bg-black/10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-2">{banners[current].title}</h2>
                <p className="text-lg sm:text-xl mb-4">{banners[current].desc}</p>
                <Button className="bg-white text-black hover:bg-black hover:text-white w-[100px]">
                    Shop Now
                </Button>
            </div>
            <style jsx global>{`
                @keyframes banner-slide-in {
                    0% {
                        transform: translateX(100%);
                        opacity: 0.7;
                    }
                    100% {
                        transform: translateX(0%);
                        opacity: 1;
                    }
                }
                @keyframes banner-slide-out {
                    0% {
                        transform: translateX(0%);
                        opacity: 1;
                    }
                    100% {
                        transform: translateX(-100%);
                        opacity: 0.7;
                    }
                }
                .animate-banner-slide-in {
                    animation: banner-slide-in 0.7s forwards;
                }
                .animate-banner-slide-out {
                    animation: banner-slide-out 0.7s forwards;
                }
            `}</style>
        </section>
    );
}