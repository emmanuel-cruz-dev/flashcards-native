import { View, TextInput, StyleSheet, Text } from "react-native";
import React from "react";
import { Button, FAB, Overlay } from "@rneui/base";
import { useModal } from "../hooks/useModal";
import { useForm } from "../hooks/useForm";
import { dbCards } from "../api/db";
import { useUser } from "../hooks/auth";
import { useRoute } from "@react-navigation/native";
import { COLORS, COMPONENT, FONT, SIZE } from "../constants/style.constants";

const styles = StyleSheet.create({
  fab: {
    backgroundColor: COLORS.highlight,
    alignSelf: "flex-end",
    marginBottom: SIZE.lg,
  },
  overlay: {
    ...COMPONENT.dialog,
  },
  title: {
    ...FONT.h3,
    color: COLORS.textLight,
    marginBottom: SIZE.lg,
  },
  inputContainer: {
    marginBottom: SIZE.md,
  },
  input: {
    ...COMPONENT.input,
    borderBottomColor: COLORS.textLight,
    color: COLORS.textLight,
    marginBottom: SIZE.md,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    ...COMPONENT.button,
    ...COMPONENT.button.highlight.button,
    width: "auto",
  },
  buttonTitle: {
    ...COMPONENT.button.title,
    ...COMPONENT.button.highlight.title,
  },
  close: {
    ...COMPONENT.button,
    backgroundColor: "transparent",
    width: "auto",
    padding: 0,
  },
  closeTitle: {},
});

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
      <FAB
        icon={{ name: "add", color: COLORS.textLight }}
        style={styles.fab}
        buttonStyle={{ backgroundColor: COLORS.highlight }}
        onPress={show}
      />

      <Overlay
        isVisible={visible}
        onBackdropPress={hide}
        overlayStyle={styles.overlay}
      >
        <View>
          <Text style={styles.title}>New card</Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor={COLORS.detailLight}
              style={styles.input}
              value={form.front}
              placeholder="Front ..."
              onChangeText={(value) => setForm({ key: "front", value })}
            />
            <TextInput
              placeholderTextColor={COLORS.detailLight}
              style={styles.input}
              value={form.back}
              placeholder="Back ..."
              onChangeText={(value) => setForm({ key: "back", value })}
            />
            <TextInput
              placeholderTextColor={COLORS.detailLight}
              style={styles.input}
              value={form.detail}
              placeholder="Detail ..."
              onChangeText={(value) => setForm({ key: "detail", value })}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={"Add"}
              onPress={addNewCard}
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
            />
            <Button
              title={"Close"}
              onPress={hide}
              buttonStyle={styles.close}
              titleStyle={styles.closeTitle}
            />
          </View>
        </View>
      </Overlay>
    </View>
  );
}

export default AddNewCard;
