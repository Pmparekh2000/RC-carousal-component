import React, { useEffect, useRef, useState } from "react";

const Carousal = ({
  images = [],
  error = null,
  isLoading = false,
  imageLimit = images.length,
  customPrevButton,
  customNextButton,
  onImageClick = () => {},
  imagesPerSlide = 1,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRef = useRef(null);
  const [imageWidth, setImageWidth] = useState(0);

  useEffect(() => {
    if (images?.length > 0) {
      setCurrentImageIndex(0);
    }
  }, [images]);

  const goToPrev = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images?.length) % images?.length
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images?.length);
  };

  if (isLoading) {
    return <div>Loading from API</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="carousal" style={{ width: imagesPerSlide * imageWidth }}>
      <div
        className="image-container"
        style={{
          transform: `translateX(-${currentImageIndex * imageWidth}px)`,
        }}
      >
        {images
          ?.slice(0, imageLimit > images.length ? images.length : imageLimit)
          .map((image, index) => {
            return (
              <img
                key={image?.id}
                src={image?.thumbnail}
                onImageClick={() => onImageClick(image, index)}
                alt={image?.title}
                className="image"
                onLoad={() => setImageWidth(imageRef?.current?.offsetWidth)}
                ref={imageRef}
              />
            );
          })}
      </div>
      {customPrevButton instanceof Function ? (
        customPrevButton(goToPrev)
      ) : (
        <button className="btn prev" onClick={goToPrev}>
          Prev
        </button>
      )}
      {customNextButton instanceof Function ? (
        customNextButton(goToNext)
      ) : (
        <button className="btn next" onClick={goToNext}>
          Next
        </button>
      )}
    </div>
  );
};

export default Carousal;
