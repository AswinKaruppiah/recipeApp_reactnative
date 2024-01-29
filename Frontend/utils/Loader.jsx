import { Text, View, ActivityIndicator } from "react-native";

function Loader() {
  return (
    <View className="relative h-screen w-full">
      <ActivityIndicator
        size="large"
        className="absolute bottom-60"
        color={"black"}
      />
    </View>
  );
}

export default Loader;
