import * as actionTypes from '../types/patientTypes';
const patient = {
  info: {},
};

const patientReducer = (state = patient, action) => {
  switch (action.type) {
    case actionTypes.ADD_PATIENT:
      const {patient} = action.payload.item;
      return {
        ...state,
        info: patient,
      };
    default:
      return state;
  }
};

export default patientReducer;
