import { BackgroundColors, TextColors } from "src/configs/constants/color";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColors.whiteSmoke,
  },
  scroll: {
    padding: 20,
    backgroundColor: "#fff",
  },
  headerText: {
      color: TextColors.red,
      fontSize: 20,
      fontWeight: "bold",
    },
     headerContainer: {
        marginTop: 10,
        alignSelf: "center",
        backgroundColor: BackgroundColors.lightGreen,
        borderRadius: 40,
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginBottom: 20,
      },
  label: {
    fontSize: 15,
    color: "#000000B0",
    marginBottom: 10,
    fontFamily: "Raleway-Regular",
  },
  input: {
    marginBottom: 16,
  },
  radioGrid: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 16,
},
  radioCol: {
  flex: 1,
  gap: 8,
},
  radioRow: {
    marginBottom: 10,
  },
  checkboxGrid: {
    flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 16,
   flex: 1,
},
  checkboxRow: {
    marginBottom: 10,
  },
  
});
