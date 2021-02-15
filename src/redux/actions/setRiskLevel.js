import { SET_RISK_LEVEL } from "./actionTypes";
const setRiskLevel = (riskLevel) => ({
  type: SET_RISK_LEVEL,
  payload: {
    riskLevel,
  },
});
export default setRiskLevel;
