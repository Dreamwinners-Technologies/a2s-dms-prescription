<template>
  <div>
          <v-snackbar
      v-model="snackbar"
      top
      color="success"
      centered
      timeout="1000"
    >
     Prescitption has been saved
    </v-snackbar>
    <v-card rounded="0" elevation="0" color="#f2f5f8">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>
    <v-row>

      <v-col lg="3" md="3" sm="12" cols="12">
        <v-card class="ma-5" elevation="0">
          <v-row>
            <v-col>
              <h4>Cheif Complaints :</h4>
              <v-autocomplete
                v-model="sideModels.chiefComplaint"
                :items="sideData.chiefComplaint"
                chips
                label="Complaints"
                full-width
                hide-details
                hide-no-data
                hide-selected
                multiple
                single-line
                class="mt-2 pa-0 mb-6"
                outlined
                color="teal"
                dense
                @change="setComplaintsText"
              >
                <template slot="append">
                  <v-btn
                    @click="addComplaints(sideModels.chiefComplaint)"
                    depressed
                    class="mt-0"
                    small
                    style="vertical-align:center;margin-top:-2px !important; margin-right:-4px !important"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
              </v-autocomplete>
              <v-textarea
                style="margin-top:0px !important"
                name="input-7-1"
                outlined
                v-model="prescription.chiefComplaint"
                background-color="white"
                color="teal"
                auto-grow
                placeholder="type here..."
              ></v-textarea>
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <!--  -->
          <v-row>
            <v-col>
              <h4>On Examination :</h4>
              <v-autocomplete
                v-model="sideModels.onExamination"
                :items="sideData.onExamination"
                chips
                label="Complaints"
                full-width
                hide-details
                hide-no-data
                hide-selected
                multiple
                single-line
                class="mt-2 pa-0 mb-6"
                outlined
                color="teal"
                dense
              >
                <template slot="append">
                  <v-btn
                    depressed
                    class="mt-0"
                    small
                    style="vertical-align:center;margin-top:-2px !important; margin-right:-4px !important"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
              </v-autocomplete>
              <v-textarea
                style="margin-top:0px !important"
                name="input-7-1"
                outlined
                v-model="prescription.onExamination"
                background-color="white"
                color="teal"
                auto-grow
                placeholder="type here..."
              ></v-textarea>
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <!--  -->
          <v-row>
            <v-col>
              <h4>Diagnosis :</h4>
              <v-autocomplete
                v-model="sideModels.diagnosis"
                :items="sideData.diagnosis"
                chips
                label="Complaints"
                full-width
                hide-details
                hide-no-data
                hide-selected
                multiple
                single-line
                class="mt-2 pa-0 mb-6"
                outlined
                color="teal"
                dense
              >
                <template slot="append">
                  <v-btn
                    depressed
                    class="mt-0"
                    small
                    style="vertical-align:center;margin-top:-2px !important; margin-right:-4px !important"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
              </v-autocomplete>
              <v-textarea
                style="margin-top:0px !important"
                name="input-7-1"
                outlined
                v-model="prescription.diagnosis"
                background-color="white"
                color="teal"
                auto-grow
                placeholder="type here..."
              ></v-textarea>
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <!--  -->
          <v-row>
            <v-col>
              <h4>Investigation Advice :</h4>
              <v-autocomplete
                v-model="sideModels.investigationAdvice"
                :items="sideData.investigationAdvice"
                chips
                label="Complaints"
                full-width
                hide-details
                hide-no-data
                hide-selected
                multiple
                single-line
                class="mt-2 pa-0 mb-6"
                outlined
                color="teal"
                dense
              >
                <template slot="append">
                  <v-btn
                    depressed
                    class="mt-0"
                    small
                    style="vertical-align:center;margin-top:-2px !important; margin-right:-4px !important"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
              </v-autocomplete>
              <v-textarea
                style="margin-top:0px !important"
                name="input-7-1"
                outlined
                v-model="prescription.investigationAdvice"
                background-color="white"
                color="teal"
                auto-grow
                placeholder="type here..."
              ></v-textarea>
              <v-divider></v-divider>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-divider class="mx-0" vertical></v-divider>

      <!-- Right Side  -->

      <v-col lg="" md="9" sm="12" cols="12">
        <v-card class="ma-5" elevation="0">
          <v-row>
            <v-col>
              <h4>Patient Information :</h4>
              <v-card
                color="teal lighten-5"
                outlined
                class="mt-2"
                elevation="0"
                style="border: 1px solid #e7e7e7"
                width="100%"
              >
                <v-row>
                  <v-col>
                    <v-card-subtitle>
                      <b>Patient ID:</b> <br />PID0234
                    </v-card-subtitle>
                  </v-col>
                  <v-col>
                    <v-card-subtitle>
                      <b>Patient Name:</b> <br />
                      Mr. Mahtab Uddin
                    </v-card-subtitle>
                  </v-col>
                  <v-col>
                    <v-card-subtitle>
                      <b>Age</b> <br />
                      34 year's old
                    </v-card-subtitle>
                  </v-col>
                  <v-col>
                    <v-card-subtitle>
                      <b>Phone Number:</b> <br />
                      01734543027
                    </v-card-subtitle>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <!-- test for Patient -->

          <v-row>
            <v-col>
              <v-card
                class="pa-4 mt-2"
                elevation="0"
                style="border: 1px solid #e7e7e7"
                width="100%"
              >
                <v-row class="rowise">
                  <v-col>
                    <v-text-field
                      v-model="prescription.pulse"
                      class="mt-2 pa-0"
                      outlined
                      color="#666666"
                      dense
                      label="Pulse"
                    >
                      <template slot="append">
                        <v-chip color="info" small>/min</v-chip>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="prescription.bloodPressure"
                      placeholder="120/80"
                      class="mt-2 pa-0"
                      outlined
                      color="#666666"
                      dense
                      label="BP"
                    >
                      <template slot="append">
                        <v-chip color="green" small>mmHg</v-chip>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="prescription.temperature"
                      class="mt-2 pa-0"
                      outlined
                      color="#666666"
                      dense
                      label="Temparature"
                    >
                      <template slot="append">
                        <v-chip color="orange" small>°F</v-chip>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <!-- Drugs Table  -->
          <v-row>
            <v-col>
              <v-card
                class="pa-4 mt-2"
                elevation="0"
                style="border: 1px solid #e7e7e7"
                width="100%"
              >
                <v-row class="pa-5">
                  <v-icon large>mdi-prescription</v-icon> <v-spacer></v-spacer>
                  <v-btn depressed @click="adddialog = true" color="info"
                    >Add Drugs</v-btn
                  >
                </v-row>
                <v-row
                  style="background-color:#f2f5f8;border-radius:8px;text-align:center"
                >
                  <v-col cols="3">
                    <b>Brand</b>
                  </v-col>
                  <v-col>
                    <b>Dose</b>
                  </v-col>
                  <v-col>
                    <b>Instruction</b>
                  </v-col>
                  <v-col>
                    <b>Duration</b>
                  </v-col>
                  <v-col>
                    <b>Note</b>
                  </v-col>
                  <v-col>
                    <b>Action</b>
                  </v-col>
                </v-row>
                <v-row
                  v-for="(drug, idy) in prescription.medicines"
                  :key="idy"
                  style="text-align:center;border-bottom: 1px solid #e7e7e7"
                >
                  <v-col cols="3">
                    <v-card-subtitle>
                      {{ drug.brand }}
                    </v-card-subtitle>
                  </v-col>
                  <v-col>
                    <v-card-subtitle>
                      {{ drug.dose }}
                    </v-card-subtitle>
                  </v-col>
                  <v-col>
                    <v-card-subtitle>
                      {{ drug.instruction }}
                    </v-card-subtitle>
                  </v-col>
                  <v-col>
                    <v-card-subtitle>
                      {{ drug.duration }}
                    </v-card-subtitle>
                  </v-col>
                  <v-col>
                    <v-card-subtitle>
                      {{ drug.note }}
                    </v-card-subtitle>
                  </v-col>
                  <v-col>
                    <v-card-subtitle>
                      <v-btn
                        color="info"
                        depressed
                        small
                        @click="
                          (adddialog = true),
                            (addDrugModel = drug),
                            (drugUpdateIdx = idy)
                        "
                        ><v-icon small>mdi-pencil-outline</v-icon></v-btn
                      ><v-btn
                        color="error"
                        @click="prescription.medicines.splice(idy, 1)"
                        depressed
                        small
                        ><v-icon small>mdi-delete</v-icon></v-btn
                      >
                    </v-card-subtitle>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <!-- print save button  -->

          <v-row style="text-align:center !important;">
            <v-col>
              <v-btn-toggle
                v-model="icon"
                borderless
                class="pa-2"
                style="border:2px solid #479EF4"
              >
                <v-btn value="left" @click="prescriptionPriview=true">
                  <span class="hidden-sm-and-down">Preview</span>

                  <v-icon right>
                    mdi-eye-outline
                  </v-icon>
                </v-btn>

                <v-btn value="center" @click="savePrescription">
                  <span class="hidden-sm-and-down">Save</span>

                  <v-icon right>
                    mdi-content-save-outline
                  </v-icon>
                </v-btn>

                <v-btn value="right" @click="printPrescription()">
                  <span class="hidden-sm-and-down">Save & Print</span>

                  <v-icon right>
                    mdi-cloud-print-outline
                  </v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- right side end  -->
    </v-row>

    <!-- prescription here  -->

    <v-dialog title="Add New Drug" v-model="prescriptionPriview" max-width="980px">
        <v-card class="pa-5">
            <h3>Preview: Prescription of ( Rahim Mia )</h3>
        <div id="prescription">
        <v-container>
        <v-row class="my-0">
            <v-col>
                <h2 style="color:#479EF4">Dr Mojibur Rahman</h2>
                MBBS <br>
                Dhaka Medical College <br>
                Room No 508,Trusted Care Hostpital <br>
                Narsingdi sadar <br>
                Phone: 01734543027 <br>
            </v-col>
            <v-spacer>
            </v-spacer>
            <v-col style="text-align:right !important">
                 <h2 style="color:#479EF4">ডাঃ মোঃ মজিবুর রহমান
                 </h2>
                এম বি বি এস <br>
                ঢাকা মেডিকেল কলেজ <br>
                চেম্বারঃ ৫০৮,  ট্রাস্টেড কেয়ার হাসপাতাল <br>
                নরসিংদী সদর, নরসিংদী <br>
                ফোনঃ ০১৭৩৪৫৪৩০২৭
                
            </v-col>
        </v-row>
        <hr>
        <v-row class="my-0" style="text-align:center">
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
        <hr>
        <v-row class="ma-0" style="height:1160px">
            <v-col cols="4" style="border-right: 1px solid #f0f0f0 !important;">
                <v-row>
                    <v-col>
                    <b>Cheif Complaints :</b><br><br>
                    <ul class="px-4" style="list-style-type:none">
                        <li v-for="item in prescription.chiefComplaints" :key="item">
                            {{item}}
                        </li>
                    </ul>
                    </v-col>
                </v-row>
                 <v-row>
                    <v-col>
                    <b>On Examination :</b><br><br>
                    <ul class="px-4" style="list-style-type:none">
                        <li>Pulse: {{prescription.pulse}} mg</li>
                        <li>BP: {{prescription.bloodPressure}} mmHg</li>
                        <li>Temp: {{prescription.temperature}} Degree F</li>
                        <li v-for="item in prescription.onExamination" :key="item">
                            {{item}}
                        </li>
                    </ul>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                    <b>Diagnosis :</b><br><br>
                    <ul class="px-4" style="list-style-type:none">
                        <li v-for="item in prescription.diagnosis" :key="item">
                            {{item}}
                        </li>
                    </ul>
                    </v-col>
                </v-row>
                 <v-row>
                    <v-col>
                    <b>Investigation Advice :</b><br><br>
                    <ul class="px-4" style="list-style-type:none">
                        <li v-for="item in prescription.investigationAdvice" :key="item">
                            {{item}}
                        </li>
                    </ul>
                    </v-col>
                </v-row>
            </v-col>
            <v-divider
            class="mx-0"
            vertical
            ></v-divider>
            <v-col cols="7">
                    <v-row>
                        <v-col>
                            <v-icon large>mdi-prescription</v-icon>
                            <br>
                        </v-col>
                    </v-row>
                    <v-row class="my-0" style="margin-bottom: 10px !important" v-for="item in prescription.medicines" :key="item">
                        <v-col class="mx-4">
                            <b style="font-size: 15px !important;">{{item.brand}}</b><br>
                            {{item.dose}} --- {{item.instruction}} --- {{item.duration}} <br>
                            Note: {{item.note}}
                        </v-col>
                    </v-row>
                    <br>
                    <v-footer>
                        <v-row>
                            <v-col class="mx-2 mt-4">
                                <b>Given Advice: </b><p style="margin:0px;display:block" v-for="item in prescription.advice" :key="item"> {{item}} </p>
                            </v-col>
                        </v-row>
                    </v-footer>
            </v-col>
        </v-row>
        <!-- <br> 
        <br> -->
        <br>
        <br>
        <v-footer absolute>
        <v-container>
            <v-row class="pt-2" style="border-top: 1px solid #F0F0F0 !important;background-color:#F7F7F7 !important;">
            <v-col>
                Made By <br>
                A2S DMS Prescription
            </v-col>
            <v-spacer>
            </v-spacer>
            <v-col style="text-align:right !important">
                 https://prescription.a2sdms.com
            </v-col>
        </v-row>
        </v-container>
        </v-footer>
    </v-container>
        </div>
            <v-btn depressed color="info"><v-icon class="mr-2" @click="prescriptionPriview = false">mdi-content-save</v-icon>Print Prescription</v-btn>
        </v-card>
    </v-dialog>

    <!-- dialog here -->

    <v-dialog title="Add New Drug" v-model="adddialog" max-width="800px">
      <v-card class="pa-5">
        <h3>Add New Drug</h3>
        <v-row class="rowise pt-5">
          <v-col>
            <v-autocomplete
              v-model="addDrugModel.brand"
              :items="drugs"
              placeholder="Search Drug Name"
              class="mt-2 pa-0"
              outlined
              color="teal"
              dense
            >
            </v-autocomplete>
          </v-col>
          <v-col>
            <v-autocomplete
              v-model="addDrugModel.dose"
              :items="addDrugItems.dose"
              placeholder="Search Drug Name"
              class="mt-2 pa-0"
              outlined
              color="teal"
              dense
              label="Dose"
            >
              <template slot="append">
                <v-btn
                  depressed
                  class="mt-0"
                  small
                  style="vertical-align:center;margin-top:-2px !important; margin-right:-4px !important"
                  @click="show"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col>
            <v-text-field
              v-model="addDrugModel.instruction"
              placeholder="Search Drug Name"
              class="mt-2 pa-0"
              outlined
              color="teal"
              dense
              label="Instruction"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="addDrugModel.duration"
              placeholder="Duration"
              class="mt-2 pa-0"
              outlined
              color="teal"
              dense
              label="Duration"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-textarea
          style="margin-top:0px !important"
          name="input-7-1"
          outlined
          background-color="white"
          color="teal"
          auto-grow
          placeholder="Write Note..."
          v-model="addDrugModel.note"
        ></v-textarea>
        <v-btn depressed color="info" @click="addDrug"
          ><v-icon class="mr-2">mdi-content-save</v-icon> Save Drug</v-btn
        >
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { initJsStore } from "@/service/idb_service.js";
import { ABService } from "@/service/prescription_backups_service.js";
import { DrugService } from "@/service/drugs_service.js";
import { htmlToPaper } from "vue-html-to-paper";
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
      ABS: null,
      DS: null,
      snackbar: false,
      input: "",
      icon: "",
      input: "",
      idx: 0,
      idy: 0,
      idz: 0,
      drugUpdateIdx: -1,
      adddialog: false,
      prescriptionPriview: false,
      sideModels: {
        chiefComplaint: "",
        onExamination: "",
        diagnosis: "",
        investigationAdvice: ""
      },
      sideData: {
        chiefComplaint: [],
        onExamination: [],
        diagnosis: [],
        investigationAdvice: []
      },
      addDrugModel: {
        brand: "",
        dose: "",
        instruction: "",
        duration: "",
        note: ""
      },
      addDrugItems: {
        dose: ["০+০+১", "০+১+১", "০+১+০", "১+১+০", "১+০+০", "১+১+১"]
      },
      drugs: [],
      items: [
        {
          text: "a2sDMS",
          disabled: false,
          href: "https://a2sdms.com"
        },
        {
          text: "Create Prescription",
          disabled: true,
          href: "rx-prescription"
        }
      ],
      prescription:{
            id:"",
            chiefComplaints: ["Fever for 3 days","Runing nose"],
            diagnosis: ["","",""],
            investigationAdvice: ["CBC with ESR","Plain X-Ray og chest : AP"],
            onExamination: ["","",""],    
            advice:["খাবার পরে খাবেন","খাবার পরে খাবেন"],
            pulse: "88",
            temperature: "102",
            bloodPressure: "120/80",
            medicines: [
                {
                    id:"1",
                    brand: 'Ace | Paracetamol | 500mg',
                    dose: '১+০+১',
                    instruction: 'খাবার পরে খাবেন',
                    duration: '৭ দিন',
                    note: ''
                },
                {
                    id:"2",
                    brand: 'Napa Extra | Paracetamol | 200mg',
                    dose: '১+০+১',
                    instruction: 'খাবার পরে খাবেন',
                    duration: '১৫ দিন',
                    note: ' -'
                },
                {
                    id:"1",
                    brand: 'Ace | Paracetamol | 500mg',
                    dose: '১+০+১',
                    instruction: 'খাবার পরে খাবেন',
                    duration: '৭ দিন',
                    note: ''
                },
                {
                    id:"2",
                    brand: 'Napa Extra | Paracetamol | 200mg',
                    dose: '১+০+১',
                    instruction: 'খাবার পরে খাবেন',
                    duration: '১৫ দিন',
                    note: ' -'
                },
            ],
            patient: {
                id: "",
                name: "",
                age: "",
                address: "",
            }
        }
    };
  },
  methods: {
    test() {},
    show() {
      return 0;
    },
    setComplaintsText() {
      let complaints = this.sideModels.chiefComplaint;
      this.prescription.chiefComplaint +=
        this.sideModels.chiefComplaint[
          this.sideModels.chiefComplaint.length - 1
        ] + ",\n";
      setTimeout(() => {
        complaints.pop();
      }, 100);
    },
    async addComplaints(data) {
      let r = await this.ABS.addData("Complaints", data);
      if (r) console.log(r);
    },
    async getSideData(tableName) {
      let output = [],
        response = await this.ABS.getData(tableName);

      response.forEach(function(item) {
        delete item.id;
        output.push(item.data);
      });
      this.sideData[tableName] = output;
    },
    async getDrugs() {
      let output = [];
      let drugs = await this.DS.getDrugs();
      drugs.forEach(function(item) {
        delete item.id;
        output.push(item.name);
      });
      this.drugs = output;
    },
    saveAndPrint() {
      console.log("clicked");
      this.prescriptionPriview = true;
      this.$htmlToPaper("prescription");
    },
    printPrescription(){
      let routeData = this.$router.resolve({name: 'Prescription' ,query: {data: "print"}});
      window.open(routeData.href, '_blank');
    },
    addDrug() {
      if (this.drugUpdateIdx == -1) {
        this.prescription.medicines.push(this.addDrugModel);
      } else {
        this.prescription.medicines[this.drugUpdateIdx] = this.addDrugModel;
        this.drugUpdateIdx = -1;
      }

      this.adddialog = false;
      this.addDrugModel = {
        brand: "",
        dose: "",
        instruction: "",
        duration: "",
        note: ""
      };
    },
   async savePrescription(){
    let r = await this.ABS.addData("LocalPresciption", {
      id: this.prescription.id,
      data: this.prescription
    });
      if (r) console.log(r);
          r = await this.ABS.addData("Presciption", {
      id: this.prescription.id,
      data: this.prescription
    });
     if (r) { this.snackbar = true;}
    
    }
  },
  mounted() {
    this.ABS = new ABService();
    this.DS = new DrugService();
    this.getSideData("chiefComplaint");
    this.getSideData("onExamination");
    this.getSideData("diagnosis");
    this.getSideData("investigationAdvice");
    this.getDrugs();
  }
};
</script>
<style lang="scss" scoped>
.rowise .col-6 {
  padding-bottom: 0px !important;
  padding-top: 0px !important;
}
.vl {
  border-left: 1px solid gray;
}
</style>
