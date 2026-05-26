import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f3fb",
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
    backgroundColor: "#f4eef8",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e3d9ed",
  },
  stepBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#704a83",
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
    color: "#523560",
    marginBottom: 8,
  },
  helperText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#7b6887",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,
    shadowColor: "#4a3255",
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
});

export default styles;
