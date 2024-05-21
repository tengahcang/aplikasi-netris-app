import { View, Text } from "react-native";
import React from "react";
import { Profile, Button, Separator } from "../components";
import Firebase from '../firebase';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  const logout = async () => {
    Firebase.auth().signOut().then(() => {
      clearUserData();
    }).catch((error) => {
      console.error(error);
    });
  };
  const clearUserData = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace("Login");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 20 }}>
      <View style={{ flexDirection: "row" }}>
        <Profile name={"Rizki"} />
      </View>
      <Separator h={50} />
      <Button
        left={false}
        text={"Keluar"}
        op={logout}
        full={true}
      />
    </View>
  );
};

export default ProfileScreen;
