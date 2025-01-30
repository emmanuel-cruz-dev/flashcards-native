import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ROUTES } from "../constants/navigation.constants";
import SignUp from "../screens/SignUp.screen";
import Login from "../screens/Login.screen";

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTES.signUp} component={SignUp} />
        <Stack.Screen name={ROUTES.login} component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
