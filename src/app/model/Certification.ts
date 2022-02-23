export interface Certification {
  id: number;
  name: string;
  date: Date;
  endDate?: Date;
  url?: string;
  credential: string;
  society: string;
  noExpiration: boolean;
}
