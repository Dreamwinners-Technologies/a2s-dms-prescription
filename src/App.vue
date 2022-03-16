<template>
  <v-app>
    <router-view />
    <div class="text-center">
      <v-snackbar
        bottom
        right
        :value="updateExists"
        :timeout="-1"
        color="primary"
      >
        An update is available
        <v-btn color="white" class="black--text" text @click="refreshApp">
          Update
        </v-btn>
      </v-snackbar>
      <v-snackbar top :color="snackbarColor" v-model="snackbar" timeout="1500">
        {{ snackbarText }}
      </v-snackbar>
      <v-dialog v-model="dialog" persistent width="300" style="height: 40px">
        <v-card color="#009688" class="text-center" style="color: #fff">
          <!-- <div class=""></div> -->
          <span v-if="!isSyncFinalMoment">
            Please wait, Syncing ... <br />
            <h2 class="">{{ currentProgress.toFixed(2) }} %</h2>
            synced.
            <br />
            Don't reload or stop internet.
          </span>
          <span v-if="isSyncFinalMoment"> Finalizing All </span>

          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card>
      </v-dialog>
      <v-dialog
        width="max-content"
        class="expDialog"
        v-model="dialogExpSignIn"
        hide-overlay
      >
        <token-expire-sign-in></token-expire-sign-in>
      </v-dialog>
    </div>
  </v-app>
</template>
<script>
import {
  PROFILE_API,
  PRESCRIPTION_API,
  PRESCRIPTION_HEADER_API,
  APPOINTMENTS_API,
} from "@/shared/apis.js";
import { mapGetters } from "vuex";

import updte from "@/mixins/update.js";

import {
  initJsStore,
  getSpecialData,
  getSmallData,
} from "@/service/idb_service.js";
import { DrugService } from "@/service/drugs_service.js";
import { ABService } from "@/service/Generic_Service.js";

import tokenExpireSignIn from "@/views/auth/TokenExpireSignIn";

// import { dropDatabase } from "@/service/idb_service.js";

