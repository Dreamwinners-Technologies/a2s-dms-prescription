<template>
  <div>
    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-2 cloud"
          fab
          dark
          large
          bottom
          right
          color="teal"
          elevation="2"
          v-bind="attrs"
          v-on="on"
          @click="syncDBtoServer()"
        >
          <v-icon dark>
            mdi-cloud-upload
          </v-icon>
        </v-btn>
      </template>
      <span>Update From Server</span>
    </v-tooltip>
    <!--  
      
    -->

    <div class="text-center">
      <v-dialog v-model="dialog" persistent width="300" style="height:40px;">
        <v-card  color="#009688"
        class="text-center" style="color: #fff;">
          Please wait, Syncing ... <br> {{currentProgress * 200}} drugs synced.
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card>
      </v-dialog>
    </div>
    <!--  -->
  </div>
</template>
<script>
const API_URL =
  "https://need-doctors-backend.herokuapp.com/";
const BULK_PRESCRIPTION_API = API_URL + "appointments/bulk";
import axios from "axios";
import { initJsStore } from "@/service/idb_service.js";
import { DrugService } from "@/service/drugs_service.js";
import { Global } from "@/global";
import { ABService } from "@/service/Generic_Service.js";
export default {
  components: {},
  data() {
    return {
      DS: null,
      GS: null,
       auth: "Bearer " + JSON.parse(localStorage.getItem("uData")).token,
      students: [],
      dialog: false,
      currentProgress: 0
    };
  },
  async beforeCreate() {},
  created() {},
  methods: {
    async initDB() {
      try {
        const isDbCreated = await initJsStore();
        if (isDbCreated) {
          console.log("db created");
          this.syncDB();
        } else {
          console.log("db opened");
          this.searchDrugs();
        }
      } catch (ex) {
        console.error(ex);
        alert(ex.message);
        Global.isIndexedDbSupported = false;
      }
    },
    syncDB() {
      this.dialog = true;
      this.initDB();

      let ds = new DrugService();
      this.parseDrugs(ds,0);
      
    },
    parseDrugs(ds,cntr){
      //  to sync all the drugs change cntr > 10 to cntr > 107
      // 
      if(cntr>10){      
        this.dialog = false;
        return;
      }
      axios
        .get(
          `http://need-doctors-backend.southeastasia.cloudapp.azure.com:8100/drugs?pageNo=${cntr}&pageSize=200`
        )
        .then(r => {
          let response = r.data,
            currentDrugList = r.data.drugModelList;
          for (let i = 0; i < currentDrugList.length; i++) {
            ds.addDrugs({ name: currentDrugList[i].name });
          }
          this.currentProgress = cntr;

          this.parseDrugs(ds,cntr+1)
        });
    },
    async searchDrugs() {
      let results = [];
      results = await new DrugService().searchDrug("I");
      console.table(results);
    },
    async addDrugs(d) {
      await this.db.addDrugsToTable(d);
    },
    async getLocalPrescriptionsParsed(){
         let localAppointments = await this.GS.getData("LocalAppointment"),
         output = [];
         if(localAppointments){
           for(let i = 0;i< localAppointments.length; i++ ){
             output.push(localAppointments[i].data);
           }
           return output;
         }
         
    },
    sendBulkPrescriptionToServer(){
       let localPrescriptions = Promise.resolve(this.getLocalPrescriptionsParsed());
       let instance = this;

       localPrescriptions.then(v=> {
   console.log(v);
       return;
             axios({
        method: "post",
        url: BULK_PRESCRIPTION_API ,
        data: v,
        headers: {
          Authorization: instance.auth,
          "Content-Type": "application/json"
        }
      })
        .then(r => {
          console.log(r.data);
          instance.GS.clearTable("LocalAppointment");
          this.syncAppointment();
        })
        .catch(r => {
          console.log(r);
        })
       });

    
    },
    syncAppointment(){},
    syncDBwithServer(){

    }
  },
  mounted() {
    this.GS = new ABService();
    this.sendBulkPrescriptionToServer();
  }
};
</script>
<style scoped>
.cloud {
  position: fixed !important;
  bottom: 30px !important;
  right: 20px !important;
}
.bt-wrap {
  position: relative !important;
}
</style>
