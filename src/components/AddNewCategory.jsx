import React, { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
// import { useUser } from "../hooks/useUser";
import { useUser } from "../hooks/auth";
import { StyleSheet, TextInput, View } from "react-native";
import { Button, FAB, Overlay } from "@rneui/base";
import { dbCategories } from "../api/db";

const styles = StyleSheet.create({
  fab: {},
  overlay: {},
  input: {},
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
      <FAB icon="add" buttonStyle={styles.fab} onPress={show} />

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
