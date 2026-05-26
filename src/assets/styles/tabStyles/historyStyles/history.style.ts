import { StyleSheet } from "react-native";

 const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollview: {
    backgroundColor: "#f5f5f5",
    // paddingVertical: 30,
    alignItems: "center",
    flexGrow: 1,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    justifyContent: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 0,
    padding: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },
  searchContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#d9d9d9",
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  filterButton: {
    marginLeft: -35,
    zIndex: 1,
    padding: 10,
  },
  cardList: {
    marginTop: 30,
    width: "90%",
  },
  card: {
    backgroundColor: "#d9d9d9",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  cardCompany: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  cardLine: {
    fontSize: 14,
    marginBottom: 6,
  },
  cardStatus: {
    position: "absolute",
    right: 16,
    bottom: 16,
    fontWeight: "500",
    fontSize: 14,
  },
});

export default styles;  