import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
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
    backgroundColor: "#edf3ff",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#d6e3fb",
  },
  stepBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#203f73",
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
    color: "#183154",
    marginBottom: 8,
  },
  helperText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#506685",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,
    shadowColor: "#122a47",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  smallField: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
    color: "#54657a",
  },
  textArea: {
    minHeight: 110,
    backgroundColor: "#f8fafc",
    borderColor: "#d7dee8",
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 24,
    padding: 14,
    textAlignVertical: "top",
  },
  fileUpload: {
    width: "100%",
    minHeight: 126,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#cfd9e8",
    borderRadius: 16,
    backgroundColor: "#f8fbff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  fileIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
    opacity: 0.45,
  },
  fileText: {
    color: "#54657a",
    fontWeight: "600",
  },
  uploadHint: {
    marginTop: 6,
    color: "#8a98ab",
    fontSize: 12,
  },
});

export default styles;
