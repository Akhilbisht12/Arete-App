import React from "react";
import { View, Text, TextInput } from "react-native";

const Filter = () => {
  const [value, setValue] = React.useState("");

  return (
    <TextInput
      placeholder="Filters"
      value={value}
      onChangeText={(nextValue) => setValue(nextValue)}
    />
  );
};

export default Filter;
