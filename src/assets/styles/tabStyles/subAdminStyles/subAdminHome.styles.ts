import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f8f7",
    flex: 1,
  },
  header: {
    backgroundColor: "#174d52",
    paddingBottom: 26,
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  headerTop: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 8,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  headerTitleWrap: {
    alignItems: "center",
    flex: 1,
  },
  headerEyebrow: {
    color: "#a8d8d0",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 2,
  },
  welcomeText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "800",
    marginTop: 24,
  },
  welcomeSubText: {
    color: "#d5e8e6",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    maxWidth: 340,
  },
  content: {
    padding: 16,
    paddingBottom: 34,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: -30,
  },
  summaryCard: {
    borderRadius: 8,
    flex: 1,
    minHeight: 84,
    paddingHorizontal: 13,
    paddingVertical: 14,
  },
  summaryPrimary: {
    backgroundColor: "#e7f3f1",
    borderColor: "#cce5e1",
    borderWidth: 1,
  },
  summarySecondary: {
    backgroundColor: "#fff3e9",
    borderColor: "#f2dbc9",
    borderWidth: 1,
  },
  summaryValue: {
    color: "#163f44",
    fontSize: 22,
    fontWeight: "900",
  },
  summaryLabel: {
    color: "#627b7e",
    fontSize: 12,
    lineHeight: 16,
    marginTop: 6,
  },
  sectionHeader: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: 22,
  },
  sectionTitle: {
    color: "#173d42",
    fontSize: 19,
    fontWeight: "900",
  },
  sectionHint: {
    color: "#6c8385",
    fontSize: 12,
    fontWeight: "700",
  },
  formGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderColor: "#dce8e6",
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 134,
    padding: 14,
    width: "48%",
  },
  formIconWrap: {
    alignItems: "center",
    backgroundColor: "#edf7f5",
    borderRadius: 8,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  formIcon: {
    height: 27,
    width: 27,
  },
  formTitle: {
    color: "#173b40",
    fontSize: 14,
    fontWeight: "900",
    marginTop: 12,
  },
  formDescription: {
    color: "#73878a",
    fontSize: 12,
    lineHeight: 16,
    marginTop: 5,
  },
  emptyState: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#dce8e6",
    borderRadius: 8,
    borderWidth: 1,
    padding: 22,
  },
  emptyTitle: {
    color: "#163b3f",
    fontSize: 17,
    fontWeight: "900",
  },
  emptyText: {
    color: "#6b7f82",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    textAlign: "center",
  },
});

export default styles;
