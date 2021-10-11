<template>
    <v-navigation-drawer
        dark
        app
        permanent
        expand-on-hover
      >
        <v-list>
          <v-list-item class="px-2" link>
            <v-list-item-avatar>
              <!-- <v-img src="https://www.cdc.gov/drugoverdose/training/modules/module1/images/welcomeimage.png"></v-img> -->
            <v-avatar color="indigo">
      <v-icon dark>
        mdi-account-circle
      </v-icon>
    </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{userData.name}}
              </v-list-item-title>
              <v-list-item-subtitle>{{userData.phoneNo}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item link to="/">
            <v-list-item-icon>
              <v-icon>mdi-creation</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isDoctor" link to="/rx-prescription">
            <v-list-item-icon>
              <v-icon>mdi-prescription</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Create Presciption</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isDoctor" link to="/create-appointment">
            <v-list-item-icon>
              <v-icon>mdi-clipboard-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Create Appointment</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isDoctor" link to="appointment-list">
            <v-list-item-icon>
              <v-icon>mdi-clipboard-text</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Appointment List</v-list-item-title>
          </v-list-item>
          
          <v-list-item v-if="!isDoctor" link to="doctor-approve">
            <v-list-item-icon>
              <v-icon>mdi-doctor</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Doctor Approve</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="!isDoctor" link to="generic-controller">
            <v-list-item-icon>
              <v-icon>mdi-pill</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Generic Contoller</v-list-item-title>
          </v-list-item>
          
          <v-list-item v-if="isDoctor" link to="edit-template">
            <v-list-item-icon>
              <v-icon>mdi-cards-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Edit Template</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isDoctor" link to="settings">
            <v-list-item-icon>
              <v-icon>mdi-power-settings</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
          <v-list-item link to="about">
            <v-list-item-icon>
              <v-icon>mdi-information-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
        </v-list>

        <!-- nav footer -->
        
        <v-footer class="pa-0" style="display: inline-block" fixed>
          <v-list nav dense>
            <v-list-item>
              <v-list-item-icon>
                <v-icon :color="setOnlineStatus() ? 'green' : 'red'">{{ setOnlineStatus() ? 'mdi-checkbox-blank-circle' : 'mdi-checkbox-blank-circle-outline'}}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ onlineStatus }}</v-list-item-title>
            </v-list-item>

            <v-list-item @click="logOut">
              <v-list-item-icon>
                <v-icon>mdi-exit-to-app</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
        </v-list>
        </v-footer>
    </v-navigation-drawer>
</template>
<script>
import { initJsStore } from "@/service/idb_service.js";
import { ABService } from "@/service/Generic_Service.js";

export default {

  data() {
    return {
      onlineStatus: "Offline",
      isDoctor: "",
      userData: "",
         ABS: null,
    }
  },
  methods: {
    setOnlineStatus() {
      if(window.navigator.onLine){
        this.onlineStatus="Online";
        return true;
      }
      else
      {
        this.onlineStatus="Offline";
        return false;
      }
    },
      logOut(){
      localStorage.removeItem("token");
      localStorage.removeItem("uData");
      localStorage.setItem("IL", true);
      this.$router.push("/auth/signin");
      this.clearTable("Drugs","ProfData");
  },
  getCurrentLoggedUserType(){
    let user = JSON.parse(localStorage.getItem("uData"));
    this.userData = user;
    this.isDoctor = user.roles.includes("DOCTOR");
    this.$store.commit("setCurrentLoggedUserType",user.roles);
  },
  async clearTable(...tables){
      for(let table of tables){
        await this.ABS.clearTable(table);
      }
  }

  },

  mounted() {
    this.ABS = new ABService();
     if(localStorage.getItem("token") == null){
       this.$router.push("/auth/signin")
     }
    this.setOnlineStatus();
    this.getCurrentLoggedUserType();
   
  }
}
</script>

<style lang="scss" scoped>
.v-list-item__title {
  font-size: 15px !important;
}
.v-breadcrumbs__item a{
  font-weight: bolder !important;
}
</style>
