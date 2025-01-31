import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { ROUTES } from "../constants/navigation.constants";
import { COLORS, FONT, SIZE } from "../constants/style.constants";
import { useCards } from "../hooks/data";
import { pluralize } from "../utils/text";

const styles = StyleSheet.create({
  general: {
    card: {
      borderRadius: SIZE.sm,
      padding: SIZE.lg,
      backgroundColor: "#d7d7d7",
      marginBottom: SIZE.lg,
    },
    title: {
      ...FONT.h3,
    },
  },
  even: {
    card: {
      backgroundColor: COLORS.highlight,
    },
    button: {
      backgroundColor: COLORS.main,
    },
    title: {
      color: COLORS.main,
    },
    buttonText: {
      color: COLORS.highlight,
    },
  },
  odd: {
    card: {
      backgroundColor: COLORS.main,
    },
    button: {
      backgroundColor: COLORS.highlight,
    },
    title: {
      color: COLORS.textLight,
    },
    buttonText: {
      color: COLORS.main,
    },
  },
});

function CategoryCard(category, even) {
  const navigation = useNavigation();
  const { name, id } = category;
  const cards = useCards(id);
  const customStyle = styles[even ? "even" : "odd"];

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(ROUTES.cards.name, { category })}
      style={styles.general.card}
      activeOpacity={0.5}
    >
      <Text style={styles.general.title}>{name}</Text>

      {!!cards.length && (
        <View style={[styles.button, customStyle.button]}>
          <Text style={[styles.buttonText, customStyle.buttonText]}>
            {pluralize({ noun: "Card", number: cards.length })}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default CategoryCard;
