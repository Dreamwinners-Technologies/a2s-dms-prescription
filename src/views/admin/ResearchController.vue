<template>
  <div>
    <v-snackbar color="success" top v-model="snackbarSuccess">
      {{ snackbarText }}
    </v-snackbar>
    <v-snackbar color="error" top v-model="snackbarError">
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
      <v-row>
        <v-col>
          <v-card
            class="pa-4 mt-2"
            elevation="0"
            style="border: 1px solid #e7e7e7"
            width="100%"
          >
            <v-row class="pa-5" align="center" justify="center">
              <v-icon large>mdi-abacus</v-icon>
              <h3 class="mt-1 ml-2">Research List</h3>
              <v-spacer></v-spacer>
                                        <v-text-field
                                        append-icon="mdi-magnify"
                                        @click:append="getResearches()"
                                        @keyup.enter="getResearches()"
                                        v-model="searchModel"
                                        label="Search by Author"
                                        outlined
                                        dense
                                        class="mr-2 relative"
                                        style="top:12px;"
                                    ></v-text-field> 
              <v-btn
                color="info"
                depressed
                @click="
                  editResearchDialog = true;
                  isAddMode = true;
                  ResearchModel = {};
                "
                ><v-icon style="color:white!important" small>mdi-plus</v-icon>
                Add Research</v-btn
              >
            </v-row>
            <v-row
              style="background-color:#f2f5f8;border-radius:8px;text-align:center"
            >
              <v-col cols="4">
                <b>Headline</b>
              </v-col>
              <v-col cols="2">
                <b>Author</b>
              </v-col>
              <v-col>
                <b>Journal Name</b>
              </v-col>
              <v-col>
                <b>Action</b>
              </v-col>
            </v-row>
            <v-row
              justify="center"
              align="center"
              v-for="(research, idx) in researchList"
              :key="idx"
              style="text-align:center;border-bottom: 1px solid #e7e7e7"
            >
              <v-col class="ml-2" style="text-align:left" cols="4">
                <v-row justify="center" align="center">
                  <v-col> {{ research.headline }} <br /> </v-col>
                </v-row>
              </v-col>
              <v-col cols="2">
                <v-card-subtitle>
                  {{ research.author }}
                </v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-subtitle>
                  {{ research.journalName }}
                </v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-subtitle>
                  <v-btn-toggle>
                    <v-btn
                      color="info"
                      depressed
                      small
                      @click="seeCardInfo(research)"
                      ><v-icon style="color:white!important" small
                        >mdi-eye</v-icon
                      ></v-btn
                    >
                    <v-btn
                      color="success"
                      depressed
                      small
                      Model="ambulance;"
                      @click="
                        editResearchDialog = true;
                        isAddMode = false;
                        ResearchModel = research;
                      "
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

    <v-dialog max-width="800px" v-model="researchInfoDialog">
      <v-card class="pa-5">
        <v-row>
          <v-col>
            <h3 class="pb-2 display-1">{{ researchInfo.headline }}</h3>
            <b>Author Name:</b>
            <v-chip small> {{ researchInfo.author }}</v-chip> <br /><br />
            <b>Journal Name:</b> {{ researchInfo.journalName }}
            <br />
            <v-card-subtitle>
              <p class="lead">{{ researchInfo.abstractText }}</p>
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
                {{ researchInfo.cardOcrData }}
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog max-width="800px" v-model="editResearchDialog">
      <v-card class="pa-5">
        <h3 v-if="isAddMode">Add Research</h3>
        <h3 v-if="!isAddMode">Update Research</h3>
        <br />
        <v-row>
          <v-col cols="6">
            <v-text-field
              outlined
              label="Headline"
              dense
              v-model="ResearchModel.headline"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              outlined
              label="Author"
              dense
              v-model="ResearchModel.author"
            >
            </v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field
              outlined
              label="Link"
              dense
              v-model="ResearchModel.link"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template
                style="width:50px !important;"
                v-slot:activator="{ on, attrs }"
              >
                <v-text-field
                  v-model="ResearchModel.publishDate"
                  label="Published Date"
                  prepend-icon="mdi-calendar"
                  outlined
                  dense
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="ResearchModel.publishDate"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12">
            <v-text-field
              outlined
              label="Journal Name"
              dense
              v-model="ResearchModel.journalName"
            >
            </v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea
              outlined
              label="Abstract Text"
              dense
              v-model="ResearchModel.abstractText"
              height="120"
            >
            </v-textarea>
          </v-col>
        </v-row>
        <br />
        <v-btn v-if="!isAddMode" color="info" @click="editResearch()" depressed
          >Update</v-btn
        >
        <v-btn v-if="isAddMode" color="info" @click="addResearch()" depressed
          >Add</v-btn
        >
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { RESEARCH_API } from "@/shared/apis.js";
export default {
  data() {
    return {
      idx: 0,
      pageNo: 0,
      researchInfoDialog: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      snackbarSuccess: false,
      snackbarError: false,
      editResearchDialog: false,
      isAddMode: false,
      searchModel: "",
      snackbarText: "",
      researchInfo: {},
      menu: false,
      response: {},
      auth: "Bearer " + localStorage.getItem("token"),
      ambulanceList: [],
      researchList: [],
      ResearchModel: {
        abstractText: "",
        author: "",
        headline: "",
        journalName: "",
        link: "",
        publishDate: ""
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
        url: RESEARCH_API + `?isApproved=false&pageNo=0&pageSize=20`,
        headers: {
          Authorization: this.auth
        }
      })
        .then(r => {
          if (r.data) {
            this.ambulanceList = r.data.data.data;
            console.log(this.ambulanceList);
          }
        })
        .catch(err => {
          if (err.response.data.status === 404) {
            this.ambulanceList = [];
          }
        });
    },
    getResearches() {
      let url;
      if(this.searchModel === "")
      url = RESEARCH_API + `?pageNo=${this.pageNo}&pageSize=10`
      else
      url = RESEARCH_API + `?authorName=${encodeURI(this.searchModel)}&pageNo=${this.pageNo}&pageSize=10`
      axios({
        method: "get",
        url: url
        // headers: {
        //   Authorization: this.auth
        // }
      })
        .then(r => {
          if (r.data) {
            this.response = r.data.data;
            this.researchList = r.data.data.data;
          }
        })
        .catch(err => {
          if (err.response.data.status === 404) {
            this.researchList = [];
          }
        });
    },
    addResearch() {
      axios({
        method: "post",
        url: RESEARCH_API,
        headers: {
          Authorization: this.auth,
          "Content-Type": "application/json"
        },
        data: this.ResearchModel
      })
        .then(r => {
          if (r.data.statusCode == 200) {
            this.editResearchDialog = false;
            this.snackbarSuccess = true;
            this.snackbarText = "Research Created";
            this.getResearches();
          }
        })
        .catch(err => {
          if (err.response) {
            this.snackbarError = true;
            this.snackbarText = "Error Occurred, try again.";
          }
        });
    },
    editResearch(uuid) {
      axios({
        method: "put",
        url: RESEARCH_API + this.ResearchModel.id,
        headers: {
          Authorization: this.auth,
          "Content-Type": "application/json"
        },
        data: this.ResearchModel
      })
        .then(r => {
          if (r.data.statusCode == 200) {
            console.log(r);
            this.getResearches();
            this.snackbarSuccess = true;
            this.snackbarText = "Updated successfully";
            this.editResearchDialog = false;
          }
        })
        .catch(err => {
          if (err.response) {
            this.snackbarError = true;
            this.snackbarText = "Error Occurred, try again.";
          }
        });
    },
    deleteCard(uuid, approved) {
      axios({
        method: "delete",
        url: RESEARCH_API + uuid
      })
        .then(r => {
          if (r.data.statusCode === 200) {
            this.snackbarSuccess = true;
            this.snackbarText = "Deleted successfully";
            if (approved) this.getResearches();
            else this.getCardReq();
          }
        })
        .catch(err => {
          if (err.response) {
            this.snackbarError = true;
            this.snackbarText = "Error Occurred, try again.";
          }
        });
    },
    seeCardInfo(item) {
      this.researchInfo = item;
      this.researchInfoDialog = true;
    }
  },
  mounted() {
    this.getCardReq();
    this.getResearches();
  },
  watch: {
    pageNo: function(val) {
      this.getResearches();
    }
  }
};
</script>
