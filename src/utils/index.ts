import { EntirePortfolio, Json, Portfolio, SwapPortfolio } from "../types";
import data from "../data.json";
import recordedTransfers from "./recordTransfers";

const regexNumberMaxTwoFloatingPoints = /^[0-9]+[.]{0,1}[0-9]{0,2}$/;
const floorTo2Digits = (num: number) =>
  Math.floor((num + Number.EPSILON) * 100) / 100;
const roundTo2Digits = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;
const swap = (json: Json) => {
  const ret: Json = {};
  for (let key in json) {
    ret[json[key]] = key;
  }
  return ret;
};
const riskLevelLabelMapper = {
  bonds: "Bonds",
  large_cap: "Large Cap",
  mid_cap: "Mid Cap",
  foreign: "Foreign",
  small_cap: "Small Cap",
};
const labelRiskLevelMapper: SwapPortfolio = (swap(
  riskLevelLabelMapper
) as unknown) as SwapPortfolio;
const initialPortfolio: EntirePortfolio = {
  portfolio: {} as Portfolio,
  arr: null,
};
let key: keyof typeof riskLevelLabelMapper;
for (key in riskLevelLabelMapper) {
  initialPortfolio.portfolio[key] = {
    old: "",
    new: "",
    difference: "",
  };
}
const checkAllValuesInPortfolioCanBeNumbers = (portfolio: EntirePortfolio) => {
  const regex = regexNumberMaxTwoFloatingPoints;
  let result = true;
  let key: keyof typeof portfolio.portfolio;
  for (key in portfolio.portfolio) {
    if (!regex.test(portfolio.portfolio[key].old.toString())) {
      result = false;
      break;
    }
  }
  return result;
};
const calculatePortfolio = (
  portfolio: EntirePortfolio,
  currentRiskLevel: number
) => {
  if (!checkAllValuesInPortfolioCanBeNumbers(portfolio)) {
    return;
  }
  let total = 0;
  let key: keyof typeof portfolio.portfolio;
  for (key in portfolio.portfolio) {
    total += Number(portfolio.portfolio[key].old);
  }
  total = roundTo2Digits(total);
  // We define a newObj which will be the new portfolio object
  const newObj = { ...portfolio };
  const actualRiskLevelObj = data.riskLevels.find(
    (riskObj) => riskObj.level === currentRiskLevel
  );

  for (key in newObj.portfolio) {
    newObj.portfolio[key] = {
      ...newObj.portfolio[key],
      new: floorTo2Digits(total * (actualRiskLevelObj![key] / 100)),
    };
  }
  let newTotal = 0;

  for (key in newObj.portfolio) {
    newTotal += Number(newObj.portfolio[key].new);
  }
  newTotal = roundTo2Digits(newTotal);
  const diff = roundTo2Digits(total - newTotal);
  const portfolioKeys: [typeof key] = Object.keys(newObj.portfolio) as [
    typeof key
  ];
  // We add the difference to the last value of new amount
  newObj.portfolio[portfolioKeys[portfolioKeys.length - 1]] = {
    ...newObj.portfolio[portfolioKeys[portfolioKeys.length - 1]],
    new: roundTo2Digits(
      Number(newObj.portfolio[portfolioKeys[portfolioKeys.length - 1]].new) +
        diff
    ),
  };

  // calculate difference
  for (key in newObj.portfolio) {
    newObj.portfolio[key] = {
      ...newObj.portfolio[key],
      difference: roundTo2Digits(
        Number(newObj.portfolio[key].new) - Number(newObj.portfolio[key].old)
      ),
    };
  }
  newObj.arr = recordedTransfers(newObj.portfolio, riskLevelLabelMapper) as [
    string
  ];
  return newObj;
};
export {
  riskLevelLabelMapper,
  labelRiskLevelMapper,
  initialPortfolio,
  checkAllValuesInPortfolioCanBeNumbers,
  calculatePortfolio,
  regexNumberMaxTwoFloatingPoints,
  floorTo2Digits,
  roundTo2Digits,
  swap,
};
