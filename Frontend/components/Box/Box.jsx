import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { ApiContext } from "../context/Api";

const Box = ({ text, data, navigation }) => {
  const { storeData, getData } = useContext(ApiContext);
  return (
    <View>
      <Text className="text-2xl font-PopRegular mb-5 ">
        {text ? text : "Recipe's"}
      </Text>
      <View className="flex flex-row flex-wrap gap-3 justify-center items-center  mb-16">
        {data && data?.length != 0 ? (
          data.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  storeData(item);
                  // navigation.push("details", { data: item });
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
  );
};

export default Box;
