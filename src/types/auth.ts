export interface User {
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  expiredAt: string;
  user: User;
}

export interface UserProfile {
  name: string;
  email: string;
}

export interface AuthState {
  token: string;
  expiredAt: string;
  profile: UserProfile;
  loginLoading: boolean;
  loginError: string | null;
}
