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
          @click="sendBulkAppointmentsToServer()"
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
        <v-card color="#009688" class="text-center" style="color: #fff;">
          Please wait, Syncing ... <br />
          {{ message }}
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
const API_URL = "https://api.a2sdms.com/";
const BULK_APPOINTMENTS_API = API_URL + "appointments/bulk";
const BULK_PRESCRIPTION_API = API_URL + "appointments/prescriptions/bulk";
const GET_APPOINtMENTS_API = API_URL + "appointments/";
const EDIT_PRESCRIPTION_HEADER_API = API_URL + "prescriptions/headers";
const FAV_MEDICINE_API = API_URL + "prescriptions/favourite-drugs";
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
      message: "",
      currentProgress: 0,
      favMedicineList: {
        favouriteDrugs: []
      }
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
      this.parseDrugs(ds, 0);
    },
    parseDrugs(ds, cntr) {
      //  to sync all the drugs change cntr > 10 to cntr > 107
      //
      if (cntr > 10) {
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

          this.parseDrugs(ds, cntr + 1);
        }).catch(err => {
                      if (err.response) {
              // client received an error response (5xx, 4xx)
              console.log(err.response);
         if(err.response.status === 500){
           this.store.commit("tknExp", true);
         }
            } else if (err.request) {
              // client never received a response, or request never left
 
            } else {
            }
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
    // local
    async getLocalDataParsed(tableName) {
      console.log("getting local -------------------------");
      let data = await this.getData(tableName);
                      const output = [];
        // data.then(result => {

                  console.log(data);
        for (let i = 0; i < data.length; i++) {
          output.push(data[i].data);
        }
        // })
        return output;
    },
      async getDataCount(tableName) {
      let data = await this.GS.getLength(tableName);
        return data;
    },
    async getData(tableName){
  let data = await this.GS.getData(tableName);
  console.log("test",data)
  return data;
    },
    syncPrescriptionHeader() {
      this.message = "Saving prescription Template...";
      axios({
        method: "put",
        url: EDIT_PRESCRIPTION_HEADER_API,
        data: {
          leftHeader: localStorage.getItem("leftHeader") || "",
          middleHeader: localStorage.getItem("middleHeader") || "",
          rightHeader: localStorage.getItem("rightHeader") || ""
        },
        headers: {
          Authorization: this.auth,
          "Content-Type": "application/json"
        }
      })
        .then(r => {
          console.log(r.data);
        })
        .catch(r => {
          console.log(r);
        });
    },
    syncFavMedicine() {
      this.message = "Updateing Fav Medicine!";
      console.log("fav medicine");
      console.log(this.favMedicineList);
      axios({
        method: "put",
        url: FAV_MEDICINE_API,
        data: this.favMedicineList,
        headers: {
          Authorization: this.auth,
          "Content-Type": "application/json"
        }
      })
        .then(r => {
          console.log(r.data);
        })
        .catch(r => {
          console.log(r);
        });
    },
   async sendBulkAppointmentsToServer() {
      this.dialog = true;
      this.syncPrescriptionHeader();
      this.syncFavMedicine();
      this.message = "Sending Appointments to Server ...";
      // let v = this.getLocalDataParsed("LocalAppointment");
      // console.log(this.getDataCount("LocalAppointment"));
       let localPrescriptions =  this.getLocalDataParsed("LocalAppointment")
  console.log(localPrescriptions);
      let instance = this;
      //  sending all local appointments as bulk to server
      localPrescriptions.then(response => {
        console.log(response[0]);
        //  return;
        axios({
          method: "post",
          url: BULK_APPOINTMENTS_API,
          data: response,
          headers: {
            Authorization: instance.auth,
            "Content-Type": "application/json"
          }
        })
          .then(r => {
            console.log(r.data);
            instance.GS.clearTable("LocalAppointment");
            this.syncAppointment(true);
          })
          .catch(r => {
            console.log(r);
            if(r.response){
              // if(r.response.data.message.contains("JSON parse error")){
              console.log(r.response.data.message);
              // }
            }
            this.dialog = false;
          });
      });
    },
    syncAppointment(isLocalPrescription) {
      
      if (isLocalPrescription)
        this.message = "Getting latest appointments from server ..";
      else this.message = "Finalizing Syncing..";

      axios({
        method: "get",
        url: `${GET_APPOINtMENTS_API}?date=${this.formatDate(
          new Date()
        ).toString()}&pageNo=0&pageSize=100`,
        headers: {
          Authorization: this.auth,
          "Content-Type": "application/json"
        }
      })
        .then(r => {
          let response = r.data.data.data;
          console.log(response);
          //  let a = this.GS.getDataById("Appointment","123");
          //  console.log(a)
          this.GS.clearTable("Appointment");
          for (let a = 0; a < response.length; a++) {
            console.log(response[a].id);
            this.GS.addData("Appointment", {
              data: response[a],
              id: response[a].id
            });
            // this.GS.updateDataById(
            //   "Appointment",
            //   {
            //     data: response[a]
            //   },
            //   {
            //     id: response[a].id
            //   }
            // );
            console.log("updated appointments");
          }
          console.log(isLocalPrescription == true);
          if (isLocalPrescription == true) {
            this.sendPrescriptions();
          } else {
            this.dialog = false;
          }
        })
        .catch(e => {
          // console.log(e.response.status);
          // if(e.response.status == 404 ){
          //             if (isLocalPrescription == true) {

          // } else {
          //   this.dialog = false;
          // }
          // }
          // this.sendPrescriptions();
          // this.dialog = false;

          if (isLocalPrescription == true) {
            this.sendPrescriptions();
          } else {
            this.dialog = false;
          }
        });
    },
    sendPrescriptions() {
      this.message = "Syncing prescription now .";
      console.log("ok");
      let localPrescriptions = Promise.resolve(
        this.getLocalDataParsed("LocalPresciption")
      );
      let instance = this;

      localPrescriptions.then(v => {
        console.log(v);
        //  return;
        axios({
          method: "post",
          url: BULK_PRESCRIPTION_API,
          data: v,
          headers: {
            Authorization: instance.auth,
            "Content-Type": "application/json"
          }
        })
          .then(r => {
            console.log(r.data);
            instance.GS.clearTable("LocalPresciption");
            this.syncAppointment(false);
          })
          .catch(r => {
            console.log(r);
          });
      });
    },
    getSyncedAppointmentsFromServer() {},
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }
  },
  mounted() {
    this.GS = new ABService();
    // this.sendBulkAppointmentsToServer();
    // console.log(this.formatDate(new Date()).toString())
    this.favMedicineList.favouriteDrugs = JSON.parse(
      localStorage.getItem("favMedicineList")
    );
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
