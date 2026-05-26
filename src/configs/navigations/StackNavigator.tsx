import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RoleEnum } from "@/configs/enums/roleEnum";
import { FormPermissionId, getAllowedForms } from "@/configs/formPermissions";
import { StackScreens } from "./screens";
import { AuthContext } from "@/v1/logics/contexts/AuthContext";

import LoginLayout from "@/v1/UI/layouts/auths/loginLayout";
import RegisterLayout from "@/v1/UI/layouts/auths/registerLayout";
import ForgotPasswordLayout from "@/v1/UI/layouts/auths/forgotPasswordLayout";
import SmsLayout from "@/v1/UI/layouts/auths/smsLayout";

import AdminHomeLayout from "@/v1/UI/layouts/insides/admin/adminHomeLayout";
import AdminProfileCheckLayout from "@/v1/UI/layouts/insides/admin/adminProfilecheckLayout";
import AdminCreateSubAccountLayout from "@/v1/UI/layouts/insides/admin/adminCreateSubAccountLayout";
import SubAdminHomeLayout from "@/v1/UI/layouts/insides/subAdmin/subAdminHomeLayout";

import HomeLayout from "@/v1/UI/layouts/insides/homes/homeLayout";
import EmployerLayout from "@/v1/UI/layouts/insides/homes/employers/employerLayout";
import MedicalCertificateStepOneLayout from "@/v1/UI/layouts/insides/homes/medicals/medicalCertificateStepOneLayout";
import MedicalCertificateStepTwoLayout from "@/v1/UI/layouts/insides/homes/medicals/medicalCertificateStepTwoLayout";
import MedicalCertificateStepThreeLayout from "@/v1/UI/layouts/insides/homes/medicals/medicalCertificateStepThreeLayout";
import MedicalCertificateStepFourLayout from "@/v1/UI/layouts/insides/homes/medicals/medicalCertificateStepFourLayout";
import MedicalCertificateQuestionListStepOneLayout from "@/v1/UI/layouts/insides/homes/medicals/medicalCertificateQuestionListStepOneLayout";
import MedicalCertificateQuestionListStepTwoLayout from "@/v1/UI/layouts/insides/homes/medicals/medicalCertificateQuestionListStepTwoLayout";
import MedicalCertificateQuestionListStepThreeLayout from "@/v1/UI/layouts/insides/homes/medicals/medicalCertificateQuestionListStepThreeLayout";
import MedicalCertificateDrStepOneLayout from "@/v1/UI/layouts/insides/homes/medicalDrs/medicalCertificateDrStepOneLayout";
import MedicalCertificateDrStepTwoLayout from "@/v1/UI/layouts/insides/homes/medicalDrs/medicalCertificateDrStepTwoLayout";
import MedicalCertificateDrStepThreeLayout from "@/v1/UI/layouts/insides/homes/medicalDrs/medicalCertificateDrStepThreeLayout";
import MedicalCertificateDrStepFourLayout from "@/v1/UI/layouts/insides/homes/medicalDrs/medicalCertificateDrStepFourLayout";
import MedicalCertificateDrStepFiveLayout from "@/v1/UI/layouts/insides/homes/medicalDrs/medicalCertificateDrStepFiveLayout";
import RenewStepOneLayout from "@/v1/UI/layouts/insides/homes/renews/renewStepOneLayout";
import RenewStepTwoLayout from "@/v1/UI/layouts/insides/homes/renews/renewStepTwoLayout";
import RenewStepThreeLayout from "@/v1/UI/layouts/insides/homes/renews/renewStepThreeLayout";
import RenewFinalStepLayout from "@/v1/UI/layouts/insides/homes/renews/renewFinalStepLayout";
import RandomStepOneLayout from "@/v1/UI/layouts/insides/homes/randoms/randomStepOneLayout";
import RandomStepTwoLayout from "@/v1/UI/layouts/insides/homes/randoms/randomStepTwoLayout";
import ProfileLayout from "@/v1/UI/layouts/insides/homes/profiles/profileLayout";
import ChangePasswordLayout from "@/v1/UI/layouts/insides/homes/profiles/changePassword";
import TermLayout from "@/v1/UI/layouts/insides/homes/terms/termLayout";
import DrugTestStepOneLayout from "@/v1/UI/layouts/insides/homes/drugTests/drugTestStepOneLayout";
import DrugTestStepTwoLayout from "@/v1/UI/layouts/insides/homes/drugTests/drugTestStepTwoLayout";
import DrugTestStepThreeLayout from "@/v1/UI/layouts/insides/homes/drugTests/drugTestStepThreeLayout";
import DrugTestFinalStepLayout from "@/v1/UI/layouts/insides/homes/drugTests/drugTestFinalStepLayout";
import ReturnDutyStepOneLayout from "@/v1/UI/layouts/insides/homes/returnDuties/returnDutyStepOneLayout";
import ReturnDutyStepTwoLayout from "@/v1/UI/layouts/insides/homes/returnDuties/returnDutyStepTwoLayout";
import ReturnDutyStepThreeLayout from "@/v1/UI/layouts/insides/homes/returnDuties/returnDutyStepThreeLayout";
import ReturnDutyFinalStepLayout from "@/v1/UI/layouts/insides/homes/returnDuties/returnDutyFinalStepLayout";
import FollowUpStepOneLayout from "@/v1/UI/layouts/insides/homes/followUps/followUpStepOneLayout";
import FollowUpStepTwoLayout from "@/v1/UI/layouts/insides/homes/followUps/followUpStepTwoLayout";
import FollowUpStepThreeLayout from "@/v1/UI/layouts/insides/homes/followUps/followUpStepThreeLayout";
import FollowUpFinalStepLayout from "@/v1/UI/layouts/insides/homes/followUps/followUpFinalStepLayout";
import HairTestStepOneLayout from "@/v1/UI/layouts/insides/homes/hairTests/hairTestStepOneLayout";
import HairTestStepTwoLayout from "@/v1/UI/layouts/insides/homes/hairTests/hairTestStepTwoLayout";
import HairTestStepThreeLayout from "@/v1/UI/layouts/insides/homes/hairTests/hairTestStepThreeLayout";
import HairTestFinalStepLayout from "@/v1/UI/layouts/insides/homes/hairTests/hairTestFinalStepLayout";
import PostAccidentStepOneLayout from "@/v1/UI/layouts/insides/homes/postAccidents/postAccidentStepOneLayout";
import PostAccidentStepTwoLayout from "@/v1/UI/layouts/insides/homes/postAccidents/postAccidentStepTwoLayout";
import PostAccidentStepThreeLayout from "@/v1/UI/layouts/insides/homes/postAccidents/postAccidentStepThreeLayout";
import PostAccidentFinalStepLayout from "@/v1/UI/layouts/insides/homes/postAccidents/postAccidentFinalStepLayout";
import RegisterStepOneLayout from "@/v1/UI/layouts/insides/homes/registers/registerStepOneLayout";
import RegisterStepTwoLayout from "@/v1/UI/layouts/insides/homes/registers/registerStepTwoLayout";
import RegisterFinalStepLayout from "@/v1/UI/layouts/insides/homes/registers/registerFinalStepLayout";
import QuestionLayout from "@/v1/UI/layouts/insides/homes/question/questionLayout";

