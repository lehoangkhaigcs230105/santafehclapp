import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f7f6",
    flex: 1,
  },
  header: {
    backgroundColor: "#113f45",
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
    backgroundColor: "rgba(255,255,255,0.12)",
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
    color: "#9fd0c8",
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
    marginTop: 26,
  },
  welcomeSubText: {
    color: "#c7dddc",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    maxWidth: 330,
  },
  content: {
    padding: 16,
    paddingBottom: 34,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: -32,
  },
  actionCard: {
    borderRadius: 8,
    flex: 1,
    minHeight: 132,
    padding: 14,
  },
  primaryAction: {
    backgroundColor: "#1c6f73",
  },
  secondaryAction: {
    backgroundColor: "#ffffff",
    borderColor: "#dce8e6",
    borderWidth: 1,
  },
  actionIcon: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 8,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  secondaryActionIcon: {
    alignItems: "center",
    backgroundColor: "#e9f5f3",
    borderRadius: 8,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  actionTextWrap: {
    marginTop: 14,
  },
  primaryActionTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  primaryActionText: {
    color: "#d4eeee",
    fontSize: 12,
    lineHeight: 17,
    marginTop: 5,
  },
  secondaryActionTitle: {
    color: "#163b3f",
    fontSize: 16,
    fontWeight: "800",
  },
  secondaryActionText: {
    color: "#6b7f82",
    fontSize: 12,
    lineHeight: 17,
    marginTop: 5,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  statCard: {
    borderRadius: 8,
    flex: 1,
    minHeight: 82,
    paddingHorizontal: 12,
    paddingVertical: 13,
  },
  statCardBlue: {
    backgroundColor: "#e8f0ff",
  },
  statCardGreen: {
    backgroundColor: "#e8f6ef",
  },
  statCardCoral: {
    backgroundColor: "#fff0e8",
  },
  statValue: {
    color: "#153d42",
    fontSize: 20,
    fontWeight: "900",
  },
  statLabel: {
    color: "#657c80",
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
    color: "#163b3f",
    fontSize: 19,
    fontWeight: "900",
  },
  sectionHint: {
    color: "#6f8386",
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
    minHeight: 132,
    padding: 14,
    width: "48%",
  },
  formIconWrap: {
    alignItems: "center",
    backgroundColor: "#edf6f4",
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
});

export default styles;
