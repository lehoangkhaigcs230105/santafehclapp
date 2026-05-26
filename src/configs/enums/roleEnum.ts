export enum RoleEnum {
  admin = "admin",
  user = "user",
  subAdmin = "subAdmin",
}

export const normalizeRole = (role?: unknown): RoleEnum | undefined => {
  if (role === undefined || role === null) return undefined;

  const value = String(role).toLowerCase();

  if (value === "1" || value === "admin") return RoleEnum.admin;
  if (value === "2" || value === "subadmin" || value === "sub_admin") {
    return RoleEnum.subAdmin;
  }
  if (value === "0" || value === "user") return RoleEnum.user;

  return undefined;
};
