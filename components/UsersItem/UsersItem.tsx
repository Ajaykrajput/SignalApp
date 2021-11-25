import React from "react";
import { Text, Image, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/core";
import styles from "./styles";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom, User, ChatRoomUser } from "../../src/models";

export default function UserItem({ user }) {
  // console.log("UserDetails", user);
  const navigation = useNavigation();
  const onPress = async () => {
    // if there is already a chatroom between two users 
    // then redirecting to the existing chatroom 
    // otherwise create a newchatroom with this users.
    

    // Create a chatroom here
    const newChatRoom = await DataStore.save(new ChatRoom({ newMessages: "0" }));
    // console.log("NewChatRoom", newChatRoom)

    // connect authenticated user to chat room
    const authUser = await Auth.currentAuthenticatedUser();
    // console.log("authUser", authUser);
    const dbUser = await DataStore.query(User, authUser.attributes.sub);
    // console.log("dbUser", dbUser);
    await DataStore.save(
      new ChatRoomUser({
        user: dbUser,
        chatroom: newChatRoom,
      })
    );

    // connect clicked user with the chatroom
    await DataStore.save(
      new ChatRoomUser({
        user,
        chatroom: newChatRoom,
      })
    );

    navigation.navigate("ChatRoom", { id: newChatRoom.id });
  };
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={{
          uri: user.imageUri,
        }}
        style={styles.image}
      />

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </View>
    </Pressable>
  );
}
