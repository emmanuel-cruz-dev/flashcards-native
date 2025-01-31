import React, { FC } from "react";
import { Text, View, StyleSheet } from "react-native";

type TCard = {
  full: string;
  short: string;
};

export interface CardProps {
  card: TCard;
}

const styles = StyleSheet.create({
  container: {},
  front: {},
  back: {},
});

const Card: FC<CardProps> = ({ card }) => {
  const { full, short } = card;

  return (
    <View style={styles.container}>
      <View style={styles.front}>
        <Text>{short}</Text>
      </View>
      <View style={styles.back}>
        <Text>{full}</Text>
      </View>
    </View>
  );
};

export default Card;
