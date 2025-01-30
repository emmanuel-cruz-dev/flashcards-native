import React from "react";
import { Button } from "@rneui/base";
import to from "await-to-js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useCallback, useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { auth } from "../api/db";
import { MESSAGES } from "../constants/errors.constants";
import { ROUTES } from "../constants/navigation.constants";
import { COLORS, COMPONENT, FONT, SIZE } from "../constants/style.constants";
import { useUser } from "../hooks/auth";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "../hooks/useForm";

const styles = StyleSheet.create({
  outer: {
    backgroundColor: COLORS.main,
    padding: SIZE.lg,
    height: "100%",
  },
  inner: {
    backgroundColor: COLORS.background,
    padding: SIZE.lg,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: SIZE.lg,
    height: "100%",
  },
  input: {
    ...COMPONENT.input,
    borderBottomColor: COLORS.main,
  },
  title: {
    ...FONT.h1,
    marginBottom: SIZE.lg,
  },
  button: {
    ...COMPONENT.button,
    ...COMPONENT.button.main.button,
    alignSelf: "center",
  },
  link: {
    button: {
      backgroundColor: "transparent",
    },
    title: {
      ...FONT.sub,
      fontSize: 14,
    },
  },
  inputContainer: {
    marginBottom: SIZE.lg,
    alignContent: "center",
    justifyContent: "center",
  },
});

const baseState = () => ({
  email: "",
  password: "",
  passwordConfirmation: "",
});

function SignUp() {
  const navigation = useNavigation();
  const [user, setUser] = useUser();
  const [form, setForm] = useForm(baseState());

  const [valid, setValid] = useState(false);
  const [error, setError] = useState(null);

  const doSignUp = useCallback(async () => {
    const [signUpError, userCredentials] = await to(
      createUserWithEmailAndPassword(auth, form.email, form.password)
    );

    if (signUpError) {
      const { code } = signUpError;
      setError(MESSAGES[code] || code);
    } else {
      setForm(baseState());
      auth.currentUser = userCredentials.user;
      setUser(userCredentials.user);
      navigation.navigate(ROUTES.categories);
    }
  }, [form, setError, navigation, setUser]);

  useEffect(() => {
    if (user) navigation.navigate(ROUTES.categories);
  }, [navigation, user]);

  useEffect(() => {
    const { email, password, passwordConfirmation } = form;

    setValid(() => {
      if (!email.length || !password.length || !passwordConfirmation.length) {
        return false;
      }

      if (password.length < 6) return false;

      if (password !== passwordConfirmation) return false;

      return true;
    });
  }, [form]);

  useEffect(() => {
    setError(null);
  }, [form, setError]);

  const { email, password, passwordConfirmation } = form;

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            textContentType="emailAddress"
            onChangeText={(value) => setForm({ key: "email", value })}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            onChangeText={(value) => setForm({ key: "password", value })}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={passwordConfirmation}
            textContentType="password"
            secureTextEntry
            onChangeText={(value) =>
              setForm({ key: "passwordConfirmation", value })
            }
          />
        </View>

        <Button
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.button}
          title="Sign Up"
          onPress={doSignUp}
          disabled={!valid}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <Button
          buttonStyle={styles.link.button}
          titleStyle={styles.link.title}
          title="Login instead"
          onPress={() => navigation.navigate(ROUTES.login)}
        />
      </View>
    </View>
  );
}

export default SignUp;
