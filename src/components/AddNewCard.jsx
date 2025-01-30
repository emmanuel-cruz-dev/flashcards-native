import { View, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { Button, FAB, Overlay } from "@rneui/base";
import { useModal } from "../hooks/useModal";

const baseState = () => ({
  front: "",
  back: "",
  detail: "",
});

function AddNewCard() {
  const { visible, show, hide } = useModal();
  const [form, setForm] = useState(baseState());

  const addNewCard = () => {
    Alert.alert(form.back, form.front, form.detail);
  };

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

          <View>
            <Button title={"Add"} onPress={addNewCard} />
            <Button title={"Close"} onPress={hide} />
          </View>
        </View>
      </Overlay>
    </View>
  );
}

export default AddNewCard;
