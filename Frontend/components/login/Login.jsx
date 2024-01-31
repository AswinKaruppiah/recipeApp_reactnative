import { Image, Text, View, TouchableOpacity } from "react-native";
import { logo } from "../../assets";
import styles from "../../styles/global";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.center} className="h-full relative">
      <View className="absolute bottom-10  ">
        <Image source={logo} className="h-80 w-80 -mb-10  object-contain " />
        <View className="flex flex-col justify-center items-center">
          <Text className="text-3xl font-PopMedium  pb-5">
            Your <Text className="text-green-500">Recipe Haven</Text> Awaits
            Exploration!
          </Text>
          <Text className="text-sm pb-7 text-center leading-5 font-Poplight">
            Dive into deliciousness with Recipe App – your culinary inspiration!
            Let the cooking adventures begin
          </Text>
          <TouchableOpacity
            className="  rounded-full  py-5  bg-green-200 w-full "
            onPress={() => navigation.navigate("home")}
          >
            <Text className=" text-base text-green-800  text-center   font-PopRegular">
              Let's Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
