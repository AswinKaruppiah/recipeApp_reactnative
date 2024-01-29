import { Text, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import All from "../All/All";
import History from "../history/History";
import Search from "../search/Search";
import Random from "../random/Random";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Detail from "../Recipe/Detail";

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#57CC99",
        tabBarStyle: {
          elevation: 10,
          shadowColor: "#000000",
          backgroundColor: "white",
          borderTopWidth: 0,
          height: 60,
          zIndex: 100,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          marginLeft: 5,
          marginRight: 5,
          marginBottom: 15,
          bottom: 0,
          position: "absolute",
        },
      }}
    >
      <Tab.Screen
        name="all"
        component={All}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                className={`${
                  focused ? "bg-[#CFFDE1]" : "bg-transparent"
                }  rounded-full p-3 `}
              >
                <AntDesign name="home" color={color} size={24} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View
              className={`${
                focused ? "bg-[#CFFDE1]" : "bg-transparent"
              }  rounded-full p-3`}
            >
              <AntDesign name="search1" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="random"
        component={Random}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View
              className={`${
                focused ? "bg-[#CFFDE1]" : "bg-transparent"
              }  rounded-full p-3`}
            >
              <AntDesign name="appstore-o" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View
              className={`${
                focused ? "bg-[#CFFDE1]" : "bg-transparent"
              }  rounded-full p-3`}
            >
              <MaterialIcons name="history" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="details"
        component={Detail}
        options={{
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
