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
  label: {
    fontSize: 15,
    color: "#444",
    marginBottom: 8,
    marginTop: 8,
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
    height: 180,
    opacity: 0.18,
    top: 0,
    left: 0,
    zIndex: 0,
  },
  uploadBox: {
    height: 60,
    backgroundColor: "#eee",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    marginTop: 8,
    width: "100%",
  },
  uploadText: {
    color: "#444",
    fontSize: 16,
  },
});

export default styles; 