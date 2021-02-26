import { returnTypeSetRiskLevel } from "../../types";
import { SET_RISK_LEVEL } from "./actionTypes";
const setRiskLevel = (riskLevel: number): returnTypeSetRiskLevel => ({
  type: SET_RISK_LEVEL,
  payload: {
    riskLevel,
  },
});
export default setRiskLevel;
