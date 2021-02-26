import riskLevelReducer from "./riskLevel";
import { combineReducers } from "redux";

const allReducer = combineReducers({
  riskLevel: riskLevelReducer,
});
export default allReducer;
