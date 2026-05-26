import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff8f1",
  },
  scroll: {
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  form: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    gap: 18,
    paddingBottom: 24,
  },
  heroCard: {
    backgroundColor: "#fff2e3",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#f1dfc7",
  },
  stepBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#8d5b2a",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
  },
  stepBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#65421e",
    marginBottom: 8,
  },
  helperText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#87694d",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,
    shadowColor: "#5a3b1e",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  label: {
    fontSize: 15,
    color: "#87694d",
    marginBottom: 10,
    fontWeight: "600",
  },
  uploadBox: {
    minHeight: 88,
    backgroundColor: "#fffaf4",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    marginTop: 8,
    width: "100%",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#dcc6ab",
    paddingHorizontal: 16,
  },
  uploadText: {
    color: "#785028",
    fontSize: 16,
    fontWeight: "600",
  },
  uploadHint: {
    marginTop: 6,
    color: "#9a7a5b",
    fontSize: 12,
  },
});

export default styles;
