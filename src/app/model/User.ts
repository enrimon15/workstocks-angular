import {Address} from "./Address";

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  jobTitle?: string;
  overview?: string;
  website?: string;
  phoneNumber?: string;
  minimumExpectedSalary?: number;
  address?: Address;
  dateOfBirth?: Date;
  gender?: string;
  skills?: string;
  certifications?: string;
  qualifications?: string;
  experiences?: string;
  photo?: string;
  cv?: boolean;
}
