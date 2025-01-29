import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ROUTES } from "../constants/navigation.constant";
import SignUp from "../screens/SignUp.screen";

const Stack = createStackNavigator();

function Navigation(params) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ROUTES.signUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
