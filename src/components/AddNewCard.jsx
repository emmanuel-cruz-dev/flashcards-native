import { View, TextInput } from "react-native";
import React from "react";
import { Button, FAB, Overlay } from "@rneui/base";
import { useModal } from "../hooks/useModal";
import { useForm } from "../hooks/useForm";
import { dbCards } from "../api/db";
import { useUser } from "../hooks/auth";
import { useRoute } from "@react-navigation/native";

const baseState = () => ({
  front: "",
  back: "",
  detail: "",
});

function AddNewCard() {
  const [user] = useUser();
  const { visible, show, hide } = useModal();
  const [form, setForm] = useForm(baseState());
  const route = useRoute();

  const addNewCard = () => {
    dbCards.add({
      ...form,
      userId: user.uid,
      categoryId: route.params.category.id,
    });
    hide();
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
          <TextInput
            value={form.front}
            placeholder="Front ..."
            onChangeText={(value) => setForm({ key: "front", value })}
          />
          <TextInput
            value={form.back}
            placeholder="Back ..."
            onChangeText={(value) => setForm({ key: "back", value })}
          />
          <TextInput
            value={form.detail}
            placeholder="Detail ..."
            onChangeText={(value) => setForm({ key: "detail", value })}
          />

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
