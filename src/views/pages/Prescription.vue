<template>
  <v-app>
    <v-container>
      <v-row class="my-0">
        <v-col>
          <span
            class="preview"
            style="text-align: left !important;"
            v-html="leftHeader"
          ></span>
        </v-col>
        <v-spacer> </v-spacer>
        <v-col style="text-align:right !important">
          <span
            class="preview"
            style="text-align: right !important;"
            v-html="rightHeader"
          ></span>
        </v-col>
      </v-row>
      <hr />
      <v-row justify="center" style="text-align:center">
        <v-col>
          Patient ID: #P1234
        </v-col>
        <v-col>
          Name: Maahbub Mia
        </v-col>
        <v-col>
          Age: 34 Years Old
        </v-col>
        <v-col>
          Date: 27 May 2021
        </v-col>
      </v-row>
      <hr />
      <v-row style="height:1160px">
        <v-col cols="4">
          <v-row>
            <v-col>
              <b>Cheif Complaints :</b><br /><br />
              <ul class="px-4" style="list-style-type:none">
                <li v-for="item in prescription.chiefComplaints" :key="item">
                  {{ item }}
                </li>
              </ul>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <b>On Examination :</b><br /><br />
              <ul class="px-4" style="list-style-type:none">
                <li>Pulse: {{ prescription.pulse }} mg</li>
                <li>BP: {{ prescription.bloodPressure }} mmHg</li>
                <li>Temp: {{ prescription.temperature }} Degree F</li>
                <li v-for="item in prescription.onExamination" :key="item">
                  {{ item }}
                </li>
              </ul>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <b>Diagnosis :</b><br /><br />
              <ul class="px-4" style="list-style-type:none">
                <li v-for="item in prescription.diagnosis" :key="item">
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
                  v-for="item in prescription.investigationAdvice"
                  :key="item"
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
          <v-row v-for="item in prescription.medicines" :key="item">
            <v-col class="mx-4">
              <h6>{{ item.brand }}</h6>
              <br />
              {{ item.dose }} --- {{ item.instruction }} ---
              {{ item.duration }} <br />
              Note: {{ item.note }}
            </v-col>
          </v-row>
          <br />
          <v-footer>
            <v-row justify="left">
              <v-col class="mx-2 mt-4">
                <b>Given Advice: </b>
                <p
                  style="margin:0px;display:block"
                  v-for="item in prescription.advice"
                  :key="item"
                >
                  {{ item }}
                </p>
              </v-col>
            </v-row>
          </v-footer>
        </v-col>
      </v-row>
      <!-- <br> 
        <br> -->
      <br />
      <br />
      <v-footer fixed>
        <v-container>
          <v-row
            class="pt-2"
            style="border-top: 1px solid #F0F0F0 !important;background-color:#F7F7F7 !important;"
          >
            <v-col>
              Made By <br />
              A2S DMS Prescription
            </v-col>
            <v-spacer> </v-spacer>
            <v-col style="text-align:right !important">
              https://prescription.a2sdms.com
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      leftHeader: "",
      rightHeader: "",
      prescription: {
        id: "",
        chiefComplaints: ["Fever for 3 days", "Runing nose"],
        diagnosis: ["", "", ""],
        investigationAdvice: ["CBC with ESR", "Plain X-Ray og chest : AP"],
        onExamination: ["", "", ""],
        advice: ["খাবার পরে খাবেন", "খাবার পরে খাবেন"],
        pulse: "88",
        temperature: "102",
        bloodPressure: "120/80",
        medicines: [
          {
            id: "1",
            brand: "Ace | Paracetamol | 500mg",
            dose: "১+০+১",
            instruction: "খাবার পরে খাবেন",
            duration: "৭ দিন",
            note: ""
          },
          {
            id: "2",
            brand: "Napa Extra | Paracetamol | 200mg",
            dose: "১+০+১",
            instruction: "খাবার পরে খাবেন",
            duration: "১৫ দিন",
            note: " -"
          },
          {
            id: "1",
            brand: "Ace | Paracetamol | 500mg",
            dose: "১+০+১",
            instruction: "খাবার পরে খাবেন",
            duration: "৭ দিন",
            note: ""
          },
          {
            id: "2",
            brand: "Napa Extra | Paracetamol | 200mg",
            dose: "১+০+১",
            instruction: "খাবার পরে খাবেন",
            duration: "১৫ দিন",
            note: " -"
          }
        ],
        patient: {
          id: "",
          name: "",
          age: "",
          address: ""
        }
      }
    };
  },
  methods: {
    print() {
      window.print();
    }
  },
  mounted() {
    this.leftHeader = localStorage.getItem("leftHeader");
    this.rightHeader = localStorage.getItem("rightHeader");
    this.print();
  }
};
</script>
<style>
.preview p {
  margin-bottom: 0px !important;
}
/* @import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"); */
</style>
