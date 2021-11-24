import { BUILDER_KEYS } from "@babel/types";
import * as React from "react";
import { Text, Image, View, StyleSheet, FlatList, Pressable } from "react-native";
import {Auth} from 'aws-amplify';
import ChatRoomItem from "../components/ChatRoomItem";
import chatRoomsData from "../assets/dummy-data/ChatRooms";

const chatRoom1 = chatRoomsData[0];
const chatRoom2 = chatRoomsData[1];

export default function TabOneScreen() {

  const Logout = () => {
Auth.signOut();
  }
  return (
    <View style={styles.page}>
      <FlatList
        data={chatRoomsData}
        renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
        showsVerticalScrollIndicator={false}
      />
      {/* <Pressable onPress={Logout} style={{backgroundColor: 'red', height: 50, margin: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}><Text>LogOut</Text></Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
  },
});
