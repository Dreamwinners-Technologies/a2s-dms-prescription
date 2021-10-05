<template>
  <v-container class="full-height" fluid>
    <div style="padding-top:25px; position: fixed;z-index:1;right:20px">
      <v-alert v-if="successMsg" color="#4BCA81" text type="success">
        {{ apiResponse }}
      </v-alert>

      <v-alert v-if="errorMsg" text color="#E4515D" type="error">
        {{ apiResponse }}
      </v-alert>
    </div>
    <v-row
      style="padding-top:8%;vertical-align: middle; !important"
      align="center"
      justify="center"
    >
      <v-col class="d-flex justify-center align-center">
        <v-card
          flat
          style="padding:2.5%;border:1px solid #d6d9db;margin: auto; !important"
          color="white"
          width="400"
          max-height="1000"
        >
          <v-progress-linear
            :active="dialog"
            :indeterminate="dialog"
            absolute
            top
            color="#AD74B8"
          ></v-progress-linear>
          <div align="center">
            <v-img
              max-width="200"
              min-width="170"
              height="80"
              src="@/assets/hero-logo.png"
            ></v-img>
            <br />
            <h3 v-if="!isOTPMode" class="my-4">Sign in</h3>
             <h3 v-if="isOTPMode" class="my-4">We just need the OTP send <br> to you number to verify</h3>
          </div>
          <v-form v-if="!isOTPMode" style="margin-top:20px" ref="form" lazy-validation class="">
            <v-text-field
              dense
              v-model="phone"
              label="Phone"
              type="number"
              :rules="[rules.required, rules.min]"
              required
              outlined
            ></v-text-field>
            <br />
            <v-row class="mt-0">
              <v-col style="text-align:center" class="pb-0 pt-0">
                <v-btn color="#3f8485" class="white--text" @click="submit"
                  >Sign In</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
           <v-form v-if="isOTPMode" style="margin-top:20px" ref="formOTP" lazy-validation class="">
            <v-text-field
              dense
              v-model="otp"
              label="OTP"
              type="number"
              :rules="[rules.required]"
              required
              outlined
            ></v-text-field>
            <v-row class="mb-2" align="center">
              <v-col class="">
                Didn't get OTP? 
              </v-col> <v-col>
                <v-btn rounded="" :disabled="countDown != 0" color="black" class="white--text float-right"
                  > Resend </v-btn> <span v-if="countDown != 0"> in {{countDown }}s</span>
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col style="text-align:center" class="pb-0 pt-0">
                <v-btn color="#3f8485" class="white--text" @click="submitOtp"
                  >Submit</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-footer fixed>
      <p style="text-align:center;margin:auto; !important">
        Copyright © a2sdms | 2021 - {{ year }}
      </p>
    </v-footer>
  </v-container>
</template>

<script>
import axios from "axios";
const API_URL =
  "http://need-doctors-backend.southeastasia.cloudapp.azure.com:8100/";
const LOGIN_URL = API_URL + "auth/login/";
const OTP_VERIFY_API = API_URL + "auth/verify/otp?";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      phone: "",
      otp: "",
      isOTPMode: false,
      showPassword: false,
      year: new Date().getFullYear(),
      OTPResendTimeLeft: 0,
      countDown: 0,
      OTPBtnText: "",
      dialog: false,
      apiResponse: null,
      alert: false,
      successMsg: false,
      errorMsg: false,
      response: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 11 || "Min 11 characters",
        emailMatch: () => "The email and password you entered don't match",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },
  watch: {
  },
  computed: {
    ...mapGetters(["userLoginResponse"]),

  },
  methods: {
    submit() {
      let r = this.$refs.form.validate();
      if (r == true) {
        let i = this;
        this.dialog = true;
        let signInData = {
          phone: this.phone
        };
        i.response = this.login(signInData);
      }
    },
      submitOtp() {
      let r = this.$refs.formOTP.validate();
      if (r == true) {
        let i = this;
        this.dialog = true;
        this.OTPSend();
      }
    },
     OTPSend() {
      axios
        .post(`${OTP_VERIFY_API}otp=${this.otp}&phoneNo=${this.userLoginResponse.phoneNo}`)
        .then(response => {
          console.log(response);
          if(response.status == 200){
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('uData', JSON.stringify(response.data));
                            // Redirect to a specified route
          this.$router.push("/");
          }
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    login(data) {
      axios
        .post(LOGIN_URL, data)
        .then(response => {
          console.log(response);
          // localStorage.setItem('token', response.data.accessToken)
          let res = response.data;
          if (false) {
            
          } else {
            this.$store.commit("setUserLoginResponse", res);
            this.isOTPMode = true;
            this.countDown = 60;
            this.countDownTimer();
            this.dialog = false;
          }
          // this.user.authenticated = true
          console.log(response);
          return;
          // Redirect to a specified route
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err.response);
          if (err.response.status === 401) {
            // client received an error response (5xx, 4xx)
            this.apiResponse = "Password or Email or Both didn't match!";
            this.dialog = false;
            this.alert = true;
            this.successMsg = false;
            this.errorMsg = true;
          } else if (err.request) {
            // client never received a response, or request never left
          } else {
            // anything else
          }
        });
    },
    redirect() {
      this.$router.push("/cpanel/dashboard");
    },
    OtpTimer(){
      this.OTPBtnText = "";
      var timeleft = 60;
      let ins = this;
    var downloadTimer = setInterval(function(){
    timeleft--;  
    ins.OTPResendTimeLeft = timeleft;
    ins.OTPBtnText = `in ${timeleft} s`;
     console.log(ins.OTPBtnText)
    if(timeleft <= 0)
        clearInterval(downloadTimer);
         ins.OTPBtnText = ``;
    },1000);
    },
    countDownTimer() {
                if(this.countDown > 0) {
                    setTimeout(() => {
                        this.countDown -= 1
                        this.countDownTimer()
                    }, 1000)
                }
            }
  },
  mounted() {
    if(localStorage.token!= undefined){
      this.$router.push("/");
    }
  }
  //   watch: {
  //     response (val) {
  //       console.log("logging" + val);
  //         let i = this;
  //        if(val!=false){
  //     this.dialog = false;
  //   setTimeout(() => {
  //           window.location.href = "http://localhost:8080/#/";
  //       }, 4000)
  //  }
  //     },
  //   }
};
</script>

<style scoped>
.full-height {
  background-color: #f2f5f8;
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
.theme--light.v-messages {
  color: #e4515d;
}
</style>
