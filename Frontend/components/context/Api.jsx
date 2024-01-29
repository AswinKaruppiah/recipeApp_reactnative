/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ApiContext = React.createContext();

export const Apiprovider = ({ children }) => {
  const [AllData, setAllData] = useState();
  const [RandomData, setRandomData] = useState();
  const [SearchData, setSearchData] = useState();
  const [loading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refreshing, setrefreshing] = useState(false);
  const [activetab, setactivetab] = useState();
  const [value, setvalue] = useState();
  const [recenttext, setrecenttext] = useState([]);
  const [title, settitle] = useState();
  const [localData, setlocalData] = useState([]);

  const fetchdata = async (url, page) => {
    setisLoading(true);
    try {
      const res = await axios.get(url);

      switch (page) {
        case "All":
          return setAllData(res.data);

        case "Search":
          return setSearchData(res.data);

        case "Random":
          return setRandomData(res.data);
      }

      setisLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setisLoading(false);
    }
  };

  const onRefresh = async (url, page) => {
    setrefreshing(true);
    fetchdata(url, page);
    setrefreshing(false);
  };

  function shadow(text) {
    return activetab === text ? 10 : 0;
  }

  const handle = async () => {
    if (!value) {
      return alert("no data");
    } else {
      await fetchdata(`${base_url}search/${value}`, "Search");
      setrecenttext((pre) => [...pre, value]);
      settitle(value);
      setvalue("");
    }
  };

  function deletetab(text) {
    setrecenttext((pre) => {
      return pre.filter((tag) => tag !== text);
    });
  }

  function empty() {
    settitle("Popular Search");
    return `${base_url}random`;
  }

  function shallowEqualityCheck(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }

  const storeData = async (text) => {
    if (localData.some((item) => shallowEqualityCheck(item, text))) {
      return console.log("Already exist");
    } else {
      localData.push(text);
      try {
        await AsyncStorage.setItem("id", JSON.stringify(localData));
        getData();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const getData = async () => {
    try {
      setlocalData(
        (await AsyncStorage.getItem("id")) != null
          ? JSON.parse(await AsyncStorage.getItem("id"))
          : []
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ApiContext.Provider
      value={{
        fetchdata,
        RandomData,
        AllData,
        SearchData,
        loading,
        error,
        onRefresh,
        refreshing,
        activetab,
        setactivetab,
        shadow,
        value,
        setvalue,
        title,
        settitle,
        recenttext,
        setrecenttext,
        handle,
        deletetab,
        empty,
        setrefreshing,
        localData,
        storeData,
        getData,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
