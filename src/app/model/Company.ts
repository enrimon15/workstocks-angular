import {Address} from "./Address";
import {JobOffer} from "./JobOffer";

export interface Company {
  id: number;
  name: string;
  vatNumber?: number;
  companyForm?: string;
  overview?: string;
  employeesNumber?: number;
  foundationYear?: number;
  website?: string;
  email: string;
  slogan?: string;
  telephone?: string;
  workingPlaces: WorkingPlace[];
  jobOffers?: JobOffer[];
  address: Address;
  photo?: string;
  ratingStats: ReviewStats;
  detailsURL: string;
}

export interface WorkingPlace {
  id: number;
  address: Address;
  mainWorkingPlace: boolean;
  workingPlaceType: string;
}

export interface ReviewStats {
  ratingAverage: number;
  reviewNumber: number;
}
