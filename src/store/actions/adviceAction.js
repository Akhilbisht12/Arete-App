import * as actionTypes from '../types/adviceTypes';

export const addAdvice = () => {
  return {
    type: actionTypes.ADD_ADVICE,
    payload: {},
  };
};
export const addTreatment = item => {
  return {
    type: actionTypes.ADD_TREATMENT,
    payload: {
      item,
    },
  };
};
export const editAdvice = item => {
  return {
    type: actionTypes.EDIT_ADVICE,
    payload: {
      item,
    },
  };
};
export const addWardBed = item => {
  return {
    type: actionTypes.ADD_WARD_BED,
    payload: {
      item,
    },
  };
};
export const addWardStay = item => {
  return {
    type: actionTypes.ADD_WARD_STAY,
    payload: {
      item,
    },
  };
};
export const addIcuBed = item => {
  return {
    type: actionTypes.ADD_ICU_BED,
    payload: {
      item,
    },
  };
};
export const addIcuStay = item => {
  return {
    type: actionTypes.ADD_ICU_STAY,
    payload: {
      item,
    },
  };
};
export const editIPDPackages = item => {
  return {
    type: actionTypes.EDIT_IPD_PACKAGES,
    payload: {
      item,
    },
  };
};
export const addService = item => {
  return {
    type: actionTypes.ADD_SERVICE,
    payload: {
      item,
    },
  };
};
export const editService = item => {
  return {
    type: actionTypes.EDIT_SERVICE,
    payload: {
      item,
    },
  };
};
export const deleteService = item => {
  return {
    type: actionTypes.DELETE_SERVICE,
    payload: {
      item,
    },
  };
};
export const addCharge = () => {
  return {
    type: actionTypes.ADD_CHARGE,
    payload: {},
  };
};
export const editCharge = item => {
  return {
    type: actionTypes.EDIT_CHARGE,
    payload: {
      item,
    },
  };
};
export const editEmergency = item => {
  return {
    type: actionTypes.EDIT_EMERGENCY,
    payload: {
      item,
    },
  };
};
export const deleteAddCharge = item => {
  return {
    type: actionTypes.DELETE_ADD_CHARGE,
    payload: {
      item,
    },
  };
};
export const addDoctor = item => {
  return {
    type: actionTypes.ADD_DOCTOR,
    payload: {
      item,
    },
  };
};
export const addRemark = item => {
  return {
    type: actionTypes.ADD_REMARK,
    payload: {
      item,
    },
  };
};
export const addPaymentType = item => {
  return {
    type: actionTypes.ADD_PAYMENT_TYPE,
    payload: {
      item,
    },
  };
};
export const addPaymentCompany = item => {
  return {
    type: actionTypes.ADD_PAYMENT_COMPANY,
    payload: {
      item,
    },
  };
};
export const addDoctorToSurgery = item => {
  return {
    type: actionTypes.ADD_DOCTOR_TO_SURGERY,
    payload: {
      item,
    },
  };
};
export const deleteDoctorFromSurgery = item => {
  return {
    type: actionTypes.DELETE_DOCTOR_FROM_SURGERY,
    payload: {
      item,
    },
  };
};
export const addMinorToSurgery = item => {
  return {
    type: actionTypes.ADD_MINOR_TO_SURGERY,
    payload: {
      item,
    },
  };
};
export const editMinorSurgeryPercent = item => {
  return {
    type: actionTypes.EDIT_MINOR_SURGERY_PERCENT,
    payload: {
      item,
    },
  };
};
export const addNewInvestigation = item => {
  return {
    type: actionTypes.ADD_NEW_INVESTIGATION,
    payload: {
      item,
    },
  };
};
export const addInvestigation = item => {
  return {
    type: actionTypes.ADD_INVESTIGSTION,
    payload: {
      item,
    },
  };
};
export const deleteInvestigation = item => {
  return {
    type: actionTypes.DELETE_INVESTIGATION,
    payload: {
      item,
    },
  };
};
export const addNewOTH = item => {
  return {
    type: actionTypes.ADD_NEW_OTH,
    payload: {
      item,
    },
  };
};
export const addOTH = item => {
  return {
    type: actionTypes.ADD_OTH,
    payload: {
      item,
    },
  };
};
export const deleteOTH = item => {
  return {
    type: actionTypes.DELETE_OTH,
    payload: {
      item,
    },
  };
};
export const addOTHTotal = item => {
  return {
    type: actionTypes.ADD_OTH_TOTAL,
    payload: {
      item,
    },
  };
};
export const addNewProcedure = () => {
  return {
    type: actionTypes.ADD_NEW_PROCEDURE,
    payload: {},
  };
};
export const addProcedure = item => {
  return {
    type: actionTypes.ADD_PROCEDURE,
    payload: {
      item,
    },
  };
};
export const deleteProcedure = item => {
  return {
    type: actionTypes.DELETE_PROCEDURE,
    payload: {
      item,
    },
  };
};
export const addNewDiagnostic = () => {
  return {
    type: actionTypes.ADD_NEW_DIAGNOSTIC,
    payload: {},
  };
};
export const addDiagnostic = item => {
  return {
    type: actionTypes.ADD_DIAGNOSTIC,
    payload: {
      item,
    },
  };
};
export const deleteDiagnostic = item => {
  return {
    type: actionTypes.DELETE_DIAGNOSTIC,
    payload: {
      item,
    },
  };
};
export const addNewRadiology = () => {
  return {
    type: actionTypes.ADD_NEW_RADIOLOGY,
    payload: {},
  };
};
export const addRadiology = item => {
  return {
    type: actionTypes.ADD_RADIOLOGY,
    payload: {
      item,
    },
  };
};
export const deleteRadiology = item => {
  return {
    type: actionTypes.DELETE_RADIOLOGY,
    payload: {
      item,
    },
  };
};
export const addNewPackage = () => {
  return {
    type: actionTypes.ADD_NEW_PACKAGE,
    payload: {},
  };
};
export const addPackage = item => {
  return {
    type: actionTypes.ADD_PACKAGE,
    payload: {
      item,
    },
  };
};
export const deletePackage = item => {
  return {
    type: actionTypes.DELETE_PACKAGE,
    payload: {
      item,
    },
  };
};
export const addMedicineCharge = item => {
  return {
    type: actionTypes.ADD_MEDICINE_CHARGE,
    payload: {
      item,
    },
  };
};
export const addEquipmentCharge = item => {
  return {
    type: actionTypes.ADD_EQUIPMENT_CHARGE,
    payload: {
      item,
    },
  };
};
export const addBloodRequirement = item => {
  return {
    type: actionTypes.ADD_BLOOD_REQUIREMENT,
    payload: {
      item,
    },
  };
};
export const addStent = item => {
  return {
    type: actionTypes.ADD_STENT,
    payload: {
      item,
    },
  };
};
export const addInvestigationTotal = item => {
  return {
    type: actionTypes.ADD_INVESTIGATION_TOTAL,
    payload: {
      item,
    },
  };
};
export const addProcedureTotal = item => {
  return {
    type: actionTypes.ADD_PROCEDURE_TOTAL,
    payload: {
      item,
    },
  };
};
export const addVisitTotal = item => {
  return {
    type: actionTypes.VISIT_TOTAL,
    payload: {
      item,
    },
  };
};
export const editStep = item => {
  return {
    type: actionTypes.EDIT_STEP,
    payload: {
      item,
    },
  };
};
export const restoreState = item => {
  return {
    type: actionTypes.RESTORE_STATE,
    payload: {
      item,
    },
  };
};
