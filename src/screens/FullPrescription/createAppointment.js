import axios from 'axios';
import {SERVER_URL} from '../../config/variables';
import {store} from '../../store/store';
exports.createAppointment = async () => {
  const advice = store.getState().SAEst;
  console.log(advice);
  try {
    const lead = new FormData();
    const admission = {...advice};
    admission.isEstimate = advice.estimate;
    lead.append('admission', JSON.stringify(advice));
    lead.append('prescription', {
      uri: `file://${advice.pres}`,
      type: 'image/jpg',
      name: `Prescription${Date.now()}`,
    });
    return await axios.post(`${SERVER_URL}/api/v1/lead/`, lead, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    throw error;
  }
};
