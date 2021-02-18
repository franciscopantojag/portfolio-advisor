import { createStore } from "redux";
import allReducer from "./reducers";

const store = createStore(allReducer);
export default store;
