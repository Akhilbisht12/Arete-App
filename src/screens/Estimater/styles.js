const { StyleSheet, Dimensions } = require("react-native");
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  input: {
    width: width * 0.4,
    borderBottomWidth: 1,
    borderColor: "lightgray",
    borderRadius: 0,
    height: 35,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  option: {
    backgroundColor: "lightgray",
    margin: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 17,
    marginVertical: 4,
    fontFamily: "Poppins-Bold",
  },
});

export default styles;
