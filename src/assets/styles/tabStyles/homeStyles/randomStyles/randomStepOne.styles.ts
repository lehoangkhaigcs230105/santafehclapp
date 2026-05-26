import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f8f5",
  },
  scroll: {
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  content: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    gap: 18,
    paddingBottom: 24,
  },
  heroCard: {
    backgroundColor: "#e8f6ef",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#d1ebdc",
  },
  stepBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#1d5c46",
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
    color: "#183c2e",
    marginBottom: 8,
  },
  helperText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#587265",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,
    shadowColor: "#173724",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4f6357",
    marginBottom: 10,
  },
  loading: {
    marginTop: 18,
    marginBottom: 8,
  },
  listContainer: {
    gap: 12,
  },
  companyCard: {
    width: "100%",
    backgroundColor: "#f4fbf7",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#d7eadf",
  },
  companyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#17392d",
  },
  companyHint: {
    fontSize: 12,
    color: "#72877c",
    marginTop: 6,
  },
  emptyState: {
    backgroundColor: "#f7faf8",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e1e8e4",
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e342a",
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 13,
    lineHeight: 20,
    color: "#6e8377",
  },
});

export default styles;
