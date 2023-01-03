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
              Voice Configuration
            </div>
          </div>
        </div>
        <div class="loader" v-if="loading"></div>
        <!-- v-if="permissions" -->
        <div class="main-card card">
          <div class="card-body">
            <!-- details section -->
            <div class="form-group row mt-3">
              <label class="col-md-12"> Voice Message Configuration </label>
              <div class="col-md-12 col-lg-12 mt-1">
                <div class="p-listbox p-component">
                  <div class="p-listbox-header">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="p-listbox-filter-container">
                          <input
                            type="text"
                            class="p-listbox-filter p-inputtext p-component"
                            v-model="searchEvent"
                            placeholder="Filter by event name"
                          />
                          <span
                            class="p-listbox-filter-icon pi pi-search"
                          ></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="p-listbox-list-wrapper">
                    <div
                      role="listbox"
                      aria-multiselectable="multiple"
                      class="p-listbox-list permission-custom-height"
                    >
                      <form
                        @submit.prevent="submitEventData"
                        autocomplete="off"
                      >
                        <div class="row">
                          <div class="col-md-12">
                            <div class="table-responsive">
                              <table class="table">
                                <thead>
                                  <tr>
                                    <th scope="col">Event Name</th>
                                    <th scope="col">Dafault</th>
                                    <th scope="col">Friendly</th>
                                    <th scope="col">Corporate</th>
                                    <th scope="col">Formal</th>
                                  </tr>
                                </thead>
                                <br />
                                <tbody v-if="resultQuery">
                                  <tr
                                    class="mt-2"
                                    v-for="(value, key) in resultQuery"
                                    :key="key"
                                  >
                                    <td>
                                      <label>{{ value.event }}</label>
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        class="form-control"
                                        v-model="value.message"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        class="form-control"
                                        v-model="value.friendly_mode"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        class="form-control"
                                        v-model="value.corporate_mode"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        class="form-control"
                                        v-model="value.formal_mode"
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <button
                @click="submitEventData"
                class="mt-2 btn btn-successs btn-lg float-right"
              >
                {{ $store.getters.GET_SUBMIT }}
              </button>
            </div>
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
import voiceconfigJson from "../VoiceModule/store/voiceconfig.json";

export default {
  name: "VoiceConfiguration",
  components: { Master },
  data() {
    return {
      loading: false,
      // new data
      error_data: null,
      voice_details: {},
      organised_data: {},
      voice_event_datas: null,
      voioceArray: [],
      searchEvent: null,
    };
  },

  methods: {
    setVoiceConfigObject() {
      for (var property in voiceconfigJson) {
        this.voice_details[property] = voiceconfigJson[property];
      }
    },
    async submitEventData() {
      const response = await axios
        .post("voice-data/", this.voioceArray)
        .then((response) => {
          Swal.fire({
            icon: "success",
            // title: "Yes...",
            text:
              this.$store.getters.GET_UPDATED +
              " " +
              this.$store.getters.GET_SUCCESSFULLY +
              "...",
          }).then((result) => {
            this.$router.push("voice-configuration");
            this.$router.go();
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.error_data = error.response.data;
        });
      console.log(response);
    },

    loadVoiceEventData() {
      // const currentUserID = localStorage.getItem("id");
      this.loading = true;
      axios
        .get("voice-data/", {})
        .then((response) => {
          this.voice_event_datas = response.data;
          if (this.voice_event_datas.length > 0) {
            this.voice_event_datas.map((x) => {
              this.organised_data[x.event] = x;
              this.voioceArray.push(this.organised_data[x.event]);
            });
          } else {
            for (var property in this.voice_details) {
              // this.voice_details[property] = voiceconfigJson[property];
              this.voioceArray.push(this.voice_details[property]);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },

  created() {
    this.setVoiceConfigObject();
    this.loadVoiceEventData();
  },

  computed: {
    resultQuery() {
      if (this.searchEvent) {
        return this.voioceArray.filter((item) => {
          return this.searchEvent
            .toLowerCase()
            .split(" ")
            .every((v) => item.event.toLowerCase().includes(v));
        });
      } else {
        return this.voioceArray;
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
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  margin-top: 14px;
  /* background: red; */
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: #69c5a5;
  border-radius: 5px;
}
input[type="range"]::-webkit-slider-thumb {
  border: 1px solid #69c5a5;
  height: 36px;
  width: 16px;
  border-radius: 5px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -14px;
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #69c5a5;
  border: none !important;
}
input[type="range"]:focus {
  border: none !important;
}
input[type="range"]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;

  background: #69c5a5;
  border-radius: 5px;
}
input[type="range"]::-moz-range-thumb {
  border: 1px solid #69c5a5;
  height: 36px;
  width: 16px;
  border-radius: 5px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -14px;
}
input[type="range"]::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}
input[type="range"]::-ms-fill-lower {
  background: #69c5a5;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type="range"]::-ms-fill-upper {
  background: #69c5a5;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type="range"]::-ms-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}
input[type="range"]:focus::-ms-fill-lower {
  background: #69c5a5;
}
input[type="range"]:focus::-ms-fill-upper {
  background: #69c5a5;
}
table {
  margin-top: 5px;
}
.p-listbox .p-listbox-list {
  /* padding: 0.5rem 0; */
  height: auto;
  padding: 0.2rem 1.5rem;
}
.table td,
.table th {
  padding: 0.75rem;
  vertical-align: baseline;
  border-top: none;
  text-transform: capitalize;
}
.p-component {
  font-size: 14px;
}
</style>
