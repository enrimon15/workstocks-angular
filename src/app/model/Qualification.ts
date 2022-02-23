export interface Qualification {
  id: number;
  name: string;
  startDate: Date;
  endDate?: Date;
  inProgress: boolean;
  institute: string;
  valuation?: string;
  description?: string;
}
