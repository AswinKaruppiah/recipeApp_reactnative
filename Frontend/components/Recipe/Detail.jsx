import { View, Text, Image, ScrollView, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/global";
import { useEffect, useRef } from "react";

function Detail(props) {
  let listViewRef;
  const { data } = props.route.params;
  const scrollA = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }, []);

  return (
    <SafeAreaView className=" bg-white h-full">
      <Animated.ScrollView
        ref={scrollRef}
        className="h-full"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          { useNativeDriver: true }
        )}
      >
        <View style={styles.bannerContainer}>
          <Animated.Image
            style={styles.banner(scrollA)}
            source={{
              uri: data.image_url,
            }}
          />
        </View>
        <View className="rounded-t-3xl p-5 -top-20 bg-white h-full ">
          <View>
            <Text className="text-lg   font-PopRegular ">
              {data?.name || "No info"}
            </Text>
            <View className="flex flex-row  justify-start  items-center  py-3 flex-wrap gap-2 ">
              <Text className="text-xs font-Poplight bg-green-100 rounded-3xl   py-1 px-2 text-green-600">
                {data?.cuisine || "No info"}
              </Text>
              <Text className="text-xs font-Poplight bg-green-100 rounded-3xl   py-1 px-2 text-green-600">
                {data?.course || "No info"}
              </Text>
              <Text className="text-xs font-Poplight bg-green-100 rounded-3xl   py-1  px-2 text-green-600">
                {data?.diet || "No info"}
              </Text>
            </View>
            <Text className="text-sm font-Poplight ">
              {data?.description || "No info"}
            </Text>
            <Text className="text-lg font-PopRegular py-4">Ingredients</Text>
            <View className="flex flex-row justify-start  items-center   flex-wrap gap-2  ">
              {data.ingredients_name &&
              data.ingredients_name.split(",").length === 0 ? (
                <Text key={index} className="text-sm font-Poplight     ">
                  No info
                </Text>
              ) : (
                data.ingredients_name.split(",").map((item, index) => (
                  <Text
                    key={index}
                    className="text-sm font-Poplight  text-green-600 bg-green-100 rounded-3xl   py-1  px-2"
                  >
                    {item || "No info"}
                  </Text>
                ))
              )}
            </View>
            <Text className="text-lg font-PopRegular py-2">Quantity</Text>
            <View className=" justify-start  items-start  ">
              {data.ingredients_quantity &&
              data.ingredients_quantity.split(",").length === 0 ? (
                <Text key={index} className="text-sm font-Poplight     ">
                  No info
                </Text>
              ) : (
                data.ingredients_quantity.split(",").map((item, index) => (
                  <Text key={index} className="text-sm  pb-2 font-Poplight">
                    {`\u2022 ${item || "No info"}`}
                  </Text>
                ))
              )}
            </View>
          </View>
          <Text className="text-lg font-PopRegular py-4">Instructions</Text>
          <View>
            {data.instructions && data.instructions.split(".").length === 0 ? (
              <Text key={index} className="text-sm font-Poplight     ">
                No info
              </Text>
            ) : (
              data.instructions.split(".").map((item, index) =>
                item === "" ? null : (
                  <View
                    key={index}
                    className="bg-white py-4 px-3 mb-3 rounded-md"
                    style={{
                      elevation: 10,
                    }}
                  >
                    <Text className="text-sm pb-1 font-PopRegular">
                      Step {index + 1}
                    </Text>

                    <Text className="text-sm  font-Poplight">
                      {item || "No info"}
                    </Text>
                  </View>
                )
              )
            )}
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

export default Detail;
