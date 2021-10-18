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
                :disabled="selectedAppointment=='null'"
                v-model="sideModels.chiefComplaints"
                :items="sideData.chiefComplaints"
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
                @change="setSideDataTextFieldTextByTableName('chiefComplaints')"
              >
                <template slot="append">
                  <v-btn
                    :disabled="selectedAppointment=='null'"
                    @click.stop="dialogSideData = true, sideDataSubmitCurrentTableName='chiefComplaints'"
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
                :disabled="selectedAppointment=='null'"
                style="margin-top:0px !important"
                name="input-7-1"
                outlined
                v-model="sideDataTextFieldModel.chiefComplaints"
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
                label="On Examination"
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
                @change="setSideDataTextFieldTextByTableName('onExamination')"
              >
                <template slot="append">
                  <v-btn
                   @click.stop="dialogSideData = true, sideDataSubmitCurrentTableName='onExamination'"
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
                v-model="sideDataTextFieldModel.onExamination"
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
                label="Diagnosis"
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
                 @change="setSideDataTextFieldTextByTableName('diagnosis')"
              >
                <template slot="append">
                  <v-btn
                  @click.stop="dialogSideData = true, sideDataSubmitCurrentTableName='diagnosis'"
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
                v-model="sideDataTextFieldModel.diagnosis"
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
                label="Investigation Advice"
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
                 @change="setSideDataTextFieldTextByTableName('investigationAdvice')"
              >
                <template slot="append">
                  <v-btn
                  @click.stop="dialogSideData = true, sideDataSubmitCurrentTableName='investigationAdvice'"
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
                v-model="sideDataTextFieldModel.investigationAdvice"
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
              <v-row class="pa-4">
                  <h4>Patient Information :</h4>
                  <v-spacer></v-spacer>
                  <v-btn v-if="selectedAppointment!='null'" @click="crearSelectedAppointment" class="mr-2" small depressed>Clear</v-btn>
                  <v-btn v-if="selectedAppointment!='null'" @click="$router.push('/create-appointment')" small depressed color="info">Change Appointment</v-btn>
              </v-row>
              <v-card
                color="teal lighten-5"
                outlined
                class="mt-2"
                elevation="0"
                style="border: 1px solid #e7e7e7"
                width="100%"
              >
              <v-row v-if="selectedAppointment=='null'" class="pa-4">
                <v-col class="mx-auto" style="text-align:center !important;">
                    <p>
                      Please select an appointment to create prescription.
                    </p>
                    <v-btn @click="$router.push('/create-appointment')" depressed color="info">Select Appointment</v-btn>
                  </v-col>
                </v-row>
                <v-row v-if="selectedAppointment!='null'">
                  <v-col>
                    <v-card-subtitle>
                      <b>Patient ID:</b> <br />PID0234
                    </v-card-subtitle>
                  </v-col>
                  <v-col>
                    <v-card-subtitle>
                      <b>Patient Name:</b> <br />
                      {{appointment.data.patientName}}
                    </v-card-subtitle>
                  </v-col>
                  <v-col>
                    <v-card-subtitle>
                      <b>Age</b> <br />
                      {{appointment.data.patientAge}} Years Old
                    </v-card-subtitle>
                  </v-col>
                  <v-col>
                    <v-card-subtitle>
                      <b>Phone Number:</b> <br />
                      {{appointment.data.patientPhoneNo}}
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
                      v-model="appointment.data.prescription.pulse"
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
                      v-model="appointment.data.prescription.bloodPressure"
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
                      v-model="appointment.data.prescription.temperature"
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
                  <v-btn :disabled="selectedAppointment=='null'" depressed @click.stop="adddialog = true" color="info"
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
                  :v-if="selectedAppointment!=null"
                  v-for="(drug, idy) in appointment.data.prescription.medicines"
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
                        @click="appointment.data.prescription.medicines.splice(idy, 1)"
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
                <v-btn :disabled="selectedAppointment=='null'" value="left" @click="prescriptionPriview=true">
                  <span class="hidden-sm-and-down">Preview</span>

                  <v-icon right>
                    mdi-eye-outline
                  </v-icon>
                </v-btn>

                <v-btn :disabled="selectedAppointment=='null'" value="center" @click="savePrescription">
                  <span class="hidden-sm-and-down">Save</span>

                  <v-icon right>
                    mdi-content-save-outline
                  </v-icon>
                </v-btn>

                <v-btn :disabled="selectedAppointment=='null'" value="right" @click="printPrescription()">
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
         <v-dialog
      v-model="dialogSideData"
      max-width="300px"
    >
  <v-card class="pa-4">
    <h2>Save Information</h2>
    <v-form>
      <v-text-field
              v-model="sideDataSubmitModel"
              placeholder=""
              class="mt-2 pa-0"
              outlined
              color="teal"
              dense
              label=""
            >
            </v-text-field>
            <v-btn @click="submitSideData()"
            color="primary"
            class="text-center"
            depressed
            >
              Submit
            </v-btn>
    </v-form>
  </v-card>
     </v-dialog>

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
            <v-col cols="4">
                Name: {{appointment.data.patientName}}
            </v-col>
            <v-col>
                Age: {{appointment.data.patientAge}} Years Old
            </v-col>
            <v-col>
                Date: {{new Date().toLocaleDateString()}}
            </v-col>
        </v-row>
        <hr>
        <v-row class="ma-0" style="height:1160px">
            <v-col cols="4" style="border-right: 1px solid #f0f0f0 !important;">
                <v-row>
                    <v-col>
                    <b>Cheif Complaints :</b><br><br>
                    <ul class="px-4" style="list-style-type:none">
                        <li v-for="item in appointment.data.prescription.chiefComplaints" :key="item">
                            {{item}}
                        </li>
                    </ul>
                    </v-col>
                </v-row>
                 <v-row>
                    <v-col>
                    <b>On Examination :</b><br><br>
                    <ul class="px-4" style="list-style-type:none">
                        <li>Pulse: {{appointment.data.prescription.pulse}} mg</li>
                        <li>BP: {{appointment.data.prescription.bloodPressure}} mmHg</li>
                        <li>Temp: {{appointment.data.prescription.temperature}} Degree F</li>
                        <li v-for="item in appointment.data.prescription.onExamination" :key="item">
                            {{item}}
                        </li>
                    </ul>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                    <b>Diagnosis :</b><br><br>
                    <ul class="px-4" style="list-style-type:none">
                        <li v-for="item in appointment.data.prescription.diagnosis" :key="item">
                            {{item}}
                        </li>
                    </ul>
                    </v-col>
                </v-row>
                 <v-row>
                    <v-col>
                    <b>Investigation Advice :</b><br><br>
                    <ul class="px-4" style="list-style-type:none">
                        <li v-for="item in appointment.data.prescription.investigationAdvice" :key="item">
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
                    <v-row class="my-0" style="margin-bottom: 10px !important" v-for="item in appointment.data.prescription.medicines" :key="item">
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
                                <b>Given Advice: </b><p style="margin:0px;display:block" v-for="item in appointment.data.prescription.advice" :key="item"> {{item}} </p>
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
              item-text="medicineName"
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
import { ABService } from "@/service/Generic_Service.js";
import { DrugService } from "@/service/drugs_service.js";
import { htmlToPaper } from "vue-html-to-paper";
export default {
  // async beforeCreate() {
  //   try {
  //     const isDbCreated = await initJsStore();
  //     if (isDbCreated) {
  //       console.log("db created");
  //     } else {
  //       console.log("db opened");
  //     }
  //   } catch (ex) {
  //     console.error(ex);
  //     alert(ex.message);
  //     Global.isIndexedDbSupported = false;
  //   }
  // },
  data() {
    return {
      ABS: null,
      DS: null,
      snackbar: false,
      dialogSideData: false,
      sideDataSubmitModel: "",
      sideDataSubmitCurrentTableName: "",
      input: "",
      icon: "",
      input: "",
      idx: 0,
      idy: 0,
      idz: 0,
      drugUpdateIdx: -1,
      adddialog: false,
      prescriptionPriview: false,
      selectedAppointment: null,
      sideModels: {
        chiefComplaints: "",
        onExamination: "",
        diagnosis: "",
        investigationAdvice: ""
      },
      sideData: {
        chiefComplaints: [],
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
      localprescription: {
          data: {
              id: "",
              prescriptionRequest: {
                    advice: [],
                    bloodPressure: 0,
                    chiefComplaints: [],
                    diagnosis: [],
                    investigationAdvice: [],
                    medicines: [],
              onExamination: [],
              pulse: 0,
              temperature: 0
            }
          }
      },
      sideDataTextFieldModel: {
           chiefComplaints: "",
            diagnosis: "",
            investigationAdvice: "",
            onExamination: "",
      },
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
        },
    };
  },
  methods: {
    test() {
      console.log("yo")
    },
    show() {
      return 0;
    },
   async submitSideData(){
    let r = await this.ABS.addData(this.sideDataSubmitCurrentTableName, {
      data: this.sideDataSubmitModel
    });
      if (r){
         this.getSideData(this.sideDataSubmitCurrentTableName);
         this.dialogSideData = false;
      };
      this.sideDataSubmitModel = "";
    },
    async getAppointmentData(){
      let id = localStorage.getItem("selectedAppointment")
      this.selectedAppointment = id
      console.log("Selected ------------------------")
      console.log(this.selectedAppointment)
      if(id!=null){
        let data = await this.ABS.getDataById("Appointment",id);
        this.appointment = data[0]
        this.setSideModelData()
      }
    },
    setSideModelData(){
        console.log("data..................................")
        console.log(this.appointment.data.prescription.chiefComplaints)
        console.log(this.arrayToString(this.appointment.data.prescription.chiefComplaints))
        this.sideDataTextFieldModel.chiefComplaints = this.arrayToString(this.appointment.data.prescription.chiefComplaints)
        this.sideDataTextFieldModel.onExamination = this.arrayToString(this.appointment.data.prescription.onExamination)
        this.sideDataTextFieldModel.diagnosis = this.arrayToString(this.appointment.data.prescription.diagnosis)
        this.sideDataTextFieldModel.investigationAdvice = this.arrayToString(this.appointment.data.prescription.investigationAdvice)
    },
    crearSelectedAppointment(){
      localStorage.setItem("selectedAppointment",null)
    },
    setSideDataTextFieldTextByTableName(tableName) {
      let autoCompleteFieldData = this.sideModels[tableName];
      // concating the data from v-auto to to respective
      // text-field with , 
      this.sideDataTextFieldModel[tableName] +=
        this.sideModels[tableName][
          this.sideModels[tableName].length - 1
        ] + " ,";
        console.log(this.sideDataTextFieldModel[tableName])
        //deleting the selectd v-auto data
      setTimeout(() => {
        autoCompleteFieldData.pop();
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
        output.push(item.data);
      });
      this.drugs = output;
    },
    saveAndPrint() {
      console.log("clicked");
      this.prescriptionPriview = true;
      this.$htmlToPaper("prescription");
    },
    printPrescription(){
      this.savePrescription()
      let routeData = this.$router.resolve("print/prescription/"+this.selectedAppointment);
      window.open(routeData.href, '_blank');
    },
    addDrug() {
      if (this.drugUpdateIdx == -1) {
        this.appointment.data.prescription.medicines.push(this.addDrugModel);
      } else {
        this.appointment.data.prescription.medicines[this.drugUpdateIdx] = this.addDrugModel;
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
    setPrescriptionData(){
      this.appointment.data.prescription.chiefComplaints = this.stringToArray(this.sideDataTextFieldModel.chiefComplaints)
      this.appointment.data.prescription.onExamination = this.stringToArray(this.sideDataTextFieldModel.onExamination)
      this.appointment.data.prescription.diagnosis = this.stringToArray(this.sideDataTextFieldModel.diagnosis)
      this.appointment.data.prescription.investigationAdvice = this.stringToArray(this.sideDataTextFieldModel.investigationAdvice)
    },
    setLocalPrescriptionData(){
      this.localprescription.id = this.appointment.data.id;
      this.localprescription.data.id = this.localprescription.id
      this.localprescription.data.prescriptionRequest.chiefComplaints = this.appointment.data.prescription.chiefComplaints
      this.localprescription.data.prescriptionRequest.onExamination = this.appointment.data.prescription.onExamination
      this.localprescription.data.prescriptionRequest.diagnosis = this.appointment.data.prescription.diagnosis
      this.localprescription.data.prescriptionRequest.investigationAdvice = this.appointment.data.prescription.investigationAdvice
      this.localprescription.data.prescriptionRequest.advice = this.appointment.data.prescription.advice
      this.localprescription.data.prescriptionRequest.medicines = this.appointment.data.prescription.medicines
      this.localprescription.data.prescriptionRequest.pulse = this.appointment.data.prescription.pulse
      this.localprescription.data.prescriptionRequest.bloodPressure = this.appointment.data.prescription.bloodPressure
      this.localprescription.data.prescriptionRequest.temperature = this.appointment.data.prescription.temperature
    },

   async savePrescription(){
    this.setPrescriptionData()
    this.setLocalPrescriptionData()
    let r = await this.ABS.updateDataById("LocalPresciption",this.localprescription);
      if (r) console.log(r);
      else {
        r = await this.ABS.addData("LocalPresciption", {
        id: this.appointment.data.id,
        data: this.localprescription.data
        });
      }
          r = await this.ABS.updateDataById("Appointment",this.appointment)
     if (r) { this.snackbar = true;}
    
    },
    stringToArray(string){
      var data = string+ ''
      var arr = data.split(',');
      console.log(arr)
      return arr;
    },
    arrayToString(arr){
      console.log(arr)
      // var arr = array.pop()
      var str = arr.toString()
      console.log("....................................")
      console.log(str)
      return str;
    }
  },
  mounted() {
    this.ABS = new ABService();
    this.DS = new DrugService();
    this.getSideData("chiefComplaints");
    this.getSideData("onExamination");
    this.getSideData("diagnosis");
    this.getSideData("investigationAdvice");
    this.getDrugs();
    this.getAppointmentData();
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
