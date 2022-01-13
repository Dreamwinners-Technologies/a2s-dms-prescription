 export const API_ROOT = "https://api.a2sdms.com/";
 export const DEV_API_ROOT = "'https://need-doctors-backend.herokuapp.com/";

 export const auth = "Bearer " + localStorage.getItem("token");

 export const PROFILE_API = API_ROOT + "auth/profile";
 export const PRESCRIPTION_API = API_ROOT + "prescriptions/medicines?pageNo=";
 export const PRESCRIPTION_HEADER_API = API_ROOT + "prescriptions/headers";
 export const APPOINTMENTS_API = API_ROOT + "appointments/";
 export const AMBULANCE_API = DEV_API_ROOT + "api/ambulance/";