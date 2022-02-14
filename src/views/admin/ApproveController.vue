<template>
  <div>
    <v-card rounded="0" elevation="0" color="#f2f5f8">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>
    <v-container>
      <v-row>
        <v-col>
          <v-dialog title="Add New Drug" v-model="dialog" max-width="300px">
            <v-card class="pa-5">
              <h3>Delete Permission</h3>
              <v-row>
                <v-col>
                  <span>Phone No: {{ deletePermissionNumberModel }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-spacer></v-spacer>
                <v-col>
                  <v-btn
                    @click="deleteDoctorPrescriptionPermission"
                    depressed
                    color="error"
                    ><v-icon class="mr-2">mdi-delete</v-icon> Delete</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>

          <v-snackbar
            top
            :color="snackbarColor"
            v-model="snackbar"
            timeout="1500"
          >
            {{ snackbarText }}
          </v-snackbar>
          <v-card
            class="pa-4 mt-2"
            elevation="0"
            style="border: 1px solid #e7e7e7"
            width="100%"
          >
            <v-row class="pa-5">
              <v-icon large>mdi-clipboard-text</v-icon>
              <h3 class="mt-1 ml-2">
                Approve Doctor
              </h3>
            </v-row>
            <template>
              <v-form ref="doctorApproveForm">
                <v-row
                  style="background-color:#fff;border-radius:8px;text-align:center"
                >
                  <v-col>
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
                  <v-col>
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
                  <v-col>
                    <v-text-field
                      v-model="
                        doctorPrescriptionRequestModel.doctorChamberAddress
                      "
                      class="mt-2 pa-0"
                      outlined
                      color="#666666"
                      dense
                      label="Chamber Address"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col>
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
                    <v-btn
                      depressed
                      color="info"
                      class="white--text"
                      @click="giveDoctorPrescriptionPermission"
                      >Submit Approval</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </template>
          </v-card>
          <!--  -->
          <v-card
            class="pa-4 mt-2"
            elevation="0"
            style="border: 1px solid #e7e7e7"
            width="100%"
          >
            <v-row class="pa-5">
              <v-icon large>mdi-account-multiple</v-icon>
              <h3 class="mt-1 ml-2">
                Presciption Permitted Doctors List
              </h3>
            </v-row>
            <v-row
              style="background-color:#f2f5f8;border-radius:8px;text-align:center"
            >
              <v-col>
                <b>Name</b>
              </v-col>
              <v-col>
                <b>Phone No</b>
              </v-col>
              <v-col>
                <b>User Name</b>
              </v-col>
              <v-col>
                <b>Fee</b>
              </v-col>
              <v-col>
                <b>Action</b>
              </v-col>
            </v-row>
            <v-row
              v-for="(doctor, idy) in doctorsList"
              :key="idy"
              style="text-align:center;border-bottom: 1px solid #e7e7e7"
            >
              <v-col style="text-align:left !important;">
                <v-card-subtitle>
                  <h4>{{ doctor.name }}</h4>
                </v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-subtitle>
                  {{ doctor.phoneNo }}
                </v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-subtitle>
                  {{ doctor.userName }}
                </v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-subtitle>
                  {{ doctor.doctorPrescription.fee }} TK
                </v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-subtitle>
                  <!-- <v-btn color="info" depressed small class="mr-2"
                ><v-icon small>mdi-pencil-outline</v-icon></v-btn
              > -->
                  <v-btn
                    @click="
                      (dialog = true),
                        (deletePermissionNumberModel = doctor.phoneNo)
                    "
                    color="error"
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
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const API_URL = "https://api.a2sdms.com/";
const DELETE_PRESCRIPTION_PERMISSION_API =
  API_URL + "admin/prescription/doctors/";
export default {
  data() {
    return {
      auth: "Bearer " + JSON.parse(localStorage.getItem("uData")).token,
      snackbar: false,
      dialog: false,
      snackbarColor: "",
      snackbarText: "",
      deletePermissionNumberModel: "",
      // for admin related datas
      doctorPrescriptionRequestModel: {
        appointmentPerDay: 0,
        doctorChamberAddress: "",
        fee: 0
      },
      doctorPrescriptionRequestNumber: "",
      doctorsList: [],
      items: [
        {
          text: "a2sDMS",
          disabled: false,
          href: "/"
        },
        {
          text: "Doctor Controller",
          disabled: true,
          href: "doctor-approve"
        }
      ]
    };
  },
  computed: {},

  watch: {},

  created() {},
  mounted() {
    this.getPrescriptionDoctorList();
  },
  methods: {
    deleteDoctorPrescriptionPermission() {
      this.dialog = false;
      axios({
        method: "delete",
        url: `${DELETE_PRESCRIPTION_PERMISSION_API}${this.deletePermissionNumberModel}`,
        headers: {
          Authorization: this.auth,
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          console.log(response);
          this.snackbar = true;
          this.snackbarColor = "success";
          this.snackbarText = "The doctor's permisson has been deleted!";
          this.getPrescriptionDoctorList();
        })
        .catch(err => {
          console.log(err.response);
          this.snackbar = true;
          this.snackbarColor = "error";
          this.snackbarText = err.response.data.message;
        });
    },
    getPrescriptionDoctorList() {
      axios
        .get(
          "https://api.a2sdms.com/admin/prescription/doctors?pageNo=0&pageSize=30"
        )
        .then(response => {
          console.log(response);
          this.doctorsList = response.data.data.data;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    giveDoctorPrescriptionPermission() {
      console.log(JSON.parse(localStorage.getItem("uData")).token);
      axios({
        method: "post",
        url: `https://api.a2sdms.com/admin/prescription/doctors/${this.doctorPrescriptionRequestNumber}`,
        data: this.doctorPrescriptionRequestModel,
        headers: {
          Authorization: this.auth,
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          console.log(response);
          this.snackbar = true;
          this.snackbarColor = "success";
          this.snackbarText = "The doctor has been given permisson!";
          this.getPrescriptionDoctorList();
          this.doctorPrescriptionRequestModel = {
            appointmentPerDay: 0,
            doctorChamberAddress: "",
            fee: 0
          };
          this.doctorPrescriptionRequestNumber = "";
        })
        .catch(err => {
          this.snackbar = true;
          this.snackbarColor = "error";
          this.snackbarText =
            "Some Error occured! Try again or check entered data.";
          console.log(err);
        });
    }
  }
};
</script>
