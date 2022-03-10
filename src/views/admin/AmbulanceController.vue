<template>
  <div>
    <v-snackbar color="success"  top v-model="snackbarSuccess">
      {{ snackbarText }}
    </v-snackbar>
    <v-snackbar color="error"  top v-model="snackbarError">
      {{ snackbarText }}
    </v-snackbar>

    <v-card rounded="0" elevation="0" color="#f2f5f8">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        
        </template>
      </v-breadcrumbs>
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
              <v-icon large>mdi-ambulance</v-icon>
              <h3 class="mt-1 ml-2">Pending Ambulance Request</h3>
            </v-row>
            <v-row
              style="background-color:#f2f5f8;border-radius:8px;text-align:center"
            >
              <v-col cols="4">
                <b>Name</b>
              </v-col>
              <v-col cols="2">
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
              class="text-center pt-4 font-weight-bold"
              justify="center"
              align="center"
              v-if="ambulanceList.length === 0"
            >
              <p class="text-danger">No pending ambulance request.</p>
            </v-row>
            <v-row
              justify="center"
              align="center"
              v-for="(ambulance, idx) in ambulanceList"
              :key="idx"
              style="text-align:center;border-bottom: 1px solid #e7e7e7"
            >
              <v-col class="ml-2" style="text-align:left" cols="4">
                <v-row justify="center" align="center">
                  <v-col cols="2">
                    <v-icon size="30" color="gray">mdi-ambulance</v-icon>
                  </v-col>
                  <v-col>
                    <h4>
                      {{ ambulance.title }} <br />
                      <v-chip :color="getRandomColor()" class="mt-2" small
                        >Driver Name: {{ ambulance.driverName }}</v-chip
                      >
                    </h4>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="2">
                <v-card-subtitle>
                  {{ ambulance.phoneNo }}
                </v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-subtitle>
                  {{ ambulance.address }} {{ ambulance.upazila }},
                  {{ ambulance.district }}
                </v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-subtitle>
                  <v-btn-toggle>
                    <v-btn
                      color="info"
                      depressed
                      small
                      @click="seeCardInfo(ambulance)"
                      ><v-icon style="color:white!important" small
                        >mdi-eye</v-icon
                      ></v-btn
                    >
                    <v-btn
                      color="success"
                      depressed
                      small
                      @click="approveCard(ambulance.uuid)"
                      ><v-icon style="color:white!important" small
                        >mdi-check</v-icon
                      ></v-btn
                    >
                    <v-btn
                      color="error"
                      depressed
                      small
                      @click="deleteCard(ambulance.uuid, false)"
                      ><v-icon style="color:white!important" small
                        >mdi-delete</v-icon
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
              <v-icon large>mdi-ambulance</v-icon>
              <h3 class="mt-1 ml-2">Approved Ambulances</h3>
            </v-row>
            <v-row
              style="background-color:#f2f5f8;border-radius:8px;text-align:center"
            >
              <v-col cols="4">
                <b>Name</b>
              </v-col>
              <v-col cols="2">
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
              justify="center"
              align="center"
              v-for="(ambulance, idx) in approvedAmbulanceList"
              :key="idx"
              style="text-align:center;border-bottom: 1px solid #e7e7e7"
            >
              <v-col class="ml-2" style="text-align:left" cols="4">
                <v-row justify="center" align="center">
                  <v-col cols="2">
                    <v-icon size="30" color="gray">mdi-ambulance</v-icon>
                  </v-col>
                  <v-col>
                    <h4>
                      {{ ambulance.title }} <br />
                      <v-chip :color="getRandomColor()" class="mt-2" small
                        >Driver Name: {{ ambulance.driverName }}</v-chip
                      >
                    </h4>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="2">
                <v-card-subtitle>
                  {{ ambulance.phoneNo }}
                </v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-subtitle>
                  {{ ambulance.address }} {{ ambulance.upazila }},
                  {{ ambulance.district }}
                </v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-subtitle>
                  <v-btn-toggle>
                    <v-btn
                      color="info"
                      depressed
                      small
                      @click="seeCardInfo(ambulance)"
                      ><v-icon style="color:white!important" small
                        >mdi-eye</v-icon
                      ></v-btn
                    >
                    <v-btn
                      color="success"
                      depressed
                      small
                      Model="ambulance;"
                      @click="editAmbulanceDialog = true; editAmbulanceModel = ambulance"
                      ><v-icon style="color:white!important" small
                        >mdi-circle-edit-outline</v-icon
                      ></v-btn
                    >
                    <v-btn
                      color="error"
                      depressed
                      small
                      @click="deleteCard(ambulance.uuid, true)"
                      ><v-icon style="color:white!important" small
                        >mdi-delete</v-icon
                      ></v-btn
                    >
                  </v-btn-toggle>
                </v-card-subtitle>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col style="text-align:center">
          <v-btn
            :disabled="pageNo == 0"
            @click="pageNo = pageNo - 1"
            class="mr-2"
            depressed
            color="error"
          >
            Previous
          </v-btn>
          <v-btn
            :disabled="response.lastPage"
            depressed
            @click="pageNo = pageNo + 1"
            color="info"
          >
            Next
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog max-width="800px" v-model="ambulanceInfoDialog">
      <v-card class="pa-5">
        <v-row>
          <v-col cols="6">
            <v-img
              src="https://images.unsplash.com/photo-1587745416684-47953f16f02f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFtYnVsYW5jZXxlbnwwfHwwfHw%3D&w=1000&q=80"
            ></v-img>
          </v-col>
          <v-col>
            <h3>{{ ambulanceInfo.title }}</h3>
            <v-chip small>Driver Name: {{ ambulanceInfo.driverName }}</v-chip>
            <br />
            <v-card-subtitle>
              <b>Thana:</b> {{ ambulanceInfo.upazila }} <br />
              <br />
              <b> District:</b> {{ ambulanceInfo.district }} <br />
              <br />
              <b> Phone Number:</b> {{ ambulanceInfo.phoneNo }}
            </v-card-subtitle>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card
              elevation="0"
              style="border-radius:12px;background-color:#f0f0f0"
            >
              <v-card-subtitle>
                {{ ambulanceInfo.cardOcrData }}
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog max-width="800px" v-model="editAmbulanceDialog">
      <v-card class="pa-5">
        <h3>Edit Ambulance Info</h3>
        <br />
        <v-row>
          <v-col cols="6">
            <v-text-field
              outlined
              label="Address"
              dense
              v-model="editAmbulanceModel.address"
            >
            </v-text-field>
            <v-text-field
              outlined
              label="District"
              dense
              v-model="editAmbulanceModel.district"
            >
            </v-text-field>
            <br />
            <v-text-field
              outlined
              label="Divison"
              dense
              v-model="editAmbulanceModel.division"
            >
            </v-text-field>
            <v-text-field
              outlined
              label="Driver Name"
              dense
              v-model="editAmbulanceModel.driverName"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              outlined
              label="Mobile No"
              dense
              v-model="editAmbulanceModel.phoneNo"
            >
            </v-text-field>
            <v-text-field
              outlined
              label="Title"
              dense
              v-model="editAmbulanceModel.title"
            >
            </v-text-field>
            <v-text-field
              outlined
              label="Upazila"
              dense
              v-model="editAmbulanceModel.upazila"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <br />
        <v-btn color="info" @click="editAmbulance()" depressed>Update</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { AMBULANCE_API } from "@/shared/apis.js";
