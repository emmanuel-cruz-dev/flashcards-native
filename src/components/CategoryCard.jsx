import React from "react";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Button } from "@rneui/base";
import { ROUTES } from "../constants/navigation.constants";
import { COLORS, COMPONENT, FONT, SIZE } from "../constants/style.constants";
import { useCards } from "../hooks/data";
import { pluralize } from "../utils/text";

const styles = StyleSheet.create({
  card: {
    borderRadius: SIZE.sm,
    padding: SIZE.lg,
    backgroundColor: "#d7d7d7",
    marginBottom: SIZE.lg,
  },
  title: {
    ...FONT.h3,
  },
  button: {
    ...COMPONENT.button,
    width: "auto",
    paddingHorizontal: SIZE.lg,
    alignSelf: "flex-end",
    marginTop: SIZE.lg,
  },
  buttonTitle: {
    ...COMPONENT.button.title,
  },

  even: {
    opacity: COLORS.highlightDarker,
    card: {
      backgroundColor: COLORS.highlight,
    },
    title: {
      color: COLORS.main,
    },
    button: {
      ...COMPONENT.button.main.button,
    },
    buttonTitle: {
      ...COMPONENT.button.main.title,
    },
  },
  odd: {
    opacity: COLORS.mainDarker,
    card: {
      backgroundColor: COLORS.main,
    },
    title: {
      color: COLORS.textLight,
    },
    button: {
      ...COMPONENT.button.highlight.button,
    },
    buttonTitle: {
      ...COMPONENT.button.highlight.title,
      color: COLORS.main,
    },
  },
});

function CategoryCard({ category, even }) {
  const navigation = useNavigation();
  const { name, id } = category;
  const cards = useCards(id);
  const cardStyle = styles[even ? "even" : "odd"];

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(ROUTES.cards.name, { category })}
      style={[styles.card, cardStyle.card]}
      activeOpacity={0.8}
    >
      <Text style={[styles.title, cardStyle.title]}>{name}</Text>

      {!!cards.length && (
        <Button
          buttonStyle={[styles.button, cardStyle.button]}
          titleStyle={[styles.buttonTitle, cardStyle.buttonTitle]}
          title={pluralize({ quantity: cards.length, text: "Card" })}
        />
      )}
    </TouchableOpacity>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.object.isRequired,
  even: PropTypes.bool,
};

export default CategoryCard;
