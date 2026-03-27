export type StudyLevel = "UG" | "PG";

export interface RoiRequest {
  country: string;
  stream: string;
  level: StudyLevel;
  college_name: string;
  course_name: string;
  target_year: number;
  monthly_investment?: number;
  current_savings: number;
  show_living_cost: boolean;
  expected_return_rate: number;
  inflation_override?: number;
  scholarship_percent: number;
  loan_interest_rate?: number;
}

export interface RoiBreakdown {
  tuition: number;
  living: number;
  duration: number;
  inflation: {
    education: number;
    living: number;
  };
}

export interface RoiResponse {
  country: string;
  stream: string;
  level: StudyLevel;
  college_name: string;
  course_name: string;
  ranking: string;
  current_cost: number;
  future_cost: number;
  net_cost: number;
  monthly_sip_required: number;
  future_value_if_investing: number;
  roi_percent: number;
  total_earnings_5yr: number;
  payback_years: number;
  dataset_roi: number;
  dataset_payback_years: number;
  breakdown: RoiBreakdown;
}

export interface CatalogOptions {
  countries: string[];
  streams: string[];
  levels: string[];
}

export interface CalculatorFormState {
  country: string;
  stream: string;
  level: StudyLevel;
  collegeName: string;
  courseName: string;
  targetYear: number;
  monthlyInvestment: string;
  currentSavings: string;
  showLivingCost: boolean;
  expectedReturnRate: number;
  scholarshipPercent: string;
}
