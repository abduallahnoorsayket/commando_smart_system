<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner" id="axiosForm">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa fa-cog icon-gradient bg-tempting-azure"></i>
              </div>
              Voice Customization
            </div>
          </div>
        </div>
        <div class="loader" v-if="loading"></div>
        <!-- v-if="permissions" -->
        <!-- -->
        <div class="main-card card" v-if="form_data">
          <div class="card-body">
            <form @submit.prevent="submitVoiceCustomization" autocomplete="off">
              <div class="form-group row mt-4">
                <label class="col-md-12 col-lg-2 col-form-label"
                  >Voice Accent preference
                  <span class="asterisk">*</span></label
                >
                <div class="col-md-12 col-lg-4">
                  <select
                    name="select"
                    id="month"
                    v-model="accent"
                    class="form-control"
                  >
                    <!-- <option value disabled>
                      {{
                        $store.getters.GET_SELECT +
                        " " +
                        $store.getters.GET_LANGUAGE +
                        " " +
                        $store.getters.GET_CODE
                      }}
                    </option> -->
                    <option
                      v-for="(voice, index) in voiceList"
                      :key="index"
                      :value="index"
                    >
                      {{ voice.name }} ({{ voice.lang }})
                    </option>
                  </select>
                  <!-- <div
                    :class="{
                      'invalid-feedback':
                        error_add_holiday && error_add_holiday.type,
                    }"
                    v-if="error_add_holiday && error_add_holiday.type"
                  >
                    {{ error_add_holiday.type[0] }}
                  </div> -->
                </div>
                <label class="col-md-12 col-lg-2 col-form-label"
                  >Voice Type <span class="asterisk">*</span></label
                >
                <div class="col-md-12 col-lg-4">
                  <p class="mt-2 ml-2">
                    <span class="mr-3">
                      <input
                        type="radio"
                        id="test1"
                        name="radio-group"
                        v-model="is_male"
                        value="true"
                        class="form-control"
                      />
                      <!-- :class="{'is-invalid':sprint_error && sprint_error.is_current}"
                            <span
                            :class="{'invalid-feedback':sprint_error && sprint_error.is_current}"
                            v-if="sprint_error && sprint_error.is_current"
                          >{{sprint_error.is_current[0] }}</span>-->
                      <label for="test1">Male</label>
                    </span>
                    <input
                      type="radio"
                      id="test2"
                      name="radio-group"
                      v-model="is_male"
                      value="false"
                      class="form-control"
                    />
                    <!--:class="{'is-invalid':sprint_error && sprint_error.is_current}"
                           <span
                          :class="{'invalid-feedback':sprint_error && sprint_error.is_current}"
                          v-if="sprint_error && sprint_error.is_current"
                        >{{sprint_error.is_current[0] }}</span>-->
                    <label for="test2">Female</label>
                  </p>
                </div>
              </div>
              <!--  new permission ui -->
              <div class="form-group row mt-3">
                <label class="col-md-12 col-lg-2 col-form-label"
                  >Voice Mode preference <span class="asterisk">*</span></label
                >
                <div class="col-md-12 col-lg-8">
                  <p class="mt-2 ml-0">
                    <span class="mr-3">
                      <input
                        type="radio"
                        id="test3"
                        name="radio-group-mode"
                        v-model="voice_mode"
                        value="FR"
                        class="form-control"
                      />
                      <!-- :class="{'is-invalid':sprint_error && sprint_error.is_current}"
                            <span
                            :class="{'invalid-feedback':sprint_error && sprint_error.is_current}"
                            v-if="sprint_error && sprint_error.is_current"
                          >{{sprint_error.is_current[0] }}</span>-->
                      <label for="test3">Friendly </label>
                    </span>
                    <span class="mr-3">
                      <input
                        type="radio"
                        id="test4"
                        name="radio-group-mode"
                        v-model="voice_mode"
                        value="FO"
                        class="form-control"
                      />
                      <!-- :class="{'is-invalid':sprint_error && sprint_error.is_current}"
                            <span
                            :class="{'invalid-feedback':sprint_error && sprint_error.is_current}"
                            v-if="sprint_error && sprint_error.is_current"
                          >{{sprint_error.is_current[0] }}</span>-->
                      <label for="test4">Formal</label>
                    </span>

                    <!--:class="{'is-invalid':sprint_error && sprint_error.is_current}"
                           <span
                          :class="{'invalid-feedback':sprint_error && sprint_error.is_current}"
                          v-if="sprint_error && sprint_error.is_current"
                        >{{sprint_error.is_current[0] }}</span>-->

                    <input
                      type="radio"
                      id="test5"
                      name="radio-group-mode"
                      v-model="voice_mode"
                      value="CO"
                      class="form-control"
                    />
                    <!--:class="{'is-invalid':sprint_error && sprint_error.is_current}"
                           <span
                          :class="{'invalid-feedback':sprint_error && sprint_error.is_current}"
                          v-if="sprint_error && sprint_error.is_current"
                        >{{sprint_error.is_current[0] }}</span>-->
                    <label for="test5">Corporate</label>
                  </p>
                </div>
              </div>
              <div class="form-group row mt-3">
                <label class="col-md-12 col-lg-2 col-form-label"
                  >Voice Volume <span class="asterisk">*</span></label
                >
                <div class="col-md-12 col-lg-4">
                  <input
                    id="volumeInput"
                    type="range"
                    v-model="volume"
                    min="0"
                    max="1"
                    step="0.01"
                    @input="ChangeVolumeTrack"
                    :style="{
                      'background-size': computed_volume * 100 + '% 100%',
                    }"
                  />
                  <!-- oninput="rangevalue.value = value" -->
                  <!-- oninput="this.nextElementSibling.value = this.value" -->
                  <!-- :class="{ 'is-invalid': SubTask_error_data && SubTask_error_data.progress }"
                      <div
                      :class="{ 'invalid-feedback': SubTask_error_data && SubTask_error_data.progress }"
                      v-if="SubTask_error_data && SubTask_error_data.progress"
                    >{{ SubTask_error_data.progress[0] }}</div>-->

                  <output class="float-right mt-2">{{ volume }}</output>
                  <!-- <div
                    v-if="SubTask_error_data && SubTask_error_data.progress"
                    class="alert alert-danger mt-4"
                    role="alert"
                  >
                    <strong>No progress given</strong>
                  </div> -->
                </div>
                <label class="col-md-12 col-lg-2 col-form-label"
                  >Voice Rate <span class="asterisk">*</span></label
                >
                <div class="col-md-12 col-lg-4">
                  <input
                    id="rateInput"
                    type="range"
                    v-model="speed"
                    min="0"
                    max="1"
                    step="0.01"
                    @input="ChangeRateTrack"
                    :style="{
                      'background-size': computed_speed * 100 + '% 100%',
                    }"
                  />
                  <!--  oninput="this.nextElementSibling.value = this.value" -->
                  <!-- :class="{ 'is-invalid': SubTask_error_data && SubTask_error_data.progress }"
                      <div
                      :class="{ 'invalid-feedback': SubTask_error_data && SubTask_error_data.progress }"
                      v-if="SubTask_error_data && SubTask_error_data.progress"
                    >{{ SubTask_error_data.progress[0] }}</div>-->

                  <output class="float-right mt-2">{{ speed }}</output>
                  <!-- <div
                    v-if="SubTask_error_data && SubTask_error_data.progress"
                    class="alert alert-danger mt-4"
                    role="alert"
                  >
                    <strong>No progress given</strong>
                  </div> -->
                </div>
              </div>
              <div class="form-group row mt-4">
                <label class="col-md-12 col-lg-2 col-form-label"
                  >Voice ON/OFF
                </label>
                <div class="col-md-12 col-lg-10">
                  <label class="switch">
                    <input type="checkbox" v-model="is_on" />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
              <div class="form-group">
                <button
                  @submit.prevent="submitVoiceCustomization"
                  class="mt-2 btn btn-successs btn-lg float-right"
                >
                  {{ $store.getters.GET_SUBMIT }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </template>
  </Master>
</template>

<script>
import Master from "../layouts/Master";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "VoiceCustomization",
  components: { Master },
  data() {
    return {
      loading: false,
      name: null,
      selectedPermissions: [],
      permissions: null,
      all_permission: null,
      searchQuery: null,
      // new props
      // module_list:[],
      // model_list:[],

      group_error_data: {
        name: null,
      },
      // voice set up data
      form_data: null,
      synth: window.speechSynthesis,
      voiceList: [],
      accent: null,
      is_male: null,
      voice_mode: null,
      volume: null,
      speed: null,
      is_on: true,
    };
  },
  mounted() {
    // wait for voices to load
    // I can't get FF to work without calling this first
    // Chrome works on the onvoiceschanged function
    this.voiceList = this.synth.getVoices();
    this.synth.onvoiceschanged = () => {
      this.voiceList = this.synth.getVoices();
      // give a bit of delay to show loading screen
      // just for the sake of it, I suppose. Not the best reason
      // setTimeout(() => {
      //   this.isLoading = false;
      // }, 800);
    };

    // this.listenForSpeechEvents();
  },

  methods: {
    async submitVoiceCustomization() {
      const currentUserID = localStorage.getItem("id");
      const response = await axios
        .post("voice-config/", {
          accent: this.accent,
          is_male: this.is_male,
          voice_mode: this.voice_mode,
          // volume: this.volume / 100,
          // speed: this.speed / 10,
          volume: this.volume,
          speed: this.speed,
          is_on: this.is_on,
          user: currentUserID,
        })
        .then((response) => {
          // voicec config data start
          // if(){}
          localStorage.setItem("voice_config", JSON.stringify(response.data));
          localStorage.setItem("accent", response.data.accent);
          localStorage.setItem("voice_mode", response.data.voice_mode);
          localStorage.setItem("volume", response.data.volume);
          localStorage.setItem("speed", response.data.speed);
          localStorage.setItem("is_male", response.data.is_male);
          localStorage.setItem("is_on", response.data.is_on);
          Swal.fire({
            icon: "success",
            // title: "Yes...",
            text:
              this.$store.getters.GET_UPDATED +
              " " +
              this.$store.getters.GET_SUCCESSFULLY +
              "...",
          }).then((result) => {
            this.$router.push("voice-customization");
            this.$router.go();
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.group_error_data = error.response.data;
        });
      console.log(response);
    },

    loadVoiceCustomization() {
      const currentUserID = localStorage.getItem("id");
      this.loading = true;
      axios
        .get("voice-config/", {})
        .then((response) => {
          this.form_data = response.data;
          // filter by user
          this.form_data.filter((element) => {
            if (element.user == currentUserID) {
              this.accent = element.accent;
              this.is_male = element.is_male;
              this.voice_mode = element.voice_mode;
              this.volume = element.volume;
              this.speed = element.speed;
              this.is_on = element.is_on;
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    ChangeVolumeTrack() {
      // const rangeInputs = document.querySelectorAll('input[type="range"]');
      // const rangeInputs = document.getElementById("volumeInput");
      // function handleInputChange(e) {
      //   let target = e.target;
      //   if (e.target.type !== "range") {
      //     target = document.getElementById("range");
      //   }
      //   const min = target.min;
      //   const max = target.max;
      //   const val = target.value;
      //   target.style.backgroundSize =
      //     ((val - min) * 100) / (max - min) + "% 100%";
      // }
      // rangeInputs.forEach((input) => {
      //   input.addEventListener("input", handleInputChange);
      // });
    },
    ChangeRateTrack() {
      // const rangeInputs = document.querySelectorAll('input[type="range"]');
      // const rangeInputs = document.getElementById("rateInput");
      // function handleInputChange(e) {
      //   let target = e.target;
      //   if (e.target.type !== "range") {
      //     target = document.getElementById("range");
      //   }
      //   const min = target.min;
      //   const max = target.max;
      //   const val = target.value;
      //   target.style.backgroundSize =
      //     ((val - min) * 100) / (max - min) + "% 100%";
      // }
      // rangeInputs.forEach((input) => {
      //   input.addEventListener("input", handleInputChange);
      // });
    },
  },

  created() {
    this.loadVoiceCustomization();
  },

  computed: {
    computed_volume() {
      if (this.volume == null) {
        return 0.5;
      } else {
        return this.volume;
      }
    },
    computed_speed() {
      if (this.speed == null) {
        return 0.5;
      } else {
        return this.speed;
      }
    },
  },
};
</script>

<style scoped>
/* for toggle button */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #69c5a5;
}

input:focus + .slider {
  box-shadow: 0 0 1px #69c5a5;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
/* range input */

/* new range input track dual color */
input,
output {
  display: inline-block;
  vertical-align: middle;
  font-size: 1em;
  font-family: Arial, sans-serif;
}

/* output {
  background: #ff4500;
  padding: 5px 16px;
  border-radius: 3px;
  color: #fff;
} */

input[type="number"] {
  width: 40px;
  padding: 4px 5px;
  border: 1px solid #bbb;
  border-radius: 3px;
}

input[type="range"] {
  -webkit-appearance: none;
  margin-right: 15px;
  /* width: 300px; */
  width: 100%;
  height: 7px;
  /* background: rgba(255, 255, 255, 0.6); */
  background: #bababa87;
  border-radius: 5px;
  background-image: linear-gradient(#69c5a5, #69c5a5);
  background-size: 70% 100%;
  background-repeat: no-repeat;
}

/* Input Thumb */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #ffffff;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
  transition: background 0.3s ease-in-out;
  margin-top: -6px;
}

input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #ff4500;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
  transition: background 0.3s ease-in-out;
}

input[type="range"]::-ms-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #ff4500;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
  transition: background 0.3s ease-in-out;
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: #ffffff;
}

input[type="range"]::-moz-range-thumb:hover {
  background: #ffffff;
}

input[type="range"]::-ms-thumb:hover {
  background: #ffffff;
}

/* Input Track */
input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
  width: 100%;
}

input[type="range"]::-moz-range-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

input[type="range"]::-ms-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}
</style>
