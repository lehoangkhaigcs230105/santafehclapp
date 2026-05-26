import styles from "src/assets/styles/authStyles/sms.style";
import { AuthContext } from "src/v1/logics/contexts/AuthContext";
import { ProfileDTO } from "src/v1/logics/data/DTO/authDTOs/ProfileDTO";
import { useLocalSearchParams } from "expo-router";
import React, { useContext, useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View
} from "react-native";
import ButtonForm from "../../components/ButtonForm";
import HeaderTabs from "../../components/Header";



const SmsLayout: React.FC = () => {
  const numInputs = 6;
  const [otp, setOtp] = useState<string[]>(Array(numInputs).fill(""));
  const { driverLicense,email,firstName,lastName,phoneNumber,password,confirmPassword } = useLocalSearchParams();
  const authState = useContext(AuthContext);
  
  const inputsRef = useRef<Array<TextInput | null>>(
    Array(numInputs).fill(null)
  );

  const handleChange = (text: string, index: number) => {
    if (!/^\d?$/.test(text)) return;
    const next = [...otp];
    next[index] = text;
    setOtp(next);
    if (text && index < numInputs - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleNext = () => {
    if (otp.every((d) => d !== "")) {
      const newUser : ProfileDTO = {
        emailConfirmationCode: otp.join(""),
        driverLicense: driverLicense as string,
        email: email as string,
        firstName: firstName as string,
        lastName: lastName as string,
        phoneNumber: phoneNumber as string,
        password: password as string,
        confirmPassword: confirmPassword as string,
      };
      // console.log("OTP:", otp.join(""));
      authState.confirmEmail({email: newUser.email,confirmCode: otp.join("")})

    } else {
      alert("Please enter full OTP");
    }
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="SMS OTP Verification" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* OTP Title */}
        <Text style={styles.otpText}> SMS OTP</Text>

        {/* OTP Inputs */}
        <View style={styles.otpContainer}>
          {otp.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={(ref) => {
                inputsRef.current[idx] = ref;
              }}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, idx)}
              onKeyPress={(e) => handleKeyPress(e, idx)}
            />
          ))}
        </View>

        <ButtonForm onPress={handleNext} text="Next" style={styles.nextBtn}/>
      </ScrollView>
    </View>
  );
};

export default SmsLayout;
