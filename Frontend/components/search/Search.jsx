import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Box from "../Box/Box";
import { AntDesign } from "@expo/vector-icons";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";

import { useContext } from "react";
import { ApiContext } from "../context/Api";
import { Fe } from "../../constants/theme";

const Search = ({ navigation }) => {
  const {
    fetchdata,
    loading,
    SearchData,
    error,
    onRefresh,
    refreshing,
    value,
    setvalue,
    recenttext,
    setrecenttext,
    title,
    settitle,
    handle,
    deletetab,
    empty,
  } = useContext(ApiContext);

  useEffect(() => {
    fetchdata(`${Fe}random`, "Search");
  }, []);

  return (
    <SafeAreaView className="px-3 bg-white h-full py-1">
      {loading ? (
        <View className="relative h-screen w-full">
          <ActivityIndicator
            size="large"
            className="aabsolute m-auto left-0 right-0"
            color={"black"}
          />
        </View>
      ) : error ? (
        <Text>Something went Wrong</Text>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() =>
                  onRefresh(
                    recenttext[0] === undefined
                      ? empty()
                      : title === undefined
                      ? `${Fe}random`
                      : `${Fe}search/${title}`,
                    "Search"
                  )
                }
              />
            }
          >
            <View className="py-5">
              <Text className="text-4xl font-PopRegular text-green-400 ">
                Search
              </Text>

              <View className="pt-5 flex flex-row  w-full">
                <TextInput
                  className="flex-1  text-lg  font-Poplight border-b-2  border-green-400 "
                  placeholder="Search Recipe's"
                  onChangeText={(text) => {
                    setvalue(text);
                  }}
                  onSubmitEditing={handle}
                  value={value}
                />
                <TouchableOpacity
                  onPress={handle}
                  className="bg-green-400 py-4 px-4 ml-1 rounded-full justify-center items-center"
                >
                  <AntDesign name="search1" size={24} color={"white"} />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text className="text-xl font-PopRegular  ">Recent Search</Text>
              <View className="py-6 flex flex-row gap-2 flex-wrap justify-start  items-center">
                {recenttext && recenttext.length != 0 ? (
                  recenttext.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={async () => {
                          await fetchdata(
                            `${Fe}search/${
                              recenttext[recenttext.length - 1 - index]
                            }`,
                            "Search"
                          ).then(() =>
                            settitle(recenttext[recenttext.length - 1 - index])
                          );
                        }}
                        key={index}
                        className="flex flex-row  px-2 py-1 justify-center items-center rounded-full bg-green-100"
                      >
                        <Text className="text-base font-Poplight  mr-1  text-green-400">
                          {recenttext[recenttext.length - 1 - index]}
                        </Text>
                        <MaterialIcons
                          onPress={() =>
                            deletetab(recenttext[recenttext.length - 1 - index])
                          }
                          name="remove-circle-outline"
                          size={20}
                          color="#57CC99"
                        />
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <Text className="text-base font-Poplight w-full  text-center ">
                    No Recent Search History
                  </Text>
                )}
              </View>
            </View>
            <Box
              text={title ? title : "Popular Search"}
              data={SearchData}
              navigation={navigation}
            />
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default Search;
