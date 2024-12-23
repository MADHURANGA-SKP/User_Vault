import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./core/theme";
import { UserProvider } from "./context/AppContext";
import { WelcomeScreen , HomeScreen , EditFromScreen , UserDetailScreen , InputUserScreen} from "./screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <Provider theme={theme}> 
        <Stack.Navigator
          initialRouteName="WelcomeScreen"
          options={{ headerShown: false}}
          
        >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="EditFromScreen" component={EditFromScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="UserDetailScreen" component={UserDetailScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="InputUserScreen" component={InputUserScreen}  options={{ headerShown: false }}/>
      </Stack.Navigator>
      </Provider>
    </UserProvider>
  );
}