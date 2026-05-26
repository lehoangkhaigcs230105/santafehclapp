import { BackgroundColors, TextColors } from "src/configs/constants/color";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: BackgroundColors.whiteSmoke,
  },
  scroll: {
    padding: 16,
    backgroundColor: "#fff",
  },
  form: {
    gap: 12,
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: TextColors.gray,
    marginBottom: 4,
  },
  
  radioRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 12,
  marginTop: 8,
},
radioIcon: {
  fontSize: 22,
  marginLeft: 10,
},

radioButton: {
  flex: 1,
  paddingVertical: 10,
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  alignItems: "center",
  backgroundColor: "#f5f5f5",
},

radioButtonActive: {
  backgroundColor: "#2a2a2a",
  borderColor: "#2a2a2a",
},

optionText: {
  color: "#333",
  fontSize: 15,
},

optionTextActive: {
  color: "#fff",
  fontWeight: "600",
},
checkboxRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginVertical: 6,
},
checkboxLabel: {
  flex: 1,
  fontSize: 15,
},
checkboxBox: {
  fontSize: 22,
  marginLeft: 10,
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
    fontSize: 17,
    fontWeight: "bold",
},
});
