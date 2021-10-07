<template>
  <v-row class="ml-4 mr-4">
    <v-col>
      <v-snackbar
      top :color="snackbarColor" v-model="snackbar" timeout="1500">
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
                  v-model="doctorPrescriptionRequestModel.doctorChamberAddress"
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
                  color="#3f8485"
                  class="white--text"
                  @click="giveDoctorPrescriptionPermission"
                  >Submit</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </template>
      </v-card>

      <v-card
        class="pa-4 mt-2"
        elevation="0"
        style="border: 1px solid #e7e7e7"
        width="100%"
      >
        <template>
          <v-data-table
            :headers="headers"
            :items="doctorsList"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title> <h3>Doctors List</h3> </v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <!-- <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Calories"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Are you sure you want to delete this item?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small>
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary">
                Reset
              </v-btn>
            </template>
          </v-data-table>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
export default {
  data() {
    return {
      auth: "Bearer " + JSON.parse(localStorage.getItem("uData")).token,
      snackbar: false,
      snackbarColor: "",
      snackbarText: "",
      // for admin related datas
      doctorPrescriptionRequestModel: {
        appointmentPerDay: 0,
        doctorChamberAddress: "",
        fee: 0
      },
      doctorPrescriptionRequestNumber: "",
      headers: [
        {
          text: "Id",
          align: "start",
          sortable: false,
          value: "id"
        },
        { text: "Name", value: "name" },
        { text: "Phone No", value: "phoneNo" },
        { text: "User Name", value: "userName" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      doctorsList: []
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  created() {},
  mounted() {
    this.getPrescriptionDoctorList();
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    getPrescriptionDoctorList() {
      axios
        .get(
          "https://need-doctors-backend.herokuapp.com/admin/prescription/doctors?pageNo=0&pageSize=30"
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
        url: `https://need-doctors-backend.herokuapp.com/admin/prescription/doctors/${this.doctorPrescriptionRequestNumber}`,
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
