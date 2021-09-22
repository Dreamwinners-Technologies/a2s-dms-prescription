<template>
  <div>
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
                v-model="sideTexts.chiefComplaint"
                background-color="white"
                color="teal"
                auto-grow
                placeholder="type here..."
              ></v-textarea>
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <!--  -->
          <v-row v-for="(item, idx) in sideItems" :key="idx">
            <v-col>
              <h4>{{ item.testTitle }} :</h4>
              <v-text-field
                v-model="input"
                placeholder="Search"
                class="mt-2 pa-0"
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
                    @click="show"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
              <v-textarea
                style="margin-top:0px !important"
                name="input-7-1"
                outlined
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
                      v-model="input"
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
                      v-model="input"
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
                      v-model="input"
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
                  v-for="(drug, idy) in drugList"
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
                      <v-btn color="info" depressed small
                        ><v-icon small>mdi-pencil-outline</v-icon></v-btn
                      ><v-btn color="error" depressed small
                        ><v-icon small>mdi-delete</v-icon></v-btn
                      >
                    </v-card-subtitle>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- dialog here -->

    <v-dialog title="Add New Drug" v-model="adddialog" max-width="800px">
      <v-card class="pa-5">
        <h3>Add New Drug</h3>
        <v-row class="rowise pt-5">
          <v-col>
            <v-autocomplete
              v-model="drugModel.drug"
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
              v-model="input"
              :items="select"
              placeholder="Search Drug Name"
              class="mt-2 pa-0"
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
                  @click="show"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
            </v-autocomplete>
          </v-col>
           <v-col>
            <v-autocomplete
              v-model="input"
              :items="select"
              placeholder="Search Drug Name"
              class="mt-2 pa-0"
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
                  @click="show"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
            </v-autocomplete>
          </v-col>
           <v-col>
            <v-autocomplete
              v-model="input"
              :items="select"
              placeholder="Search Drug Name"
              class="mt-2 pa-0"
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
                  @click="show"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
            </v-autocomplete>
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
        ></v-textarea>
        <v-btn depressed color="info"
          ><v-icon class="mr-2" @click="adddialog = false"
            >mdi-content-save</v-icon
          >
          Save Drug</v-btn
        >
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { initJsStore } from "@/service/idb_service.js";
import { ABService } from "@/service/prescription_backups_service.js";
import { DrugService } from "@/service/drugs_service.js";
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
      input: "",
      idx: 0,
      idy: 0,
      idz: 0,
      adddialog: false,
      sideTexts: {
        chiefComplaint: ""
      },
      sideModels: {
        chiefComplaint: ""
      },
      sideData: {
        chiefComplaint: []
      },
      sideItems: [
        {
          testTitle: "On Examination"
        },
        {
          testTitle: "Diagnosis"
        },
        {
          testTitle: "Investigation Advice"
        }
      ],
      drugModel: {
    drug: "",
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
      select: ["Napa", "Bexted", "Koroz"],
      drugList: [
        {
          brand: "Ace | Paracetamol | 500mg",
          dose: "১+০+১",
          instruction: "খাবার পরে খাবেন",
          duration: "৭ দিন",
          note: ""
        },
        {
          brand: "Napa Extra | Paracetamol | 200mg",
          dose: "১+০+১",
          instruction: "খাবার পরে খাবেন",
          duration: "১৫ দিন",
          note: " -"
        }
      ]
    };
  },
  methods: {
    test() {},
    show() {
      return 0;
    },
    setComplaintsText() {
      let complaints = this.sideModels.chiefComplaint;
      this.sideTexts.chiefComplaint +=
        this.sideModels.chiefComplaint[
          this.sideModels.chiefComplaint.length - 1
        ] + "\n";
      setTimeout(() => {
        complaints.pop();
      }, 100);
    },
    async addComplaints(data) {
      let r = await this.ABS.addData("Complaints", data);
      if (r) console.log(r);
    },
    async getChiefComplaints() {
      let output = [];
      //if(this.sideData.chiefComplaint.length!= 0){
      let complaints = await this.ABS.getData("Complaints");
      complaints.forEach(function(item) {
        delete item.id;
        output.push(item.data);
      });
      this.sideData.chiefComplaint = output;
      console.log(this.sideItems.chiefComplaint);
    },
    async getDrugs() {
      let output = [];
      let drugs = await this.DS.getDrugs();
      drugs.forEach(function(item) {
        delete item.id;
        output.push(item.name);
      });
      this.drugs = output;
    }
  },
  mounted() {
    this.ABS = new ABService();
    this.DS = new DrugService();
    this.getChiefComplaints();
    this.getDrugs();
  }
};
</script>
<style lang="scss" scoped>
.rowise .col-6 {
  padding-bottom: 0px !important;
  padding-top: 0px !important;
}
</style>
