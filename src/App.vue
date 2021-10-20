<template>
  <v-app>
    <router-view/>
           <div class="text-center">
      <v-dialog v-model="dialog" persistent width="300" style="height:40px;">
        <v-card  color="#009688"
        class="text-center" style="color: #fff;">
        <div class=""></div>
          Please wait, Syncing ... <br> {{currentProgress * 200}} drugs synced.
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>
<script>
const API_URL =
  "https://need-doctors-backend.herokuapp.com/";
const PROFILE_URL = API_URL + "auth/profile";
const PRESCRIPTION_URL = API_URL + "prescriptions/medicines?pageNo=";
import {mapGetters} from "vuex";

import { initJsStore } from "@/service/idb_service.js";
import { DrugService } from "@/service/drugs_service.js";
import { ABService } from "@/service/Generic_Service.js";

import { Global } from "@/global";
import axios from "axios";
export default {
      async beforeCreate () {
    try {
        const isDbCreated = await initJsStore();
        if (isDbCreated) {
          console.log("db created");
        } else {
          console.log("db opened");
        }
      } catch (ex) {
        console.error(ex);
        alert(ex.message);
        Global.isIndexedDbSupported = false;
      }
  },
  components: {
    name: 'App',
  },
  
  data () {
    return {
    auth: "",
      dialog : false,
       currentProgress: 0
    }
  },
  methods: {
   checkIfInitialLogInAndSync(){
     console.log("initial login")
     if(localStorage.getItem("uData") == undefined) return;
     let cu = JSON.parse(localStorage.getItem("uData")).roles;
     if(cu.includes("DOCTOR") && localStorage.getItem("IL") == "true"){
       this.syncDB();
     }
   },
   
    syncDB() {
      this.dialog = true;
      let ds = new DrugService();
      this.saveProfileInfo()
      // this.getLoggedProfileInfo(as);
      this.parseDrugs(ds,0);
      
    },
   getLoggedProfileInfo(){
     this.auth = "Bearer " + JSON.parse(localStorage.getItem("uData")).token
    console.log(PROFILE_URL)
    console.log(this.auth)
             axios({
        method: "get",
        url: PROFILE_URL,
        headers: {
          Authorization: this.auth,
          "Content-Type": "application/json"
        }
      })
        .then(r => {
          console.log(r.data);
       return r.data;
        })
        .catch(r => {
          console.log(r);
        });
    },
   async saveProfileInfo(){
     let as = new ABService();
   let r = await as.addData("ProfData",{
     Id: 1,
           data: JSON.stringify(this.getLoggedProfileInfo())
         })
    },
    parseDrugs(ds,cntr){
      //  to sync all the drugs change cntr > 10 to cntr > 107
      // 
      if(cntr>10){      
        this.dialog = false;
        localStorage.setItem("IL",false);
        return;
      }
      axios
        .get(
            `${PRESCRIPTION_URL}${cntr}&pageSize=200`
        )
        .then(r => {
          let response = r.data,
            currentDrugList = r.data.data.data;
            console.log(currentDrugList)
          for (let i = 0; i < currentDrugList.length; i++) {
            ds.addDrugs({ data: currentDrugList[i] });
          }
          this.currentProgress = cntr;

          this.parseDrugs(ds,cntr+1);
        });
    },
  },
  computed: {
    ...mapGetters(["currentLoggedUserType"])
  },
  mounted(){
    localStorage.setItem("selectedAppointment",null)
    this.checkIfInitialLogInAndSync();
  }
}
</script>
<style lang="scss" scoped>
body {
  font-family: 'Open Sans', sans-serif;
}
.v-application {
   font-family: 'Open Sans', sans-serif !important;
    .title { // To pin point specific classes of some components
       font-family: 'Open Sans', sans-serif !important;
    }
 }
</style>
