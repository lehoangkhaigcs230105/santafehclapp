import styles from "src/assets/styles/tabStyles/historyStyles/history.style";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const historyData = [
  { companyName: "Name Company 1", status: "Pending" },
  { companyName: "Name Company 2", status: "Approved" },
  { companyName: "Name Company 3", status: "Ejected" },
];

const HistoryLayout = (): React.ReactElement => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview}>

        {/* Header */}
        {/* <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerText}>History</Text>
        </View> */}

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search" />
          <TouchableOpacity style={styles.filterButton}>
            <FontAwesome name="filter" size={16} />
          </TouchableOpacity>
        </View>

        {/* History Cards */}
        <View style={styles.cardList}>
          {historyData.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardCompany}>{item.companyName}</Text>
              <Text style={styles.cardStatus}>Status: {item.status}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryLayout;