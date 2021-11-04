<template>
<div>
        <v-snackbar top :color="snackbarColor" v-model="snackbar" timeout="1500">
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
                           <v-card class="pa-4 mt-2" elevation="0" style="border: 1px solid #e7e7e7" width="100%">
                               <v-row class="pa-5">
                                   <v-icon large>mdi-pill</v-icon> <h3 class="mt-1 ml-2">Pending Medicine Request</h3> 
                               </v-row>
                               <v-row style="background-color:#f2f5f8;border-radius:8px;text-align:center">
                                   <v-col cols="3">
                                       <b>Name</b>
                                   </v-col>
                                   <v-col cols="2">
                                       <b>Brand</b>
                                   </v-col>
                                   <v-col>
                                       <b>Strength</b>
                                   </v-col>
                                   <v-col>
                                       <b>Added By</b>
                                   </v-col>
                                   <v-col>
                                       <b>Action</b>
                                   </v-col>
                               </v-row>
                               <v-row v-for="(medicine,idx) in medicineList" :key="idx" style="text-align:center;border-bottom: 1px solid #e7e7e7">
                                    <v-col class="ml-2" style="text-align:left" cols="3">

                                        <v-row>
                                            <v-col cols="2">
                                               <v-avatar
                                               class="my-3 white--text"
                                                :color="getRandomColor()"
                                                size="40"
                                                ><v-icon>mdi-pill</v-icon></v-avatar>
                                            </v-col>
                                            <v-col>
                                                 <h4 class="mt-2">
                                                    {{medicine.brandName}} <br>
                                                    <v-chip :color="getRandomColor()" class="mt-2" x-small>{{medicine.genericName}}</v-chip>
                                                </h4>   
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-card-subtitle>
                                            {{medicine.companyName}}
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                            {{medicine.strength}}
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                            {{medicine.createdBy}}
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                             <v-btn-toggle>
                                                     <v-btn color="info" depressed small @click="seeMedicineInfo(medicine)"><v-icon style="color:white!important" small>mdi-eye</v-icon></v-btn>
                                                     <v-btn color="gray" depressed small @click="approveCard(card.id)"><v-icon small>mdi-content-copy</v-icon></v-btn>
                                                </v-btn-toggle>
                                        </v-card-subtitle>
                                    </v-col>
                               </v-row>
                           </v-card>
                       </v-col>
                   </v-row>           
    </v-container>
    <v-dialog max-width="1000px" v-model="medicineInfoDialog">
        <v-card class="pa-5">
            <h3>Info of ({{medicineInfo.brandName}})</h3> <br>
            <v-text-field
            append-icon="mdi-content-copy"
            @click:append="copyText(medicineInfo.brandName)"
            v-model="medicineInfo.brandName"
            label="Brand Name"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            append-icon="mdi-content-copy"
            @click:append="copyText(medicineInfo.companyName)"
            v-model="medicineInfo.companyName"
            label="Company Name"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            append-icon="mdi-content-copy"
            @click:append="copyText(medicineInfo.genericName)"
            v-model="medicineInfo.genericName"
            label="Generic Name"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            append-icon="mdi-content-copy"
            @click:append="copyText(medicineInfo.strength)"
            v-model="medicineInfo.strength"
            label="Strength"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            append-icon="mdi-content-copy"
            @click:append="copyText(medicineInfo.precaution)"
            v-model="medicineInfo.precaution"
            label="Precaution"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            append-icon="mdi-content-copy"
            @click:append="copyText(medicineInfo.indication)"
            v-model="medicineInfo.indication"
            label="Indication"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            append-icon="mdi-content-copy"
            @click:append="copyText(medicineInfo.contraIndication)"
            v-model="medicineInfo.contraIndication"
            label="ContraIndication"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            append-icon="mdi-content-copy"
            @click:append="copyText(medicineInfo.dose)"
            v-model="medicineInfo.dose"
            label="Doses"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            append-icon="mdi-content-copy"
            @click:append="copyText(medicineInfo.sideEffect)"
            v-model="medicineInfo.sideEffect"
            label="Side Effect"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            append-icon="mdi-content-copy"
            @click:append="copyText(medicineInfo.pregnanciesCategoryId)"
            v-model="medicineInfo.pregnanciesCategoryId"
            label="P    regnancies Category Id"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            append-icon="mdi-content-copy"
            @click:append="copyText(medicineInfo.modeOfAction)"
            v-model="medicineInfo.modeOfAction"
            label="Mode Of Action"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            append-icon="mdi-content-copy"
            @click:append="copyText(medicineInfo.interaction)"
            v-model="medicineInfo.interaction"
            label="Interaction"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            append-icon="mdi-content-copy"
            @click:append="copyText(medicineInfo.pregnancyCategoryNote)"
            v-model="medicineInfo.pregnancyCategoryNote"
            label="Pregnancy Category Note"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            append-icon="mdi-content-copy"
            @click:append="copyText(medicineInfo.adultDose)"
            v-model="medicineInfo.adultDose"
            label="Adult Dose"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            append-icon="mdi-content-copy"
            @click:append="copyText(medicineInfo.renalDose)"
            v-model="medicineInfo.renalDose"
            label="Renal Dose"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            append-icon="mdi-content-copy"
            @click:append="copyText(medicineInfo.childDose)"
            v-model="medicineInfo.childDose"
            label="Child Dose"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            append-icon="mdi-content-copy"
            @click:append="copyText(medicineInfo.administration)"
            v-model="medicineInfo.administration"
            label="Administration"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            append-icon="mdi-content-copy"
            @click:append="copyText(medicineInfo.form)"
            v-model="medicineInfo.form"
            label="Form"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            append-icon="mdi-content-copy"
            @click:append="copyText(medicineInfo.price)"
            v-model="medicineInfo.price"
            label="price"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            append-icon="mdi-content-copy"
            @click:append="copyText(medicineInfo.packedSize)"
            v-model="medicineInfo.packedSize"
            label="packedSize"
            filled
            shaped
          ></v-text-field>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
            snackbar: false,
      snackbarColor: "",
      snackbarText: "",
        idx:0,
        medicineInfoDialog: false,
        medicineInfo:{},
        auth: "Bearer " + localStorage.getItem("token"),
        MEDICINE_REQ_API: 'https://need-doctors-backend.herokuapp.com/medicines/requests',
        medicineList: [],
        items: [
            {
            text: 'a2sDMS',
            disabled: false,
            href: '/',
            },
            {
            text: 'Appointment List',
            disabled: true,
            href: 'appointment-list',
            },
        ],
    }
  },
  methods: {
    show () {
      return 0;
    },
    getRandomColor() {
        return 'rgb(' + 
            (Math.floor(Math.random()*56)+200) + ', ' +
            (Math.floor(Math.random()*56)+200) + ', ' +
            (Math.floor(Math.random()*56)+200) +
            ')';
     },
    getMedicineReq(){
        axios({
            method:"get",
            url: this.MEDICINE_REQ_API+'?pageNo=0&pageSize=500',
            headers: {
            Authorization: this.auth,
            "Content-Type": "application/json"
            }
        })
        .then(r=>{
            if(r.data.statusCode==200){
                this.medicineList=r.data.data.data
                console.log(this.medicineList)
            }
        }).catch(err=>{
          if (err.response) {
            this.snackbar = true;
            this.snackbarColor = "error";
            this.snackbarText = err.response.data.message;
          } else if (err.request) {
            this.snackbar = true;
            this.snackbarColor = "error";
            this.snackbarText = "Internet Disconnected!";
          }
        });
    },
    
    seeMedicineInfo(item){
        this.medicineInfo = item
        this.medicineInfoDialog = true;
    },
    copyText(text) {
        var copyText = text

        navigator.clipboard.writeText(copyText);

        alert("Copied the text: " + copyText);
    }
    },
    mounted(){
        this.getMedicineReq()
    }
}
</script>
