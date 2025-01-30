import { Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useModal } from "../hooks/useModal";

function CardItem(card) {
  const { visible, toggle, show } = useModal(true);
  const { front, back, detail } = card;

  useEffect(() => {
    show();
  }, [card]);

  return (
    <TouchableOpacity
      onPress={toggle}
      activeOpacity={0.5}
      style={{ backgroundColor: "#f1aab2" }}
    >
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
