import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f7fd",
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
    backgroundColor: "#ebf5ff",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#d6e7f8",
  },
  stepBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#24558a",
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
    color: "#16395f",
    marginBottom: 8,
  },
  helperText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#5d748e",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,
    shadowColor: "#173551",
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
    color: "#5d748e",
    marginBottom: 10,
  },
  uploadBox: {
    minHeight: 88,
    backgroundColor: "#f7fbff",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    marginTop: 4,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#c8d8eb",
    paddingHorizontal: 16,
  },
  uploadText: {
    color: "#2e557c",
    fontSize: 16,
    fontWeight: "600",
  },
  uploadHint: {
    marginTop: 6,
    color: "#7b90a6",
    fontSize: 12,
  },
});

export default styles;
