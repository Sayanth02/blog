const HeroCarouselSkeleton = () => {
  return (
    <div className="w-full px-4 md:px-8 lg:px-16 pt-8">
      {/* Main Carousel Skeleton */}
      <div className="h-[500px] md:h-[600px] w-full bg-neutral-200 rounded-3xl overflow-hidden animate-pulse" />

      {/* Navigation Controls Skeleton */}
      <div className="flex items-center justify-center gap-6 mt-6">
        {/* Previous Button */}
        <div className="w-10 h-10 rounded-full bg-neutral-200 animate-pulse shrink-0" />

        {/* Pagination Dots */}
        <div className="flex gap-2 items-center">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-neutral-200 animate-pulse"
            />
          ))}
        </div>

        {/* Next Button */}
        <div className="w-10 h-10 rounded-full bg-neutral-200 animate-pulse shrink-0" />
      </div>
    </div>
  );
};

export default HeroCarouselSkeleton;
