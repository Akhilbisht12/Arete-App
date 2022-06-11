import * as actionTypes from '../types/SAEstimatorTypes';

const initAdvice = {
  name: '',
  phone: '',
  email: '',
  age: '',
  gender: '',
  isIPDPackage: null,
  isEmergency: null,
  step: 0,
  ward: 0,
  icu: {
    type: '',
    days: 0,
  },
  doctor: '',
  treatment: '',
  payment: {
    type: '',
    company: '',
  },
  other: {
    medicine: 0,
    equipment: 0,
    blood: 0,
    stent: 0,
    visitTotal: 0,
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
  investigations: {
    services: [
      {
        i: 0,
      },
    ],
    total: {
      calc: false,
      value: 0,
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
      value: 0,
    },
  },
};

const SAEstimatorRed = (state = initAdvice, action) => {
  switch (action.type) {
    // Personal Details
    case actionTypes.ADD_FULL_NAME:
      const {name} = action.payload.item;
      return {
        ...state,
        name,
      };
    case actionTypes.ADD_PHONE:
      const {phone} = action.payload.item;
      return {
        ...state,
        phone: phone,
      };
    case actionTypes.ADD_EMAIL:
      const {email} = action.payload.item;
      return {
        ...state,
        email,
      };
    case actionTypes.ADD_AGE:
      const {age} = action.payload.item;
      return {
        ...state,
        age,
      };
    case actionTypes.ADD_GENDER:
      const {gender} = action.payload.item;
      return {
        ...state,
        gender,
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
        treatment: action.payload.item.treatment,
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
        icu: {...state.icu, type},
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
    case actionTypes.ADD_PAYMENT_TYPE:
      const {paymentType} = action.payload.item;
      return {
        ...state,
        payment: {...state.payment, type: paymentType},
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
