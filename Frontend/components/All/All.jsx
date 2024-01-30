import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { logo } from "../../assets";
import { SafeAreaView } from "react-native-safe-area-context";
import course from "../../assets/data/course.json";
import { useContext, useEffect } from "react";
import { ApiContext } from "../context/Api";
import Box from "../Box/Box";
import { Fe, apiUrl } from "../../constants/theme";

const All = ({ navigation }) => {
  const {
    fetchdata,
    AllData,
    loading,
    error,
    onRefresh,
    refreshing,
    activetab,
    setactivetab,
    shadow,
  } = useContext(ApiContext);

  useEffect(() => {
    fetchdata(`${Fe}random`, "All");
  }, []);

  return (
    <SafeAreaView className="px-3 bg-white h-full py-1">
      {loading ? (
        <View className=" h-screen  w-full">
          <ActivityIndicator
            size="large"
            className="m-auto left-0 right-0"
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
                    activetab === undefined
                      ? `${Fe}random`
                      : `${Fe}course/${activetab}`,
                    "All"
                  )
                }
              />
            }
          >
            <View className="flex flex-row justify-start items-center -ml-3 mt-2">
              <Image
                source={logo}
                className="h-14 w-14  object-contain -mt-2  rounded-full"
              />
              <Text className="text-4xl font-PopRegular text-green-400 ">
                Food Day
              </Text>
            </View>
            <FlatList
              data={course}
              renderItem={({ item, index }) => (
                <View className="py-4 ml-1 mr-1.5">
                  <TouchableOpacity
                    style={{
                      shadowColor: "black",
                      elevation: shadow(item.name),
                    }}
                    key={item.number}
                    className="-mr-0.5 bg-green-100 px-5 py-1 rounded-2xl  "
                    onPress={() => {
                      setactivetab(item.name);
                      fetchdata(`${Fe}course/${item.name}`, "All");
                    }}
                  >
                    <Text className="font-Poplight text-green-500  text-base">
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.number}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
            <Box
              text={activetab ? activetab : "Recipe's"}
              data={AllData}
              navigation={navigation}
            />
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default All;
