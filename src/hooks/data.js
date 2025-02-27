import { useEffect, useState } from "react";
import { dbCategories as DBCategories, dbCards as DBCards } from "../api/db";
import { useUser } from "./auth";

export const useCategories = () => {
  const [user] = useUser();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!user) return () => {};

    const query = DBCategories.where("userId", "==", user.uid);
    const unsub = query.onSnapshot((qs) => {
      const results = qs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCategories(results);
    });

    return unsub;
  }, [user]);

  return categories;
};

export const useCards = (categoryId) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const query = DBCards.where("categoryId", "==", categoryId);
    query.onSnapshot((qs) => {
      const results = qs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCards(results);
    });
  }, [categoryId]);

  return cards;
};
