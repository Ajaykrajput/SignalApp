import React from "react";
import { DataStore, Auth } from "aws-amplify";
import { View, Text, Pressable } from "react-native";
import { generateKeyPair } from "../utils/crypto";

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
    //save public key to UserModel in DataStorage
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
