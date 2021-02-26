import { returnTypeSetRiskLevel } from "../../types";
import { SET_RISK_LEVEL } from "../actions/actionTypes";

const initialState = null;

const riskLevelReducer = (
  state = initialState,
  action: returnTypeSetRiskLevel
) => {
  switch (action.type) {
    case SET_RISK_LEVEL: {
      const { riskLevel } = action.payload;
      return riskLevel;
    }

    default:
      return state;
  }
};
export default riskLevelReducer;
