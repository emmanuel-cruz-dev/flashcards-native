import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import AddNewCard from "../components/AddNewCard";
import { useCards } from "../hooks/data";
import { Button } from "@rneui/base";

function Cards() {
  const route = useRoute();
  const { category } = route.params;
  const cards = useCards(category.id);
  const [active, setActive] = useState(null);

  const showNewCard = () => {};

  useEffect(() => {
    if (!cards.length) return;
    if (cards.length === 1) setActive(cards[0].id);
  }, [cards]);

  const activeCard = cards.find((card) => card.id === active);

  return (
    <View>
      <AddNewCard></AddNewCard>
      <Text>Category: {category.name}</Text>

      {!cards.length && <Text>Try adding a new card</Text>}
      {active && <Text>{activeCard.front}</Text>}

      <Button title={"Choose new"} onPress={showNewCard} />
    </View>
  );
}

export default Cards;
