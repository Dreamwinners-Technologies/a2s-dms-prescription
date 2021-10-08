<template>
  <v-app>
    <router-view/>
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
  </v-app>
</template>
<script>
import {mapGetters} from "vuex";

import { initJsStore } from "@/service/idb_service.js";
import { DrugService } from "@/service/drugs_service.js";
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
    
      dialog : false,
       currentProgress: 0
    }
  },
  methods: {
   checkIfInitialLogInAndSync(){
     let cu = JSON.parse(localStorage.getItem("uData")).roles;
     if(cu.includes("DOCTOR") && localStorage.getItem("IL") == "true"){
       this.syncDB();
     }
   },
   
    syncDB() {
      this.dialog = true;

      let ds = new DrugService();
      this.parseDrugs(ds,0);
      
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
  },
  computed: {
    ...mapGetters(["currentLoggedUserType"])
  },
  mounted(){
    localStorage.setItem("selectedAppointment",null)
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
