<template>
  <v-app>
    <v-main>
      <div class="body">
        <v-container>
          <div class="print-container">
            <v-row class="my-0">
              <v-col>
                <span
                  class="preview"
                  style="text-align: left !important;"
                  v-html="leftHeader"
                ></span>
              </v-col>
              <v-col style="text-align:right !important">
                <span
                  class="preview"
                  style="text-align: right !important;"
                  v-html="rightHeader"
                ></span>
              </v-col>
            </v-row>
            <hr />
            <v-row class="my-0" style="text-align:center">
              <v-col>
                Patient ID: #P1234
              </v-col>
              <v-col> Name: {{ appointment.data.patientName }} </v-col>
              <v-col> Age: {{ appointment.data.patientAge }} Years Old </v-col>
              <v-col> Date: {{ new Date().toLocaleDateString() }} </v-col>
            </v-row>
            <hr />
            <v-row class="ma-0" style="height:670px">
              <v-col
                cols="4"
                style="border-right: 1px solid #f0f0f0 !important;"
              >
                <v-row>
                  <v-col>
                    <b>Cheif Complaints :</b><br /><br />
                    <ul class="px-4" style="list-style-type:none">
                      <li
                        v-for="(item, idx) in appointment.data.prescription
                          .chiefComplaints"
                        :key="idx"
                      >
                        {{ item }}
                      </li>
                    </ul>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <b>On Examination :</b><br /><br />
                    <ul class="px-4" style="list-style-type:none">
                      <li>
                        Pulse: {{ appointment.data.prescription.pulse }} mg
                      </li>
                      <li>
                        BP:
                        {{ appointment.data.prescription.bloodPressure }} mmHg
                      </li>
                      <li>
                        Temp:
                        {{ appointment.data.prescription.temperature }} Degree F
                      </li>
                      <li
                        v-for="(item, idx) in appointment.data.prescription
                          .onExamination"
                        :key="idx"
                      >
                        {{ item }}
                      </li>
                    </ul>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <b>Diagnosis :</b><br /><br />
                    <ul class="px-4" style="list-style-type:none">
                      <li
                        v-for="(item, idx) in appointment.data.prescription.diagnosis"
                        :key="idx"
                      >
                        {{ item }}
                      </li>
                    </ul>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <b>Investigation Advice :</b><br /><br />
                    <ul class="px-4" style="list-style-type:none">
                      <li
                        v-for="(item, idx) in appointment.data.prescription
                          .investigationAdvice"
                        :key="idx"
                      >
                        {{ item }}
                      </li>
                    </ul>
                  </v-col>
                </v-row>
              </v-col>
              <v-divider class="mx-0" vertical></v-divider>
              <v-col cols="7">
                <v-row>
                  <v-col>
                    <v-icon large>mdi-prescription</v-icon>
                    <br />
                  </v-col>
                </v-row>
                <v-row
                  class="my-0"
                >
                  <v-col class="mx-4">
                    <ol>
                      <li class="mb-3" v-for="(item, idx) in appointment.data.prescription.medicines"
                  :key="idx">
                       <b style="font-size: 15px !important;"> {{ getMedicineNameParsed(item.brand,"general") }}</b
                    > <b v-if="getMedicineNameParsed(item.brand,'generic')"> | </b> <small>{{  getMedicineNameParsed(item.brand,"generic") }}</small><br />
                    {{ item.dose }} --- {{ item.instruction }} ---
                    {{ item.duration }} <br />
                    <div v-if="item.note">Note: {{ item.note }}</div>
                      </li>
                    </ol>
                  </v-col>
                </v-row>
                <br />
                <v-footer>
                  <v-row>
                    <v-col class="mx-2 mt-2">
                      <b>Given Advice: </b>
                      <ul  v-if="appointment.data.prescription.advice.length != 0" class="px-5" style="list-style-type:disc">
                      <li
                        v-for="(item, idx) in appointment.data.prescription.advice"
                        :key="idx"
                      >
                        {{ item }}
                      </li>
                    </ul>
                    </v-col>
                  </v-row>
                </v-footer>
              </v-col>
            </v-row>
            <v-row
                class="pt-2 mt-0"
                style="border-top: 1px solid #F0F0F0 !important;background-color:#F7F7F7 !important;"
              >
                 <v-col cols="3">
                    Made By <br />
                    <img 
                    style="max-width:200px;"
                    alt="A2S Need Bangladesh"
                    title="A2S Need Bangladesh"
                    src="../../assets/hero-logo.png">

                    <!-- </v-img> -->
                  </v-col>
                   <v-spacer> </v-spacer>
                  <v-col cols="5" style="border-top: 1px solid #f0f0f0 !important;">
                  <span
                      class="preview"
                      style="text-align: center !important;"
                      v-html="middleHeader"
                    ></span>
                  </v-col>
                  <v-spacer> </v-spacer>
                  <v-col cols="3" style="text-align:right !important">
                    Prescriped BY <br>
                    <b>{{appointment.data.updatedBy}}</b>
                  </v-col>
              </v-row>
          </div>
          <br />
          <br />
          <v-footer style="border: 1px solid #f7f7f7" class="py-2" fixed>
            <v-row>
              <v-col class="mx-auto" style="text-align:center !important;">
                <v-btn
                  depressed
                  color="error"
                  class="mr-2"
                  @click="closeWindow"
                  ><v-icon class="mr-2">mdi-close</v-icon>Close</v-btn
                >
                <v-btn depressed color="info" @click="print()"
                  ><v-icon class="mr-2">mdi-printer</v-icon>Print Now</v-btn
                >
              </v-col>
            </v-row>
          </v-footer>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import { initJsStore } from "@/service/idb_service.js";
