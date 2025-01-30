import React, { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
// import { useUser } from "../hooks/useUser";
import { useUser } from "../hooks/auth";
import { TextInput, View } from "react-native";
import { Button, FAB, Overlay } from "@rneui/base";
import { dbCategories } from "../api/db";

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
      <FAB icon="add" buttonStyle={{ backgroundColor: "red" }} onPress={show} />

      <Overlay
        isVisible={visible}
        onBackdropPress={hide}
        overlayStyle={{ backgroundColor: "white" }}
      >
        <View>
          <TextInput
            placeholder="Category name ..."
            onChangeText={setCategoryName}
            value={categoryName}
          />
          <View>
            <Button
              title={"Add"}
              onPress={createNewCategory}
              disabled={!valid}
            />
            <Button title={"Close"} onPress={hide} />
          </View>
        </View>
      </Overlay>
    </View>
  );
}

export default AddNewCategory;
