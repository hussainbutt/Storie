import { View, Text } from "react-native";
import React from "react";
import { useGlobalContext } from "../context/GlobalProvider";

const Bookmark = () => {
  const { user, isLoggedIn } = useGlobalContext();
  console.log(user);

  return (
    <View>
      <Text>Bookmark</Text>
    </View>
  );
};

export default Bookmark;
