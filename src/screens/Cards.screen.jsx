import React from "react";
import { useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import AddNewCard from "../components/AddNewCard";

function Cards() {
  const route = useRoute();
  const { category } = route.params;

  return (
    <View>
      <AddNewCard></AddNewCard>
      <Text>Category: {category.name}</Text>
    </View>
  );
}

export default Cards;
