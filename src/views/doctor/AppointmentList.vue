<template>
  <div>
    <v-card rounded="0" elevation="0" color="#f2f5f8">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>
    <v-card class="py-2" rounded="0" elevation="0" color="error">
      <h5 style="color:white;text-align:center">
        This feature works only when online
      </h5>
    </v-card>
    <v-container>
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
              <v-icon large>mdi-timetable</v-icon>
              <h3 class="mt-5 ml-2">Appointment By Date</h3>
              <v-spacer></v-spacer>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template
                  style="width:50px !important;"
                  v-slot:activator="{ on, attrs }"
                >
                  <v-text-field
                    v-model="date"
                    label="Select Appoinment Date First"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(date), getAppointments()"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-row>
            <v-row
              style="background-color:#f2f5f8;border-radius:8px;text-align:center"
            >
              <v-col cols="3">
                <b>Name</b>
              </v-col>
              <v-col cols="1">
                <b>Age</b>
              </v-col>
              <v-col>
                <b>Phone Number</b>
              </v-col>
              <v-col>
                <b>Date</b>
              </v-col>
              <v-col>
                <b>Payment</b>
              </v-col>
                <v-col>
                   <b>Status</b>
                 </v-col>
              <v-col cols="2">
                <b>Action</b>
              </v-col>
            </v-row>
            <v-row
              class="text-center"
              align="center"
              v-if="appointmentList.length == 0"
            >
              <v-col>
                <h3>{{ message }}</h3>
              </v-col>
            </v-row>
            <v-row
              v-for="(appointment, i) in appointmentList"
              :key="i"
              style="text-align:center;border-bottom: 1px solid #e7e7e7"
              :class="{ incomplete: (appointment.prescription == null || appointment.prescription.id == '')}"
            >
              <v-col class="ml-2" style="text-align:left" cols="3">
                <v-row>
                  <v-col cols="3">
                    <v-avatar
                      class="my-3 white--text"
                      :color="getRandomColor()"
                      size="40"
                      ><h3>
                        {{ appointment.patientName.charAt(0) }}
                      </h3></v-avatar
                    >
                  </v-col>
                  <v-col>
                    <h4 class="mt-5">
                      {{ appointment.patientName }}
                    </h4>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="1">
                <v-chip class="mt-3" small outlined color="teal">{{
                  appointment.patientAge
                }}</v-chip>
              </v-col>
              <v-col>
                <v-card-subtitle>
                  {{ appointment.patientPhoneNo }}
                </v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-subtitle>
                  {{ appointment.appointmentDate }}
                </v-card-subtitle>
              </v-col>
              <v-col>
                <v-chip class="mt-3 white--text" small color="blue">{{
                  appointment.paymentMethod
                }}</v-chip>                                                                                      
              </v-col>
               <v-col>
                                        <v-chip class="mt-3" small :color="getAppointmentStatusColor(appointment) ">{{getAppointmentStatus(appointment)}}</v-chip>
                                    </v-col>
              <v-col cols="2">
                <v-card-subtitle>
                  <v-btn-toggle>
                    <v-btn color="info" depressed small
                      ><v-icon style="color:white!important" small
                        >mdi-eye</v-icon
                      ></v-btn
                    >
                    <v-btn
                      color="info"
                      @click="print(appointment.id)"
                      depressed
                      small
                      ><v-icon style="color:white!important" small
                        >mdi-printer</v-icon
                      ></v-btn
                    >
                  </v-btn-toggle>
                </v-card-subtitle>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const API_URL = "https://api.a2sdms.com/";
const GET_APPOINtMENTS_API = API_URL + "appointments/";
import { initJsStore } from "@/service/idb_service.js";
import { ABService } from "@/service/Generic_Service.js";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export default {
  async beforeCreate() {
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
      message: "No appoinments available at this date !",
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      auth: "Bearer " + JSON.parse(localStorage.getItem("uData")).token,
      menu: false,
      modal: false,
      ABS: null,
      menu: false,
      createAppDialog: false,
      genders: ["Male", "Female"],
      paymentMethods: ["Cash", "Online"],
      localAppointment: {
        appointmentDate: "",
        createdOn: 0,
        gender: "Male",
        id: "",
        offline: true,
        paid: false,
        patientAddress: "",
        patientAge: "",
        patientName: "",
        patientPhoneNo: "",
        patientProblem: "",
        paymentMethod: "Cash"
      },
      appointment: {
        appointmentDate: "",
        createdAt: 0,
        createdBy: "",
        doctorsFee: 0,
        gender: "Male",
        id: "",
        isCompleted: false,
        isExpired: false,
        isPaid: false,
        otherFees: 0,
        patientAddress: "",
        patientAge: "",
        patientName: "",
        patientPhoneNo: "",
        patientProblem: "",
        paymentMethod: "Cash",
        prescription: {
          advice: [],
          bloodPressure: 0,
          chiefComplaints: [],
          diagnosis: [],
          id: "",
          investigationAdvice: [],
          medicines: [],
          onExamination: [],
          pulse: 0,
          temperature: 0
        },
        totalFee: 0,
        updatedAt: 0,
        updatedBy: ""
      },

      appointmentList: [],
      items: [
        {
          text: "a2sDMS",
          disabled: false,
          href: "/"
        },
        {
          text: "Previous Appointment",
          disabled: true,
          href: "create-appointment"
        }
      ]
    };
  },
  methods: {
    show() {
      return 0;
    },
    getAppointmentStatus(appointment){
      if(appointment.prescription == null || appointment.prescription.id == '')
      return "Incomplete";
      else  return "Complete";
    },
    getAppointmentStatusColor(appointment){
      if(appointment.prescription == null || appointment.prescription.id == '')
      return "error";
      else return "success";
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
    async getAppointmentList() {
      let data = await this.ABS.getData("Appointment");
      console.log(data);
      this.appointmentList = data;
    },
    print(id) {
      let routeData = this.$router.resolve("print/prescription/" + id);
      window.open(routeData.href, "_blank");
    },
    getAppointments() {
      this.message = "Loading ... ";
      axios({
        method: "get",
        url: `${GET_APPOINtMENTS_API}?date=${this.date}&pageNo=0&pageSize=200`,
        headers: {
          Authorization: this.auth,
          "Content-Type": "application/json"
        }
      })
        .then(r => {
          let response = r.data.data.data;
          this.appointmentList = response;
          console.log(response);
        })
        .catch(e => {
          console.log(e);
          this.appointmentList = [];
          this.message = "No appoinments available at this date !";
        });
    }
  },
  mounted() {
    this.ABS = new ABService();
    this.getAppointments();
  }
};
</script>
</script>
<style scoped>
.incomplete{
    background-color: #ffe7e7;
}
</style>