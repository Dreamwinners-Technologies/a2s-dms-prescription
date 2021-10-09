<template>
<v-app> 
    <v-main>
    <div class="body">
        <v-container>
        <div class="print-container" >
        <v-row class="my-0">
            <v-col>
                <h2 style="color:#479EF4">Dr Mojibur Rahman</h2>
                MBBS <br>
                Dhaka Medical College <br>
                Room No 508,Trusted Care Hostpital <br>
                Narsingdi sadar <br>
                Phone: 01734543027 <br>
            </v-col>
            <v-spacer>
            </v-spacer>
            <v-col style="text-align:right !important">
                 <h2 style="color:#479EF4">ডাঃ মোঃ মজিবুর রহমান
                 </h2>
                এম বি বি এস <br>
                ঢাকা মেডিকেল কলেজ <br>
                চেম্বারঃ ৫০৮,  ট্রাস্টেড কেয়ার হাসপাতাল <br>
                নরসিংদী সদর, নরসিংদী <br>
                ফোনঃ ০১৭৩৪৫৪৩০২৭
                
            </v-col>
        </v-row>
        <hr>
        <v-row class="my-0" style="text-align:center">
            <v-col>
                Patient ID: #P1234
            </v-col>
            <v-col>
                Name: {{appointment.data.patientName}}
            </v-col>
            <v-col>
                Age: {{appointment.data.patientAge}} Years Old
            </v-col>
            <v-col>
                Date: {{new Date().toLocaleDateString()}}
            </v-col>
        </v-row>
        <hr>
        <v-row class="ma-0" style="height:1120px">
            <v-col cols="4" style="border-right: 1px solid #f0f0f0 !important;">
                <v-row>
                    <v-col>
                    <b>Cheif Complaints :</b><br><br>
                    <ul class="px-4" style="list-style-type:none">
                        <li v-for="item in appointment.data.prescription.chiefComplaints" :key="item">
                            {{item}}
                        </li>
                    </ul>
                    </v-col>
                </v-row>
                 <v-row>
                    <v-col>
                    <b>On Examination :</b><br><br>
                    <ul class="px-4" style="list-style-type:none">
                        <li>Pulse: {{appointment.data.prescription.pulse}} mg</li>
                        <li>BP: {{appointment.data.prescription.bloodPressure}} mmHg</li>
                        <li>Temp: {{appointment.data.prescription.temperature}} Degree F</li>
                        <li v-for="item in appointment.data.prescription.onExamination" :key="item">
                            {{item}}
                        </li>
                    </ul>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                    <b>Diagnosis :</b><br><br>
                    <ul class="px-4" style="list-style-type:none">
                        <li v-for="item in appointment.data.prescription.diagnosis" :key="item">
                            {{item}}
                        </li>
                    </ul>
                    </v-col>
                </v-row>
                 <v-row>
                    <v-col>
                    <b>Investigation Advice :</b><br><br>
                    <ul class="px-4" style="list-style-type:none">
                        <li v-for="item in appointment.data.prescription.investigationAdvice" :key="item">
                            {{item}}
                        </li>
                    </ul>
                    </v-col>
                </v-row>
            </v-col>
            <v-divider
            class="mx-0"
            vertical
            ></v-divider>
            <v-col cols="7">
                    <v-row>
                        <v-col>
                            <v-icon large>mdi-prescription</v-icon>
                            <br>
                        </v-col>
                    </v-row>
                    <v-row class="my-0" v-for="item in appointment.data.prescription.medicines" :key="item">
                        <v-col class="mx-4">
                            <b style="font-size: 15px !important;">{{item.brand}}</b><br>
                            {{item.dose}} --- {{item.instruction}} --- {{item.duration}} <br>
                            Note: {{item.note}}
                        </v-col>
                    </v-row>
                    <br>
                    <div>
                        <v-row>
                            <v-col class="mx-2 mt-4">
                                <b>Given Advice: </b><p style="margin:0px;display:block" v-for="item in appointment.data.prescription.advice" :key="item"> {{item}} </p>
                            </v-col>
                        </v-row>
                    </div>
            </v-col>
        </v-row>
        <v-footer>
            <v-row class="pt-2" style="border-top: 1px solid #F0F0F0 !important;background-color:#F7F7F7 !important;">
            <v-col>
                Made By <br>
                A2S DMS Prescription
            </v-col>
            <v-spacer>
            </v-spacer>
            <v-col style="text-align:right !important">
                 https://prescription.a2sdms.com
            </v-col>
        </v-row>
        </v-footer>
        </div>
        <br>
        <br>
        <v-footer style="border: 1px solid #f7f7f7" class="py-2" fixed>
            <v-row>
                <v-col class="mx-auto" style="text-align:center !important;">
                    <v-btn depressed color="error" class="mr-2" @click="window.close()"><v-icon class="mr-2">mdi-close</v-icon>Close</v-btn>
                    <v-btn depressed color="info" @click="print()"><v-icon class="mr-2">mdi-printer</v-icon>Print Now</v-btn>
                </v-col>
            </v-row>
        </v-footer>
    </v-container>
    </div>
    </v-main>
