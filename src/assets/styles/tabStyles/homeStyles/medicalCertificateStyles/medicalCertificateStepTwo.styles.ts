import { TextColors } from "src/configs/constants/color";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    alignItems: "center",
    paddingVertical: 24 
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  logo: {
    width: 115,
    height: 115,
  },
  headerBox: {
    marginTop: 24,
    backgroundColor: "#71e05b",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  headerText: {
    color: "#e04747",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  backgroundImage: {
    width: 430,
    height: 438,
    opacity: 0.1,
    position: "absolute",
    top: 220,
    alignSelf: "center",
  },
  form: {
    width: "90%",
    alignSelf: "center",
    marginTop: 0,
    zIndex: 1,
  },
  fieldWrapper: {
    marginBottom: 6,
  },
  label: {
    fontSize: 15,
    color: "#00000070",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 4,
    fontSize: 15,
    color: TextColors.gray,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  smallField: {
    flex: 1,
  },
  buttonRow: {
    backgroundColor: "#2a2a2a",
    width: 260,
    height: 48,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
