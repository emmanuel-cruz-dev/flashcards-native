import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AddCategory from "../components/AddCategory";
import CategoryCard from "../components/CategoryCard";
import { FONT, SIZE } from "../constants/style.constants";
import { useCategories } from "../hooks/data";
import UserInfo from "../wrappers/UserInfo";
import AddNewCategory from "../components/AddNewCategory";

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: SIZE.lg,
  },
  title: { ...FONT.h2 },
  sub: { ...FONT.sub },
});

function Categories() {
  const categories = useCategories();

  return (
    <UserInfo>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Flashcards</Text>
        <Text style={styles.sub}>Select your set card</Text>
      </View>

      <AddCategory />
      <AddNewCategory />

      <View>
        {categories.length ? (
          categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              even={index % 2}
            />
          ))
        ) : (
          <Text>Try adding a new category</Text>
        )}
      </View>
    </UserInfo>
  );
}

export default Categories;