const Stack = createNativeStackNavigator();

const LoadingScreen = () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <ActivityIndicator size="large" color="#007AFF" />
  </View>
);

const renderAuthScreens = () => (
  <>
    <Stack.Screen name={StackScreens.login} component={LoginLayout} />
    <Stack.Screen name={StackScreens.register} component={RegisterLayout} />
    <Stack.Screen name={StackScreens.forgotPassword} component={ForgotPasswordLayout} />
    <Stack.Screen name={StackScreens.sms} component={SmsLayout} />
  </>
);

type CanAccessForm = (formId: FormPermissionId) => boolean;

const renderCommonAppScreens = (canAccessForm: CanAccessForm) => (
  <>
    {canAccessForm("employer") && <Stack.Screen name={StackScreens.employer} component={EmployerLayout} />}
    {canAccessForm("medical") && (
      <>
        <Stack.Screen name={StackScreens.medicalCertificateStepOne} component={MedicalCertificateStepOneLayout} />
        <Stack.Screen name={StackScreens.medicalCertificateStepTwo} component={MedicalCertificateStepTwoLayout} />
        <Stack.Screen name={StackScreens.medicalCertificateStepThree} component={MedicalCertificateStepThreeLayout} />
        <Stack.Screen name={StackScreens.medicalCertificateStepFour} component={MedicalCertificateStepFourLayout} />
        <Stack.Screen name={StackScreens.medicalCertificateQuestionListStepOne} component={MedicalCertificateQuestionListStepOneLayout} />
        <Stack.Screen name={StackScreens.medicalCertificateQuestionListStepTwo} component={MedicalCertificateQuestionListStepTwoLayout} />
        <Stack.Screen name={StackScreens.medicalCertificateQuestionListStepThree} component={MedicalCertificateQuestionListStepThreeLayout} />
      </>
    )}
    {canAccessForm("medicalDoctor") && (
      <>
        <Stack.Screen name={StackScreens.medicalCertificateDrStepOne} component={MedicalCertificateDrStepOneLayout} />
        <Stack.Screen name={StackScreens.medicalCertificateDrStepTwo} component={MedicalCertificateDrStepTwoLayout} />
        <Stack.Screen name={StackScreens.medicalCertificateDrStepThree} component={MedicalCertificateDrStepThreeLayout} />
        <Stack.Screen name={StackScreens.medicalCertificateDrStepFour} component={MedicalCertificateDrStepFourLayout} />
        <Stack.Screen name={StackScreens.medicalCertificateDrStepFive} component={MedicalCertificateDrStepFiveLayout} />
      </>
    )}
    {canAccessForm("renew") && (
      <>
        <Stack.Screen name={StackScreens.renewStepOne} component={RenewStepOneLayout} />
        <Stack.Screen name={StackScreens.renewStepTwo} component={RenewStepTwoLayout} />
        <Stack.Screen name={StackScreens.renewStepThree} component={RenewStepThreeLayout} />
        <Stack.Screen name={StackScreens.renewFinalStep} component={RenewFinalStepLayout} />
      </>
    )}
    {canAccessForm("random") && (
      <>
        <Stack.Screen name={StackScreens.randomStepOne} component={RandomStepOneLayout} />
        <Stack.Screen name={StackScreens.randomStepTwo} component={RandomStepTwoLayout} />
      </>
    )}
    <Stack.Screen name={StackScreens.profile} component={ProfileLayout} />
    <Stack.Screen name={StackScreens.changePassword} component={ChangePasswordLayout} />
    {canAccessForm("term") && <Stack.Screen name={StackScreens.term} component={TermLayout} />}
    {canAccessForm("drug") && (
      <>
        <Stack.Screen name={StackScreens.drugTestStepOne} component={DrugTestStepOneLayout} />
        <Stack.Screen name={StackScreens.drugTestStepTwo} component={DrugTestStepTwoLayout} />
        <Stack.Screen name={StackScreens.drugTestStepThree} component={DrugTestStepThreeLayout} />
        <Stack.Screen name={StackScreens.drugTestFinalStep} component={DrugTestFinalStepLayout} />
      </>
    )}
    {canAccessForm("returnDuty") && (
      <>
        <Stack.Screen name={StackScreens.returnDutyStepOne} component={ReturnDutyStepOneLayout} />
        <Stack.Screen name={StackScreens.returnDutyStepTwo} component={ReturnDutyStepTwoLayout} />
        <Stack.Screen name={StackScreens.returnDutyStepThree} component={ReturnDutyStepThreeLayout} />
        <Stack.Screen name={StackScreens.returnDutyFinalStep} component={ReturnDutyFinalStepLayout} />
      </>
    )}
    {canAccessForm("followUp") && (
      <>
        <Stack.Screen name={StackScreens.followUpStepOne} component={FollowUpStepOneLayout} />
        <Stack.Screen name={StackScreens.followUpStepTwo} component={FollowUpStepTwoLayout} />
        <Stack.Screen name={StackScreens.followUpStepThree} component={FollowUpStepThreeLayout} />
        <Stack.Screen name={StackScreens.followUpFinalStep} component={FollowUpFinalStepLayout} />
      </>
    )}
    {canAccessForm("hair") && (
      <>
        <Stack.Screen name={StackScreens.hairTestStepOne} component={HairTestStepOneLayout} />
        <Stack.Screen name={StackScreens.hairTestStepTwo} component={HairTestStepTwoLayout} />
        <Stack.Screen name={StackScreens.hairTestStepThree} component={HairTestStepThreeLayout} />
        <Stack.Screen name={StackScreens.hairTestFinalStep} component={HairTestFinalStepLayout} />
      </>
    )}
    {canAccessForm("postAccident") && (
      <>
        <Stack.Screen name={StackScreens.postAccidentStepOne} component={PostAccidentStepOneLayout} />
        <Stack.Screen name={StackScreens.postAccidentStepTwo} component={PostAccidentStepTwoLayout} />
        <Stack.Screen name={StackScreens.postAccidentStepThree} component={PostAccidentStepThreeLayout} />
        <Stack.Screen name={StackScreens.postAccidentFinalStep} component={PostAccidentFinalStepLayout} />
      </>
    )}
    {canAccessForm("register") && (
      <>
        <Stack.Screen name={StackScreens.registerStepOne} component={RegisterStepOneLayout} />
        <Stack.Screen name={StackScreens.registerStepTwo} component={RegisterStepTwoLayout} />
        <Stack.Screen name={StackScreens.registerFinalStep} component={RegisterFinalStepLayout} />
      </>
    )}
    {(canAccessForm("register") || canAccessForm("renew")) && (
      <Stack.Screen name={StackScreens.question} component={QuestionLayout} />
    )}
  </>
);

