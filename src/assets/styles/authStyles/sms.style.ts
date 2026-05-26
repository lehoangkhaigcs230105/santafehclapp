import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
container : {
    flex: 1,
    backgroundColor: '#fff',
},
scroll: {
    alignItems: "center",
    paddingVertical: 24,
},
statusIcons: {
    flexDirection: "row",
    alignItems: "center",
},
iconSpacing: {
    marginHorizontal: 12,
},
otpText: {
  fontSize: 18,
  fontWeight: "600",
  textAlign: "center",
  marginTop: 32,
  marginBottom: 12,
  color: "#222",
},
    otpContainer: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginVertical: 32,
  gap: 12, // nếu RN chưa hỗ trợ gap, dùng marginRight cho từng ô trừ ô cuối
},
   otpInput: {
  width: 48,
  height: 56,
  borderWidth: 2,
  borderColor: "#bbb",
  borderRadius: 12,
  backgroundColor: "#f7f7f7",
  fontSize: 28,
  color: "#222",
  marginHorizontal: 6,
},
 nextBtn: {
  marginTop: 32,
  alignSelf: "center",
  width: 160,
},

});

export default styles;
