import * as actionTypes from '../types/SAEstimatorTypes';
export const addFullName = item => {
  return {
    type: actionTypes.ADD_FULL_NAME,
    payload: {item},
  };
};
export const addSpeciality = item => {
  return {
    type: actionTypes.ADD_SPECIALITY,
    payload: {item},
  };
};

export const addAdvice = () => {
  return {
    type: actionTypes.ADD_ADVICE,
    payload: {},
  };
};
//adding diagnois
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
//non packages
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

export const editEmergency = item => {
  return {
    type: actionTypes.EDIT_EMERGENCY,
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
//payment
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
export const addSameSite = item => {
  return {
    type: actionTypes.ADD_SAME_SITE,
    payload: {
      item,
    },
  };
};

export const addSameSitePkg = item => {
  return {
    type: actionTypes.ADD_SAME_SITE_PKG,
    payload: {
      item,
    },
  };
};

//add investigation
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
//oth
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

//procedure
export const addNewProcedure = () => {
  console.log('hit');
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

export const addDiagnostic = item => {
  return {
    type: actionTypes.ADD_DIAGNOSTIC,
    payload: {
      item,
    },
  };
};
export const isDiagnostics = item => {
  return {
    type: actionTypes.IS_DIAG,
    payload: {
      item,
    },
  };
};
//package
export const addNewPackage = () => {
  return {
    type: actionTypes.ADD_NEW_PACKAGE,
    payload: {},
  };
};
export const addNewNonPackage = () => {
  return {
    type: actionTypes.ADD_NEW_NON_PACKAGE,
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
//other charges
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
export const addOtherMisc = item => {
  console.log(item);
  return {
    type: actionTypes.ADD_MISCELLANEOUS,
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

// misc
export const addMiscPackage = item => {
  return {
    type: actionTypes.ADD_MISC,
    payload: {item},
  };
};

export const addNewMisc = item => {
  return {
    type: actionTypes.ADD_NEW_MISC,
    payload: {},
  };
};
export const deleteMisc = item => {
  return {
    type: actionTypes.DELETE_MISC,
    payload: {
      item,
    },
  };
};

// adm type and rad adv
export const adm_type = item => {
  return {
    type: actionTypes.ADM_TYPE,
    payload: {item},
  };
};
export const rad_type = item => {
  return {
    type: actionTypes.RAD_ADV,
    payload: {
      item,
    },
  };
};

export const isEst = item => {
  return {
    type: actionTypes.IS_EST,
    payload: {
      item,
    },
  };
};
export const isAdm = item => {
  return {
    type: actionTypes.IS_ADM,
    payload: {
      item,
    },
  };
};
export const CapPres = item => {
  return {
    type: actionTypes.ADD_PRESCRIPTION,
    payload: {
      item,
    },
  };
};
