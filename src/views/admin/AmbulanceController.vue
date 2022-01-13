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

        <!-- appointment list  -->
                   <v-row>
                       <v-col>
                           <v-card class="pa-4 mt-2" elevation="0" style="border: 1px solid #e7e7e7" width="100%">
                               <v-row class="pa-5">
                                   <v-icon large>mdi-ambulance</v-icon> <h3 class="mt-1 ml-2">Pending Ambulance Request</h3> 
                               </v-row>
                               <v-row style="background-color:#f2f5f8;border-radius:8px;text-align:center">
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
                               <v-row justify="center" align="center" v-for="(ambulance,idx) in ambulanceList" :key="idx" style="text-align:center;border-bottom: 1px solid #e7e7e7">
                                    <v-col class="ml-2" style="text-align:left" cols="4">

                                        <v-row justify="center" align="center">
                                            <v-col cols="2">
                                             <v-icon size="30" color="gray">mdi-ambulance</v-icon>
                                            </v-col>
                                            <v-col>
                                                 <h4>
                                                    {{ambulance.title}} <br>
                                                    <v-chip :color="getRandomColor()" class="mt-2" small>Driver Name: {{ambulance.driverName}}</v-chip>
                                                </h4>   
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-card-subtitle>
                                            {{ambulance.phoneNo}}
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                           {{ambulance.address}} {{ambulance.upazila}}, {{ambulance.district}}
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                             <v-btn-toggle>
                                                     <v-btn color="info" depressed small @click="seeCardInfo(ambulance)"><v-icon style="color:white!important" small>mdi-eye</v-icon></v-btn>
                                                     <v-btn color="success" depressed small @click="approveCard(ambulance.uuid)"><v-icon style="color:white!important" small>mdi-check</v-icon></v-btn>
                                                     <v-btn color="error" depressed small @click="deleteCard(ambulance.id)"><v-icon style="color:white!important" small>mdi-delete</v-icon></v-btn>
                                                </v-btn-toggle>
                                        </v-card-subtitle>
                                    </v-col>
                               </v-row>
                           </v-card>
                       </v-col>
                   </v-row>           
    </v-container>
    <v-dialog max-width="800px" v-model="ambulanceInfoDialog">
        <v-card class="pa-5">
           
            <v-row>
                <v-col cols="6">
                  <v-img src="https://images.unsplash.com/photo-1587745416684-47953f16f02f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFtYnVsYW5jZXxlbnwwfHwwfHw%3D&w=1000&q=80"></v-img>
                </v-col>
                <v-col>
                     <h3>{{ambulanceInfo.title}}</h3>
                    <v-chip small>Driver Name: {{ ambulanceInfo.driverName}}</v-chip> <br> 
                    <v-card-subtitle>
                    <b>Thana:</b> {{ambulanceInfo.upazila}} <br> <br>
                    <b> District:</b> {{ambulanceInfo.district}} <br> <br>
                    <b> Phone Number:</b> {{ambulanceInfo.phoneNo}}
                    </v-card-subtitle>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card elevation="0" style="border-radius:12px;background-color:#f0f0f0">
                        <v-card-subtitle>
                            {{ambulanceInfo.cardOcrData}}
                        </v-card-subtitle>

                    </v-card>
                </v-col>
            </v-row>
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
        ambulanceInfoDialog: false,
        ambulanceInfo:{},
        auth: "Bearer " + localStorage.getItem("token"),
        AMBULANCE_API: 'https://need-doctors-backend.herokuapp.com/api/ambulance/',
        ambulanceList: [],
        items: [
            {
            text: 'a2sDMS',
            disabled: false,
            href: '/',
            },
            {
            text: 'Ambulance Controller',
            disabled: true,
            href: 'Ambulance-controller',
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
    getCardReq(){
        axios({
            method:"get",
            url: this.AMBULANCE_API+`?isApproved=false&pageNo=0&pageSize=20`,
            headers: {
            Authorization: this.auth            }
        })
        .then(r=>{
            if(r.data){
                this.ambulanceList=r.data.data
                console.log(this.ambulanceList);
            }
        })
    },
    approveCard(id){
        axios({
            method: "put",
            url: this.AMBULANCE_API+id+"/approve/",
            headers: {
            Authorization: this.auth,
            "Content-Type": "application/json"
            }
        })
        .then(r=>{
            if(r.data.statusCode==200){
                console.log(r)
                this.getCardReq()
            }
        })
    },
    deleteCard(id){
        axios({
            method: "delete",
            url: this.CARD_REQ_API+"/delete/"+id,
            headers: {
            Authorization: this.auth,
            "Content-Type": "application/json"
            }
        })
        .then(r=>{
            if(r.data.statusCode==200){
                console.log(r)
                this.getCardReq()            }
        })
    },
    seeCardInfo(item){
        this.ambulanceInfo = item
        this.ambulanceInfoDialog = true;
    }
    },
    mounted(){
        this.getCardReq()
    }
}
</script>
