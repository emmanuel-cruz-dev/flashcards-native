import { View, TextInput } from "react-native";
import React from "react";
import { FAB, Overlay } from "@rneui/base";

function AddNewCard() {
  return (
    <View>
      <FAB icon="add" buttonStyle={{ backgroundColor: "red" }} />

      <Overlay>
        <View>
          <TextInput placeholder="Card" />
        </View>
      </Overlay>
    </View>
  );
}

export default AddNewCard;
