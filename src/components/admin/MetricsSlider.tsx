
'use client';

import React, { useRef, useState, useEffect, useCallback } from "react";
import StatsCard from "../addons/StatsCard";
import { GrNext, GrPrevious } from "react-icons/gr";

interface MetricCard {
    title: string;
    value: string;
    change: string;
    icon: any;
    forecast?: string;
}

interface MetricsSliderProps {
    cards: MetricCard[];
    cardWidth?: number;
    gap?: number;
}

const MetricsSlider: React.FC<MetricsSliderProps> = ({
    cards,
    cardWidth = 340,
    gap = 16
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [velocity, setVelocity] = useState(0);
    const [lastX, setLastX] = useState(0);
    const [lastTime, setLastTime] = useState(0);

    const checkScroll = useCallback(() => {
        if (!containerRef.current) return;
        
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        
        setShowLeftArrow(scrollLeft > 10);
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (!containerRef.current) return;
        
        const scrollAmount = cardWidth + gap;
        const newScrollLeft = containerRef.current.scrollLeft + 
            (direction === 'left' ? -scrollAmount : scrollAmount);
        
        containerRef.current.scrollTo({
            left: newScrollLeft,
            behavior: 'smooth'
        });
    };

    // Mouse handlers for desktop
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
        setVelocity(0);
        setLastX(e.pageX);
        setLastTime(Date.now());
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        e.preventDefault();
        
        const currentTime = Date.now();
        const currentX = e.pageX;
        const deltaX = currentX - lastX;
        const deltaTime = currentTime - lastTime;
        
        if (deltaTime > 0) {
            setVelocity(deltaX / deltaTime);
        }
        
        setLastX(currentX);
        setLastTime(currentTime);
        
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        if (!containerRef.current) return;
        
        // Apply momentum based on velocity
        if (Math.abs(velocity) > 0.5) {
            const momentumScroll = velocity * 100;
            containerRef.current.scrollLeft -= momentumScroll;
        }
        
        setIsDragging(false);
        setVelocity(0);
    };

    // Touch handlers for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        if (!containerRef.current) return;
        setIsDragging(true);
        setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
        setVelocity(0);
        setLastX(e.touches[0].pageX);
        setLastTime(Date.now());
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || !containerRef.current) return;
        e.preventDefault();
        
        const currentTime = Date.now();
        const currentX = e.touches[0].pageX;
        const deltaX = currentX - lastX;
        const deltaTime = currentTime - lastTime;
        
        if (deltaTime > 0) {
            setVelocity(deltaX / deltaTime);
        }
        
        setLastX(currentX);
        setLastTime(currentTime);
        
        const x = e.touches[0].pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
        if (!containerRef.current) return;
        
        // Apply momentum based on velocity
        if (Math.abs(velocity) > 0.5) {
            const momentumScroll = velocity * 100;
            containerRef.current.scrollLeft -= momentumScroll;
        }
        
        setIsDragging(false);
        setVelocity(0);
    };

    // Handle wheel scroll
    const handleWheel = (e: React.WheelEvent) => {
        if (!containerRef.current) return;
        
        // Prevent vertical scrolling
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
        }
        
        containerRef.current.scrollLeft += e.deltaY * 0.5;
    };

    useEffect(() => {
        checkScroll();
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
            
            // Prevent default touch behaviors
            container.addEventListener('touchmove', (e) => {
                if (isDragging) {
                    e.preventDefault();
                }
            }, { passive: false });
        }
        
        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScroll);
                container.removeEventListener('touchmove', (e) => {
                    if (isDragging) {
                        e.preventDefault();
                    }
                });
            }
            window.removeEventListener('resize', checkScroll);
        };
    }, [checkScroll, isDragging]);

    return (
        <div className="relative w-full px-0">
            {/* Left Arrow */}
            {showLeftArrow && (
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center hover:bg-foreground/5 transition-colors z-10"
                    aria-label="Scroll left"
                >
                    <GrPrevious className="w-4 h-4 text-primary-dark" />
                </button>
            )}

            {/* Scrollable Container */}
            <div
                ref={containerRef}
                className={`flex overflow-x-auto scrollbar-hide scroll-smooth py-1 px-1 select-none ${
                    isDragging ? 'cursor-grabbing' : 'cursor-grab'
                }`}
                style={{ 
                    gap: `${gap}px`,
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onWheel={handleWheel}
            >
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="shrink-0 select-none touch-pan-x"
                        style={{ width: `${cardWidth}px` }}
                    >
                        <StatsCard 
                            title={card.title}
                            value={card.value}
                            change={card.change}
                            icon={card.icon}
                            forecast={card.forecast}
                        />
                    </div>
                ))}
            </div>

            {/* Right Arrow */}
            {showRightArrow && (
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center hover:bg-foreground/5 transition-colors z-10"
                    aria-label="Scroll right"
                >
                    <GrNext className="w-4 h-4 text-primary-dark" />
                </button>
            )}

            {/* Hide scrollbar CSS */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                
                /* Add momentum scrolling for iOS */
                @supports (-webkit-overflow-scrolling: touch) {
                    .scrollbar-hide {
                        -webkit-overflow-scrolling: touch;
                    }
                }
            `}</style>
        </div>
    );
};

export default MetricsSlider;