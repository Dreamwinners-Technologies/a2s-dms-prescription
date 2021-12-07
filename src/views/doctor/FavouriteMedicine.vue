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
                               <v-row class="pa-5">
                                    
                                    <v-icon large>mdi-heart</v-icon> 
                                    <h3 class="mt-1 ml-2">Favourite Medicine</h3>
                                 
                                    <v-spacer></v-spacer> 
                                   
                                     <v-btn depressed @click="addFavDialog=true" color="info">Add Favourite</v-btn>
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
                                       <b>Type</b>
                                   </v-col>
                                   <v-col>
                                       <b>Action</b>
                                   </v-col>
                               </v-row>
                               <v-row v-for="(medicine,idx) in favMedicine" :key="idx" style="text-align:center;border-bottom: 1px solid #e7e7e7">
                                    <v-col class="ml-2" style="text-align:left" cols="4">

                                        <v-row  align-content="center">
                                            <v-col cols="2">
                                               <v-avatar
                                               class="my-3 white--text"
                                                :color="getRandomColor()"
                                                size="40"
                                                ><v-icon>mdi-pill</v-icon></v-avatar>
                                            </v-col>
                                            <v-col>
                                                 <h4 class="mt-2">
                                                    {{medicine.medicineName}} <br>
                                                    <v-chip small :color="getRandomColor()" class="mt-2" x-small>{{medicine.genericName}}</v-chip>
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
                                            {{medicine.type}}
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                             <v-btn-toggle>
                                                     <v-btn color="error" @click="deletefromfav(medicine.id)" depressed small ><v-icon style="color:white!important;" small>mdi-delete</v-icon></v-btn>
                                            </v-btn-toggle>
                                        </v-card-subtitle>
                                    </v-col>
                               </v-row>
                           </v-card>
                       </v-col>
                   </v-row>           
  

    <!-- dialog here -->

    <v-dialog title="Add New Drug" v-model="addFavDialog" max-width="800px">
        <v-card class="pa-6">
            <h3>Add To Favourite</h3> <br>

                    <v-row>
                        <v-col>
                            <v-autocomplete
                            v-model="item"
                            :items="drugs"
                            outlined
                            dense
                            clearable
                            hide-details
                            hide-selected
                            item-text="data.medicineName"
                            item-value="drugId"
                            label="Search Company Name"
                            >
                            </v-autocomplete>

                            <!-- {{item}} -->
                        </v-col>
                        <v-col class="ma-0" style="text-align:right !important;">
                            <v-btn depressed @click="addToFav(item)" color="info"><v-icon class="mr-2">mdi-content-save</v-icon>Add Favourite</v-btn>
                        </v-col>
                    </v-row>
              </v-card>
    </v-dialog>
            
    </v-container>
</div>  
</template>

<script>
import { DrugService } from "@/service/drugs_service.js";
import { ABService } from "@/service/Generic_Service.js";
export default {
  data () {
    return {
        ABS: null,
        DS: null,
        menu: false,
        addFavDialog: false,
        item:{},
        favMedicine: [],
        favListArray: [],
        drugs: [],
        items: [
            {
            text: 'a2sDMS',
            disabled: false,
            href: '/',
            },
            {
            text: 'Todays Appointment',
            disabled: true,
            href: 'create-appointment',
            },
        ]
    }
  },
  methods: {
      show () {
        return 0
    },
    getRandomColor() {
        return 'rgb(' + 
            (Math.floor(Math.random()*56)+200) + ', ' +
            (Math.floor(Math.random()*56)+200) + ', ' +
            (Math.floor(Math.random()*56)+200) +
            ')';
     },
    
    async getfavMedicineList(){
        let data = JSON.parse(localStorage.getItem("favMedicineList"));
        console.log(data)
        this.favMedicine = data;
    },
    async getDrugs() {
      let output = [];
      let drugs = await this.DS.getDrugs();
      drugs.forEach(function(item) {
        output.push(item);
      });
      this.drugs = output;
      console.log(this.drugs)
    },
    async addToFav() {
      let drug = await this.DS.getDrugsById(this.item);
      this.addFavourite(drug)
    },
    addFavourite(item){
        console.log(item[0].data)
        this.favListArray = this.favMedicine;
        this.favListArray.push(item[0].data);
        console.log("Fav Medicine")
        console.log(this.favListArray)
        this.favMedicine = this.favListArray;
        localStorage.setItem("favMedicineList",JSON.stringify(this.favListArray));
        this.addFavDialog = false;
    },
    deletefromfav(id){
        let medList = this.favMedicine
        for(var i=0;i<medList.length;i++){
            if(medList[i].id==id){
                medList.splice(i, 1);
            }
        }
        this.favMedicine = medList
        localStorage.setItem("favMedicineList",JSON.stringify(this.favMedicine));
    }
  },
  mounted(){
       this.ABS = new ABService();
       this.DS = new DrugService();
        this.getDrugs();
       this.getfavMedicineList();
  }
}
</script>
<style>
.m-2{
    margin-top: -12px;
}
</style>
