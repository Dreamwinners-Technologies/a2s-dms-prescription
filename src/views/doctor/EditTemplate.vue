<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      top
      color="success"
      centered
      timeout="1000"
    >
     Template has been saved!
    </v-snackbar>
    <v-dialog title="Add New Drug" v-model="prescriptionPriview" max-width="980px">
        <v-card class="pa-5">
            <h3>Preview</h3>
        <div id="prescription">
        <v-container>
 <v-row class="my-0">
        <v-col>
          <span class="preview" style="text-align: left !important;" v-html="leftHeader"></span>
        </v-col>
        <v-spacer> </v-spacer>
        <v-col style="text-align:right !important">
          <span
          class="preview"
            style="text-align: right !important;"
            v-html="rightHeader"
          ></span>
        </v-col>
      </v-row>
    </v-container>
        </div>
        </v-card>
    </v-dialog>
      <!--  -->
    <div class="pa-4 wd">
      <v-row>
        <v-col cols="6">
          <h2>Left Header</h2>
          <v-card rounded="0" elevation="0" color="#f2f5f8">
            <quill-editor v-model="leftHeader" :options="editorOption" />
            <!--  @change="onEditorChange($event)" -->
          </v-card>
        </v-col>
        <v-col cols="6">
          <h2>Right Header</h2>
          <v-card rounded="0" elevation="0" color="#f2f5f8">
            <quill-editor v-model="rightHeader" :options="editorOption" />
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-row>
       <v-col><h2 class="text-center">Preview</h2></v-col>
   </v-row> -->
    </div>
    <div class="text-center pa-4">
                <v-row style="text-align:center !important;">
            <v-col>
              <v-btn-toggle
                v-model="icon"
                borderless
                class="pa-2"
                style="border:2px solid #479EF4"
              >
                <v-btn value="left" @click="prescriptionPriview=true">
                  <span class="hidden-sm-and-down">Preview</span>

                  <v-icon right>
                    mdi-eye-outline
                  </v-icon>
                </v-btn>

                <v-btn  @click="savePrescriptionTemplateHeader" value="center">
                  <span class="hidden-sm-and-down">Save</span>

                  <v-icon right>
                    mdi-content-save-outline
                  </v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
    </div>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import 'quill/dist/quill.bubble.css'

import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
        prescriptionPriview: false,
        icon: "",
        snackbar: false,
      leftHeader: "",
      rightHeader: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ header: 1 }, { header: 2 }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"]
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      }
    };
  },
  methods: {
      savePrescriptionTemplateHeader(){
          this.snackbar = true;
          localStorage.setItem("leftHeader", this.leftHeader);
          localStorage.setItem("rightHeader", this.rightHeader);
      }
  },
  mounted(){
      this.leftHeader = localStorage.getItem("leftHeader");
      this.rightHeader = localStorage.getItem("rightHeader");
  }
};
</script>
<style>
.wd {
  height: 280px;
}
.ql-container{
    max-height: 160px;
}
.ql-editor{
 max-height: 140px;
}
.preview p{
    margin-bottom: 0px;
}
</style>
