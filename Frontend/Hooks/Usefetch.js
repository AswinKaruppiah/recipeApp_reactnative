import { useEffect, useState } from "react";
import axios from "axios";

const Usefetch = (url) => {
  const [data, setData] = useState();
  const [loading, setisLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchdata = async () => {
    setisLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
      setisLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    fetchdata();
  }, [url]);

  const refetch = () => {
    setisLoading(true);
    fetchdata();
  };

  return { data, loading, error, refetch };
};

export default Usefetch;
