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

        <!-- medicine list  -->
                   <v-row>
                       <v-col>
                           <v-card class="pa-4 mt-2" elevation="0" style="border: 1px solid #e7e7e7" width="100%">
                               <v-row class="pt-5 pl-5">
                                    <v-col cols="6">
                                        <v-row>
                                            <v-icon large>mdi-medical-bag</v-icon> 
                                            <h3 class="mt-1 ml-2">Medicine Controller</h3>
                                        </v-row>
                                    </v-col>
                                    <v-spacer></v-spacer> 
                                   <v-col>
                                       <v-text-field
                                        append-icon="mdi-magnify"
                                        @click:append="getMedicineList()"
                                        v-model="mediName"
                                        label="Search"
                                        outlined
                                        dense
                                        class="mr-2"
                                        style="width:200px !important;"
                                    ></v-text-field> 
                                   </v-col>
                                    <v-col>
                                        <v-btn depressed @click="addMedicineDialog=true" color="info">Add Medicine</v-btn>
                                    </v-col>
                               </v-row>
                               <v-row style="background-color:#f2f5f8;border-radius:8px;text-align:center">
                                   <v-col cols="4">
                                       <b>Name</b>
                                   </v-col>
                                   <v-col cols="2">
                                       <b>Brand</b>
                                   </v-col>
                                   <v-col>
                                       <b>Strength</b>
                                   </v-col>
                                   <v-col>
                                       <b>Price</b>
                                   </v-col>
                                   <v-col>
                                       <b>Action</b>
                                   </v-col>
                               </v-row>
                               <v-row v-for="medicine,idx in medicineList" :key="idx" style="text-align:center;border-bottom: 1px solid #e7e7e7">
                                    <v-col class="ml-2" style="text-align:left" cols="4">

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
                                            {{medicine.price}}
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                             <v-btn-toggle>
                                                     <v-btn color="info" depressed small @click="seeMedicineInfo(medicine)"><v-icon style="color:white!important" small>mdi-pencil</v-icon></v-btn>
                                                     <v-btn color="error" depressed small @click="deleteMedicine(medicine.medicineId)"><v-icon style="color:white!important;" small>mdi-delete</v-icon></v-btn>
                                                </v-btn-toggle>
                                        </v-card-subtitle>
                                    </v-col>
                               </v-row>

                               <v-row>
                                   <v-col style="text-align:center">
                                       <v-btn :disabled="pageNo==0" @click="pageNo=pageNo-1" class="mr-2" depressed color="error">
                                           Previous
                                       </v-btn>
                                       <v-btn :disabled="response.lastPage" depressed @click="pageNo=pageNo+1" color="info">
                                           Next
                                       </v-btn>
                                   </v-col>
                               </v-row>
                           </v-card>
                       </v-col>
                   </v-row>           
    </v-container>

    <v-dialog max-width="800px" v-model="addMedicineDialog">
        <v-card class="pa-5">
            <h3>Add Medicine</h3> <br>
            <v-row>
            <v-col cols="6">
                <v-text-field
                outlined
                label="Brand Name"
                dense
                v-model="medicine.brandName"
                >
                </v-text-field>
               <v-autocomplete
                v-model="medicine.companyId"
                :items="companies"
                outlined
                dense
                clearable
                hide-details
                hide-selected
                item-text="companyName"
                item-value="companyId"
                label="Search Company Name"
                >
               </v-autocomplete> <br>
                <v-select
                outlined
                label="Form"
                :items="formList"
                dense
                v-model="medicine.form"
                >
                </v-select>
               <v-autocomplete
                v-model="medicine.genericId"
                :items="generics"
                outlined
                dense
                clearable
                hide-details
                hide-selected
                item-text="genericName"
                item-value="getGenericId"
                label="Search Generic Name"
                >
               </v-autocomplete>
            </v-col>
            <v-col cols="6">
                <v-text-field
                outlined
                label="Strength"
                dense
                v-model="medicine.strength"
                >
                </v-text-field>
                <v-text-field
                outlined
                label="Packed Size"
                dense
                v-model="medicine.packedSize"
                >
                </v-text-field>
                <v-text-field
                outlined
                label="Price"
                dense
                v-model="medicine.price"
                >
                </v-text-field>
            </v-col>
            </v-row>
            <br>
            <v-btn color="info" @click="saveMedicine()" depressed>Save</v-btn>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
        idx:0,
        pageNo:0,
        mediName:'',
        addMedicineDialog: false,
        medicineInfo:{},
        auth: "Bearer " + localStorage.getItem("token"),
        MEDICINE_API: 'https://need-doctors-backend.herokuapp.com/medicines',
        medicineList: [],
        response:{},
        medicine: {
            brandName: "",
            companyId: 0,
            companyName: "",
            form: "",
            genericId: 0,
            genericName: "",
            packedSize: "",
            price: "",
            strength: ""
            },
        searchGeneric: '',
        generics: [],
        companies: [],
        formList: ["Tablet","Capsule","Suspension","Suppository","IV Infusion","Cream","Drop","Syrup","Injection","Lotion"],
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
    saveMedicine(){
        console.log(this.medicine)
        axios({
            method:"post",
            url: this.MEDICINE_API,
            data: this.medicine,
            headers: {
            Authorization: this.auth,
            "Content-Type": "application/json"
            }
        })
        .then(r=>{
            if(r.data.statusCode==201){
                console.log("Medicine Added")
                this.addMedicineDialog = false
            }
        })
    },
    deleteMedicine(id){
        console.log(this.medicine)
        axios({
            method:"delete",
            url: this.MEDICINE_API+'/'+id,
            headers: {
            Authorization: this.auth,
            "Content-Type": "application/json"
            }
        })
        .then(r=>{
            if(r.data.statusCode==200){
                console.log("Medicine Deleted")
                this.getMedicineList()
            }
        })
    },
    getMedicineList(){
        axios({
            method:"get",
            url: this.MEDICINE_API+'?medicineName='+this.mediName+'&pageNo='+this.pageNo+'&pageSize=20',
            headers: {
            Authorization: this.auth,
            "Content-Type": "application/json"
            }
        })
        .then(r=>{
            if(r.data.statusCode==200){
                this.response = r.data;
                this.medicineList=r.data.data.data
            }
        })
    },
    getGenericList(){
        axios({
            method:"get",
            url: this.MEDICINE_API+'/generics/list',
            headers: {
            Authorization: this.auth,
            "Content-Type": "application/json"
            }
        })
        .then(r=>{
            if(r.data.statusCode==200){
                this.generics=r.data.data
                console.log(this.generics)
            }
        })
    },
    getCompanyList(){
        axios({
            method:"get",
            url: this.MEDICINE_API+'/company/list',
            headers: {
            Authorization: this.auth,
            "Content-Type": "application/json"
            }
        })
        .then(r=>{
            if(r.data.statusCode==200){
                this.companies=r.data.data
                console.log(this.companies)
            }
        })
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
        this.getMedicineList()
        this.getGenericList()
        this.getCompanyList()
    },
    watch:{
        pageNo: function(val){
            this.getMedicineList()
        }
    }
}
</script>
