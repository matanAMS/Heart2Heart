import React from "react";
import { StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";

const UserImage = ({ user, style }) => {
  const navigation = useNavigation();
  const renderUserImage = () =>
    user?.userImage
      ? { uri: `${user.userImage}` }
      : require("../assets/profile.png");

return(
    <Image source={renderUserImage()} style={styles.avatar} />
)};
export default UserImage;

const styles = StyleSheet.create({
    avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
})