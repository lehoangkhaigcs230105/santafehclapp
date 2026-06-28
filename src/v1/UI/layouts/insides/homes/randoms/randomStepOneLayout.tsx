import { firestore } from "firebase/firebaseConfig";
import styles from "src/assets/styles/tabStyles/homeStyles/randomStyles/randomStepOne.styles";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { collection, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import HeaderTabs from "../../../../components/Header";
import FormInput from "../../../../components/FormInput";
import { StackScreens } from "@/configs/navigations/screens";
import {
  getEmployerByCompanyName,
  normalizeEmployerCode,
} from "@/v1/logics/services/employerService";

type CompanyType = {
  id: string;
  code: string;
  name: string;
};

const RandomStepOneLayout = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [companyList, setCompanyList] = useState<CompanyType[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, "companies"));

        const baseCompanies = snapshot.docs
          .map((companyDoc) => {
            const data = companyDoc.data();
            const name = String(data.name ?? data.companyName ?? "").trim();
            const rawCode = String(
              data.companyCode ?? data.code ?? data.employerCode ?? ""
            ).trim();

            return {
              id: companyDoc.id,
              code: rawCode ? normalizeEmployerCode(rawCode) : "",
              name,
            };
          })
          .filter((item) => item.name);

        const companies: CompanyType[] = await Promise.all(
          baseCompanies.map(async (item) => {
            if (item.code) {
              return item;
            }

            try {
              const employerData: any = await getEmployerByCompanyName(item.name);
              const fallbackCode = String(
                employerData?.employerCode ?? employerData?.code ?? ""
              ).trim();

              return {
                ...item,
                code: fallbackCode ? normalizeEmployerCode(fallbackCode) : "",
              };
            } catch (lookupError) {
              console.error("Random company code enrichment error:", lookupError);
              return item;
            }
          })
        );

        companies.sort((a, b) => a.name.localeCompare(b.name));

        setCompanyList(companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
        Alert.alert("Error", "Cannot load company list right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleSelectCompany = (company: CompanyType) => {
    navigation.navigate(StackScreens.randomStepTwo, {
      company: company.name,
      companyCode: company.code,
    });
  };

  const normalizedSearch = search.trim().toLowerCase();
  const filteredCompanies = companyList.filter((item) => {
    const searchableText = `${item.name} ${item.code}`.toLowerCase();
    return searchableText.includes(normalizedSearch);
  });

  return (
    <View style={styles.container}>
      <HeaderTabs title="Random Step 1" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <View style={styles.heroCard}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>Step 1 of 2</Text>
            </View>
            <Text style={styles.sectionTitle}>Select Company</Text>
            <Text style={styles.helperText}>
              Choose the company for this random form. We will carry that selection and code into the submission screen.
            </Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.label}>{t("company_name")}</Text>
            <FormInput
              placeholder={`${t("search")} name or code`}
              value={search}
              onChangeText={setSearch}
              autoCapitalize="none"
            />

            {loading ? (
              <ActivityIndicator
                size="large"
                color="#1d5c46"
                style={styles.loading}
              />
            ) : (
              <View style={styles.listContainer}>
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.companyCard}
                      onPress={() => handleSelectCompany(item)}
                    >
                      <Text style={styles.companyText}>{item.name}</Text>
                      <Text style={styles.companyHint}>
                        {item.code ? `Code: ${item.code}` : "Tap to continue"}
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyTitle}>No company found</Text>
                    <Text style={styles.emptyText}>
                      Try another keyword or add companies in Firestore first.
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RandomStepOneLayout;
