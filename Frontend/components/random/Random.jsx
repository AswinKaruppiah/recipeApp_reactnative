import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect } from "react";

import { LinearGradient } from "expo-linear-gradient";
import { ApiContext } from "../context/Api";
import { apiUrl } from "../../constants/theme";

const Random = ({ navigation }) => {
  const {
    fetchdata,
    RandomData,
    loading,
    error,
    onRefresh,
    refreshing,
    storeData,
    getData,
  } = useContext(ApiContext);

  useEffect(() => {
    fetchdata(`${apiUrl}random`, "Random");
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
                onRefresh={() => onRefresh(`${apiUrl}random`, "Random")}
              />
            }
          >
            <View>
              <Text className="text-4xl py-6 font-PopRegular text-green-400 ">
                Random's
              </Text>
              <View className="flex flex-row flex-wrap gap-3 justify-center items-center  mb-16">
                {RandomData && RandomData?.length != 0 ? (
                  RandomData.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          storeData(item);
                          // navigation.navigate("details", { data: item });
                          navigation.push("home", {
                            screen: "details",
                            params: { data: item },
                          });
                        }}
                        className={`${
                          Number.isInteger(index / 5) ? "w-80" : "w-40"
                        } h-48 relative rounded-3xl flex-grow overflow-hidden `}
                      >
                        <LinearGradient
                          className="h-48 w-full absolute top-0 rounded-3xl opacity-70"
                          colors={["#000000", "transparent"]}
                        />
                        <Image
                          className="h-full w-full -z-10 object-cover "
                          source={{
                            uri: item.image_url,
                          }}
                        />
                        <Text className="text-white text-xl absolute bottom-3 left-2  font-Poplight">
                          {item.cuisine}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <Text className="text-base font-Poplight   text-center  ">
                    no Data
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default Random;
