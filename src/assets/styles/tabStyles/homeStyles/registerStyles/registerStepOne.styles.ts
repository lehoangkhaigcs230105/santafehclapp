import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f6fb",
  },
  scroll: {
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  form: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    gap: 18,
    paddingBottom: 24,
  },
  heroCard: {
    backgroundColor: "#e9f2ff",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#d5e6ff",
  },
  stepBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#133b6b",
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
    color: "#16324f",
    marginBottom: 8,
  },
  helperText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#46607b",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,
    shadowColor: "#0d2340",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
});

export default styles;
