import React from "react";
import { View, Text, TextInput } from "react-native";

const Search = () => {
  const [value, setValue] = React.useState("");

  return (
    <TextInput
      placeholder="Search with patient name or ID   "
      value={value}
      onChangeText={(nextValue) => setValue(nextValue)}
    />
  );
};

export default Search;
