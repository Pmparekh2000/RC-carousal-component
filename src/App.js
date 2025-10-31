import logo from "./logo.svg";
import "./App.css";
import Carousal from "./components/Carousal";
import { useEffect, useRef, useState } from "react";
import useFetchData from "./hooks/useFetchData";
import { PHOTOS_API } from "./utils/constants";

function App() {
  const [photosData, setPhotosData] = useState([]);

  const {
    data: apiPhotosData,
    isLoading,
    error,
  } = useFetchData(`${PHOTOS_API}?limit=8`);

  useEffect(() => {
    setPhotosData(
      apiPhotosData?.products?.map((product) => {
        return {
          id: product?.id,
          title: product?.title,
          thumbnail: product?.thumbnail,
        };
      })
    );
  }, [apiPhotosData]);

  return (
    <div className="carousal-container">
      <Carousal
        images={photosData}
        error={error}
        isLoading={isLoading}
        imageLimit={4}
        customPrevButton={(onClick) => (
          <buton
            className="btn prev"
            style={{ background: "red" }}
            onClick={onClick}
          >
            Prev
          </buton>
        )}
        customNextButton={(onClick) => (
          <buton className="btn next" onClick={onClick}>
            Next
          </buton>
        )}
        onImageClick={(image, index) => {}}
        imagesPerSlide={3}
      />
    </div>
  );
}

export default App;
