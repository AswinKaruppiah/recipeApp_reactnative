import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "../components/login/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../components/home/Home";
import { Apiprovider } from "../components/context/Api";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

function Index() {
  const [fontsloaded] = useFonts({
    PopLight: require("../assets/fonts/Poppins-Light.ttf"),
    PopRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PopMedium: require("../assets/fonts/Poppins-Medium.ttf"),
  });
  const OnlayoutRootView = useCallback(async () => {
    if (fontsloaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsloaded]);
  if (!fontsloaded) {
    return null;
  }
  return (
    <Apiprovider>
      <SafeAreaProvider onLayout={OnlayoutRootView}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: "white",
              },
            }}
          >
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Apiprovider>
  );
}

export default Index;
