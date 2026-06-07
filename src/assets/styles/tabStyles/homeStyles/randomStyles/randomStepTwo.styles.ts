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
    backgroundColor: "#eef3ff",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#d9e3fa",
  },
  stepBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#2c4678",
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
    color: "#173153",
    marginBottom: 8,
  },
  helperText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#5a6a80",
  },
  companyPill: {
    alignSelf: "flex-start",
    backgroundColor: "#dce8fb",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginTop: 14,
  },
  companyPillText: {
    color: "#29415d",
    fontWeight: "600",
    fontSize: 13,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,
    shadowColor: "#142a46",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  statusCard: {
    backgroundColor: "#f6f8fd",
    borderWidth: 1,
    borderColor: "#d9e3f4",
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  statusCardSuccess: {
    backgroundColor: "#edf8f1",
    borderColor: "#cbe4d2",
  },
  statusCardWarning: {
    backgroundColor: "#fff7ec",
    borderColor: "#efd6b4",
  },
  statusText: {
    color: "#4f6079",
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "600",
  },
  label: {
    fontSize: 14,
    color: "#55667e",
    marginBottom: 10,
    fontWeight: "600",
  },
  uploadBox: {
    minHeight: 88,
    backgroundColor: "#f8fbff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 18,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#cad7e8",
    paddingHorizontal: 16,
  },
  uploadText: {
    color: "#314b69",
    fontSize: 16,
    fontWeight: "600",
  },
  uploadHint: {
    marginTop: 6,
    color: "#8092a8",
    fontSize: 12,
  },
});

export default styles;
