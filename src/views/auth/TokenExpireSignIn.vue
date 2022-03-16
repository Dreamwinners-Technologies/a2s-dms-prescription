<template>
       <v-card
          flat
          style="padding:2.5%;border:1px solid #d6d9db;margin: auto; !important"
          color="white"
          class="crd pb-6"
          width="400px"
          max-width="400"
          max-height="1000"
        >
          <v-progress-linear
            :active="dialog"
            :indeterminate="dialog"
            absolute
            top
            color="#3a8384"
          ></v-progress-linear>
<v-icon color="red lighten-1" size="3.5rem">mdi-alert-decagram</v-icon> 
             <div class="text-center font-weight-bold text-danger">Your session has expired. Please login again.</div>
          <div align="center">
            <br />
            <h3 v-if="!isOTPMode" class="my-4">Sign in</h3>
            <h4 v-if="isOTPMode" class="my-4">
              We just need the OTP send <br />
              to your number to verify you Identity
            </h4>
          </div>
          <v-form
            v-if="!isOTPMode"
            style="margin-top:20px"
            ref="form"
            lazy-validation
            class=""
          >
            <v-text-field
              dense
              v-model="phone"
              label="Phone"
              type="number"
              :rules="[rules.required, rules.min]"
              required
              outlined
              prepend-inner-icon="mdi-phone"
            ></v-text-field>
            <br />
            <v-row class="mt-0">
              <v-col style="text-align:center" class="pb-0 pt-0">
                <v-btn
                  color="#3f8485"
                  :disabled="dialog"
                  class="white--text"
                  @click="submit"
                  >Sign In</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
          <v-form
            v-if="isOTPMode"
            style="margin-top:20px"
            ref="formOTP"
            lazy-validation
            class=""
          >
            <v-text-field
              dense
              v-model="otp"
              label="OTP"
              type="number"
              :rules="[rules.required]"
              required
              outlined
              prepend-inner-icon="mdi-account-check"
            ></v-text-field>
            <v-row justify="center" class="mb-2" align="center">
              <v-col class="">
                Didn't get OTP?
              </v-col>
              <v-col>
                <v-btn
                  rounded=""
                  :disabled="countDown != 0"
                  color="black"
                  class="white--text float-right"
                  @click="OTPSend"
                >
                  Resend
                </v-btn>
                <span class="pt-1 d-inline-block" v-if="countDown != 0">
                  in {{ countDown }}s</span
                >
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
</template>
<script>
import axios from "axios";

import { setSpecialDataE } from "@/service/idb_service.js";
import { ABService } from "@/service/Generic_Service.js";
const API_URL = "https://api.a2sdms.com/";
const OTP_VERIFY_API = API_URL + "auth/verify/otp?";
const LOGIN_URL = API_URL + "auth/login";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      GS: null,
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
      snackbar: false,
      snackbarColor: "",
      snackbarText: "",
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
  watch: {},
  computed: {
    ...mapGetters(["userLoginResponse"])
  },
  methods: {
    submit() {
      let r = this.$refs.form.validate();
      if (r === true) {
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
      if (r === true) {
        let i = this;
        this.dialog = true;
        this.OTPSend();
      }
    },
    OTPSend() {
      axios
        .post(
          `${OTP_VERIFY_API}otp=${this.otp}&phoneNo=${this.userLoginResponse.phoneNo}`
        )
        .then(response => {
          if (response.status === 200) {
           const setData = setSpecialDataE("indexDbId", JSON.stringify(response.data));
           
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("IL", true);
            localStorage.setItem("uData", JSON.stringify(response.data));
          }
        })
        .catch(err => {
          if (err.response) {
            // client received an error response (5xx, 4xx)
            this.dialog = false;
            this.snackbar = true;
            this.snackbarColor = "error";
            this.snackbarText = err.response.data.message;
          } else if (err.request) {
            // client never received a response, or request never left
            this.snackbar = true;
            this.snackbarColor = "error";
            this.snackbarText = "Internet Disconnected!";
            this.dialog = false;
          } else {
            // anything else
          }
        });
    },
    login(data) {
      axios
        .post(LOGIN_URL, data)
        .then(response => {
          console.log(response);
          // localStorage.setItem('token', response.data.accessToken)
          let res = response.data;
          if (
            res.roles.includes("USER") &&
            !res.roles.includes("ADMIN") &&
              !res.roles.includes("SUPER_ADMIN") &&
              !res.roles.includes("MODERATOR")
          ) {
            this.dialog = false;
            this.snackbar = true;
            this.snackbarColor = "error";
            this.snackbarText = "User Account can't be used here!";
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
          if (err.response) {
            // client received an error response (5xx, 4xx)
            this.dialog = false;
            this.alert = true;
            this.snackbar = true;
            this.snackbarColor = "error";
            this.snackbarText = "Password or Email or Both didn't match!";
          } else if (err.request) {
            // client never received a response, or request never left
            this.alert = true;
            this.snackbar = true;
            this.snackbarColor = "error";
            this.snackbarText = "Internet Disconnected!";
            this.dialog = false;
          } else {
            // anything else
          }
        });
    },
    redirect() {
      this.$router.push("/cpanel/dashboard");
    },
    async saveUserInfo(data) {
      let as = new ABService();
      let r = await as.addEncryptedData("User", {
        id: 1,
        uData: JSON.stringify(data)
      });
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    }
  },
  mounted() {
console.log("workkkkkkk");
  }
};
</script>
<style>
.crd{
    overflow: hidden !important;
}
</style>