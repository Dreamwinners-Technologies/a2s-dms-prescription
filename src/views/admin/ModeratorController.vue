<template>
  <v-row>
    <v-col>
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
export default {
  data() {
    return {
      moderators: [
        {
          name: "Utsa",
          phoneNo: "01866478941"
        },
        {
          name: "Md.Hasan mamud",
          phoneNo: "01729947136"
        },
        {
          name: "Injamamul Haque Sonet ",
          phoneNo: "01734543027"
        },
        {
          name: "Atoar",
          phoneNo: "01761554650"
        }
      ]
    };
  }
};
</script>
