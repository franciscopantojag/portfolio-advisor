import store from "./redux/store";
import { setRiskLevel } from "./redux/actions";
import { calculatePortfolio } from "./utils";

const currentRiskLevel = 8;

const currentPortfolio = {
  portfolio: {
    bonds: { old: "10", new: "", difference: "" },
    foreign: { old: "45", new: "", difference: "" },
    large_cap: { old: "12", new: "", difference: "" },
    mid_cap: { old: "14", new: "", difference: "" },
    small_cap: { old: "80", new: "", difference: "" },
  },
  arr: null,
};

test("set risk level", () => {
  store.dispatch(setRiskLevel(1));
  expect(store.getState().riskLevel).toBe(1);
});

test("calculate portfolio", () => {
  const expectedNewPortfolio = {
    portfolio: {
      bonds: { old: "10", new: 16.1, difference: 6.1 },
      foreign: { old: "45", new: 32.2, difference: -12.8 },
      large_cap: { old: "12", new: 32.2, difference: 20.2 },
      mid_cap: { old: "14", new: 64.4, difference: 50.4 },
      small_cap: { old: "80", new: 16.1, difference: -63.9 },
    },
    arr: [
      "Transfer $50.4 from Small Cap to Mid Cap",
      "Transfer $6.1 from Foreign to Bonds",
      "Transfer $6.7 from Foreign to Large Cap",
      "Transfer $13.5 from Small Cap to Large Cap",
    ],
  };

  const newPortfolio = calculatePortfolio(currentPortfolio, currentRiskLevel);
  expect(newPortfolio).toEqual(expectedNewPortfolio);
});