export default {
  data() {
    return {
      idx: 0,
      pageNo: 0,
      ambulanceInfoDialog: false,
      snackbarSuccess: false,
      snackbarError: false,
      editAmbulanceDialog: false,
      snackbarText: "",
      ambulanceInfo: {},
      response: {},
      auth: "Bearer " + localStorage.getItem("token"),
      ambulanceList: [],
      approvedAmbulanceList: [],
      editAmbulanceModel: {
        address: "",
        district: "",
        division: "",
        driverName: "",
        phoneNo: "",
        title: "",
        upazila: ""
      },
      items: [
        {
          text: "a2sDMS",
          disabled: false,
          href: "/"
        },
        {
          text: "Ambulance Controller",
          disabled: true,
          href: "Ambulance-controller"
        }
      ]
    };
  },
  methods: {
    show() {
      return 0;
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
    getCardReq() {
      axios({
        method: "get",
        url: AMBULANCE_API + `?isApproved=false&pageNo=0&pageSize=20`,
        headers: {
          Authorization: this.auth
        }
      })
        .then(r => {
          if (r.data) {
            this.ambulanceList = r.data.data;
            console.log(this.ambulanceList);
          }
        })
        .catch(err => {
          if (err.response.data.status === 404) {
            this.ambulanceList = [];
          }
        });
    },
    getApprovedCardReq() {
      axios({
        method: "get",
        url:
          AMBULANCE_API + `?isApproved=true&pageNo=${this.pageNo}&pageSize=20`,
        headers: {
          Authorization: this.auth
        }
      }).then(r => {
        if (r.data) {
          this.response = r.data;
          this.approvedAmbulanceList = r.data.data;
        }
      }).catch(err => {
          if (err.response.data.status === 404) {
            this.approvedAmbulanceList = [];
          }
        });
    },
    approveCard(id) {
      axios({
        method: "put",
        url: AMBULANCE_API + id + "/approve/",
        headers: {
          Authorization: this.auth,
          "Content-Type": "application/json"
        }
      }).then(r => {
        if (r.data.statusCode == 200) {
          this.snackbarSuccess = true;
          this.snackbarText = "Approved."
          this.getCardReq();
        }
      }).catch(err => {
        if(err.response){
          this.snackbarError = true;
          this.snackbarText = "Error Occurred, try again."
        }
      });
    },
    editAmbulance(uuid) {
      axios({
        method: "put",
        url: AMBULANCE_API + this.editAmbulanceModel.uuid,
        headers: {
          Authorization: this.auth,
          "Content-Type": "application/json"
        },
        data: this.editAmbulanceModel
      }).then(r => {
        if (r.data.statusCode == 200) {
          console.log(r);
          this.getApprovedCardReq();
          this.snackbarSuccess = true;
          this.snackbarText = "Updated successfully"
          this.editAmbulanceDialog = false;

        }
      }).catch(err => {
        if(err.response){
          this.snackbarError = true;
          this.snackbarText = "Error Occurred, try again."
        }
      });
    },
    deleteCard(uuid, approved) {
      axios({
        method: "delete",
        url: AMBULANCE_API + uuid
      }).then(r => {
        if (r.data.statusCode === 200) {
         this.snackbarSuccess = true;
          this.snackbarText = "Deleted successfully"
          if (approved) this.getApprovedCardReq();
          else this.getCardReq();
        }
      }).catch(err => {
        if(err.response){
          this.snackbarError = true;
          this.snackbarText = "Error Occurred, try again."
        }
      });
    },
    seeCardInfo(item) {
      this.ambulanceInfo = item;
      this.ambulanceInfoDialog = true;
    }
  },
  mounted() {
    this.getCardReq();
    this.getApprovedCardReq();
  },
  watch: {
    pageNo: function(val) {
      this.getApprovedCardReq();
    }
  }
};
</script>
