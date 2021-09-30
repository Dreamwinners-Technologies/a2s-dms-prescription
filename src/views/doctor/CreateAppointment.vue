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
                                   <v-icon large>mdi-timetable</v-icon> <h3 class="mt-1 ml-2">Appointment Pending</h3>   <v-spacer></v-spacer> <v-btn depressed @click="createAppDialog = true" color="info">Create Appointment</v-btn>
                               </v-row>
                               <v-row style="background-color:#f2f5f8;border-radius:8px;text-align:center">
                                   <v-col cols="4">
                                       <b>Name</b>
                                   </v-col>
                                   <v-col>
                                       <b>Age</b>
                                   </v-col>
                                   <v-col>
                                       <b>Phone Number</b>
                                   </v-col>
                                   <v-col>
                                       <b>Address</b>
                                   </v-col>
                                   <v-col>
                                       <b>Action</b>
                                   </v-col>
                               </v-row>
                               <v-row v-for="appointment in appointmentList" :key="appointment.lId" style="text-align:center;border-bottom: 1px solid #e7e7e7">
                                    <v-col class="ml-2" style="text-align:left" cols="4">

                                        <v-row>
                                            <v-col cols="3">
                                               <v-avatar
                                               class="ma-3 white--text"
                                                :color="getRandomColor()"
                                                size="42"
                                                ><h3>{{appointment.data.patientName.charAt(0)}}</h3></v-avatar>
                                            </v-col>
                                            <v-col>
                                                 <h4 class="mt-5">
                                                    {{appointment.data.patientName}}
                                                </h4>   
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col>
                                        <v-chip class="mt-3" small outlined color="teal">{{appointment.data.patientAge}}</v-chip>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                            {{appointment.data.patientPhoneNo}}
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                            {{appointment.data.patientAddress}}
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                                <v-btn color="info" depressed small><v-icon small>mdi-prescription</v-icon></v-btn>
                                        </v-card-subtitle>
                                    </v-col>
                               </v-row>
                           </v-card>
                       </v-col>
                   </v-row>   

    <!-- dialog here -->

    <v-dialog title="Add New Drug" v-model="createAppDialog" max-width="800px">
        <v-card class="pa-6">
            <h3>Create New Appointment</h3>
                <v-row class="rowise pt-5">
                    <v-col>
                        <v-text-field
                        v-model="appointment.patientName"
                        placeholder="Name"
                        class="mt-2 pa-0"
                        outlined
                        dense
                        label="Patient Name"
                        >
                        </v-text-field>
                        <v-text-field
                        v-model="appointment.patientAge"
                        placeholder="Age"
                        class="mt-2 pa-0"
                        outlined
                        dense
                        label="Patient Age"
                        >
                        </v-text-field>
                        <v-select
                        :items="genders"
                        label="Gender"
                        dense
                        outlined
                        ></v-select>
                         <v-text-field
                        v-model="appointment.patientPhoneNo"
                        placeholder="+880"
                        class="mt-2 pa-0"
                        outlined
                        dense
                        label="Phone Number"
                        >
                        </v-text-field>
                         <v-text-field
                        v-model="appointment.patientAddress"
                        placeholder="Address"
                        class="mt-2 pa-0"
                        outlined
                        dense
                        label="Patient Address"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <v-menu
                        ref="menu"
                        :return-value.sync="appointment.appointmentDate"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-combobox
                            v-model="appointment.appointmentDate"
                            label="Appointment Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-combobox>
                        </template>
                        <v-date-picker
                        v-model="appointment.appointmentDate"
                        no-title
                        >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="menu = false"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(appointment.appointmentDate)"
                        >
                            OK
                        </v-btn>
                        </v-date-picker>
                    </v-menu>
                        <v-select
                        :items="paymentMethods"
                        label="Payment Method"
                        dense
                        outlined
                        ></v-select>
                        <v-textarea
                        style="margin-top:0px !important"
                        name="input-7-1"
                        outlined
                        background-color="white"
                        auto-grow
                        placeholder="Write the problem note..."
                        v-model="appointment.patientProblem"
                        ></v-textarea>
                    </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="ma-0" style="text-align:right !important;">
                            <v-btn depressed @click="createAppointment" color="info"><v-icon class="mr-2">mdi-content-save</v-icon>Create</v-btn>
                        </v-col>
                    </v-row>
              </v-card>
    </v-dialog>
            
    </v-container>
</div>  
</template>

<script>
import { initJsStore } from "@/service/idb_service.js";
import { ABService } from "@/service/prescription_backups_service.js";
export default {
    async beforeCreate() {
    try {
      const isDbCreated = await initJsStore();
      if (isDbCreated) {
        console.log("db created");
      } else {
        console.log("db opened");
      }
    } catch (ex) {
      console.error(ex);
      alert(ex.message);
      Global.isIndexedDbSupported = false;
    }
  },
  data () {
    return {
        ABS: null,
        menu: false,
        createAppDialog: false,
        genders: ["Male","Female"],
        paymentMethods: ["Cash","Online"],
        appointment: {
                    id:"",
                    appointmentDate: "",
                    doctorId: "",
                    gender: "Male",
                    patientAddress: "",
                    patientAge: "",
                    patientName: "",
                    patientPhoneNo: "",
                    patientProblem: "",
                    paymentMethod: "Cash"
                },
        appointmentList: [],
        items: [
            {
            text: 'a2sDMS',
            disabled: false,
            href: '/',
            },
            {
            text: 'Create Appointment',
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
    async createAppointment(){
        console.log(this.appointment)
        let r = await this.ABS.addData("Appointment", {
            id: this.appointment.id,
            data: this.appointment
        });
        if(r) console.log(r);
        this.createAppDialog = false
    },
    async getAppointmentList(){
        let data = await this.ABS.getData("Appointment");
        console.log(data)
        this.appointmentList = data;
    }
  },
  mounted(){
       this.ABS = new ABService();
       this.getAppointmentList();
  }
}
</script>
