export interface LoginResponse {
  id: number;
  name: string;
  surname: string;
  email: string;
  jobTitle?: string;
  photo?: string;
  token: string;
}
