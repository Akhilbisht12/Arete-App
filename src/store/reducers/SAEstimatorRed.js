import * as actionTypes from '../types/SAEstimatorTypes';

const initAdvice = {
  patient: Object,
  diagnosis: '',
  doctor: '',
  radiation: Boolean,
  admission_type: '',
  diagnostics: [],
  isIPDPackage: null,
  isEmergency: null,
  step: 0,
  ward: '',
  icu: {
    icu_type: '',
    days: '',
  },
  speciality: '',
  payment: {
    mode: '',
    company: '',
  },
  other: {
    medicine: '',
    equipment: '',
    blood: '',
    stent: '',
    miscellaneous: '',
  },
  nonPackages: {
    services: [
      {
        i: 0,
      },
    ],
  },
  packages: {
    services: [
      {
        i: 0,
      },
    ],
  },
  misc: {
    services: [
      {
        i: 0,
      },
    ],
  },
  investigations: {
    services: [
      {
        i: 0,
      },
    ],
    total: {
      calc: false,
      value: '',
    },
  },
  procedures: {
    services: [
      {
        i: 0,
      },
    ],
    total: {
      calc: false,
      value: '',
    },
  },
};

const SAEstimatorRed = (state = initAdvice, action) => {
  switch (action.type) {
    //add full patient
    case actionTypes.ADD_FULL_NAME:
      const {patient} = action.payload.item;
      return {
        ...state,
        patient: patient,
      };
    // admission details
    case actionTypes.ADM_TYPE:
      const {adm_type} = action.payload.item;
      return {
        ...state,
        admission_type: adm_type,
      };
    case actionTypes.RAD_ADV:
      const {rad_adv} = action.payload.item;
      return {
        ...state,
        radiation: rad_adv,
      };
    // Estimate Type
    case actionTypes.EDIT_IPD_PACKAGES:
      const {ipd} = action.payload.item;
      return {
        ...state,
        isIPDPackage: ipd,
      };
    case actionTypes.ADD_TREATMENT:
      return {
        ...state,
        diagnosis: action.payload.item.treatment,
      };

    case actionTypes.ADD_WARD_STAY:
      const {wardStay} = action.payload.item;
      return {
        ...state,
        ward: wardStay,
      };
    case actionTypes.ADD_ICU_STAY:
      const {icuStay} = action.payload.item;
      return {
        ...state,
        icu: {...state.icu, days: icuStay},
      };
    case actionTypes.ADD_ICU_BED:
      const {type} = action.payload.item;
      return {
        ...state,
        icu: {...state.icu, icu_type: type},
      };
    // non packages
    case actionTypes.ADD_NEW_NON_PACKAGE:
      return {
        ...state,
        nonPackages: {
          ...state.nonPackages,
          services: [
            ...state.nonPackages.services,
            {i: state.nonPackages.services.length},
          ],
        },
      };
    case actionTypes.ADD_SERVICE:
      const {newService, s_id} = action.payload.item;
      const servicetemp = state.nonPackages.services;
      servicetemp[s_id] = newService;
      return {
        ...state,
        nonPackages: {
          ...state.nonPackages,
          services: servicetemp,
        },
      };
    case actionTypes.DELETE_SERVICE:
      const {servicedeleteindex} = action.payload.item;
      const deleteservicetemp = state.nonPackages.services;
      deleteservicetemp.splice(servicedeleteindex, 1);
      return {
        ...state,
        nonPackages: {
          ...state.nonPackages,
          services: deleteservicetemp,
        },
      };
    case actionTypes.DELETE_DOCTOR_FROM_SURGERY:
      const {surgeonIndex, surgeryIndex} = action.payload.item;
      let deletesurgery = state.nonPackages.services;
      deletesurgery[surgeryIndex].surgeon.splice(surgeonIndex, 1);
      return {
        ...state,
        nonPackages: {
          ...state.nonPackages,
          services: deletesurgery,
        },
      };
    case actionTypes.ADD_DOCTOR_TO_SURGERY:
      const {surgeon, serviceindex} = action.payload.item;
      let tempsurgery = state.nonPackages.services;
      tempsurgery[serviceindex].surgeon.push(surgeon);
      return {
        ...state,
        nonPackages: {
          ...state.nonPackages,
          services: tempsurgery,
        },
      };
    case actionTypes.ADD_MINOR_TO_SURGERY:
      const {minorsurgeryindex, minorsurgery} = action.payload.item;
      let tempminorsurgery = state.nonPackages.services;
      tempminorsurgery[minorsurgeryindex].isMinor = minorsurgery;
      return {
        ...state,
        nonPackages: {
          ...state.nonPackages,
          services: tempminorsurgery,
        },
      };
    case actionTypes.ADD_SAME_DOCTOR:
      const {doc_index, doc_surgery} = action.payload.item;
      let doc = state.nonPackages.services;
      doc[doc_index].sameDoctor = doc_surgery;
      return {
        ...state,
        nonPackages: {
          ...state.nonPackages,
          services: doc,
        },
      };
    // Packages
    case actionTypes.ADD_NEW_PACKAGE:
      return {
        ...state,
        packages: {
          ...state.packages,
          services: [...state.packages.services, {id: state.packages.length}],
        },
      };
    case actionTypes.ADD_PACKAGE:
      const {newPackage, pkg_id} = action.payload.item;
      const packagetemp = state.packages.services;
      packagetemp[pkg_id] = newPackage;
      return {
        ...state,
        packages: {
          ...state.packages,
          services: packagetemp,
        },
      };
    case actionTypes.DELETE_PACKAGE:
      const {packageindex} = action.payload.item;
      const deletepackagetemp = state.packages.services;
      deletepackagetemp.splice(packageindex, 1);
      return {
        ...state,
        packages: {
          ...state.packages,
          services: deletepackagetemp,
        },
      };
    // misc
    case actionTypes.ADD_NEW_MISC:
      return {
        ...state,
        misc: {
          ...state.misc,
          services: [...state.misc.services, {id: state.misc.length}],
        },
      };
    case actionTypes.ADD_MISC:
      const {newMisc, misc_id} = action.payload.item;
      const misc_temp = state.misc.services;
      misc_temp[misc_id] = newMisc;
      return {
        ...state,
        misc: {
          ...state.misc,
          services: misc_temp,
        },
      };
    case actionTypes.DELETE_PACKAGE:
      const {misc_index} = action.payload.item;
      const delete_misc = state.misc.services;
      delete_misc.splice(misc_index, 1);
      return {
        ...state,
        misc: {
          ...state.misc,
          services: delete_misc,
        },
      };
    // Investigation
    case actionTypes.ADD_NEW_INVESTIGATION:
      return {
        ...state,
        investigations: {
          ...state.investigations,
          services: [
            ...state.investigations.services,
            {i: state.investigations.services.length},
          ],
        },
      };
    case actionTypes.ADD_INVESTIGSTION:
      const {newInvestigation, i_id} = action.payload.item;
      const investigationtemp = state.investigations.services;
      investigationtemp[i_id] = newInvestigation;
      return {
        ...state,
        investigations: {
          ...state.investigations,
          services: investigationtemp,
        },
      };
    case actionTypes.DELETE_INVESTIGATION:
      const {investigationindex} = action.payload.item;
      const deleteinvitationTemp = state.investigations.services;
      deleteinvitationTemp.splice(investigationindex, 1);
      return {
        ...state,
        investigations: {
          ...state.investigations,
          services: deleteinvitationTemp,
        },
      };
    case actionTypes.ADD_INVESTIGATION_TOTAL:
      const {investigationTotal} = action.payload.item;
      return {
        ...state,
        investigations: {
          ...state.investigations,
          total: {
            calc: true,
            value: investigationTotal,
          },
        },
      };
    // Procedures
    case actionTypes.ADD_NEW_PROCEDURE:
      return {
        ...state,
        procedures: {
          ...state.procedures,
          services: [
            ...state.procedures.services,
            {i: state.procedures.services.length},
          ],
        },
      };
    case actionTypes.ADD_PROCEDURE:
      const {newProcedure, p_id} = action.payload.item;
      const proceduretemp = state.procedures.services;
      proceduretemp[p_id] = newProcedure;
      return {
        ...state,
        procedures: {...state.procedures, services: proceduretemp},
      };
    case actionTypes.DELETE_PROCEDURE:
      const {procedureindex} = action.payload.item;
      const deleteproceduretemp = state.procedures.services;
      deleteproceduretemp.splice(procedureindex, 1);
      return {
        ...state,
        procedures: {...state.procedures, services: deleteproceduretemp},
      };
    case actionTypes.ADD_PROCEDURE_TOTAL:
      const {procedureTotal} = action.payload.item;
      return {
        ...state,
        procedures: {
          ...state.procedures,
          total: {calc: true, value: procedureTotal},
        },
      };

    case actionTypes.EDIT_EMERGENCY:
      const {emergency} = action.payload.item;
      return {
        ...state,
        isEmergency: emergency,
      };
    case actionTypes.ADD_DOCTOR:
      const {doctor} = action.payload.item;
      return {
        ...state,
        doctor: doctor,
      };
    case actionTypes.ADD_SPECIALITY:
      const {speciality} = action.payload.item;
      return {
        ...state,
        speciality,
      };
    case actionTypes.ADD_PAYMENT_TYPE:
      const {paymentType} = action.payload.item;
      return {
        ...state,
        payment: {...state.payment, mode: paymentType},
      };
    case actionTypes.ADD_PAYMENT_COMPANY:
      const {paymentCompany} = action.payload.item;
      return {
        ...state,
        payment: {...state.payment, company: paymentCompany},
      };
    // Other
    case actionTypes.ADD_MEDICINE_CHARGE:
      const {medicine} = action.payload.item;
      return {
        ...state,
        other: {...state.other, medicine},
      };
    case actionTypes.ADD_EQUIPMENT_CHARGE:
      const {equipment} = action.payload.item;
      return {
        ...state,
        other: {...state.other, equipment},
      };
    case actionTypes.ADD_BLOOD_REQUIREMENT:
      const {blood} = action.payload.item;
      return {
        ...state,
        other: {...state.other, blood},
      };
    case actionTypes.ADD_MISCELLANEOUS:
      const {miscellaneous} = action.payload.item;
      return {
        ...state,
        other: {...state.other, miscellaneous},
      };
    case actionTypes.ADD_STENT:
      const {stent} = action.payload.item;
      return {
        ...state,
        other: {...state.other, stent},
      };
    case actionTypes.VISIT_TOTAL:
      const {visitTotal} = action.payload.item;
      return {
        ...state,
        other: {...state.other, visitTotal},
      };
    case actionTypes.EDIT_STEP:
      const {step} = action.payload.item;
      return {
        ...state,
        step,
      };
    case actionTypes.RESTORE_STATE:
      return initAdvice;
    default:
      return state;
  }
};

export default SAEstimatorRed;