</v-app>
</template>

<script>
import axios from 'axios';
import { initJsStore } from "@/service/idb_service.js";
import { ABService } from "@/service/prescription_backups_service.js";
export default {
    data(){
        return {
            ABS: null,
            selectedAppointment:"",
            windowSize: {
                x: 500,
                y: 200,
            },
            appointment: {
                data: {
                    appointmentDate: "",
                    createdAt: 0,
                    createdBy: "",
                    doctorsFee: 0,
                    gender: "Male",
                    id: "",
                    isCompleted: false,
                    isExpired: false,
                    isPaid: false,
                    otherFees: 0,
                    patientAddress: "",
                    patientAge: "",
                    patientName: "",
                    patientPhoneNo: "",
                    patientProblem: "",
                    paymentMethod: "Cash",
                    prescription: {
                        advice: [],
                        bloodPressure: 0,
                        chiefComplaints: [],
                        diagnosis: [],
                        id: "",
                        investigationAdvice: [],
                        medicines: [],
                        onExamination: [],
                        pulse: 0,
                        temperature: 0
                    },
                    totalFee: 0,
                    updatedAt: 0,
                    updatedBy: ""
                }
            },
            // prescription:{
            //     id:"",
            //     chiefComplaints: ["Fever for 3 days","Runing nose"],
            //     diagnosis: ["","",""],
            //     investigationAdvice: ["CBC with ESR","Plain X-Ray og chest : AP"],
            //     onExamination: ["","",""],    
            //     advice:["খাবার পরে খাবেন","খাবার পরে খাবেন"],
            //     pulse: "88",
            //     temperature: "102",
            //     bloodPressure: "120/80",
            //     medicines: [
            //         {
            //             id:"1",
            //             brand: 'Ace | Paracetamol | 500mg',
            //             dose: '১+০+১',
            //             instruction: 'খাবার পরে খাবেন',
            //             duration: '৭ দিন',
            //             note: ''
            //         },
            //         {
            //             id:"2",
            //             brand: 'Napa Extra | Paracetamol | 200mg',
            //             dose: '১+০+১',
            //             instruction: 'খাবার পরে খাবেন',
            //             duration: '১৫ দিন',
            //             note: ' -'
            //         },
            //         {
            //             id:"1",
            //             brand: 'Ace | Paracetamol | 500mg',
            //             dose: '১+০+১',
            //             instruction: 'খাবার পরে খাবেন',
            //             duration: '৭ দিন',
            //             note: ''
            //         },
            //         {
            //             id:"2",
            //             brand: 'Napa Extra | Paracetamol | 200mg',
            //             dose: '১+০+১',
            //             instruction: 'খাবার পরে খাবেন',
            //             duration: '১৫ দিন',
            //             note: ' -'
            //         },
            //     ],
            //     patient: {
            //         id: "",
            //         name: "",
            //         age: "",
            //         address: "",
            //     }
            // }
        }
    },
    methods: {
        print(){
            window.print()
        },
        async getAppointmentData(){
            let id = this.selectedAppointment
            console.log(id)
            if(id!=null){
                console.log("-----------------------------------")
                let r = await this.ABS.getDataById("Appointment",id);
                console.log("-----------------------------------")
                this.appointment = r[0]
                console.log(r)
            }
        },
    },
    mounted(){
        this.selectedAppointment = this.$route.params.id;
        this.ABS = new ABService();
        this.getAppointmentData();
    }
}
</script>

<style scoped>
html{
    margin:0 !important;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol" !important;
    font-size:1rem !important;
    font-weight:400 !important;
    line-height:1.5 !important;
    color:#212529 !important;
    text-align:left !important;
    background-color:rgba(255, 255, 255, 0.269) !important;
}
.container {
    width: 100%;
    padding: 20px;
    margin-right: auto;
    margin-left: auto;
    border: 1px dashed #8c8c8c;
}
.full-height {
  background-color:#f2f5f8;
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
.theme--light.v-messages {
  color: #E4515D;
}
@media print {
    .body , .container {
        visibility: hidden !important;
    }
    .print-container {
        visibility: visible;
    }
    @page {
        size: A3;
    }
}
</style>