export default function StackNavigator() {
  const authState = useContext(AuthContext);
  const isAdmin = authState?.role === RoleEnum.admin;
  const isSubAdmin = authState?.role === RoleEnum.subAdmin;
  const allowedForms = getAllowedForms(authState?.profile?.allowedForms);
  const canAccessForm = (formId: FormPermissionId) =>
    authState?.role !== RoleEnum.subAdmin || allowedForms.includes(formId);

  if (authState?.initializing) {
    return <LoadingScreen />;
  }

  if (!authState?.user) {
    return (
      <Stack.Navigator key="guest" id="RootStack" screenOptions={{ headerShown: false }} initialRouteName={StackScreens.login}>
        {renderAuthScreens()}
      </Stack.Navigator>
    );
  }

  if (isAdmin) {
    return (
      <Stack.Navigator key="admin" id="RootStack" screenOptions={{ headerShown: false }} initialRouteName={StackScreens.adminHome}>
        <Stack.Screen name={StackScreens.adminHome} component={AdminHomeLayout} />
        <Stack.Screen name={StackScreens.home} component={AdminHomeLayout} />
        <Stack.Screen name={StackScreens.adminProfileCheck} component={AdminProfileCheckLayout} />
        <Stack.Screen name={StackScreens.adminCreateSubAccount} component={AdminCreateSubAccountLayout} />
        {renderCommonAppScreens(canAccessForm)}
      </Stack.Navigator>
    );
  }

  if (isSubAdmin) {
    return (
      <Stack.Navigator key="sub-admin" id="RootStack" screenOptions={{ headerShown: false }} initialRouteName={StackScreens.subAdminHome}>
        <Stack.Screen name={StackScreens.subAdminHome} component={SubAdminHomeLayout} />
        <Stack.Screen name={StackScreens.home} component={SubAdminHomeLayout} />
        {renderCommonAppScreens(canAccessForm)}
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator key="user" id="RootStack" screenOptions={{ headerShown: false }} initialRouteName={StackScreens.home}>
      <Stack.Screen name={StackScreens.home} component={HomeLayout} />
      {renderCommonAppScreens(canAccessForm)}
    </Stack.Navigator>
  );
}
