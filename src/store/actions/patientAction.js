import * as actionTypes from '../types/patientTypes'

export const addPatient = (item) => {
    console.log('from payload')
    console.log(item)
    return {
        type : actionTypes.ADD_PATIENT,
        payload : {
            item
        }
    }
}