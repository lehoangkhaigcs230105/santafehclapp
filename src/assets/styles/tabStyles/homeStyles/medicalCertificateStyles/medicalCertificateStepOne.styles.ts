import { BackgroundColors, TextColors } from "src/configs/constants/color";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColors.whiteSmoke,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 140,
  },
  headerContainer: {
    marginTop: 30,
    alignSelf: "center",
    backgroundColor: BackgroundColors.lightGreen,
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  headerText: {
    color: TextColors.red,
    fontSize: 20,
    fontWeight: "bold",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 25,
  },
  logo: {
    width: 115,
    height: 115,
  },
  formBox: {
    marginTop: 30,
    backgroundColor: BackgroundColors.whiteSmoke,
  },
  form: {
    marginTop: 5,
  },

  fieldLabel: {
    borderColor: "#ccc",
    paddingVertical: 4,
    fontSize: 15,
    color: TextColors.gray,
  },
  fieldRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 25, 
  borderBottomWidth: 1,
  borderColor: "#ccc",
  paddingVertical: 4
},
pickerWrapper: {
  flex: 1.5,
  justifyContent: "center",
},
picker: {
  width: "100%",
  color: TextColors.gray,
  backgroundColor: "transparent",
},

});

export default styles;
