import React, { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
// import { useUser } from "../hooks/useUser";
import { useUser } from "../hooks/auth";
import { StyleSheet, TextInput, View } from "react-native";
import { Button, FAB, Overlay } from "@rneui/base";
import { dbCategories } from "../api/db";
import { COLORS, COMPONENT, SIZE } from "../constants/style.constants";

const styles = StyleSheet.create({
  fab: {
    backgroundColor: COLORS.highlight,
    alignSelf: "flex-end",
    marginVertical: SIZE.lg,
  },
  overlay: {
    backgroundColor: COLORS.main,
    borderRadius: SIZE.sm,
    width: "80%",
    padding: SIZE.md,
  },
  input: {
    ...COMPONENT.input,
    borderBottomColor: COLORS.textLight,
    color: COLORS.textLight,
  },
  button: {},
  buttonTitle: {},
  close: {},
  closeTitle: {},
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
      <View style={styles.fabContainer}>
        <FAB
          icon={{ name: "add", color: COLORS.textLight }}
          style={styles.fab}
          buttonStyle={{
            backgroundColor: COLORS.highlight,
          }}
          onPress={show}
        />
      </View>

      <Overlay
        isVisible={visible}
        onBackdropPress={hide}
        overlayStyle={styles.overlay}
      >
        <View>
          <TextInput
            placeholder="Category name ..."
            onChangeText={setCategoryName}
            value={categoryName}
            style={styles.input}
          />
          <View>
            <Button
              title={"Add"}
              onPress={createNewCategory}
              disabled={!valid}
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

export default AddNewCategory;
