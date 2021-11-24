import { BUILDER_KEYS } from "@babel/types";
import * as React from "react";
import { Text, Image, View, StyleSheet, FlatList, Pressable } from "react-native";
import UserItem from '../components/UsersItem';
import Users from "../assets/dummy-data/Users";

export default function UsersScreen() {

  return (
    <View style={styles.page}>
      <FlatList
        data={Users}
        renderItem={({ item }) => <UserItem user={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
  },
});
