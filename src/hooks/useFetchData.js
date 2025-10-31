import { useEffect, useState } from "react";

const useFetchData = (API_LINK, ...args) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async (API_LINK) => {
    setIsLoading(true);
    setError(null);
    try {
      const readableStream = await fetch(API_LINK);
      if (!readableStream.ok) {
        // Checking for HTTP error 4XX and 5XX
        throw new Error(`HTTP error! status: ${readableStream.status}`);
      }
      const data = await readableStream.json();
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData(API_LINK);
  }, [...args]);

  return { data, isLoading, error };
};

export default useFetchData;
