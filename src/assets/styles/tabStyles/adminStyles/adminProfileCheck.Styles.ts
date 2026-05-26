import { windowWidth } from "@/v1/logics/utils/Dimensions";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 12,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 24,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1d1b20",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d9d9d9",
    borderRadius: 20,
    height: 40,
    marginHorizontal: 24,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  filterButton: {
    marginLeft: 8,
  },
  cardList: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#d9d9d9",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: windowWidth - 48,
    alignSelf: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#000",
  },
  cardLine: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  cardStatus: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
    textAlign: "right",
    marginTop: 8,
  },
});

export default styles;
