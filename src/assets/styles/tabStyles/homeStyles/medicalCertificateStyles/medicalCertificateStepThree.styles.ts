import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    paddingHorizontal: 24,
  },
  logoWrapper: {
    marginTop: 60,
    alignItems: "center",
  },
  logo: {
    width: 115,
    height: 115,
  },
  header: {
    marginTop: 24,
    backgroundColor: "#71e05b",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 24,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e04747",
  },
  form: {
    marginTop: 30,
  },
  question: {
    fontSize: 15,
    color: "#000",
    marginBottom: 6,
  },
  textArea: {
    height: 80,
    backgroundColor: "#d9d9d9",
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 24,
    padding: 10,
    textAlignVertical: "top",
  },
  uploadBox: {
    height: 80,
    backgroundColor: "#d9d9d9",
    borderColor: "#000",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  uploadText: {
    color: "#00000070",
    fontSize: 15,
  },
  disclaimer: {
    fontSize: 13,
    color: "#000",
    marginBottom: 20,
  },
  button: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    width: 260,
    height: 48,
    backgroundColor: "#2a2a2a",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
