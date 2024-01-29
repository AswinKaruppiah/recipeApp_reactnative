import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { ApiContext } from "../context/Api";
import Box from "../Box/Box";

const History = ({ navigation }) => {
  const { localData, refreshing, getData, setrefreshing } =
    useContext(ApiContext);
  return (
    <SafeAreaView className="px-3 bg-white h-full py-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setrefreshing(true);
              getData();
              setrefreshing(false);
            }}
          />
        }
      >
        <View>
          <Text className="text-4xl py-6 font-PopRegular text-green-400 ">
            History's
          </Text>
          <View className="flex flex-row flex-wrap gap-3 justify-center items-center  mb-16">
            {localData && localData?.length != 0 ? (
              localData
                .slice(0)
                .reverse()
                .map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
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
                        className="h-80 w-full absolute top-0 rounded-3xl  opacity-70"
                        colors={["#000000", "transparent"]}
                      />
                      <Image
                        className="h-full w-full -z-10 object-cover "
                        source={{
                          uri: item.image_url,
                        }}
                      />

                      <Text className="text-xl absolute bottom-3 left-2 text-white font-Poplight">
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
    </SafeAreaView>
  );
};

export default History;
