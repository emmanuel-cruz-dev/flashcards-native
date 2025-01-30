import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { useModal } from "../hooks/useModal";

function CardItem({ card }) {
  const [visible, toggle] = useModal(true);
  const { front, back, detail } = card;

  return (
    <TouchableOpacity onPress={toggle}>
      {visible ? (
        <Text>{front}</Text>
      ) : (
        <>
          <Text>{back}</Text>
          <Text>{detail}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

export default CardItem;
