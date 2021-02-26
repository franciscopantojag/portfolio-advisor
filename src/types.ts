export interface Category {
  old: string;
  new: number | string;
  difference: number | string;
}
export interface Portfolio {
  bonds: Category;
  large_cap: Category;
  mid_cap: Category;
  foreign: Category;
  small_cap: Category;
}
export interface SwapPortfolio {
  Bonds: "bonds";
  "Large Cap": "large_cap";
  "Mid Cap": "mid_cap";
  Foreign: "foreign";
  "Small Cap": "small_cap";
}
export interface EntirePortfolio {
  portfolio: Portfolio;
  arr: [string] | null;
}

export interface State {
  riskLevel: number | null;
}
export interface returnTypeSetRiskLevel {
  type: string;
  payload: {
    riskLevel: number;
  };
}
export interface Json {
  [key: string]: string;
}
