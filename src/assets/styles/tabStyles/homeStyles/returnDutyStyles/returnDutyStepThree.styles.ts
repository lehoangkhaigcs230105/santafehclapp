import { windowHeight, windowWidth } from "src/v1/logics/utils/Dimensions";
import { StyleSheet } from "react-native";

 const styles = StyleSheet.create({
 container: { flex: 1, backgroundColor: "#fff" },
  scroll: { alignItems: "center", paddingVertical: 24 },
  logo: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.5,
    alignSelf: "center",
    marginBottom: 8,
  },
  form: {
    width: "85%",
    alignSelf: "center",
    marginTop: 0,
    zIndex: 1,
  },

  bgBox: {
    width: "100%",
    alignSelf: "center",
    marginBottom: 18,
    marginTop: 0,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingVertical: 10,
  },
  bgImage: {
    position: "absolute",
    width: "100%",
    height: 220,
    opacity: 0.18,
    top: 0,
    left: 0,
    zIndex: 0,
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