export const riskLevelLabelMapper = {
  bonds: "Bonds",
  large_cap: "Large Cap",
  mid_cap: "Mid Cap",
  foreign: "Foreign",
  small_cap: "Small Cap",
};
export const lavelRiskLevelMapper = {
  Bonds: "bonds",
  "Large Cap": "large_cap",
  "Mid Cap": "mid_cap",
  Foreign: "foreign",
  "Small Cap": "small_cap",
};
export const checkAllValuesInPortfolioCanBeNumbers = (portfolio) => {
  const regex = /^[0-9]+[.]{0,1}[0-9]{0,2}$/;

  let result = true;
  for (let key in portfolio) {
    if (!regex.test(portfolio[key].old.toString())) {
      result = false;
      break;
    }
  }
  return result;
};

export const initialPortfolio = {
  bonds: {
    old: "",
    new: "",
    difference: "",
  },
  large_cap: {
    old: "",
    new: "",
    difference: "",
  },
  mid_cap: {
    old: "",
    new: "",
    difference: "",
  },
  foreign: {
    old: "",
    new: "",
    difference: "",
  },
  small_cap: {
    old: "",
    new: "",
    difference: "",
  },
};
