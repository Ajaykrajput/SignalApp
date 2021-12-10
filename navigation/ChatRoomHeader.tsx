import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { DataStore, Auth } from "aws-amplify";
import { ChatRoom, ChatRoomUser, User } from "../src/models";
import moment from "moment";
import { useNavigation } from "@react-navigation/core";

const ChatRoomHeader = ({ id, children }) => {
  const { width } = useWindowDimensions();
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [chatRoom, setChatRoom] = useState<ChatRoom | undefined>(undefined);
  // console.log(id);
  const navigation = useNavigation();

  const fetchUsers = async () => {
    const fetchedUsers = (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.chatroom.id === id)
      .map((chatRoomUser) => chatRoomUser.user);
    // console.log(fetchedUsers);
    setAllUsers(fetchedUsers);
    const authUser = await Auth.currentAuthenticatedUser();
    setUser(
      fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
    );
  };

  const fetchChatRoom = async () => {
    DataStore.query(ChatRoom, id).then(setChatRoom);
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchUsers();
    fetchChatRoom();
  }, []);

  const getLastOnlineText = () => {
    if (!user?.lastOnlineAt) {
      return null;
    }
    // if lastOnlineAt is less than 5 minutes ago , show him as ONLINE
    const lastOnlineDiffMS = moment().diff(moment(user.lastOnlineAt));
    if (lastOnlineDiffMS < 5 * 60 * 1000) {
      // less than 5 minutes
      return "online";
    } else {
      return `Last seen online ${moment(user.lastOnlineAt).fromNow()}`;
    }
  };
  // console.log("getLastOnlineText", getLastOnlineText);

  const getUsernames = () => {
    return allUsers.map((user) => user.name).join(", ");
  };

  const isGroup = allUsers.length > 2;

  const openInfo = () => {
    // redirect to info page
    navigation.navigate("GroupInfoScreen", { id });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: width - 35,
        padding: 10,
        marginLeft: -40,
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: chatRoom?.imageUri || user?.imageUri,
        }}
        style={{ width: 30, height: 30, borderRadius: 15 }}
      />
      <Pressable onPress={openInfo} style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontWeight: "bold" }} numberOfLines={1}>
          {chatRoom?.name || user?.name}
        </Text>
        <Text numberOfLines={1}>
          {isGroup ? getUsernames() : getLastOnlineText()}{" "}
        </Text>
      </Pressable>
      <Feather
        name="camera"
        size={24}
        color="black"
        style={{ marginHorizontal: 10 }}
      />
      <Feather
        name="edit-2"
        size={24}
        color="black"
        style={{ marginHorizontal: 10 }}
      />
    </View>
  );
};

export default ChatRoomHeader;
