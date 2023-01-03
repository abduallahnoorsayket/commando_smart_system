<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrap"></div>
        </div>

        <div class="row">
          <div class="col-md-9 text-white">
            <div class="float-left">
              <h5><i class="metismenu-icon pe-7s-timer"></i> Dashboard</h5>
            </div>
            <div class="float-right">
              <button
                type="button"
                class="btn btn-successsN"
                style="font-size: 15px"
              >
                Refresh
              </button>
            </div>
          </div>
          <div class="col-md-3"></div>
        </div>
        <div class="row">
          <div class="col-md-9">
            <div class="main-card card safeCard">
              <div class="card-body">
                <h4>Your shop is in safe hands</h4>
                <p>Everything is looking fine.</p>
              </div>
            </div>
          </div>
          <div class="col-md-3"></div>
        </div>
        <!-- Time -->
        <div class="row mb-0">
          <!-- <div class="cl-md-6"></div> -->
          <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8">
            <notice-widget />
          </div>
          <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div class="float-right">
              <div class="timeContainer">
                <div class="clock" id="intro" style="text-align: center">
                  <h3>{{ currentTimestamp }}</h3>
                </div>
              </div>
              <div class="calenderContainer mb-4 mt-2">
                <DatePicker v-model="date" />
              </div>
            </div>

            <!-- <div class="calenderContainer float-right mb-4 mt-2">
              <DatePicker v-model="date" />
            </div> -->
          </div>
        </div>
        <!--Calendar-->
        <!-- <div class="row">
          <div class=" col-sm-12 col-md-8 col-lg-9 widgetMargin">
            <notice-widget/>
          </div>
          <div class="col-sm-12 col-md-4 col-lg-3">
            <div class="calenderContainer float-right mb-4">
              <DatePicker v-model="date" />
            </div>
          </div>
        </div> -->

        <!--Normal User Data Table-->
        <EmployeeAttendanceEntry
          v-if="
            hasPermission('view_attendancerecord') && attendance_list_render
          "
        />
        <div>
          <AttendanceEntry v-if="attendance_list_render" />
        </div>
      </div>
    </template>
  </Master>
</template>

<script>
import Master from "../components/layouts/Master";
import AttendanceEntry from "../components/AttendanceModule/AttendanceRecords/AttendanceEntry";
import EmployeeAttendanceEntry from "../components/AttendanceModule/AttendanceRecords/EmployeeAttendanceRecords";

import NoticeWidget from "../components/Dashboard/NoticeWidget.vue";

import axios from "axios";
import Swal from "sweetalert2";
import permissions from "../authorization/permissions";
import { DatePicker } from "v-calendar";

