import * as actionTypes from '../types/adviceTypes';

const initAdvice = {
  isIPDPackage: false,
  isEmergency: false,
  step: 0,
  ward: 0,
  icu: 0,
  doctor: '',
  treatment: '',
  paymentType: '',
  paymentCompany: '',
  investigationTotal: 0,
  othTotal: 0,
  procedureTotal: 0,
  medicineAdm: 0,
  equipment: 0,
  blood: 0,
  stent: 0,
  visitTotal: 0,
  services: [
    {
      id: 0,
    },
  ],
  investigations: [
    {
      id: 0,
    },
  ],
  procedures: [
    {
      id: 0,
    },
  ],
  diagnostic: [
    {
      id: 0,
    },
  ],
  medicine: [
    {
      id: 0,
    },
  ],
  packages: [
    {
      id: 0,
    },
  ],
  oth: [
    {
      id: 0,
    },
  ],
  addCharges: [],
};

const adviceReducer = (state = initAdvice, action) => {
  switch (action.type) {
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
        icu: icuStay,
      };
    case actionTypes.ADD_SERVICE:
      const {newService, s_id} = action.payload.item;
      const servicetemp = state.services;
      servicetemp[s_id] = newService;
      return {
        ...state,
        services: servicetemp,
      };
    case actionTypes.DELETE_SERVICE:
      const {servicedeleteindex} = action.payload.item;
      const deleteservicetemp = state.services;
      deleteservicetemp.splice(servicedeleteindex, 1);
      return {
        ...state,
        services: deleteservicetemp,
      };
    case actionTypes.ADD_NEW_INVESTIGATION:
      return {
        ...state,
        investigations: [
          ...state.investigations,
          {id: state.investigations.length},
        ],
      };
    case actionTypes.ADD_INVESTIGSTION:
      const {newInvestigation, i_id} = action.payload.item;
      const investigationtemp = state.investigations;
      investigationtemp[i_id] = newInvestigation;
      return {
        ...state,
        investigations: investigationtemp,
      };
    case actionTypes.DELETE_INVESTIGATION:
      const {investigationindex} = action.payload.item;
      const deleteinvitationTemp = state.investigations;
      deleteinvitationTemp.splice(investigationindex, 1);
      return {
        ...state,
        investigations: deleteinvitationTemp,
      };
    // oth
    case actionTypes.ADD_NEW_OTH:
      return {
        ...state,
        oth: [...state.oth, {id: state.oth.length}],
      };
    case actionTypes.ADD_OTH:
      const {newoth, o_id} = action.payload.item;
      const othtemp = state.oth;
      othtemp[o_id] = newoth;
      return {
        ...state,
        oth: othtemp,
      };
    case actionTypes.DELETE_OTH:
      const {othindex} = action.payload.item;
      const deleteothtemp = state.oth;
      deleteothtemp.splice(othindex, 1);
      return {
        ...state,
        oth: deleteothtemp,
      };
    case actionTypes.ADD_OTH_TOTAL:
      const {othtotal} = action.payload.item;
      return {
        ...state,
        othTotal: othtotal,
      };
    // oth
    case actionTypes.ADD_NEW_PROCEDURE:
      return {
        ...state,
        procedures: [...state.procedures, {id: state.procedures.length}],
      };
    case actionTypes.ADD_PROCEDURE:
      const {newProcedure, p_id} = action.payload.item;
      const proceduretemp = state.procedures;
      proceduretemp[p_id] = newProcedure;
      return {
        ...state,
        procedures: proceduretemp,
      };
    case actionTypes.DELETE_PROCEDURE:
      const {procedureindex} = action.payload.item;
      const deleteproceduretemp = state.procedures;
      deleteproceduretemp.splice(procedureindex, 1);
      return {
        ...state,
        procedures: deleteproceduretemp,
      };
    case actionTypes.ADD_NEW_DIAGNOSTIC:
      return {
        ...state,
        diagnostic: [...state.diagnostic, {id: state.diagnostic.length}],
      };
    case actionTypes.ADD_DIAGNOSTIC:
      const {newDiagnostic, d_id} = action.payload.item;
      const diagnostictemp = state.diagnostic;
      diagnostictemp[d_id] = newDiagnostic;
      return {
        ...state,
        diagnostic: diagnostictemp,
      };
    case actionTypes.DELETE_DIAGNOSTIC:
      const {diagnosticindex} = action.payload.item;
      const deletediagnostictemp = state.diagnostic;
      deletediagnostictemp.splice(diagnosticindex, 1);
      return {
        ...state,
        diagnostic: deletediagnostictemp,
      };
    case actionTypes.ADD_NEW_PACKAGE:
      return {
        ...state,
        packages: [...state.packages, {id: state.packages.length}],
      };
    case actionTypes.ADD_PACKAGE:
      const {newPackage, pkg_id} = action.payload.item;
      const packagetemp = state.packages;
      packagetemp[pkg_id] = newPackage;
      return {
        ...state,
        packages: packagetemp,
      };
    case actionTypes.DELETE_PACKAGE:
      const {packageindex} = action.payload.item;
      const deletepackagetemp = state.packages;
      deletepackagetemp.splice(packageindex, 1);
      return {
        ...state,
        packages: deletepackagetemp,
      };
    case actionTypes.ADD_CHARGE:
      return {
        ...state,
        addCharges: [...state.addCharges, {key: '', value: 0}],
      };
    case actionTypes.EDIT_CHARGE:
      const {key, value, chargeIndex} = action.payload.item;
      const tempcharge = state.addCharges;
      tempcharge[chargeIndex].key = key;
      tempcharge[chargeIndex].value = value;
      return {
        ...state,
        addCharges: tempcharge,
      };
    case actionTypes.EDIT_EMERGENCY:
      const {emergency} = action.payload.item;
      return {
        ...state,
        isEmergency: emergency,
      };
    case actionTypes.DELETE_ADD_CHARGE:
      const {deleteChargeIndx} = action.payload.item;
      const tempaddcharge = state.addCharges;
      tempaddcharge.splice(deleteChargeIndx, 1);
      return {
        ...state,
        addCharges: tempaddcharge,
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
        paymentType: paymentType,
      };
    case actionTypes.ADD_PAYMENT_COMPANY:
      const {paymentCompany} = action.payload.item;
      return {
        ...state,
        paymentCompany: paymentCompany,
      };
    case actionTypes.ADD_DOCTOR_TO_SURGERY:
      const {surgeon, serviceindex} = action.payload.item;
      let tempsurgery = state.services;
      tempsurgery[serviceindex].surgeon.push(surgeon);
      return {
        ...state,
        services: tempsurgery,
      };
    case actionTypes.DELETE_DOCTOR_FROM_SURGERY:
      const {surgeonIndex, surgeryIndex} = action.payload.item;
      let deletesurgery = state.services;
      deletesurgery[surgeryIndex].surgeon.splice(surgeonIndex, 1);
      return {
        ...state,
        services: deletesurgery,
      };
    case actionTypes.ADD_MINOR_TO_SURGERY:
      const {minorsurgeryindex, minorsurgery} = action.payload.item;
      let tempminorsurgery = state.services;
      tempminorsurgery[minorsurgeryindex].isMinor = minorsurgery;
      return {
        ...state,
        services: tempminorsurgery,
      };
    case actionTypes.EDIT_MINOR_SURGERY_PERCENT:
      const {surgerypercent, minorpercentindex} = action.payload.item;
      let temppercentsurgery = state.services;
      temppercentsurgery[minorpercentindex].minor = surgerypercent;
      return {
        ...state,
        services: temppercentsurgery,
      };
    case actionTypes.ADD_INVESTIGSTION:
      const {investigation} = action.payload.item;
      return {
        ...state,
        investigation,
      };
    case actionTypes.ADD_MEDICINE_CHARGE:
      const {medicine} = action.payload.item;
      return {
        ...state,
        medicine,
      };
    case actionTypes.ADD_EQUIPMENT_CHARGE:
      const {equipment} = action.payload.item;
      return {
        ...state,
        equipment,
      };
    case actionTypes.ADD_BLOOD_REQUIREMENT:
      const {blood} = action.payload.item;
      return {
        ...state,
        blood,
      };
    case actionTypes.ADD_STENT:
      const {stent} = action.payload.item;
      return {
        ...state,
        stent,
      };
    case actionTypes.ADD_INVESTIGATION_TOTAL:
      const {investigationTotal} = action.payload.item;
      return {
        ...state,
        investigationTotal,
      };
    case actionTypes.ADD_PROCEDURE_TOTAL:
      const {procedureTotal} = action.payload.item;
      return {
        ...state,
        procedureTotal,
      };
    case actionTypes.VISIT_TOTAL:
      const {visitTotal} = action.payload.item;
      return {
        ...state,
        visitTotal,
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

export default adviceReducer;
