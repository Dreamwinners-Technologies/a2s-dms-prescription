<template>
  <v-app>
    <router-view />
    <div class="text-center">
      <v-snackbar bottom right :value="updateExists" :timeout="-1" color="primary">
  An update is available
  <v-btn text @click="refreshApp">
    
    Update
  </v-btn>
</v-snackbar>
      <v-snackbar top :color="snackbarColor" v-model="snackbar" timeout="1500">
        {{ snackbarText }}
      </v-snackbar>
      <v-dialog v-model="dialog" persistent width="300" style="height:40px;">
        <v-card color="#009688" class="text-center" style="color: #fff;">
          <div class=""></div>
          Please wait, Syncing ... <br />
          <h2 class="">{{ currentProgress * 10 }} %</h2>
          synced.
          <br>
          Don't reload or stop internet.
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
const API_URL = "https://need-doctors-backend.herokuapp.com/";
const PROFILE_URL = API_URL + "auth/profile";
const PRESCRIPTION_URL = API_URL + "prescriptions/medicines?pageNo=";
const PRESCRIPTION_HEADER_API = API_URL + "prescriptions/headers";
const GET_APPOINtMENTS_API = API_URL + "appointments/";
import { mapGetters } from "vuex";

import updte from "@/mixins/update.js";

import { initJsStore } from "@/service/idb_service.js";
import { DrugService } from "@/service/drugs_service.js";
import { ABService } from "@/service/Generic_Service.js";

// import { dropDatabase } from "@/service/idb_service.js";

import { Global } from "@/global";
import axios from "axios";
export default {
  mixins: [updte],
  async beforeCreate() {
    // this.$store.commit(
    //   "setHasPrescriptionAccess",
    //   JSON.parse(localStorage.getItem("uData")).hasPrescriptionAccess
    // );
    console.log(this.$store.state.hasPrescriptionAccess)
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
    name: "App"
  },

  data() {
    return {
      GS: null,
      auth: "",
      dialog: false,
      currentProgress: 0,
      snackbar: false,
      snackbarColor: "",
      snackbarText: "",
      syncError: false,
    };
  },
  methods: {
    checkIfInitialLogInAndSync() {
      console.log("initial login");
      if (localStorage.getItem("uData") === null) return;
      let cu = JSON.parse(localStorage.getItem("uData")).roles;
      if (cu.includes("DOCTOR") && localStorage.getItem("IL") == "true") {
        this.getPrescriptionHeader();
        this.syncDB();
      }
    },
    syncDB() {
      this.dialog = true;
      let ds = new DrugService();
      this.syncAppointment();
      this.getLoggedProfileInfo();
      this.parseDrugs(ds, 0);
    },
    getLoggedProfileInfo() {
      if(this.syncError) return;
      this.auth = "Bearer " + JSON.parse(localStorage.getItem("uData")).token;
      console.log(PROFILE_URL);
      console.log(this.auth);
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
          let as = new ABService();
          let res = as.addData("ProfData", {
            Id: 1,
            data: JSON.stringify(r.data)
          });
        })
        .catch(r => {
          console.log(r);
        });
    },
    getPrescriptionHeader() {
      console.log(this.auth);
      axios({
        method: "get",
        url: PRESCRIPTION_HEADER_API,
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("uData")).token,
          "Content-Type": "application/json"
        }
      })
        .then(r => {
          console.log(r.data);
          localStorage.setItem("leftHeader", r.data.data.leftHeader);
          localStorage.setItem("rightHeader", r.data.data.rightHeader);
          localStorage.setItem("middleHeader", r.data.data.middleHeader);
        })
        .catch(err => {
          if (err.response) {
            // client received an error response (5xx, 4xx)
            console.log(err.response);
            this.dialog = false;
            this.snackbar = true;
            this.snackbarColor = "error";
            this.snackbarText = err.response.data.message;
          } else if (err.request) {
            // client never received a response, or request never left
            this.dialog = false;
            this.snackbar = true;
            this.snackbarColor = "error";
            this.snackbarText = "Internet Disconnected!";
          } else {
            // anything else
          }
        });
    },
    async saveProfileInfo() {
      let as = new ABService();
      let r = await as.addData("ProfData", {
        Id: 1,
        data: JSON.stringify(this.getLoggedProfileInfo())
      });
    },
    syncAppointment() {
      axios({
        method: "get",
        url: `${GET_APPOINtMENTS_API}?date=${this.formatDate(
          new Date()
        ).toString()}&pageNo=0&pageSize=100`,
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("uData")).token,
          "Content-Type": "application/json"
        }
      })
        .then(r => {
          let response = r.data.data.data;
          console.log(response);
          this.GS.clearTable("Appointment");
          for (let a = 0; a < response.length; a++) {
            console.log(response[a].id);
            this.GS.addData("Appointment", {
              data: response[a],
              id: response[a].id
            });
            console.log("updated appointments");
          }
        })
        .catch(err => {
          if (err.response) {
            // client received an error response (5xx, 4xx)
            console.log(err.response);
            // this.dialog = false;
            // this.snackbar = true;
            // this.snackbarColor = "error";
            // this.snackbarText = err.response.data.message;
          } else if (err.request) {
            // client never received a response, or request never left
            this.dialog = false;
            this.syncError = true;
            this.snackbar = true;
            this.snackbarColor = "error";
            this.snackbarText = "Internet Disconnected! Couldn't Sync.";
          } else {
            // anything else
          }
        });
    },
    parseDrugs(ds, cntr) {
      //  to sync all the drugs change cntr > 10 to cntr > 107
      //
      if (cntr > 10) {
        this.dialog = false;
        localStorage.setItem("IL", false);
        return;
      }
      axios
        .get(`${PRESCRIPTION_URL}${cntr}&pageSize=200`)
        .then(r => {
          let response = r.data,
            currentDrugList = r.data.data.data;
          console.log(currentDrugList);
          for (let i = 0; i < currentDrugList.length; i++) {
            ds.addDrugs({ data: currentDrugList[i] });
          }
          this.currentProgress = cntr;

          this.parseDrugs(ds, cntr + 1);
        })
        .catch(err => {
          if (err.response) {
            // client received an error response (5xx, 4xx)
            this.dialog = false;
            this.snackbar = true;
            this.snackbarColor = "error";
            console.log("Here 1")
            this.syncError = true;
            this.snackbarText = err.response.data.message;
            return;
          } else if (err.request) {
            // client never received a response, or request never left
            console.log("Here 2")
            this.dialog = false;
            this.snackbar = true;
            this.syncError = true;
            this.snackbarColor = "error";
            this.snackbarText = "Internet Disconnected! Couldn't Sync.";
            return;
          } else {
            // anything else
          }
        });
    },
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
  computed: {
    ...mapGetters(["currentLoggedUserType"])
  },
  watch: {
    $route(to, from) {
      // react to route changes...
      if (from.fullPath == "/auth/signin") {
        this.checkIfInitialLogInAndSync();
      }
    }
  },
  mounted() {
    this.GS = new ABService();
    localStorage.setItem("selectedAppointment", null);
    this.checkIfInitialLogInAndSync();
  },
  created() {
    // console.log(JSON.parse(localStorage.getItem("uData")).hasPrescriptionAccess)
  }
};
</script>
<style lang="scss">
.preview p {
  margin-bottom: 0px !important;
}
body {
  font-family: "Open Sans", sans-serif;
}
.v-application {
  font-family: "Open Sans", sans-serif !important;
  .title {
    // To pin point specific classes of some components
    font-family: "Open Sans", sans-serif !important;
  }
}
</style>
