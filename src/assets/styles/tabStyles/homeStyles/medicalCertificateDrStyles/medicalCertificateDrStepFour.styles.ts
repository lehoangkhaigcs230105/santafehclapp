import { BackgroundColors, TextColors } from "src/configs/constants/color";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColors.whiteSmoke,
  },
  scroll: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  form: {
    gap: 16,
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
        marginBottom: 20,
      },
sectionLabel: {
  color: "#444",
  fontSize: 15,
  marginTop: 4,
  marginBottom: 4,
},
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    flex: 1,
  },
  input: {
    borderWidth: 1,
  borderColor: "#333",
  backgroundColor: "#eee",
  padding: 8,
  marginTop: 8,
  marginBottom: 5,
  fontSize: 16,
  textAlign: "center",
  },

  signatureBox: {
    height: 80,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  signaturePlaceholder: {
    fontSize: 14,
    color: "#00000080",
  },

});
