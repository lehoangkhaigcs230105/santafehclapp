import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f7f6",
  },
  header: {
    backgroundColor: "#113f45",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 22,
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 8,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 18,
  },
  headerSubtitle: {
    color: "#c7dddc",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    backgroundColor: "#ffffff",
    borderColor: "#dce8e6",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 14,
    padding: 16,
  },
  sectionTitle: {
    color: "#163b3f",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#f8fbfb",
    borderColor: "#d7e5e3",
    borderRadius: 8,
    borderWidth: 1,
    color: "#173b40",
    fontSize: 15,
    height: 48,
    marginBottom: 10,
    paddingHorizontal: 14,
  },
  permissionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  permissionCard: {
    alignItems: "center",
    backgroundColor: "#f8fbfb",
    borderColor: "#d7e5e3",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 58,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: "48%",
  },
  permissionCardActive: {
    backgroundColor: "#e6f5ef",
    borderColor: "#2f9c72",
  },
  permissionIcon: {
    height: 28,
    marginRight: 10,
    width: 28,
  },
  permissionTextWrap: {
    flex: 1,
  },
  permissionTitle: {
    color: "#1f3f43",
    fontSize: 13,
    fontWeight: "800",
  },
  permissionDescription: {
    color: "#6b7f82",
    fontSize: 11,
    lineHeight: 15,
    marginTop: 2,
  },
  checkBadge: {
    alignItems: "center",
    backgroundColor: "#2f9c72",
    borderRadius: 10,
    height: 20,
    justifyContent: "center",
    marginLeft: 6,
    width: 20,
  },
  footer: {
    backgroundColor: "#ffffff",
    borderTopColor: "#dce8e6",
    borderTopWidth: 1,
    padding: 16,
  },
  submitButton: {
    alignItems: "center",
    backgroundColor: "#1c6f73",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 52,
  },
  submitButtonDisabled: {
    backgroundColor: "#9bb8b8",
  },
  submitText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 8,
  },
});

export default styles;
