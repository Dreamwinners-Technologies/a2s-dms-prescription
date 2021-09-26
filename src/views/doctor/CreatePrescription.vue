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

          <v-row justify="center" style="text-align:center !important;">
            <v-col>
              <v-btn-toggle
                v-model="icon"
                borderless
                class="pa-2"
                style="border:2px solid #479EF4"
              >
                <v-btn value="left" @click="printPrescription()">
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

                <v-btn value="right" @click="saveAndPrint()">
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

    <div v-show="false" id="prescription">
      <p>working on it</p>
    </div>

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
      prescription: {
        id: "",
        chiefComplaints: [],
        diagnosis: [],
        investigationAdvice: [],
        onExamination: [],
        advice: ["খাবার পরে খাবেন", "খাবার পরে খাবেন"],
        pulse: "88",
        temperature: "102",
        bloodPressure: "120/80",
        medicines: [ ],
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
