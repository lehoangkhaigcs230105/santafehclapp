import { FormPermissionId } from "@/configs/formPermissions";
import { RoleEnum } from "@/configs/enums/roleEnum";

export interface ProfileDTO {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName?: string;
  driverLicense: string;
  state?: string;
  dateOfBirth?: string;
  expireOfDriverLicense?: string;
  address?: string;
  city?: string;
  note?: string;
  password?: string;
  confirmPassword?: string;
  emailConfirmationCode?: string;
  fullName?: string;
  role?: RoleEnum;
  allowedForms?: FormPermissionId[];
  parentAdminId?: string | null;
  status?: "active" | "inactive";
}
