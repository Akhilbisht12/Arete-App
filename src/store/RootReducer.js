import {combineReducers} from 'redux';
import adviceReducer from './reducers/adviceReducers';
import patientReducer from './reducers/patientReducers';
import SAEstimaterRed from './reducers/SAEstimatorRed';

const RootReducer = combineReducers({
  advice: adviceReducer,
  patient: patientReducer,
  SAEst: SAEstimaterRed,
});

export default RootReducer;
