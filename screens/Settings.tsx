import React from "react";
import { DataStore, Auth } from "aws-amplify";
import { View, Text, Pressable, Alert } from "react-native";
import { generateKeyPair } from "../utils/crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User as UserModel } from "../src/models";

export const PRIVATE_KEY = "PRIVATE_KEY";

const Settings = () => {
  const Logout = async () => {
    await DataStore.clear();
    Auth.signOut();
  };

  const updateKeyPair = async () => {
    // genrate public/private key
    const { publicKey, secretKey } = generateKeyPair();
    console.log(publicKey, secretKey);
    
    //save private key to async storage
    await AsyncStorage.setItem(PRIVATE_KEY, secretKey.toString());
    console.log("secret key was saved");

    //save public key to UserModel in DataStorage
    const userData = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(UserModel, userData.attributes.sub);

    if (!dbUser) {
      Alert.alert("User not found!");
      return;
    }

    await DataStore.save(
      UserModel.copyOf(dbUser, (updated) => {
        updated.publicKey = publicKey.toString();
      })
    );
    console.log(dbUser);
    Alert.alert("Successfully updated the KeyPair");
  };

  return (
    <View>
      <Text>Settings</Text>
      <Pressable
        onPress={updateKeyPair}
        style={{
          backgroundColor: "white",
          height: 50,
          margin: 10,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Upadte KeyPair</Text>
      </Pressable>
      <Pressable
        onPress={Logout}
        style={{
          backgroundColor: "white",
          height: 50,
          margin: 10,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>LogOut</Text>
      </Pressable>
    </View>
  );
};
export default Settings;
