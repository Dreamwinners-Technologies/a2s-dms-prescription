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
                link
                :to="'project/' + item.id"
              >
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
            <v-col v-if="currentLoggedUserType == 'DOCTOR'">
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
                    <v-img
                      sizes="10"
                      class="ma-5 mx-15"
                      style="width:160px;height:160px;border:1px solid gray;border-radius:100px!important"
                      src="https://www.cdc.gov/drugoverdose/training/modules/module1/images/welcomeimage.png"
                    ></v-img>
                  </v-col>
                  <v-col cols="4">
                    <h2 class="ma-4">
                      <b
                        >Dr. {{ userInfo.firstName }} {{ userInfo.lastname }}</b
                      >
                    </h2>
                    <v-chip small outlined class="ml-4"
                      >{{ userInfo.degree }} , {{ userInfo.institute }}</v-chip
                    >
                  </v-col>
                  <v-col>
                    <v-row>
                      <v-col>
                        <v-card-subtitle>
                          <b>Email:</b> <br />{{ userInfo.email }}
                        </v-card-subtitle>
                      </v-col>
                      <v-col align-self="center">
                        <v-chip color="teal" class="white--text" small link
                          ><b>{{ userInfo.role }}</b></v-chip
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-card-subtitle>
                          <b>Phone Number:</b> <br />{{ userInfo.phone }}
                        </v-card-subtitle>
                      </v-col>
                      <v-col>
                        <v-card-subtitle>
                          <b>Address:</b> <br />
                          {{ userInfo.address }}
                        </v-card-subtitle>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <!-- appointment list  -->
          <v-row>
            <v-col>
              <v-card
                class="pa-4 mt-2"
                elevation="0"
                style="border: 1px solid #e7e7e7"
                width="100%"
              >
                <v-row class="pa-5">
                  <v-icon large>mdi-clipboard-text</v-icon>
                  <h3
                    v-if="currentLoggedUserType == 'DOCTOR'"
                    class="mt-1 ml-2"
                  >
                    Recent Appointment
                  </h3>
                  <h3 v-if="currentLoggedUserType == 'ADMIN'" class="mt-1 ml-2">
                    Approve Doctor
                  </h3>
                </v-row>
                <template v-if="currentLoggedUserType == 'DOCTOR'">
                  <v-row
                    style="background-color:#f2f5f8;border-radius:8px;text-align:center"
                  >
                    <v-col cols="4">
                      <b>Name</b>
                    </v-col>
                    <v-col>
                      <b>Age</b>
                    </v-col>
                    <v-col>
                      <b>Phone Number</b>
                    </v-col>
                    <v-col>
                      <b>Address</b>
                    </v-col>
                    <v-col>
                      <b>Action</b>
                    </v-col>
                  </v-row>
                  <v-row
                    v-for="appointment in appointmentList"
                    :key="appointment.id"
                    style="text-align:center;border-bottom: 1px solid #e7e7e7"
                  >
                    <v-col class="ml-2" style="text-align:left" cols="4">
                      <v-row>
                        <v-col cols="3">
                          <v-avatar
                            class="ma-3 white--text"
                            :color="getRandomColor()"
                            size="42"
                            ><h3>
                              {{ appointment.firstName.charAt(0) }}
                            </h3></v-avatar
                          >
                        </v-col>
                        <v-col>
                          <h4 class="mt-5">
                            {{ appointment.firstName }}
                            {{ appointment.lastName }}
                          </h4>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col>
                      <v-chip class="mt-3" small outlined color="teal">{{
                        appointment.age
                      }}</v-chip>
                    </v-col>
                    <v-col>
                      <v-card-subtitle>
                        {{ appointment.phoneNo }}
                      </v-card-subtitle>
                    </v-col>
                    <v-col>
                      <v-card-subtitle>
                        {{ appointment.address }}
                      </v-card-subtitle>
                    </v-col>
                    <v-col>
                      <v-card-subtitle>
                        <v-btn color="info" depressed small
                          ><v-icon small>mdi-prescription</v-icon></v-btn
                        >
                      </v-card-subtitle>
                    </v-col>
                  </v-row>
                </template>
                <template v-if="currentLoggedUserType == 'ADMIN'">
                    <v-form ref="doctorApproveForm">
                  <v-row
                    style="background-color:#fff;border-radius:8px;text-align:center"
                  >
                    <v-col  >
                      <v-text-field
                        v-model="doctorPrescriptionRequestNumber"
                        class="mt-2 pa-0"
                        outlined
                        color="#666666"
                        dense
                        number
                        label="Doctor Number"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col  >
                      <v-text-field
                        v-model="doctorPrescriptionRequestModel.appointmentPerDay"
                        placeholder="120/80"
                        class="mt-2 pa-0"
                        outlined
                        color="#666666"
                        dense
                        label="Appointments per Day"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col  >
                      <v-text-field
                        v-model="doctorPrescriptionRequestModel.doctorChamberAddress"
                        class="mt-2 pa-0"
                        outlined
                        color="#666666"
                        dense
                        label="Chamber Address"
                      >
                      </v-text-field>
                    </v-col>
                                        <v-col  >
                      <v-text-field
                        v-model="doctorPrescriptionRequestModel.fee"
                        class="mt-2 pa-0"
                        outlined
                        color="#666666"
                        dense
                        label="Fee"
                      >
                      </v-text-field>
                    </v-col>
                   <v-col cols="12">
                    <v-btn color="#3f8485" class="white--text"
                  >Submit</v-btn
                >
                   </v-col>
                  </v-row>
                    </v-form>
                </template>
              </v-card>
            </v-col>
          </v-row>
          <moderator-controller v-if="currentLoggedUserType == 'ADMIN'">

          </moderator-controller>
          
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import moderatorController from "@/views/admin/ModeratorController"
export default {
  components: {
moderatorController
  },
  data() {
    return {
      idx: 0,
      input: "",
      adddialog: false,
      GET_LOGGED_IN_PROFILE_API:
        "https://buggie-backend.herokuapp.com/auth/user-info",
      user: {},
      auth: "Bearer " + localStorage.getItem("token"),
      userInfo: {
        firstName: "Tasnim",
        lastname: "Jara",
        institute: "Dhaka Medical College",
        degree: "MBBS",
        phone: "01734543027",
        email: "sandra.dr@gmail.com",
        role: "Doctor",
        address: "Dhaka, Bangladesh",
        dashboard: []
      },
      appointmentList: [
        {
          id: "1",
          firstName: "Injamamul Haque",
          lastName: "Sonet",
          age: "22",
          phoneNo: "017354635920",
          address: "Dhaka, Bangladesh"
        },
        {
          id: "2",
          firstName: "Faisul",
          lastName: "Islam",
          age: "19",
          phoneNo: "017354635920",
          address: "Dhaka, Bangladesh"
        }
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
      doctorPrescriptionRequestNumber: "",
    };
  },
  methods: {
    getProfileInfo() {
      console.log(this.auth);
      axios({
        method: "get",
        url: this.GET_LOGGED_IN_PROFILE_API,
        headers: {
          Authorization: this.auth,
          "Content-Type": "application/json"
        }
      })
        .then(r => {
          console.log(r.data);
          this.userInfo = r.data;
          localStorage.setItem("userInfo", JSON.stringify(r.data));
          this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
          console.log(this.userInfo.firstName);
          // location.reload();
        })
        .catch(r => {
          console.log(r);
        });
    },
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
    setSideDataBasedOnUser() {
      console.log(this.dashboard);
      if (this.userInfo.dashboard.length != 0) return;
      if (this.currentLoggedUserType == "ADMIN") {
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
      } else {
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
    // this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // this.getProfileInfo();
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
