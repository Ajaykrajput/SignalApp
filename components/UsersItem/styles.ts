import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    page: {},
    container: {
      flexDirection: "row",
      padding: 10,
      // alignItems: "center",
      // justifyContent: "center",
    },
    image: {
      height: 50,
      width: 50,
      borderRadius: 30,
      marginRight: 10,
    },
    badgeContainer: {
      backgroundColor: "#3872E9",
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "white",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      left: 45,
      top: 10,
    },
    badgeText: {
      color: "white",
      fontSize: 12,
    },
    rightContainer: {
      flex: 1,
      // backgroundColor: 'red',
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    name: {
      fontWeight: "bold",
      fontSize: 18,
      marginBottom: 3,
    },
    text: {
      // fontSize: 16,
      color: "grey",
      // padding:5,
    },
  });

  export default styles;