import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scroll: {
    backgroundColor: "white",
    paddingBottom: 100,
    paddingTop: 30,
  },

  form: {
    paddingHorizontal: 20,
  },

  fieldWrapper: {
    marginBottom: 24,
  },

  label: {
    fontSize: 18,
    color: "#00000070",
  },

  labelCenter: {
    fontSize: 18,
    color: "#00000070",
    textAlign: "center",
  },

  separator: {
    height: 1,
    backgroundColor: "#000",
    marginTop: 6,
  },

  signatureCard: {
    height: 140,
    backgroundColor: "#d9d9d9",
    borderColor: "black",
    borderWidth: 1,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.6,
  },

  signatureText: {
    fontSize: 18,
    color: "#00000070",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  smallField: {
    width: "48%",
  },

  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: "#000",
    marginTop: 20,
    marginBottom: 30,
    color: "#000000",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  actionButton: {
    backgroundColor: "#2a2a2a",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 40,
    width: "47%",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },

  // 🆕 Câu hỏi
  questionBlock: {
    marginBottom: 24,
  },

  questionText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
    marginBottom: 10,
  },

  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 8,
    alignSelf: "flex-start",
  },

  optionText: {
    fontSize: 16,
    color: "#333",
  },

  nextButtonContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },

  nextButton: {
    backgroundColor: "#2a2a2a",
    paddingVertical: 14,
    borderRadius: 40,
    alignItems: "center",
  },

  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
