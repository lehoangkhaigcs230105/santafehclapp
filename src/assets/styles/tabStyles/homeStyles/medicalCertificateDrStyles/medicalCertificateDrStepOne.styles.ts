import { BackgroundColors, TextColors } from "@/configs/constants/color";
import { windowWidth } from "src/v1/logics/utils/Dimensions";
import { StyleSheet } from "react-native";


export default StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: BackgroundColors.whiteSmoke,
  },
  scroll: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: "#ffffff",
  },
  form: {
    marginTop: 16,
  },
  fieldWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    color: TextColors.gray,
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  halfField: {
    width: windowWidth / 2.3,
  },
  warning: {
    fontSize: 14,
    color: TextColors.gray,
    marginBottom: 20,
  },
  signatureBox: {
    backgroundColor: "#d9d9d9",
    borderColor: "#000",
    borderWidth: 1,
    height: 71,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  signatureText: {
    fontSize: 15,
    color: "#00000070",
  },
  headerText: {
    color: TextColors.red,
    fontSize: 20,
    fontWeight: "bold",
  },
   headerContainer: {
      marginTop: 30,
      alignSelf: "center",
      backgroundColor: BackgroundColors.lightGreen,
      borderRadius: 40,
      paddingVertical: 10,
      paddingHorizontal: 40,
    },
});
