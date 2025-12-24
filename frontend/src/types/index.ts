export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  householdId: string | null;
  role: string;
  createdAt: string;
}

export interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  householdName?: string;
}

export interface LoginData {
  email: string;
  password: string;
}
