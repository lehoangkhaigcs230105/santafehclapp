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
  form: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxBoxActive: {
    backgroundColor: "#2a2a2a",
  },
  checkmark: {
    color: "#fff",
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 15,
    color: "#444",
  },
  lineUnder: {
    borderBottomWidth: 1, 
    borderColor: "#ccc", 
    marginVertical: 12
},
infoText: {
  fontSize: 15,
  color: "#555",
  marginBottom: 4,
},
  inputBox: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  smallField: {
    flex: 1,
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
});
