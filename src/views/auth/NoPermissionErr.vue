<template>
  <v-container class="full-height" fluid>
    <v-row
      style="padding-top:8%;vertical-align: middle; !important"
      align="center"
      justify="center"
    >
     <v-col class="d-flex justify-center align-center">
          <h1>Hi , {{userData.name}}</h1>
     </v-col>
    </v-row>
    <v-row
      style="padding-top:10px;vertical-align: middle; !important"
      align="center"
      justify="center"
    >
      <v-col class="d-flex justify-center align-center">
        <v-card
          flat
          style="padding:2.5%;border:1px solid #d6d9db;margin: auto; !important"
          color="white"
          width="500"
          max-height="1000"
        >
       <v-row style="text-align:center !important">
           <v-col>
                <v-icon color="error" x-large>mdi-information-outline</v-icon> <br> <br>
                <h4>You have no permission to use this application.</h4> <br>
                
                <p>প্রেসক্রিপশন ব্যাবহারের জন্য এডমিন এর সাথে যোগাযোগ করুন।</p>
                <h4>মোঃ আরিফুল ইসলাম <br> ফোনঃ ০১৭১০০০০৪০৫</h4> <br>
                <v-btn depressed small @click="logOut"  color="info"><v-icon class="mr-2" small>mdi-exit-to-app</v-icon>Log Out</v-btn>
           </v-col>
       </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-footer fixed>
      <p style="text-align:center;margin:auto; !important">
        Copyright  {{ year }} © a2sdms Prescription
      </p>
    </v-footer>
  </v-container>
</template>

<script>
import { dropDatabase } from "@/service/idb_service.js";
export default {
    data(){
        return {
            year: new Date().getFullYear(),
            userData: {
              name: "null"
            },
            isDoctor: "",
            isAdmin: "",
        }
    },
  methods: {
    async logOut(){
        localStorage.removeItem("token");
        localStorage.removeItem("uData");
        localStorage.setItem("IL", true);
        
        // this.clearTable("Drugs","ProfData");
        const dbDeleted = await dropDatabase();
        this.$router.push("/auth/signin");
        
    },
    getCurrentLoggedUserType(){
      let user = JSON.parse(localStorage.getItem("uData"));
      this.userData = user;
      this.isDoctor = user.roles.includes("DOCTOR");
      this.isAdmin = user.roles.includes("SUPER_ADMIN") || user.roles.includes("ADMIN");
    },
    checkPermission(){
      if (localStorage.token != undefined) {
        if(this.isAdmin || this.userData.hasPrescriptionAccess){
          this.$router.push("/");
        }
      }
    }
  },
  mounted() {
    if(localStorage.getItem("token") == null){
       this.$router.push("/auth/signin")
     }
    this.getCurrentLoggedUserType()
    // this.checkPermission()
  }
 
};
</script>

<style scoped>
.full-height {
  background-color: #f2f5f8;
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
.theme--light.v-messages {
  color: #e4515d;
}
</style>
