import { Button } from "@rneui/base";
import to from "await-to-js";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useCallback, useState, useEffect } from "react";
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
    borderRadius: SIZE.md,
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
    ...COMPONENT.button.main,
    ...COMPONENT.button.main.button,
    alignSelf: "center",
    marginBottom: SIZE.lg,
  },
  buttonTitle: {
    ...COMPONENT.button.title,
    ...COMPONENT.button.main.title,
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
});

function Login() {
  const navigation = useNavigation();
  const [user, setUser] = useUser();
  const [form, setForm] = useForm(baseState());

  const [valid, setValid] = useState(false);
  const [error, setError] = useState(null);

  const doLogin = useCallback(async () => {
    const [loginError, userCredentials] = await to(
      signInWithEmailAndPassword(auth, form.email, form.password)
    );

    if (loginError) {
      const { code } = loginError;
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
    const { email, password } = form;

    setValid(() => {
      if (!email.length || !password.length) {
        return false;
      }

      if (password.length < 6) return false;

      return true;
    });
  }, [form]);

  useEffect(() => {
    setError(null);
  }, [form, setError]);

  const { email, password } = form;

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.title}>Welcome{"\n"}Back</Text>

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

          <Button
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
            title="Login"
            onPress={doLogin}
            disabled={!valid}
          />
        </View>

        {error && <Text>{error}</Text>}

        <Button
          buttonStyle={styles.link.button}
          titleStyle={styles.link.title}
          title="Sign up instead"
          onPress={() => navigation.navigate(ROUTES.signup)}
        />
      </View>
    </View>
  );
}

export default Login;
