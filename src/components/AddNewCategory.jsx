import React, { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
// import { useUser } from "../hooks/useUser";
import { useUser } from "../hooks/auth";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button, FAB, Overlay } from "@rneui/base";
import { dbCategories } from "../api/db";
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
  input: {
    ...COMPONENT.input,
    borderBottomColor: COLORS.textLight,
    color: COLORS.textLight,
    marginBottom: SIZE.lg,
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
});

function AddNewCategory() {
  const [user] = useUser();
  const { visible, show, hide } = useModal();
  const [categoryName, setCategoryName] = useState("");
  const [valid, setValid] = useState(false);

  const createNewCategory = () => {
    dbCategories.add({
      name: categoryName,
      userId: user.uid,
    });
    hide();
  };

  useEffect(() => {
    setValid(categoryName.length >= 3);
  }, [categoryName]);

  return (
    <View>
      <FAB
        icon={{ name: "add", color: COLORS.textLight }}
        style={styles.fab}
        buttonStyle={{
          backgroundColor: COLORS.highlight,
        }}
        onPress={show}
      />

      <Overlay
        visible={visible}
        onBackdropPress={hide}
        overlayStyle={styles.overlay}
      >
        <View>
          <Text style={styles.title}>New category</Text>
          <TextInput
            placeholder="Category name ..."
            onChangeText={setCategoryName}
            placeholderTextColor={COLORS.detailLight}
            value={categoryName}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <Button
              title={"Close"}
              onPress={hide}
              buttonStyle={styles.close}
              titleStyle={styles.closeTitle}
            />
            <Button
              title={"Add"}
              onPress={createNewCategory}
              disabled={!valid}
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
            />
          </View>
        </View>
      </Overlay>
    </View>
  );
}

export default AddNewCategory;
