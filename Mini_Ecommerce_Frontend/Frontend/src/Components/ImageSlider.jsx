import { useEffect, useState } from 'react';


const ImageSlider = () => {
  const sliderImages = [
    "/assets/Slides/1.jpg",
    "/assets/Slides/2.jpg",
    "/assets/Slides/3.jpg",
    "/assets/Slides/4.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev =>
        prev === sliderImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
          <div className="relative w-screen overflow-hidden">
            <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
                transform: `translateX(-${currentIndex * 100}vw)`
            }}
            >
            {sliderImages.map((image, index) => (
                <div key={index} className="w-screen  flex-shrink-0">
                <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-contain"
                />
                </div>
            ))}
            </div>
        </div>
  )
}

export default ImageSlider