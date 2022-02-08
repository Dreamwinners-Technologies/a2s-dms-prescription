<template>
  <div>
    <v-snackbar v-model="snackbar" top color="success" centered timeout="1000">
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
                :disabled="selectedAppointment == 'null'"
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
                    :disabled="selectedAppointment == 'null'"
                    @click.stop="
                      (dialogSideData = true),
                        (sideDataSubmitCurrentTableName = 'chiefComplaints')
                    "
                    depressed
                    class="mt-0"
                    small
                    style="vertical-align:center;margin-top:-2px !important; margin-right:-4px !important"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>

                <template v-slot:item="{item }">
                  {{ item }}
                  <v-spacer></v-spacer>
                  <v-list-item-action @click.stop>
                    <v-btn
                      icon
                      x-small
                      @click.stop.prevent="
                        deleteSideData('chiefComplaints', item)
                      "
                    >
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </template>
              </v-autocomplete>
              <v-textarea
                :disabled="selectedAppointment == 'null'"
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
                    :disabled="selectedAppointment == 'null'"
                    @click.stop="
                      (dialogSideData = true),
                        (sideDataSubmitCurrentTableName = 'onExamination')
                    "
                    depressed
                    class="mt-0"
                    small
                    style="vertical-align:center;margin-top:-2px !important; margin-right:-4px !important"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <template v-slot:item="{item }">
                  {{ item }}
                  <v-spacer></v-spacer>
                  <v-list-item-action @click.stop>
                    <v-btn
                      icon
                      x-small
                      @click.stop.prevent="
                        deleteSideData('onExamination', item)
                      "
                    >
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </v-list-item-action>
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
                    :disabled="selectedAppointment == 'null'"
                    @click.stop="
                      (dialogSideData = true),
                        (sideDataSubmitCurrentTableName = 'diagnosis')
                    "
                    depressed
                    class="mt-0"
                    small
                    style="vertical-align:center;margin-top:-2px !important; margin-right:-4px !important"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <template v-slot:item="{item }">
                  {{ item }}
                  <v-spacer></v-spacer>
                  <v-list-item-action @click.stop>
                    <v-btn
                      icon
                      x-small
                      @click.stop.prevent="deleteSideData('diagnosis', item)"
                    >
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </v-list-item-action>
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
                @change="
                  setSideDataTextFieldTextByTableName('investigationAdvice')
                "
              >
                <template slot="append">
                  <v-btn
                    :disabled="selectedAppointment == 'null'"
                    @click.stop="
                      (dialogSideData = true),
                        (sideDataSubmitCurrentTableName = 'investigationAdvice')
                    "
                    depressed
                    class="mt-0"
                    small
                    style="vertical-align:center;margin-top:-2px !important; margin-right:-4px !important"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <template v-slot:item="{item }">
                  {{ item }}
                  <v-spacer></v-spacer>
                  <v-list-item-action @click.stop>
                    <v-btn
                      icon
                      x-small
                      @click.stop.prevent="deleteSideData('investigationAdvice', item)"
                    >
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </v-list-item-action>
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
                <v-btn
                  v-if="selectedAppointment != 'null'"
                  @click="crearSelectedAppointment"
                  class="mr-2"
                  small
                  depressed
                  >Clear</v-btn
                >
                <v-btn
                  v-if="selectedAppointment != 'null'"
                  @click="$router.push('/create-appointment')"
                  small
                  depressed
                  color="info"
                  >Change Appointment</v-btn
                >
              </v-row>
              <v-card
                color="teal lighten-5"
                outlined
                class="mt-2"
                elevation="0"
                style="border: 1px solid #e7e7e7"
                width="100%"
              >
                <v-row v-if="selectedAppointment == 'null'" class="pa-4">
                  <v-col class="mx-auto" style="text-align:center !important;">
                    <p>
                      Please select an appointment to create prescription.
                    </p>
                    <v-btn
                      @click="$router.push('/create-appointment')"
                      depressed
                      color="info"
                      >Select Appointment</v-btn
                    >
                  </v-col>
                </v-row>
                <v-row v-if="selectedAppointment != 'null'">
                  <v-col>
                    <v-card-subtitle>
                      <b>Patient ID:</b> <br />PID0234
                    </v-card-subtitle>
                  </v-col>
                  <v-col>
                    <v-card-subtitle>
                      <b>Patient Name:</b> <br />
                      {{ appointment.data.patientName }}
                    </v-card-subtitle>
                  </v-col>
                  <v-col>
                    <v-card-subtitle>
                      <b>Age</b> <br />
                      {{ appointment.data.patientAge }} Years Old
                    </v-card-subtitle>
                  </v-col>
                  <v-col>
                    <v-card-subtitle>
                      <b>Phone Number:</b> <br />
                      {{ appointment.data.patientPhoneNo }}
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
                  <v-btn
                    :disabled="selectedAppointment == 'null'"
                    depressed
                    @click.stop="adddialog = true"
                    color="info"
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
                  :v-if="selectedAppointment != null"
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
                        @click="
                          appointment.data.prescription.medicines.splice(idy, 1)
                        "
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

          <!-- advice area  -->

          <v-row>
            <v-col>
              <v-card
                class="pa-4 mt-2"
                elevation="0"
                style="border: 1px solid #e7e7e7"
                width="100%"
              >
                <h4>Advice To Patient:</h4>
                <v-autocomplete
                  v-model="sideModels.advice"
                  :items="sideData.advice"
                  chips
                  label="Advice"
                  full-width
                  hide-details
                  hide-no-data
                  hide-selected
                  multiple
                  single-line
                  class="mt-2 pa-0 mb-6"
                  outlined
                  color="#666666"
                  dense
                  @change="setSideDataTextFieldTextByTableName('advice')"
                >
                  <template slot="append">
                    <v-btn
                      :disabled="selectedAppointment == 'null'"
                      @click.stop="
                        (dialogSideData = true),
                          (sideDataSubmitCurrentTableName = 'advice')
                      "
                      depressed
                      class="mt-0"
                      small
                      style="vertical-align:center;margin-top:-2px !important; margin-right:-4px !important"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:item="{item }">
                  {{ item }}
                  <v-spacer></v-spacer>
                  <v-list-item-action @click.stop>
                    <v-btn
                      icon
                      x-small
                      @click.stop.prevent="deleteSideData('advice', item)"
                    >
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </template>
                </v-autocomplete>
                <v-textarea
                  style="margin-top:0px margin-bottom:0px !important"
                  name="input-7-1"
                  outlined
                  v-model="sideDataTextFieldModel.advice"
                  background-color="white"
                  color="#666666"
                  auto-grow
                  placeholder="type here..."
                ></v-textarea>
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
                <v-btn
                  :disabled="selectedAppointment == 'null'"
                  value="left"
                  @click="prescriptionPriview = true"
                >
                  <span class="hidden-sm-and-down">Preview</span>

                  <v-icon right>
                    mdi-eye-outline
                  </v-icon>
                </v-btn>

                <v-btn
                  :disabled="selectedAppointment == 'null'"
                  value="center"
                  @click="savePrescription(true)"
                >
                  <span class="hidden-sm-and-down">Save</span>

                  <v-icon right>
                    mdi-content-save-outline
                  </v-icon>
                </v-btn>

                <v-btn
                  :disabled="selectedAppointment == 'null'"
                  value="right"
                  @click="printPrescription()"
                >
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
    <v-dialog v-model="dialogSideData" max-width="300px">
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
          <v-btn
            @click="submitSideData()"
            color="primary"
            class="text-center"
            depressed
          >
            Submit
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogAddDrugsHintData" max-width="300px">
      <v-card class="pa-4">
        <h2>Save Information</h2>
        <v-form>
          <v-text-field
            v-model="addDrugsHintDataSubmitModel"
            placeholder=""
            class="mt-2 pa-0"
            outlined
            color="teal"
            dense
            label=""
          >
          </v-text-field>
          <v-btn
            @click="submitAddDrugsHintData()"
            color="primary"
            class="text-center"
            depressed
          >
            Submit
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog
      title="Prescription Preview"
      v-model="prescriptionPriview"
      max-width="980px"
    >
      <v-card class="pa-5">
        <div class="text-center">
          <h3>Preview of Prescription</h3>
        </div>

        <div id="prescription">
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
            <v-row class="my-0" style="text-align:center">
              <v-col>
                Patient ID: #P1234
              </v-col>
              <v-col cols="4"> Name: {{ appointment.data.patientName }} </v-col>
              <v-col> Age: {{ appointment.data.patientAge }} Years Old </v-col>
              <v-col> Date: {{ new Date().toLocaleDateString() }} </v-col>
            </v-row>
            <hr />
            <v-row class="ma-0" style="height:800px">
              <v-col
                cols="4"
                style="border-right: 1px solid #f0f0f0 !important;"
              >
                <v-row>
                  <v-col>
                    <b>Cheif Complaints :</b><br /><br />
                    <ul class="px-4" style="list-style-type:none">
                      <li
                        v-for="item in appointment.data.prescription
                          .chiefComplaints"
                        :key="item"
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
                        v-for="item in appointment.data.prescription
                          .onExamination"
                        :key="item"
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
                        v-for="item in appointment.data.prescription.diagnosis"
                        :key="item"
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
                        v-for="item in appointment.data.prescription
                          .investigationAdvice"
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
                <v-row
                  class="my-0"
                >
                  <v-col class="mx-4">
                    <ol>
                      <li class="mb-3" v-for="(item) in appointment.data.prescription.medicines"
                  :key="item">
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
                      <ul class="px-5" style="list-style-type:disc">
                        <li
                          v-for="item in appointment.data.prescription.advice"
                          :key="item"
                        >
                          {{ item }}
                        </li>
                      </ul>
                    </v-col>
                  </v-row>
                </v-footer>
              </v-col>
            </v-row>
            <br />
            <br />
            <v-footer absolute>
              <v-container>
                <v-row
                  class="pt-2"
                  style="border-top: 1px solid #F0F0F0 !important;background-color:#F7F7F7 !important;"
                >
                  <v-col>
                    Made By <br />
                    <v-img width="200px" src="../../assets/hero-logo.png">
                    </v-img>
                  </v-col>
                  <v-spacer> </v-spacer>
                  <v-col
                    cols="4"
                    style="border-top: 1px solid #f0f0f0 !important;"
                  >
                    <span
                      class="preview"
                      style="text-align: center !important;"
                      v-html="middleHeader"
                    ></span>
                  </v-col>
                  <v-spacer> </v-spacer>
                  <v-col style="text-align:right !important">
                    Prescriped BY <br />
                    <b>{{ appointment.data.updatedBy }}</b>
                  </v-col>
                </v-row>
              </v-container>
            </v-footer>
          </v-container>
        </div>
      </v-card>
    </v-dialog>

    <!-- dialog here -->

    <v-dialog title="Add New Drug" v-model="adddialog" max-width="800px">
      <v-card class="pa-5">
        <h3>Add New Drug</h3>

 <!-- filtering drugs buttons  -->
        <v-row class="my-0 pt-5" dense>
          <v-col cols="4" class="tick">
            <v-checkbox
              v-model="isFavOnly"
              @change="setDrugsDataStyle"
              label="Favourite Drugs only"
            >
            </v-checkbox>
          </v-col>
          <v-col class="tick">
            <v-checkbox
              v-model="isMedicineFull"
              @change="setDrugsDataStyle"
              label="Drugs with Generic Name"
            >
            </v-checkbox>
          </v-col>
        </v-row>

 <!-- row 2 -->
        <v-row class="rowise">
          <v-col>
            <v-autocomplete
              v-model="addDrugModel.brand"
              :items="isFavOnly? favDrugs : drugs"
              :item-value="getFullOrMiniDrugsName"
              :item-text="getFullOrMiniDrugsName"
              placeholder="Search Drug Name"
              class="pa-0"
              outlined
              color="teal"
              dense
              persistent-hint
              hide-selected
              small-chips
              label="Select Medicine"
            >
            </v-autocomplete>
          </v-col>
          <v-col>
            <v-combobox
              v-model="addDrugModel.dose"
              :items="addDrugItems.dose"
              placeholder="Search Drug Name"
              class="pa-0"
              outlined
              color="teal"
              dense
              persistent-hint
              hide-selected
              small-chips
              label="Dose"
            >
              <!-- <template slot="append">
                <v-btn
                   depressed
                  class="mt-0"
                  small
                  style="vertical-align:center;margin-top:-2px !important; margin-right:-4px !important"
                  @click="show"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template> -->
            </v-combobox>
          </v-col>
        </v-row>

 <!-- row 3 -->
        <v-row class="my-0" dense>
          <v-col>
            <v-combobox
              v-model="addDrugModel.instruction"
              placeholder="Provide instruction"
              :items="addDrugHintData.instruction"
              class="mt-2 pa-0"
              outlined
              :search-input.sync="searchModel.instruction"
              persistent-hint
              hide-selected
              small-chips
              color="teal"
              dense
              label="Instruction"
            >
              <template slot="append">
                <v-btn
                  depressed
                  class="mt-0"
                  small
                  style="vertical-align:center;margin-top:-2px !important; margin-right:-4px !important"
                  @click.stop="
                    (dialogAddDrugsHintData = true),
                      (addDrugsHintDataSubmitCurrentTableName = 'instruction')
                  "
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>

              <template v-slot:item="{item }">
                {{ item }}
                <v-spacer></v-spacer>
                <v-list-item-action @click.stop>
                  <v-btn
                    icon
                    x-small
                    @click.stop.prevent="deleteHintData('instruction', item)"
                  >
                    <v-icon>mdi-delete-outline</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-combobox>
          </v-col>
          <v-col>
            <!-- <v-text-field
              v-model="addDrugModel.duration"
              placeholder="Duration"
              class="mt-2 pa-0"
              outlined
              color="teal"
              dense
              label="Duration"
            >
            </v-text-field> -->
            <v-combobox
              v-model="addDrugModel.duration"
              placeholder="Duration"
              :items="addDrugHintData.duration"
              class="mt-2 pa-0"
              outlined
              :search-input.sync="searchModel.duration"
              persistent-hint
              hide-selected
              small-chips
              color="teal"
              dense
              label="Duration"
            >
              <template slot="append">
                <v-btn
                  depressed
                  class="mt-0"
                  small
                  style="vertical-align:center;margin-top:-2px !important; margin-right:-4px !important"
                  @click.stop="
                    (dialogAddDrugsHintData = true),
                      (addDrugsHintDataSubmitCurrentTableName = 'duration')
                  "
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <template v-slot:item="{item }">
                {{ item }}
                <v-spacer></v-spacer>
                <v-list-item-action @click.stop>
                  <v-btn
                    icon
                    x-small
                    @click.stop.prevent="deleteHintData('duration', item)"
                  >
                    <v-icon>mdi-delete-outline</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-combobox>
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
import VueSuggest from "vue-simple-suggest";
import "vue-simple-suggest/dist/styles.css";
export default {
  components: {
    VueSuggest
  },
  data() {
    return {
      isMedicineFull: false,
      isFavOnly: false,
      leftHeader: "",
      rightHeader: "",
      middleHeader: "",
      ABS: null,
      DS: null,
      snackbar: false,
      dialogSideData: false,
      dialogAddDrugsHintData: false,
      sideDataSubmitModel: "",
      addDrugsHintDataSubmitModel: "",
      sideDataSubmitCurrentTableName: "",
      addDrugsHintDataSubmitCurrentTableName: "",
      input: "",
      icon: "",
      input: "",
      idx: 0,
      idy: 0,
      idz: 0,
      idDrugs: 1,
      drugUpdateIdx: -1,
      adddialog: false,
      prescriptionPriview: false,
      selectedAppointment: null,
      sideModels: {
        chiefComplaints: "",
        onExamination: "",
        diagnosis: "",
        investigationAdvice: "",
        advice: ""
      },
      sideData: {
        chiefComplaints: [],
        onExamination: [],
        diagnosis: [],
        investigationAdvice: [],
        advice: []
      },
      // drugsHintData: {
      //    instruction: [],
      //    duration: []
      // },
      addDrugHintData: {
        instruction: [],
        duration: [
          "1 day",
          "2 days",
          "3 days",
          "4 days",
          "5 days",
          "6 days",
          "7 days",
          "10 days",
          "15 days",
          "30 days"
        ],
        note: []
      },
      addDrugModel: {
        brand: "",
        dose: "",
        instruction: "",
        duration: "",
        note: ""
      },
      addDrugItems: {
        dose: [ "১+০+০", "০+১+০", "০+০+১","১+১+০", "০+১+১","১+০+১", "১+১+১"]
      },
      drugs: [],
      favDrugs: [],
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
          appointmentId: "",
          prescriptionRequest: {
            advice: [],
            bloodPressure: "0",
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
        advice: ""
      },
      searchModel: {
        instruction: "",
        duration: ""
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
            bloodPressure: "",
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
    test() {
      console.log("yo");
    },
    show() {
      return 0;
    },
    setDrugsDataStyle() {
      this.addDrugModel.brand = "";
    },
    getFullOrMiniDrugsName(item) {
      if (this.isMedicineFull)
        return `${item.type.substring(0,3).toUpperCase()}. ${item.medicineName.toUpperCase()} (${item.strength.toUpperCase()}) | ${item.genericName}`;
      else return `${item.type.substring(0,3).toUpperCase()}. ${item.medicineName.toUpperCase()} (${item.strength.toUpperCase()})`;
    },
    async submitSideData() {
      let r = await this.ABS.addData(this.sideDataSubmitCurrentTableName, {
        data: this.sideDataSubmitModel
      });
      if (r) {
        this.getSideData(this.sideDataSubmitCurrentTableName);
        this.dialogSideData = false;
      }
      this.sideDataSubmitModel = "";
    },
    async submitAddDrugsHintData() {
      let r = await this.ABS.addData(
        this.addDrugsHintDataSubmitCurrentTableName,
        {
          data: this.addDrugsHintDataSubmitModel
        }
      );
      if (r) {
        this.getAddDrugHintData(this.addDrugsHintDataSubmitCurrentTableName);
        this.dialogAddDrugsHintData = false;
      }
      this.addDrugsHintDataSubmitModel = "";
    },
    async getAppointmentData() {
      let id = localStorage.getItem("selectedAppointment");
      this.selectedAppointment = id;
      console.log("Selected ------------------------");
      console.log(this.selectedAppointment);
      if (id != null) {
        let data = await this.ABS.getDataById("Appointment", id);
        this.appointment = data[0];
        console.log(this.appointment.data.prescription);
        if (this.appointment.data.prescription == undefined) {
          this.appointment.data.prescription = {
            advice: [],
            bloodPressure: "",
            chiefComplaints: [],
            diagnosis: [],
            id: "",
            investigationAdvice: [],
            medicines: [],
            onExamination: [],
            pulse: 0,
            temperature: 0
          };
        }

        console.log(this.appointment);
        this.setSideModelData();
      }
    },
    setSideModelData() {
      console.log("data..................................");
      console.log(this.appointment.data.prescription.chiefComplaints);
      console.log(
        this.arrayToString(this.appointment.data.prescription.chiefComplaints)
      );
      this.sideDataTextFieldModel.chiefComplaints = this.arrayToString(
        this.appointment.data.prescription.chiefComplaints
      );
      this.sideDataTextFieldModel.onExamination = this.arrayToString(
        this.appointment.data.prescription.onExamination
      );
      this.sideDataTextFieldModel.diagnosis = this.arrayToString(
        this.appointment.data.prescription.diagnosis
      );
      this.sideDataTextFieldModel.investigationAdvice = this.arrayToString(
        this.appointment.data.prescription.investigationAdvice
      );
      this.sideDataTextFieldModel.advice = this.arrayToString(
        this.appointment.data.prescription.advice
      );
    },
    crearSelectedAppointment() {
      localStorage.setItem("selectedAppointment", null);
    },
    setSideDataTextFieldTextByTableName(tableName) {
      let autoCompleteFieldData = this.sideModels[tableName];
      // concating the data from v-auto to to respective
      // text-field with ,
      this.sideDataTextFieldModel[tableName] +=
        this.sideModels[tableName][this.sideModels[tableName].length - 1] +
        " ,";
      console.log(this.sideDataTextFieldModel[tableName]);
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
    deleteSideData(tableName, deleteitem) {
      let ok = this.ABS;
      let output = [],
        response = Promise.resolve(this.ABS.getData(tableName));
      response.then(v => {
        v.forEach(function(item) {
          if (deleteitem.localeCompare(item.data) == 0) {
            ok.removeData(tableName, item.id);
          }
        });
        this.getSideData(tableName);
      });
    },
    async deleteHintData(tableName, deleteitem) {
      let ok = this.ABS;
      let output = [],
        response = Promise.resolve(this.ABS.getData(tableName));
      response.then(v => {
        v.forEach(function(item) {
          console.log(item.data);
          console.log(deleteitem);
          if (deleteitem.localeCompare(item.data) == 0) {
            console.log(deleteitem.localeCompare(item.data));
            console.log("id found --------------------");
            ok.removeData(tableName, item.id);
          }
        });
        this.getAddDrugHintData(tableName);
      });
    },
    async removeData(tableName, id) {
      let response = await this.ABS.removeData(tableName, id);
    },
    async getAddDrugHintData(tableName) {
      this.addDrugHintData[tableName] = [];
      let output = [],
        response = await this.ABS.getData(tableName);

      response.forEach(function(item) {
        delete item.id;
        output.push(item.data);
      });
      for (let i = 0; i < this.addDrugHintData[tableName].length; i++) {
        output.push(this.addDrugHintData[tableName][i]);
      }
      this.addDrugHintData[tableName] = output;
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
    async getfavMedicineList(){
        let data = JSON.parse(localStorage.getItem("favMedicineList"));
        console.log(data)
        this.favDrugs = data;
    },
    getMedicineNameParsed(medicineName,type){
        let parsedMedicineName = medicineName.split("|");
        if(parsedMedicineName.length == 2)
        return  ( type == "general" ? parsedMedicineName[0] : parsedMedicineName[1]);
        else
        return  ( type == "general" ? parsedMedicineName[0] : "");
    },
    saveAndPrint() {
      console.log("clicked");
      this.prescriptionPriview = true;
      this.$htmlToPaper("prescription");
    },
    printPrescription() {
      this.savePrescription(true);
      let routeData = this.$router.resolve(
        "print/prescription/" + this.selectedAppointment
      );
      window.open(routeData.href, "_blank");
    },
    addDrug() {
      if (this.drugUpdateIdx == -1) {
        this.appointment.data.prescription.medicines.push(this.addDrugModel);
      } else {
        this.appointment.data.prescription.medicines[
          this.drugUpdateIdx
        ] = this.addDrugModel;
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
    setPrescriptionData() {
      this.appointment.data.prescription.chiefComplaints = this.stringToArray(
        this.sideDataTextFieldModel.chiefComplaints
      );
      this.appointment.data.prescription.onExamination = this.stringToArray(
        this.sideDataTextFieldModel.onExamination
      );
      this.appointment.data.prescription.diagnosis = this.stringToArray(
        this.sideDataTextFieldModel.diagnosis
      );
      this.appointment.data.prescription.investigationAdvice = this.stringToArray(
        this.sideDataTextFieldModel.investigationAdvice
      );
      this.appointment.data.prescription.advice = this.stringToArray(
        this.sideDataTextFieldModel.advice
      );
    },
    setLocalPrescriptionData() {
      // this.localprescription.id = this.appointment.data.id;
      this.localprescription.data.appointmentId = this.appointment.data.id;
      this.localprescription.data.prescriptionRequest.chiefComplaints = this.appointment.data.prescription.chiefComplaints;
      this.localprescription.data.prescriptionRequest.onExamination = this.appointment.data.prescription.onExamination;
      this.localprescription.data.prescriptionRequest.diagnosis = this.appointment.data.prescription.diagnosis;
      this.localprescription.data.prescriptionRequest.investigationAdvice = this.appointment.data.prescription.investigationAdvice;
      this.localprescription.data.prescriptionRequest.advice = this.appointment.data.prescription.advice;
      this.localprescription.data.prescriptionRequest.medicines = this.appointment.data.prescription.medicines;
      this.localprescription.data.prescriptionRequest.pulse = this.appointment.data.prescription.pulse;
      this.localprescription.data.prescriptionRequest.bloodPressure = this.appointment.data.prescription.bloodPressure;
      this.localprescription.data.prescriptionRequest.temperature = this.appointment.data.prescription.temperature;
    },

    async savePrescription(firstTime) {
      this.setPrescriptionData();
      this.setLocalPrescriptionData();
      let r = await this.ABS.updateDataById(
        "LocalPresciption",
        {
          data: this.localprescription.data
        },
        {
          id: this.localprescription.data.appointmentId
        }
      );
      if (r) console.log(r);
      else {
        let x = await this.ABS.addData("LocalPresciption", {
          id: this.appointment.data.id,
          data: this.localprescription.data
        });
      }
      let z = await this.ABS.updateDataById(
        "Appointment",
        {
          data: this.appointment.data
        },
        {
          id: this.appointment.data.id
        }
      );
      if (r) {
        this.snackbar = true;
      }
      if (firstTime) this.savePrescription(false);
    },
    stringToArray(string) {
      var data = string + "";
      var arr = data.split(",");
      console.log(arr);
      return arr;
    },
    arrayToString(arr) {
      console.log(arr);
      // var arr = array.pop()
      var str = arr.toString();
      console.log("....................................");
      console.log(str);
      return str;
    }
  },
  mounted() {
    this.leftHeader = localStorage.getItem("leftHeader");
    this.rightHeader = localStorage.getItem("rightHeader");
    this.middleHeader = localStorage.getItem("middleHeader");
    this.ABS = new ABService();
    this.DS = new DrugService();
    this.getSideData("chiefComplaints");
    this.getSideData("onExamination");
    this.getSideData("advice");
    this.getSideData("diagnosis");
    this.getSideData("investigationAdvice");
    this.getAddDrugHintData("instruction");
    this.getAddDrugHintData("duration");
    this.getAddDrugHintData("note");
    this.getDrugs();
    this.getfavMedicineList();
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

