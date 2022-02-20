<template>
  <div>
    <v-card rounded="0" elevation="0" color="#f2f5f8">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>
    <v-row
      v-if="!userInfo"
      style="margin-top:20px;text-align:center;vertical-align:middle !important"
    >
      <v-col style="margin:auto">
        <v-progress-circular
          :size="70"
          :width="7"
          color="#d4d6d8"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="3" md="3" sm="12" cols="12">
        <v-card flat class="ma-5" elevation="0">
          <h4>Dashboard</h4>
          <br />
          <v-row v-for="item in userInfo.dashboard" :key="item.text">
            <v-col>
              <v-card
                elevation="0"
                class="my-2"
                :color="getRandomColor()"
              >
              <!--                 link
                :to="'project/' + item.id" -->
                <v-row>
                  <v-col cols="3">
                    <v-icon class="mx-5 my-7" x-large>{{ item.icon }}</v-icon>
                  </v-col>
                  <v-col cols="9">
                    <strong style="font-size:12;color:gray">{{
                      item.text
                    }}</strong>
                    <br />
                    <h1 class="mt-4">{{ item.count }}</h1>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-divider class="mx-0" vertical></v-divider>
      <v-col lg="" md="9" sm="12" cols="12">
        <v-card class="ma-5" elevation="0">
          <v-row>
            <v-col v-if="currentLoggedUserType.includes('DOCTOR')">
              <v-card
                color="teal lighten-5"
                outlined
                class="mt-2 pa-4"
                elevation="0"
                style="border: 1px solid #e7e7e7"
                width="100%"
              >
                <v-row>
                  <v-col cols="3">
                    <v-avatar size="160" color="indigo">
                      <v-icon size="120" dark>
                        mdi-account-circle
                      </v-icon>
                    </v-avatar>
                    <!-- <v-img
                      sizes="10"
                      class="ma-5 mx-15"
                      style="width:160px;height:160px;border:1px solid gray;border-radius:100px!important"
                      src="https://www.cdc.gov/drugoverdose/training/modules/module1/images/welcomeimage.png"
                    ></v-img> -->
                  </v-col>
                  <v-col cols="4">
                    <h2 class="ma-4">
                        <b>{{ userInfo.name }}</b>
                    </h2>
                    <v-chip small outlined class="ml-4"
                      >{{ userInfo.designation || "not provided" }} ,
                      {{ userInfo.organization || "not provided" }}</v-chip
                    >
                  </v-col>
                  <v-col>
                    <v-row>
                      <v-col>
                        <v-card-subtitle>
                          <b>Email:</b> <br />{{
                            userInfo.email || "not provided"
                          }}
                        </v-card-subtitle>
                      </v-col>
                      <v-col align-self="center">
                        <v-chip color="teal" class="white--text" small link
                          ><b>Doctor</b></v-chip
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-card-subtitle>
                          <b>Phone Number:</b> <br />{{ userInfo.phoneNo }}
                        </v-card-subtitle>
                      </v-col>
                      <v-col>
                        <v-card-subtitle>
                          <b>Address:</b> <br />
                          {{ userInfo.thana }} , {{ userInfo.district }}
                        </v-card-subtitle>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <moderator-controller
            v-if="
              currentLoggedUserType.includes('ADMIN') ||
                currentLoggedUserType.includes('SUPER_ADMIN')
            "
          >
          </moderator-controller>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import moderatorController from "@/views/admin/ModeratorController";
import { ABService } from "@/service/Generic_Service.js";
export default {
  components: {
    moderatorController
  },
  data() {
    return {
      GS: null,
      idx: 0,
      input: "",
      adddialog: false,
      GET_LOGGED_IN_PROFILE_API: "https://api.a2sdms.com/auth/user-info",
      user: {},
      usedData: {},
      auth: "Bearer " + localStorage.getItem("token"),
      userInfo: {
        dashboard: []
      },
      appointmentList: [
        // {
        //   id: "1",
        //   firstName: "Injamamul Haque",
        //   lastName: "Sonet",
        //   age: "22",
        //   phoneNo: "017354635920",
        //   address: "Dhaka, Bangladesh"
        // },
        // {
        //   id: "2",
        //   firstName: "Faisul",
        //   lastName: "Islam",
        //   age: "19",
        //   phoneNo: "017354635920",
        //   address: "Dhaka, Bangladesh"
        // }
      ],
      items: [
        {
          text: "a2sDMS",
          disabled: false,
          href: "/"
        },
        {
          text: "Dashboard",
          disabled: true,
          href: "dashboard"
        }
      ],
      // for admin related datas
      doctorPrescriptionRequestModel: {
        appointmentPerDay: 0,
        doctorChamberAddress: "",
        fee: 0
      },
      doctorPrescriptionRequestNumber: ""
    };
  },
  methods: {
    getRandomColor() {
      return (
        "rgb(" +
        (Math.floor(Math.random() * 56) + 200) +
        ", " +
        (Math.floor(Math.random() * 56) + 200) +
        ", " +
        (Math.floor(Math.random() * 56) + 200) +
        ")"
      );
    },
    show() {
      return 0;
    },
    async getProfileData() {
      let response = await this.GS.getData("ProfData");

      this.userInfo = Object.assign({}, this.userInfo, response[0].data);
      this.userInfo;
      console.log(this.userInfo);
    },
    setSideDataBasedOnUser() {
      console.log(this.dashboard);
      if (this.userInfo.dashboard.length != 0) return;
      if (
        this.currentLoggedUserType.includes("ADMIN") ||
        this.currentLoggedUserType.includes("SUPER_ADMIN")
      ) {
        let o = [
          {
            text: "Total Doctors",
            count: 80,
            icon: "mdi-doctor"
          },
          {
            text: "Total Users",
            count: 320,
            icon: "mdi-account-multiple"
          },
          {
            text: "Todays Earn",
            count: 800,
            icon: "mdi-cash"
          }
        ];
        this.userInfo.dashboard.push(...o);
      }
      if (this.currentLoggedUserType.includes("DOCTOR")) {
        let o = [
          {
            text: "Todays Appointment",
            count: 80,
            icon: "mdi-playlist-minus"
          },
          {
            text: "Todays Earn",
            count: 800,
            icon: "mdi-cash"
          },
          {
            text: "Total Appointment",
            count: 320,
            icon: "mdi-playlist-check"
          },
          {
            text: "Total Earn",
            count: 34000,
            icon: "mdi-cash-multiple"
          }
        ];
        this.userInfo.dashboard.push(...o);
      }
    }
  },
  watch: {
    currentLoggedUserType() {
      this.setSideDataBasedOnUser();
    }
  },
  computed: {
    ...mapGetters(["currentLoggedUserType"])
  },
  mounted() {
    this.GS = new ABService();
    // this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.getProfileData();
    let user = JSON.parse(localStorage.getItem("uData"));
    this.userData = user;
    this.setSideDataBasedOnUser();
  }
};
</script>
<style lang="scss" scoped>
.rowise .col-6 {
  padding-bottom: 0px !important;
  padding-top: 0px !important;
}
</style>
