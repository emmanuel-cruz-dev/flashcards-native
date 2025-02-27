import { Text, TouchableHighlight, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useModal } from "../hooks/useModal";
import { COLORS, FONT, SIZE } from "../constants/style.constants";

const styles = StyleSheet.create({
  card: {
    height: 300,
    backgroundColor: COLORS.main,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZE.sm,
    marginBottom: SIZE.lg,
  },
  title: {
    ...FONT.h3,
    textAlign: "center",
    color: COLORS.textLight,
  },
  sub: {
    ...FONT.sub,
    marginTop: SIZE.sm,
    textAlign: "center",
    color: COLORS.detail,
  },
});

function CardItem(card) {
  const { visible, toggle, show } = useModal(true);
  const { front, back, detail } = card;

  useEffect(() => {
    show();
  }, [card]);

  return (
    <TouchableHighlight
      underlayColor={COLORS.mainDarker}
      onPress={toggle}
      activeOpacity={0.5}
      style={styles.card}
    >
      {visible ? (
        <Text style={styles.title}>{front}</Text>
      ) : (
        <>
          <Text style={styles.title}>{back}</Text>
          <Text style={styles.sub}>{detail}</Text>
        </>
      )}
    </TouchableHighlight>
  );
}

export default CardItem;
