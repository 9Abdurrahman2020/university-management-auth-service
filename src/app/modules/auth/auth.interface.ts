export type ILoginData = {
  id: string;
  password: string;
};
export type IChangePassData = {
  oldPassword: string;
  newPassword: string;
};
export type ILoginServiceReturn = {
  accessToken: string;
  refreshToken: string;
  needPasswordChange: boolean;
};
export type IRefreshTokenServiceReturn = {
  accessToken: string;
};