export default {
  name: "Dashboard",
  components: {
    Master,
    AttendanceEntry,
    EmployeeAttendanceEntry,
    NoticeWidget,
    DatePicker,
  },
  data() {
    return {
      section_name: null,

      login: null,
      break_in: null,
      break_out: null,
      logout: null,

      attendance_entry: null,
      today_attendance_record: null,

      attendance_list_render: true,
      dashboard_render: true,
      timestamp: null,
      currentTimestamp: null,
      date: new Date(),
      // voice module data
      voice_event_data: null,
      updated_section_name: null,
      voice_config_data: null,
      voice_text: null,
      voice_accent_index: null,
      voice_volume: null,
      voice_rate: null,
      // by synth
      synth: window.speechSynthesis,
      voiceList: [],
      // selectedVoice: null,
      greetingSpeech: new window.SpeechSynthesisUtterance(),
      is_voice_on: null,
    };
  },
  computed: {},
  created() {},
  methods: {
    // is_superuser() {
    //   return permission.is_superuser();
    // },
    GetLanguageFromStore(lang_data) {
      console.log("526 get lang");
      this.$store.dispatch("get_lang_details", { langData: lang_data });
    },
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
    // Login At
    async submitAttendanceEntry(section_name) {
      this.attendance_list_render = false;
      const response = await axios
        .post("attendance-entry/", {
          section_name: section_name,
        })
        .then((response) => {
          this.GetTodayAttendanceRecord();
          this.is_voice_on = localStorage.getItem("is_on");
          if (this.is_voice_on == "true") {
            this.VoiceEventLoad(section_name);
          }
          //  else {
          //   alert("voice off");
          // }
          // this.VoiceEventLoad(section_name);
          Swal.fire({
            icon: "success",
            // text: "You have successfully in" + {{ this.today_attendance_record}},
          }).then((result) => {
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          console.log("--++", error.response);
        });
      console.log(response);
      this.attendance_list_render = true;
      // voice
    },
    async VoiceEventLoad(section_name) {
      if (section_name == "breakin") {
        this.updated_section_name = "break-in";
      } else if (section_name == "breakout") {
        this.updated_section_name = "break-out";
      } else {
        this.updated_section_name = section_name;
      }
      this.voice_event_data = null;
      await axios
        .get("voice-data/" + this.updated_section_name + "/")
        .then((response) => {
          this.voice_event_data = response.data;
          if (localStorage.getItem("voice_mode") == "CO") {
            this.voice_text = this.voice_event_data.corporate_mode;
          } else if (localStorage.getItem("voice_mode") == "FO") {
            this.voice_text = this.voice_event_data.formal_mode;
          } else if (localStorage.getItem("voice_mode") == "FR") {
            this.voice_text = this.voice_event_data.friendly_mode;
          }
        });
      console.log("453", this.voice_text);
      // voice listening part
      this.voice_accent_index = localStorage.getItem("accent");
      this.voice_volume = localStorage.getItem("volume");
      this.voice_rate = localStorage.getItem("speed");
      // var msg = new SpeechSynthesisUtterance();
      // var voices = window.speechSynthesis.getVoices();
      this.voiceList = this.synth.getVoices();
      this.greetingSpeech.voice = this.voiceList[this.voice_accent_index];
      this.greetingSpeech.volume = this.voice_volume; // From 0 to 1
      this.greetingSpeech.rate = this.voice_rate; // From 0.1 to 10
      this.greetingSpeech.text = this.voice_text;
      if (localStorage.getItem("is_male") == "true") {
        this.greetingSpeech.pitch = 0.55;
      } else if (localStorage.getItem("is_male") == "false") {
        this.greetingSpeech.pitch = 1.6;
      }
      // msg.pitch = 1.5; // From 0 to 2
      // msg.volume = 1;
      // msg.rate = 1

      // speechSynthesis.speak(msg);
      this.synth.speak(this.greetingSpeech);
    },
    GetTodayAttendanceRecord: function () {
      // this.dashboard_render = false;
      axios.get("todays-attendance-record/").then((response) => {
        this.today_attendance_record = response.data;
        this.login = response.data.login_time;
        this.break_in = response.data.breakin_time;
        this.break_out = response.data.breakout_time;
        this.logout = response.data.logout_time;
        console.log(response.status);
      });
      // this.dashboard_render = true;
    },
    // for time clock
    currentTime() {
      var date = new Date(); /* creating object of Date class */
      var hour = date.getHours();
      var min = date.getMinutes();
      var sec = date.getSeconds();
      var midday = "AM";
      midday = hour >= 12 ? "PM" : "AM"; /* assigning AM/PM */
      hour =
        hour == 0
          ? 12
          : hour > 12
          ? hour - 12
          : hour; /* assigning hour in 12-hour format */
      hour = this.updateTime(hour);
      min = this.updateTime(min);
      sec = this.updateTime(sec);
      let time = hour + ":" + min + ":" + sec + " " + midday;
      this.currentTimestamp = time;
    },
    updateTime(k) {
      /* appending 0 before time elements if less than 10 */
      if (k < 10) {
        return "0" + k;
      } else {
        return k;
      }
    },

    getNow: function () {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      this.timestamp = dateTime;
    },
  },
};
</script>

<style scoped>
/* @import "../main.css"; */

.card {
  border-left: none;
}
.glow-on-hover {
  width: 220px;
  height: 55px;
  border: none;
  outline: none;
  color: #fff;
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  font-size: 18px;
  border-radius: 10px;

  /* border: 1px solid rgba(69, 176, 226, 0.5) !important;
  background-color: rgba(69, 176, 226, 0.25) !important;
  color: #45b0e2 !important; */
}

.glow-on-hover:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.glow-on-hover:active {
  /* color: #000; */
  color: #45b0e2 !important;
}

.glow-on-hover:active:after {
  background: transparent;
}

.glow-on-hover:hover:before {
  opacity: 1;
}

.glow-on-hover:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  /* background: black; */
  background: #45b0e2 !important;

  left: 0;
  top: 0;
  border-radius: 10px;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.user-name {
  color: #00c6ff;
  text-decoration: none;
}
.widget-content .widget-content-left .widget-heading {
  opacity: 1;
  font-weight: bold;
  margin-top: 3px;
  text-transform: uppercase;
  /* font-size: 16px; */
  font-size: 14px;
}
.widget-content .widget-content-wrapper {
  display: contents;
  flex: 1;
  position: relative;
  align-items: center;
  /* cursor: pointer; */
  /* display: grid; */
  /* display: flex; */
}

.widget-content {
  /* padding: 1rem; */
  padding: 1.8rem 0.5rem;
  flex-direction: row;
  align-items: center;
  /* cursor: pointer; */
}
.widget-content .widget-numbers {
  /* font-weight: bold; */
  font-size: 1.2rem;
  display: block;
  line-height: 0.1;
}

.DashboardButton {
  margin-top: 10px;
}
.fa-sun:before {
  content: "\f185";
  font-size: 25px;
}
.fa-utensils:before {
  content: "\f2e7";
  font-size: 25px;
}
.fa-battery-full:before {
  content: "\f240";
  font-size: 25px;
}
.fa-smile:before {
  content: "\f118";
  font-size: 25px;
}
@font-face {
  font-family: "digital-clock-font";
  src: url("../assets/fonts/digital/digital-7.ttf");
}

/* for time */
.timeContainer {
  /* background: black; */
  background: #a3a4a5;
  padding: 8px;
  margin-bottom: 18px;
  text-align: center;
  width: 250px;
}
@import url("https://fonts.googleapis.com/css?family=Orbitron");

.clock {
  /* background-color: #fff; */
  background-color: #121212;
  /* color: #222d32; */
  padding: 10px 15px;
  font-size: 10px;
  border-radius: 3px;
  /* font-family: "Orbitron", sans-serif; */
  display: inline-block;
  width: 100%;
  font-family: digital-clock-font;
  color: #66ff99;
  font-size: 12px;
  text-align: center;
}

/* for calender */
.CalenderContainer {
  background: #a3a4a5;
  padding: 8px;
  margin-bottom: 36px;
  text-align: center;
}

.cardCursorPointer {
  cursor: pointer;
}
.Disabled {
  pointer-events: none;
  cursor: not-allowed;
  opacity: 0.72;
  filter: alpha(opacity=65);
  -webkit-box-shadow: none;
  box-shadow: none;
}
/* disable card button */
/* input[type=button]:disabled {
  background: black;
} */
/* ===================================== Responsive Style CSS ==================================== */
/* for medium device */
/* @media only screen and  (min-width: 767px) and (max-width: 991px)
 {
.fa-battery-full:before {
    content: "\f240";
    font-size: 20px;
}
.widget-content .widget-content-left .widget-heading{
  font-size: 10px;
}
 .widget-content .widget-numbers{
   font-size: 14px;
 }

} */
.btn-successsN {
  background: #00abb3;
  color: white;
  border-radius: 20px;
}
.safeCard {
  background: #00abb3;
  color: white;
  padding: 1.8rem 1.5rem;
}
</style>
