import { View, TextInput } from "react-native";
import React, { useState } from "react";
import { FAB, Overlay } from "@rneui/base";
import { useModal } from "../hooks/useModal";

const baseState = () => ({
  front: "",
  back: "",
  detail: "",
});

function AddNewCard() {
  const { visible, show, hide } = useModal();
  const [form, setForm] = useState(baseState());

  return (
    <View>
      <FAB icon="add" buttonStyle={{ backgroundColor: "red" }} onPress={show} />

      <Overlay
        isVisible={visible}
        onBackdropPress={hide}
        overlayStyle={{ backgroundColor: "white" }}
      >
        <View>
          <TextInput placeholder="Front ..." onChangeText={setForm} />
          <TextInput placeholder="Back ..." onChangeText={setForm} />
          <TextInput placeholder="Detail ..." onChangeText={setForm} />
        </View>
      </Overlay>
    </View>
  );
}

export default AddNewCard;
