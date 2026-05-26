import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { FormPermissionId } from "@/configs/formPermissions";
import { firebaseAuth, firestore } from "firebase/firebaseConfig";
import { loginWithFirebase } from "@/v1/logics/services/firebaseLogin.service";
import { logoutFirebase } from "@/v1/logics/services/firebaseLogout.service";
import { registerWithFirebase } from "@/v1/logics/services/firebaseRegister.service";
import { normalizeRole, RoleEnum } from "@/configs/enums/roleEnum";
import { LoginDTO } from "../data/DTO/authDTOs/LoginDTO";
import { ProfileDTO } from "../data/DTO/authDTOs/ProfileDTO";

type ConfirmEmailDTO = {
  email: string;
  confirmCode: string;
};

type LoginResponse = {
  success: boolean;
  role?: RoleEnum;
};

export type AuthUserProfile = {
  address?: string;
  allowedForms?: FormPermissionId[];
  city?: string;
  companyName?: string;
  dateOfBirth?: string;
  driverLicense?: string;
  email?: string;
  expireOfDriverLicense?: string;
  firstName?: string;
  fullName?: string;
  lastName?: string;
  note?: string;
  parentAdminId?: string | null;
  phoneNumber?: string;
  role?: RoleEnum;
  state?: string;
  status?: string;
  [key: string]: unknown;
};

type AuthContextType = {
  user: User | null;
  role?: RoleEnum;
  profile: AuthUserProfile | null;
  initializing: boolean;
  logIn: (data: LoginDTO) => Promise<LoginResponse>;
  register: (data: ProfileDTO) => Promise<void>;
  logOut: () => Promise<void>;
  confirmEmail: (data: ConfirmEmailDTO) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<RoleEnum>();
  const [profile, setProfile] = useState<AuthUserProfile | null>(null);
  const [initializing, setInitializing] = useState(true);

  const logIn = async (dto: LoginDTO): Promise<LoginResponse> => {
    try {
      const loginName = dto.email ?? dto.driverLicense;

      if (!loginName) {
        throw new Error("Vui lòng nhập Email hoặc Driver License");
      }

      const result = await loginWithFirebase(loginName, dto.password);

      setUser(result.authUser);
      setRole(result.role);
      setProfile({
        ...result.profile,
        role: result.role,
      });

      return {
        success: true,
        role: result.role,
      };
    } catch (e) {
      console.log("Login error:", e);
      return { success: false };
    }
  };

  const register = async (dto: ProfileDTO) => {
    try {
      await registerWithFirebase(dto);
      await logoutFirebase();
      setUser(null);
      setRole(undefined);
      setProfile(null);
      Alert.alert("Success", "Account created successfully");
    } catch (e) {
      Alert.alert("Register failed");
    }
  };

  const confirmEmail = async ({ email, confirmCode }: ConfirmEmailDTO) => {
    try {
      console.log("Confirm email:", email, confirmCode);
      Alert.alert("Success", "Email verified successfully");
    } catch (e) {
      Alert.alert("Error", "OTP verification failed");
    }
  };

  const logOut = async () => {
    await logoutFirebase();
    setUser(null);
    setRole(undefined);
    setProfile(null);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setRole(undefined);
        setProfile(null);
        setInitializing(false);
        return;
      }

      setUser(firebaseUser);

      try {
        const snap = await getDoc(doc(firestore, "users", firebaseUser.uid));

        if (snap.exists()) {
          const data = snap.data();
          const userRole = normalizeRole(data.role) ?? RoleEnum.user;

          setRole(userRole);
          setProfile({
            ...data,
            role: userRole,
          });
        } else {
          setRole(RoleEnum.user);
          setProfile({
            role: RoleEnum.user,
            allowedForms: [],
            parentAdminId: null,
            status: "active",
          });
        }
      } finally {
        setInitializing(false);
      }
    });

    return unsub;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        profile,
        initializing,
        logIn,
        register,
        logOut,
        confirmEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
