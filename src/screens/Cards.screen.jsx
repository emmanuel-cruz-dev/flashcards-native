import React, { useCallback, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Text, View, StyleSheet } from "react-native";
import AddNewCard from "../components/AddNewCard";
import { useCards } from "../hooks/data";
import { Button } from "@rneui/base";
import CardItem from "../components/CardItem";
import { pluralize } from "../utils/text";
import { FONT } from "../constants/style.constants";

const styles = StyleSheet.create({
  h2: { ...FONT.h2 },
  sub: { ...FONT.sub },
});

function Cards() {
  const route = useRoute();
  const { category } = route.params;
  const cards = useCards(category.id);
  const [active, setActive] = useState(null);

  const showNewCard = useCallback(() => {
    setActive((prev) => {
      let newId;
      do {
        newId = cards[Math.floor(Math.random() * cards.length)].id;
      } while (newId && newId === prev);

      return newId;
    });
  }, [cards]);

  useEffect(() => {
    if (active) return;
    if (!cards.length) return;

    if (cards.length === 1) setActive(cards[0].id);
    else showNewCard();
  }, [cards]);

  const activeCard = cards.find((card) => card.id === active);

  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.h2}>{category.name}</Text>
        <Text style={styles.sub}>
          {pluralize({ quantity: cards.length, text: "Card" })}
        </Text>
      </View>

      <AddNewCard></AddNewCard>
      <Text>Category: {category.name}</Text>

      {!cards.length && <Text>Try adding a new card</Text>}
      {/* {active && <Text>{activeCard.front}</Text>} */}
      {!!active && <CardItem card={activeCard} />}

      <Button
        title={"Choose new"}
        onPress={showNewCard}
        disabled={cards.length < 2}
      />
    </View>
  );
}

export default Cards;
