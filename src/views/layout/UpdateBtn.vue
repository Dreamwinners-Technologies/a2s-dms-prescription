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
      @click="initDB()"
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
    <v-dialog
      v-model="dialog"
      persistent
      width="300"
      style="height:40px;"
    >
      <v-card
        color="#009688"
        class="text-center"
      >
       
         <span style="color:white;">
            Please wait, Syncing ... 
           </span>
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
import axios from "axios"
import { initJsStore } from "@/service/idb_service";
import { DrugService } from "@/service/drugs_service";
import { Global } from "@/global";


export default {
  components: {
  },
  data () {
    return {
       students: [],
       dialog: false
    }
  },
   async beforeCreate() {
  
  },
    created() {
  },
  methods: {
     async refreshStudent() {
      this.students = await new DrugService().getDrugs();
    },
   async initDB(){
  try {
      const isDbCreated = await initJsStore();
      if (isDbCreated) {
        console.log("db created");
         this.syncDB()
        // prefill database
      } else {

        console.log("db opened");
this.searchDrugs()
      }
    } catch (ex) {
      console.error(ex);
      alert(ex.message);
      Global.isIndexedDbSupported = false;
    }
    },
   syncDB(){
     this.dialog = true
    this.initDB()
     
  let ds = new DrugService();
      axios
        .get(
          `http://need-doctors-backend.southeastasia.cloudapp.azure.com:8100/drugs?pageNo=0&pageSize=500`
        )
        .then(r => {
          let response = r.data,
              currentDrugList = r.data.drugModelList
              //  console.log("r")
       for (let i = 0;i < currentDrugList.length;i++){
         ds.addDrugs(currentDrugList[i])
       }
         this.dialog = false
           console.log(r)
        });
   },
   async searchDrugs(){
     let results = []
     results = await new DrugService().searchDrug("I");
     console.table(results)
   },
   async addDrugs(d){
     await this.db.addDrugsToTable(d);
   }
  },
  mounted(){

  },
}
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