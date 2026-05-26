import { StyleSheet } from "react-native";

 const styles = StyleSheet.create({
 container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  cardWrapper: {
  paddingBottom: 16,
  backgroundColor: '#f5f5f5',
},
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 40,
    backgroundColor: "#fff",
    minHeight: "100%",
  },
  greeting: {
    fontSize: 22,
    color: "#222",
    fontWeight: "400",
    marginBottom: 0,
  },
  name: {
    fontSize: 28,
    color: "#222",
    fontWeight: "300",
    marginTop: 2,
    marginBottom: 8,
  },
  separator: {
    height: 10,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  email: {
    color: "#888",
    fontSize: 15,
    flex: 1,
  },
  phone: {
    color: "#888",
    fontSize: 15,
    flex: 1,
    textAlign: "right",
  },
  card: {
  backgroundColor: "#fff",
  borderRadius: 8,
  padding: 12,
  marginVertical: 16,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
},
sectionGroupText: {
  fontSize: 16,
  color: "#444",
  fontWeight: "400",
  marginVertical: 6,
  marginHorizontal: 8,
},

row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },

underlinedBox: {
  borderBottomWidth: 1,
  borderColor: "#e0e0e0",
  paddingBottom: 2,
  marginVertical: 6,

  width: "auto",
  alignItems: "center",
},

  line: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 2,
    width: "100%",
  },
pairText: {
  fontSize: 16,
  color: "#333",
  fontWeight: "400",
  textAlign: "center",
},
  address: {
    fontSize: 15,
    color: "#444",
    fontWeight: "400",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 8,
    marginRight: 8,
  },
  note: {
    fontSize: 15,
    color: "#444",
    fontWeight: "400",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 8,
    marginRight: 8,
  },

 
changePassBtn: {
  marginTop: 24,
  backgroundColor: '#1976d2',
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
},
changePassText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
}
});

export default styles;  