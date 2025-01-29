import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

function Navigation(params) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ROUTES.signUp" component={} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
