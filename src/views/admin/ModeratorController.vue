<template>
  <v-row>
    <v-col>
       <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      top
    >
      {{ snackbarText }}
       </v-snackbar>
<!-- Dialog 


-->
  <v-dialog title="Add New Drug" v-model="adddialog" max-width="400px">
      <v-card class="pa-5">
        <h3>Add New Moderator</h3>
        <v-row class="rowise pt-5">
          <v-col>
            <v-text-field
              v-model="addModeratorNumberModel"
              placeholder="017.."
              class="mt-2 pa-0"
              outlined
              color="teal"
              dense
              type="number"
              label="Phone No."
            >
            </v-text-field>
          </v-col>
        </v-row>

        <v-btn depressed color="info" @click="addModerator"
          ><v-icon class="mr-2">mdi-content-save</v-icon> Add</v-btn
        >
      </v-card>
    </v-dialog>
      <!--  -->
      <v-card
        class="pa-4 mt-2"
        elevation="0"
        style="border: 1px solid #e7e7e7"
        width="100%"
      >
        <v-row class="pa-5">
          <v-icon large>mdi-account-multiple</v-icon>  <h3> Moderators</h3>  <v-spacer></v-spacer>
          <v-btn depressed @click="adddialog = true" color="info"
            >Add Moderator</v-btn
          >
        </v-row>
        <v-row
          style="background-color:#f2f5f8;border-radius:8px;text-align:center"
        >
          <v-col cols="4">
            <b>Name</b>
          </v-col>
          <v-col cols="4">
            <b>Phone No:</b>
          </v-col>
          <v-col cols="4">
            <b>Action</b>
          </v-col>
        </v-row>
        <v-row
          v-for="(mod, idy) in moderators"
          :key="idy"
          style="text-align:center;border-bottom: 1px solid #e7e7e7"
        >
          <v-col cols="4">
            <v-card-subtitle>
              {{ mod.name }}
            </v-card-subtitle>
          </v-col>
          <v-col cols="4">
            <v-card-subtitle>
              {{ mod.phoneNo }}
            </v-card-subtitle>
          </v-col>
          <v-col cols="4">
            <v-card-subtitle>
              <v-btn color="info" depressed small class="mr-2"
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
</template>
<script>
import axios from "axios";
const API_URL = "https://need-doctors-backend.herokuapp.com/";
const MODERATOR_API = API_URL + "admin/moderators";
export default {
  data() {
    return {
      snackbarText: "",
      snackbarColor: "success",
      snackbar: "",
      adddialog: false,
      addModeratorNumberModel: "",
      moderators: [

      ]
    };
  },
  methods: {
getModeratorList(){
  axios
        .get(
          MODERATOR_API
        )
        .then(r => {
          let response = r.data;
          this.moderators = response;
          console.log(response);
    
        })
        .catch(e=> {

        });
},
addModerator(){
            this.adddialog = false;
    axios
        .post(
         `${MODERATOR_API}?phoneNo=${this.addModeratorNumberModel}`
        )
        .then(r => {
          let response = r;
          console.log(response);
          this.snackbar = true;
          this.snackbarText = "New Moderator Added!";
          this.snackbarColor = "success";
          this.getModeratorList();

        })
        .catch(e=> {
          console.log(e.response)
          this.snackbar = true;
          this.snackbarText = e.response.data.message;
          this.snackbarColor = "error";
        });
}
  },
  mounted(){
    this.getModeratorList();
  }
};
</script>
