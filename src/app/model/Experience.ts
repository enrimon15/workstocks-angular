export interface Experience {
  id: number;
  jobPosition: string;
  startDate: Date;
  endDate?: Date;
  inProgress: boolean;
  company: string;
  description?: string;
}
