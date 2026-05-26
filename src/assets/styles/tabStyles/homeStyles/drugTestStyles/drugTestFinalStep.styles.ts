import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbf6ef",
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
    backgroundColor: "#fff0da",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#efdcc0",
  },
  stepBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#825324",
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
    color: "#5f3d18",
    marginBottom: 8,
  },
  helperText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#816446",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,
    shadowColor: "#583e22",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  label: {
    fontSize: 15,
    color: "#816446",
    marginBottom: 10,
    fontWeight: "600",
  },
  uploadBox: {
    minHeight: 88,
    backgroundColor: "#fdf8f0",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    marginTop: 8,
    width: "100%",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#d5c1a8",
    paddingHorizontal: 16,
  },
  uploadText: {
    color: "#6d4a27",
    fontSize: 16,
    fontWeight: "600",
  },
  uploadHint: {
    marginTop: 6,
    color: "#94765a",
    fontSize: 12,
  },
});

export default styles;
