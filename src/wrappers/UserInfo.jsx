import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { Avatar, BottomSheet, ListItem } from "@rneui/base";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { auth } from "../api/db";
import { ROUTES } from "../constants/navigation.constants";
import { useUser } from "../hooks/auth";
import { COLORS, FONT, SIZE } from "../constants/style.constants";
import { useModal } from "../hooks/useModal";

const styles = StyleSheet.create({
  container: {
    padding: SIZE.lg,
  },
  avatarContainer: {
    alignSelf: "flex-end",
  },
  logout: {
    ...FONT.h3,
    color: COLORS.danger,
  },
});

function UserInfo({ children }) {
  const [user, setUser] = useUser();
  const navigation = useNavigation();
  const { visible, show, hide } = useModal();

  const doLogout = async () => {
    await auth.signOut();
    auth.currentUser = null;
    setUser(null);
  };

  useEffect(() => {
    if (!user) navigation.navigate(ROUTES.login);
  }, [user]);

  if (!user) return null;

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar
          onPress={show}
          source={{ uri: `https://picsum.photos/seed/${user.uid}/200/300` }}
          size={60}
          rounded
          containerStyle={styles.avatarContainer}
        />
      </View>

      <View>{children}</View>

      <BottomSheet isVisible={visible} onBackdropPress={hide}>
        <ListItem onPress={doLogout}>
          <ListItem.Content>
            <ListItem.Title style={styles.logout}>Logout</ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <ListItem onPress={hide}>
          <ListItem.Content>
            <ListItem.Title>Close</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </BottomSheet>
    </View>
  );
}

UserInfo.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserInfo;
