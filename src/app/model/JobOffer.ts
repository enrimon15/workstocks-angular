import {Company} from "./Company";
import {Address} from "./Address";

export interface JobOffer {
  id: number;
  createdAt: Date;
  company: Company;
  title: string;
  description: string;
  dueDate: Date;
  contractType: string;
  gender: string;
  minSalary: number;
  maxSalary: number;
  experience: number;
  address: Address;
  skills: string[];
  detailsURL: string;
}
