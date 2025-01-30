import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import AddNewCard from "../components/AddNewCard";
import { useCards } from "../hooks/data";

function Cards() {
  const route = useRoute();
  const { category } = route.params;
  const cards = useCards(category.id);
  const [activeCard, setActiveCard] = useState(null);

  return (
    <View>
      <AddNewCard></AddNewCard>
      <Text>Category: {category.name}</Text>

      {cards.map((card) => (
        <Text key={card.id}>{card.front}</Text>
      ))}
    </View>
  );
}

export default Cards;
