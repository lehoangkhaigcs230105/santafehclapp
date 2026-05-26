import styles from "src/assets/styles/tabStyles/adminStyles/adminProfileCheck.Styles";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StackScreens } from "@/configs/navigations/screens";

const HistoryCard = ({ item, onPress }: { item: any; onPress: () => void }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardTitle}>{item.companyName}</Text>
    <Text style={styles.cardLine}>Driver License: {item.driverLicense}</Text>
    <Text style={styles.cardLine}>Type of Test: {item.testType}</Text>
    <Text style={styles.cardLine}>Submit Day: {item.submitDay}</Text>
    <Text style={styles.cardStatus}>Status: {item.status}</Text>
  </TouchableOpacity>
);

const AdminProfileCheckLayout: React.FC = () => {
  const navigation = useNavigation<any>();

  const historyData = [
    {
      companyName: "Name Company 1",
      status: "Pending",
      driverLicense: "D1234567",
      testType: "Drug Test",
      submitDay: "2025-07-14",
      onPress: () => navigation.navigate(StackScreens.registerStepOne),
    },
    {
      companyName: "Name Company 2",
      status: "Approved",
      driverLicense: "D7654321",
      testType: "Hair Test",
      submitDay: "2025-07-12",
      onPress: () => navigation.navigate(StackScreens.randomStepOne),
    },
    {
      companyName: "Name Company 3",
      status: "Rejected",
      driverLicense: "D8888888",
      testType: "Random Test",
      submitDay: "2025-07-10",
      onPress: () => undefined,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>History</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="filter" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={styles.cardList}
        data={historyData}
        keyExtractor={(_, index) => `card-${index}`}
        renderItem={({ item }) => <HistoryCard item={item} onPress={item.onPress} />}
      />
    </SafeAreaView>
  );
};

export default AdminProfileCheckLayout;
