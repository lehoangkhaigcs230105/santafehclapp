import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type HomeButtonProps = {
  onPress: () => void;
  iconSource: ImageSourcePropType;
  text: string;
};

const HomeButton: React.FC<HomeButtonProps> = ({ onPress, iconSource, text }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.88}>
      <View style={styles.iconWrap}>
        <Image source={iconSource} style={styles.icon} resizeMode="contain" />
      </View>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default HomeButton;

const styles = StyleSheet.create({
  button: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 18,
    minHeight: 138,
    justifyContent: "space-between",
    shadowColor: "#10243f",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#edf4fb",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 30,
    height: 30,
  },
  buttonText: {
    color: "#163250",
    fontWeight: "800",
    fontSize: 15,
    lineHeight: 20,
    marginTop: 18,
  },
});
