export interface AuthData {
  isLoggedIn: boolean;
  token: string | null;
  error: string | null;
  userData: any;
  sessionExpired: boolean;
}
export interface UserData {
  LoginId: string;
  Token: string;
  FirstName: string;
  LastName: string;
  Email: string;
  UserBlocked: number;
  BetBlocked: number;
  Level5: string;
  Level4: string;
  Level3: string;
  Level2: string;
  Level1: string;
  Level0: string;
  OneClickBet: number;
  DefaultStake: string;
  Stake1: string;
  Stake2: string;
  Stake3: string;
  Stake4: string;
  Stake5: string;
  Stake6: string;
  Stake7: string;
  Stake8: string;
  ChangePassword: number;
  TwoFacter: number;
  WhiteLevel: number;
  CoinType: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}
export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
