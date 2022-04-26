import { getSpecialData } from "../service/idb_service.js";
import { decryptData } from "../shared/enc.js";

const API_ROOT = "https://api.a2sdms.com/";
const API_ROOT_ALT = "http://need-doctors-backend.southeastasia.cloudapp.azure.com:8100/";
const DEV_API_ROOT = "https://need-doctors-backend.herokuapp.com/";
//getSpecialData("ud")
// let data = Promise.resolve(getSpecialData("ud"));
// let decData;
// data.then(v => {
//     decData = "Bearer " + decryptData(v);
// });
// export const auth = decData;

export const PROFILE_API = API_ROOT + "auth/profile";
export const PRESCRIPTION_API = API_ROOT + "prescriptions/medicines?pageNo=";
export const PRESCRIPTION_HEADER_API = API_ROOT + "prescriptions/headers";
export const APPOINTMENTS_API = API_ROOT + "appointments/";
export const AMBULANCE_API = API_ROOT + "api/ambulance/";
export const RESEARCH_API = API_ROOT + "api/research/";

export const PREVIOUS_PRESCRIPTION_API = API_ROOT + "appointments/doctor/previous/users/";
export const APPOINTMENTS_BY_ID_API = APPOINTMENTS_API + "prescriptions/";