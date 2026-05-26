import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const QuestionLayout = () => {
  const route = useRoute<any>();
  const type = route.params?.type ?? null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Question Screen</Text>
      <Text style={styles.type}>Type: {type ?? "No type"}</Text>
    </View>
  );
};

export default QuestionLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  type: {
    fontSize: 20,
  },
});