import { Global } from "@/global";
import axios from "axios";
export default {
  components: {
    tokenExpireSignIn,
  },
  mixins: [updte],
  async beforeCreate() {
    // this.$store.commit(
    //   "setHasPrescriptionAccess",
    //   JSON.parse(localStorage.getItem("uData")).hasPrescriptionAccess
    // );
    console.log(this.$store.state.hasPrescriptionAccess);
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
  data() {
    return {
      GS: null,
      auth: "",
      dialog: false,
      dialogExpSignIn: false,
      currentProgress: 0,
      snackbar: false,
      snackbarColor: "",
      snackbarText: "",
      syncError: false,
      isSyncFinalMoment: false,
    };
  },
  methods: {
    checkIfInitialLogInAndSync() {
      console.log("initial login");
      if (localStorage.getItem("uData") === null) return;
      let decr = getSpecialData("indexDbId");
      decr.then((res) => {
        console.log("yo", res);
      });
      let cu = JSON.parse(localStorage.getItem("uData")).roles;
      if (cu.includes("DOCTOR") && localStorage.getItem("IL") === "true") {
        this.getPrescriptionHeader();
      }
    },
    async syncDB() {
      this.dialog = true;
      let ds = new DrugService();
      // console.log("======>", this.GS.clearTable.constructor.name === "AsyncFunction");
      await this.GS.clearTable("Drugs");
      this.parseDrugs(ds, 0);
    },
    getLoggedProfileInfo() {
      if (this.syncError) return;
      this.auth = "Bearer " + JSON.parse(localStorage.getItem("uData")).token;
      console.log(PROFILE_API);
      console.log(this.auth);
      axios({
        method: "get",
        url: PROFILE_API,
        headers: {
          Authorization: this.auth,
          "Content-Type": "application/json",
        },
      })
        .then((r) => {
          console.log(r.data);
          let as = new ABService();
          let res = as.addDataAsync("ProfData", {
            Id: 1,
            data: r.data,
          });

          res.then((res) => {
            // reload to fix first sync stuck
            location.reload();
          });
        })
        .catch((r) => {
          console.log(r);
        });
    },
    // async setProfData(){

    // },
    getPrescriptionHeader() {
      console.log(this.auth);
      axios({
        method: "get",
        url: PRESCRIPTION_HEADER_API,
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("uData")).token,
          "Content-Type": "application/json",
        },
      })
        .then((r) => {
          console.log(r.data);
          localStorage.setItem("leftHeader", r.data.data.leftHeader);
          localStorage.setItem("rightHeader", r.data.data.rightHeader);
          localStorage.setItem("middleHeader", r.data.data.middleHeader);
          // start of syncing of DB
          this.syncDB();
        })
        .catch((err) => {
          if (err.response) {
            // client received an error response (5xx, 4xx)
            console.log(err.response);
            //  this.dialog = false;
            this.snackbar = true;
            this.snackbarColor = "error";
            this.snackbarText = err.response.data.message;
            // either way try to sync DB
            this.syncDB();
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
        data: JSON.stringify(this.getLoggedProfileInfo()),
      });
    },
    syncAppointment() {
      axios({
        method: "get",
        url: `${APPOINTMENTS_API}?date=${this.formatDate(
          new Date()
        ).toString()}&pageNo=0&pageSize=100`,
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("uData")).token,
          "Content-Type": "application/json",
        },
      })
        .then((r) => {
          let response = r.data.data.data;
          console.log(response);
          this.GS.clearTable("Appointment");
          for (let a = 0; a < response.length; a++) {
            this.GS.addData("Appointment", {
              data: response[a],
              id: response[a].id,
            });
            console.log("updated appointments");
            this.getLoggedProfileInfo();
          }
        })
        .catch((err) => {
          if (err.response) {
            // client received an error response (5xx, 4xx)
            console.log(err.response);
            this.getLoggedProfileInfo();
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
      if (cntr > 106) {
        // this.dialog = false;
        localStorage.setItem("IL", false);
        this.isSyncFinalMoment = true;
        this.syncAppointment();
        //  this.syncAppointment();
        return true;
      }
      axios
        .get(`${PRESCRIPTION_API}${cntr}&pageSize=200`)
        .then((r) => {
          let response = r.data,
            currentDrugList = r.data.data.data;
          console.log(currentDrugList);
          for (let i = 0; i < currentDrugList.length; i++) {
            ds.addDrugs({ data: currentDrugList[i] });
          }
          // this.currentProgress = cntr;
          console.log(response);
          this.currentProgress =
            ((response.data.pageNo * response.data.pageSize) /
              response.data.totalItems) *
            100;
          this.parseDrugs(ds, cntr + 1);
        })
        .catch((err) => {
          if (err.response) {
            // client received an error response (5xx, 4xx)
            this.dialog = false;
            this.snackbar = true;
            this.snackbarColor = "error";
            this.syncError = true;
            this.snackbarText = err.response.data.message;
            return;
          } else if (err.request) {
            // client never received a response, or request never left
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
      let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
  },
  computed: {
    ...mapGetters(["currentLoggedUserType", "tknExp"]),
  },
  watch: {
    $route(to, from) {
      // react to route changes...
      if (from.fullPath === "/auth/signin") {
        this.checkIfInitialLogInAndSync();
      }
    },
    tknExp(val) {
      lthis.dialogExpSignIn = val;
    },
  },
  mounted() {
    const DEBUG = true;
    if (!DEBUG) {
      if (!window.console) window.console = {};
      var methods = ["log", "debug", "warn", "info"];
      for (var i = 0; i < methods.length; i++) {
        console[methods[i]] = function () {};
      }
    }
    this.GS = new ABService();
    localStorage.setItem("selectedAppointment", null);
    this.checkIfInitialLogInAndSync();

    let il = getSmallData("IL");
    il.then((res) => {
      console.log(res);
    });
  },
  created() {},
};
</script>
<style lang="scss">
.preview p {
  margin-bottom: 0 !important;
}
.tick .v-input--selection-controls {
  margin-top: 0;
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
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
.expDialog {
  overflow: none !important;
}
</style>
