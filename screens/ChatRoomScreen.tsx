import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/core";
import { DataStore, SortDirection } from "@aws-amplify/datastore";
import { Message as MessageModel } from "../src/models";
import Message from "../components/Message";
// import chatRoomData from "../assets/dummy-data/Chats";
import MessageInput from "../components/MessageInput";
import { ChatRoom } from "../src/models";

export default function ChatRoomScreen() {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    fetchChatRoom();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [chatRoom]);

  useEffect(() => {
    const subscription = DataStore.observe(MessageModel).subscribe((msg) => {
      console.log(msg.model, msg.opType, msg.element);
      if (msg.model === MessageModel && msg.opType === "INSERT") {
        setMessages((existingMessage)  => [msg.element, ...existingMessage]);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchChatRoom = async () => {
    if (!route.params?.id) {
      console.warn("No Chatroom id Provided");
      return;
    }
    const chatRoom = await DataStore.query(ChatRoom, route.params.id);
    console.log(chatRoom);
    if (!chatRoom) {
      console.error("coul'd find a chatroom with this id ");
    } else {
      setChatRoom(chatRoom);
    }
  };

  const fetchMessages = async () => {
    if (!chatRoom) {
      return;
    }
    const fetchedMessages = await DataStore.query(
      MessageModel,
      (message) => message.chatroomID("eq", chatRoom?.id),
      { sort: (message) => message.createdAt(SortDirection.DESCENDING) }
    );
    // console.log(fetchedMessages);
    setMessages(fetchedMessages);
  };

  console.warn("Dispalying ChatRoom", route.params?.id);
  navigation.setOptions({ title: "Elon Musk" });

  if (!chatRoom) {
    return <ActivityIndicator />;
  }
  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
        inverted
      />
      <MessageInput chatRoom={chatRoom} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
