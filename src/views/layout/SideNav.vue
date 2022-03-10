<template>
  <v-navigation-drawer dark app permanent expand-on-hover>
    <!-- <v-list>
          <v-list-item class="px-2" link>
            <v-list-item-avatar>
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
        </v-list> -->

    <v-divider></v-divider>

    <v-list nav dense>
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
        <v-list-item-title>Todays Appointment</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isDoctor" link to="appointment-list">
        <v-list-item-icon>
          <v-icon>mdi-clipboard-text</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Previous Appointment</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="isDoctor" link to="fav-medicine">
        <v-list-item-icon>
          <v-icon>mdi-heart</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Favourite Medicine</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="isAdmin" link to="doctor-approve">
        <v-list-item-icon>
          <v-icon>mdi-doctor</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Doctor Controller</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="isAdmin" link to="ambulance-controller">
        <v-list-item-icon>
          <v-icon>mdi-ambulance</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Ambulance Controller</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="isAdmin" link to="research-controller">
        <v-list-item-icon>
          <v-icon>mdi-abacus</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Research Controller</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="isAdmin" link to="card-controller">
        <v-list-item-icon>
          <v-icon>mdi-card-bulleted</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Card Controller</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="isAdmin" link to="medicine-request">
        <v-list-item-icon>
          <v-icon>mdi-pill</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Medicine Request</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="isAdmin" link to="medicine-controller">
        <v-list-item-icon>
          <v-icon>mdi-medical-bag</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Medicine Controller</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="isAdmin" link to="generic-controller">
        <v-list-item-icon>
          <v-icon>mdi-bowling</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Generic Contoller</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="isDoctor" link to="edit-template">
        <v-list-item-icon>
          <v-icon>mdi-page-layout-header</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Edit Template</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isAdmin" link to="doctor-support">
        <v-list-item-icon>
          <v-icon>mdi-message-alert</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Doctor Support</v-list-item-title>
      </v-list-item>
      <v-list-item link to="about">
        <v-list-item-icon>
          <v-icon>mdi-information-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Help</v-list-item-title>
      </v-list-item>
    </v-list>

    <!-- nav footer -->

    <v-footer class="pa-0" style="display: inline-block" fixed>
      <v-list nav dense>
        <v-list-item>
          <v-list-item-icon>
            <v-icon :color="setOnlineStatus() ? 'green' : 'red'">{{
              setOnlineStatus()
                ? "mdi-checkbox-blank-circle"
                : "mdi-checkbox-blank-circle-outline"
            }}</v-icon>
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
import { dropDatabase } from "@/service/idb_service.js";
import { ABService } from "@/service/Generic_Service.js";

export default {
  data() {
    return {
      onlineStatus: "Offline",
      isDoctor: "",
      isAdmin: "",
      userData: "",
      ABS: null
    };
  },
  methods: {
    setOnlineStatus() {
      if (window.navigator.onLine) {
        this.onlineStatus = "Online";
        return true;
      } else {
        this.onlineStatus = "Offline";
        return false;
      }
    },
    async logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("uData");
      localStorage.setItem("IL", true);

      // this.clearTable("Drugs","ProfData");
      const dbDeleted = await dropDatabase();
      this.$router.push("/auth/signin");
    },
    getCurrentLoggedUserType() {
      let user = JSON.parse(localStorage.getItem("uData"));
      this.userData = user;
      this.isDoctor = user.roles.includes("DOCTOR");
      this.isAdmin =
        user.roles.includes("SUPER_ADMIN") || user.roles.includes("ADMIN");
      this.$store.commit("setCurrentLoggedUserType", user.roles);
    },
    async clearTable(...tables) {
      for (let table of tables) {
        await this.ABS.clearTable(table);
      }
    },
    checkPermission() {
      if (localStorage.token != undefined) {
        if (!this.isAdmin && !this.userData.hasPrescriptionAccess) {
          this.$router.push("/auth/no-permission");
        }
      }
    }
  },

  mounted() {
    this.ABS = new ABService();
    if (localStorage.getItem("token") == null) {
      this.$router.push("/auth/signin");
    }
    this.setOnlineStatus();
    this.getCurrentLoggedUserType();
    // this.checkPermission();
  }
};
</script>

<style lang="scss" scoped>
.v-list-item__title {
  font-size: 15px !important;
}
.v-breadcrumbs__item a {
  font-weight: bolder !important;
}
</style>
