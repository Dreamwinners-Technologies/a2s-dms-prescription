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
                                   <v-icon large>mdi-message-alert</v-icon> <h3 class="mt-1 ml-2">Doctor Support Request</h3> 
                               </v-row>
                               <v-row style="background-color:#f2f5f8;border-radius:8px;text-align:center">
                                   <v-col cols="5">
                                       <b>Title</b>
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
                               <v-row v-for="(card,idx) in supportList" :key="idx" style="text-align:center;border-bottom: 1px solid #e7e7e7">
                                    <v-col class="ml-2" style="text-align:left" cols="5">

                                        <v-row>
                                            <v-col>
                                                 <h4 class="mt-5">
                                                    {{card.shortDetails}} <br>
                                                    <v-chip :color="getRandomColor()" class="mt-2" x-small>{{card.doctorName}}</v-chip>
                                                </h4>   
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-card-subtitle>
                                            {{card.doctorContact}}
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                            {{card.doctorAddress}}
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                             <v-btn-toggle>
                                                     <v-btn color="info" depressed small @click="seeCardInfo(card)"><v-icon style="color:white!important" small>mdi-eye</v-icon></v-btn>
                                                     <!-- <v-btn color="success" depressed small @click="approveCard(card.id)"><v-icon style="color:white!important" small>mdi-check</v-icon></v-btn>
                                                     <v-btn color="error" depressed small @click="deleteCard(card.id)"><v-icon style="color:white!important" small>mdi-delete</v-icon></v-btn> -->
                                                </v-btn-toggle>
                                        </v-card-subtitle>
                                    </v-col>
                               </v-row>
                           </v-card>
                       </v-col>
                   </v-row>           
    </v-container>
    <v-dialog max-width="800px" v-model="cardInfoDialog">
        <v-card class="pa-5">
            <v-row>
                <v-col>
                    <v-card elevation="0">
                        <h3>
                          <v-chip color="info" class="mr-2" x-small></v-chip>  {{supportInfo.shortDetails}}
                        </h3>
                        <v-card-subtitle>
                            By <v-chip small color="#3A2977" style="color:white !important">{{supportInfo.doctorName}}</v-chip>
                        </v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <h4>Details:</h4>
                    <v-card class="pa-3" elevation="0" style="border-radius:12px;background-color:#f0f0f0">
                   <p>{{supportInfo.longDetails}}</p>
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
        cardInfoDialog: false,
        cardInfo:{},
        supportInfo: {},
        auth: "Bearer " + localStorage.getItem("token"),
        SUPPORT_API: 'https://need-doctors-backend.herokuapp.com/support-tickets',
        cardList: [],
        supportList: [],
        items: [
            {
            text: 'a2sDMS',
            disabled: false,
            href: '/',
            },
            {
            text: 'Doctor Support',
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
    getCardReq(){
        axios({
            method:"get",
            url: this.SUPPORT_API+'?pageNo=0&pageSize=10',
            headers: {
            Authorization: this.auth,
            "Content-Type": "application/json"
            }
        })
        .then(r=>{
            if(r.data.statusCode==200){
                this.supportList=r.data.data.data
                console.log(this.supportList)
            }
        })
    },
    approveCard(id){
        axios({
            method: "put",
            url: this.CARD_REQ_API+"/approve/"+id,
            headers: {
            Authorization: this.auth,
            "Content-Type": "application/json"
            }
        })
        .then(r=>{
            if(r.data.statusCode==201){
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
        this.supportInfo = item
        this.cardInfoDialog = true;
    }
    },
    mounted(){
        this.getCardReq()
    }
}
</script>
