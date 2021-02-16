import recordedTransfers from "./recordTransfers";
const floorTo2Digits = (num) => Math.floor((num + Number.EPSILON) * 100) / 100;
const roundTo2Digits = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
const riskLevelLabelMapper = {
  bonds: "Bonds",
  large_cap: "Large Cap",
  mid_cap: "Mid Cap",
  foreign: "Foreign",
  small_cap: "Small Cap",
};
const lavelRiskLevelMapper = {};
for (let key in riskLevelLabelMapper) {
  lavelRiskLevelMapper[riskLevelLabelMapper[key].toString()] = key;
}
const initialPortfolio = {
  portfolio: {},
  arr: null,
};
for (let key in riskLevelLabelMapper) {
  initialPortfolio.portfolio[key] = {
    old: "",
    new: "",
    difference: "",
  };
}

const checkAllValuesInPortfolioCanBeNumbers = (portfolio) => {
  const regex = /^[0-9]+[.]{0,1}[0-9]{0,2}$/;
  let result = true;
  for (let key in portfolio.portfolio) {
    if (!regex.test(portfolio.portfolio[key].old.toString())) {
      result = false;
      break;
    }
  }
  return result;
};

const calculatePortfolio = (portfolio, setPortfolio, actualRiskLevelObj) => {
  if (!checkAllValuesInPortfolioCanBeNumbers(portfolio)) {
    return;
  }
  let total = 0;
  for (let key in portfolio.portfolio) {
    total += Number(portfolio.portfolio[key].old);
  }
  total = roundTo2Digits(total);
  const newObj = {};
  for (let key in portfolio) {
    newObj[key] = portfolio[key];
  }
  for (let key in newObj.portfolio) {
    newObj.portfolio[key] = {
      ...newObj.portfolio[key],
      new: floorTo2Digits(total * (actualRiskLevelObj[key] / 100)),
    };
  }
  let newTotal = 0;
  for (let key in newObj.portfolio) {
    newTotal += Number(newObj.portfolio[key].new);
  }
  newTotal = roundTo2Digits(newTotal);
  const diff = roundTo2Digits(total - newTotal);
  const portfolioKeys = Object.keys(newObj.portfolio);
  for (let i = 0; i < portfolioKeys.length; i++) {
    if (i === portfolioKeys.length - 1) {
      newObj.portfolio[portfolioKeys[i]] = {
        ...newObj.portfolio[portfolioKeys[i]],
        new: roundTo2Digits(newObj.portfolio[portfolioKeys[i]].new + diff),
      };
    }
  }
  // calculate difference
  for (let key in newObj.portfolio) {
    newObj.portfolio[key] = {
      ...newObj.portfolio[key],
      difference: roundTo2Digits(
        Number(newObj.portfolio[key].new) - Number(newObj.portfolio[key].old)
      ),
    };
  }
  newObj.arr = recordedTransfers(newObj.portfolio, riskLevelLabelMapper);
  setPortfolio(() => newObj);
};

export {
  riskLevelLabelMapper,
  lavelRiskLevelMapper,
  initialPortfolio,
  checkAllValuesInPortfolioCanBeNumbers,
  calculatePortfolio,
};
