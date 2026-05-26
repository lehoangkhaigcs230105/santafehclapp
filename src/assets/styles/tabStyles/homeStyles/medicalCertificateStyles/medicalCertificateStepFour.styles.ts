import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  logoContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  logo: {
    width: 115,
    height: 115,
    backgroundColor: "#ccc",
    borderRadius: 57.5,
  },
  header: {
    backgroundColor: "#71e05b",
    borderRadius: 40,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e04747",
  },
  section: {
    marginTop: 24,
    marginBottom: 16,
  },
  question: {
    fontSize: 15,
    color: "#000",
    fontFamily: "Raleway-Regular",
  },
  textareaLabel: {
    marginBottom: 8,
    fontSize: 15,
    color: "#000",
  },
  textareaPlaceholder: {
    backgroundColor: "#d9d9d999",
    borderWidth: 1,
    borderColor: "#000",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  textareaText: {
    color: "#00000070",
    fontSize: 15,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    width: 257,
    marginTop: 8,
  },
});