import { ABService } from "@/service/Generic_Service.js";
export default {
  data() {
    return {
      leftHeader: "",
      rightHeader: "",
      middleHeader: "",
      ABS: null,
      selectedAppointment: "",
      windowSize: {
        x: 500,
        y: 200
      },
      idDrugs: 0,
      appointment: {
        data: {
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
        }
      }
    };
  },
  methods: {
    print() {
      window.print();
    },
    getMedicineNameParsed(medicineName,type){
        let parsedMedicineName = medicineName.split("|");
        if(parsedMedicineName.length == 2)
        return  ( type == "general" ? parsedMedicineName[0] : parsedMedicineName[1]);
        else
        return  ( type == "general" ? parsedMedicineName[0] : "");
    },
    closeWindow(){
window.close();
    },
    async getAppointmentData() {
      let id = this.selectedAppointment;
      console.log(id);
      if (id != null) {
        console.log("-----------------------------------");
        let r = await this.ABS.getDataById("Appointment", id);
        console.log("-----------------------------------");
        this.appointment = r[0];
        console.log(r);
      }
    }
  },
  mounted() {
    this.leftHeader = localStorage.getItem("leftHeader");
    this.rightHeader = localStorage.getItem("rightHeader");
    this.middleHeader = localStorage.getItem("middleHeader");
    this.selectedAppointment = this.$route.params.id;
    this.ABS = new ABService();
    this.getAppointmentData();
  }
};
</script>

<style scoped>
.preview .v-application p {
  margin-bottom: 0px !important;
}
html {
  margin: 0 !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol" !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.5 !important;
  color: #212529 !important;
  text-align: left !important;
}
.container {
  width: 100%;
  padding: 20px;
  margin-right: auto;
  margin-left: auto;
  border: 1px dashed #8c8c8c;
}
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
@media print {
  .body,
  .container {
    visibility: hidden !important;
    padding: 0;
    margin: 0;
  }
  .print-container {
    visibility: visible;
  }
  @page {
    size: A4;
  }
}
.v-footer {
  background-color: white;
}
</style>
