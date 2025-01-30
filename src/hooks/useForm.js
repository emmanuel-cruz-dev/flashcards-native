import { useCallback, useState } from "react";

export const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);

  const handleChange = useCallback(
    (update) => {
      const [key, value] = update;

      setForm((prev) => {
        if (!key) {
          return update;
        }

        return {
          ...prev,
          [key]: value,
        };
      });
    },
    [setForm]
  );

  return [form, handleChange];
};
