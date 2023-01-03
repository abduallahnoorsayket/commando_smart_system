<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa fa-history icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                <div>
                  Last Day Work Activity
                  <router-link :to="{ path: '/project-list' }">
                    <a class="float" style="position: absolute; right: 0">
                      <button type="button" class="btn btn-successs" style="font-size: 15px">
                        <span class="fas fa-list"></span> Project List
                      </button>
                    </a>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-card lastActivityCard">
          <h5 class="listTitle">Last Day Activity</h5>
        </div>
        <ViewActivityModal v-if="isModalVisible" />
        <!-- activity new design -->
        <div class="mt-4">
          <div class="activity-timeline-container">
            <div class="timeline">
              <div class="timeline-month">22-04-2021</div>
              <div class="timeline-section">
                <div class="timeline-date">
                  <i class="fas fa-user-circle" aria-hidden="true"></i>
                  Abdullah Sayket
                </div>

                <div class="row">
                  <div class="col-sm-4">
                    <div class="timeline-box">
                      <div class="box-title">
                        <i class="fa fa-history" aria-hidden="true"></i>
                        User Profile API
                      </div>
                      <div class="box-content">
                        <button
                          type="button"
                          class="btn btn-successs pull-right btnPadding"
                          style
                          @click="OpenModal()"
                        >Details</button>
                        <div class="box-item">
                          <strong class="labelMargin">Todo ID:</strong>
                          <span>25468</span>
                        </div>
                        <div class="box-item">
                          <strong class="labelMargin">Spent hour:</strong>
                          <span>20:50 Hours</span>
                        </div>

                        <div class="box-item">
                          <strong class="labelMargin">Todo status:</strong>
                          <span class="badge badge-pill badge-warning">pause</span>
                        </div>

                        <div class="row progresssMarign">
                          <div class="col-sm-5">
                            <div class="FinalIssue">
                              <strong class="labelMargin">Progress:</strong>
                              <span>90%</span>
                            </div>
                          </div>
                          <div class="col-sm-7 colMargin">
                            <div class="progress" style="height: 7px;">
                              <div
                                class="progress-bar"
                                role="progressbar"
                                aria-valuenow="90"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 90%;"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="box-footer">
                        <i class="fa fa-user" aria-hidden="true"></i>
                        Abdullah Sayket
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="timeline-section">
                <div class="timeline-date">
                  <i class="fas fa-user-circle" aria-hidden="true"></i>
                  Maksudur Maruf
                </div>

                <div class="row">
                  <div class="col-sm-4">
                    <div class="timeline-box">
                      <div class="box-title">
                        <i class="fa fa-history" aria-hidden="true"></i>
                        Designation Create page
                      </div>
                      <div class="box-content">
                        <button
                          type="button"
                          class="btn btn-successs pull-right btnPadding"
                          style
                        >Details</button>
                        <div class="box-item">
                          <strong class="labelMargin">Todo ID:</strong>
                          <span>25468</span>
                        </div>
                        <div class="box-item">
                          <strong class="labelMargin">Spent hour:</strong>
                          <span>20:50 Hours</span>
                        </div>

                        <div class="box-item">
                          <strong class="labelMargin">Todo status:</strong>
                          <span class="badge badge-pill badge-primary">Running</span>
                        </div>

                        <div class="row progresssMarign">
                          <div class="col-sm-5">
                            <div class="FinalIssue">
                              <strong class="labelMargin">Progress:</strong>
                              <span>80%</span>
                            </div>
                          </div>
                          <div class="col-sm-7 colMargin">
                            <div class="progress" style="height: 7px;">
                              <div
                                class="progress-bar"
                                role="progressbar"
                                aria-valuenow="80"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 80%;"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="box-footer">
                        <i class="fa fa-user" aria-hidden="true"></i>
                        Maksudur Maruf
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="timeline-section">
                <div class="timeline-date">
                  <i class="fas fa-user-circle" aria-hidden="true"></i>
                  Monirul Islam
                </div>

                <div class="row">
                  <div class="col-sm-4">
                    <span class="noActivity">No Acitiviy Found !!</span>
                  </div>
                </div>
              </div>

              <div class="timeline-section">
                <div class="timeline-date">
                  <i class="fas fa-user-circle" aria-hidden="true"></i>
                  Julfikar haider
                </div>

                <div class="row">
                  <div class="col-sm-4">
                    <div class="timeline-box">
                      <div class="box-title">
                        <i class="fa fa-history" aria-hidden="true"></i>
                        Designation Update page
                      </div>
                      <div class="box-content">
                        <button
                          type="button"
                          class="btn btn-successs pull-right btnPadding"
                          style
                        >Details</button>
                        <div class="box-item">
                          <strong class="labelMargin">Todo ID:</strong>
                          <span>45468</span>
                        </div>
                        <div class="box-item">
                          <strong class="labelMargin">Spent hour:</strong>
                          <span>20:50 Hours</span>
                        </div>

                        <div class="box-item">
                          <strong class="labelMargin">Todo status:</strong>
                          <span class="badge badge-pill badge-info">Assigned</span>
                        </div>

                        <div class="row progresssMarign">
                          <div class="col-sm-5">
                            <div class="FinalIssue">
                              <strong class="labelMargin">Progress:</strong>
                              <span>10%</span>
                            </div>
                          </div>
                          <div class="col-sm-7 colMargin">
                            <div class="progress" style="height: 7px;">
                              <div
                                class="progress-bar"
                                role="progressbar"
                                aria-valuenow="10"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 10%;"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="box-footer">
                        <i class="fa fa-user" aria-hidden="true"></i>
                        Julfikar Haider
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="timeline-section">
                <div class="timeline-date">
                  <i class="fas fa-user-circle" aria-hidden="true"></i>
                  Efrana Jannat
                </div>

                <div class="row">
                  <div class="col-sm-4">
                    <span class="noActivity">No Acitiviy Found !!</span>
                  </div>
                </div>
              </div>
              <div class="timeline-section">
                <div class="timeline-date">
                  <i class="fas fa-user-circle" aria-hidden="true"></i>
                  Asif Rahman
                </div>

                <div class="row">
                  <div class="col-sm-4">
                    <div class="timeline-box">
                      <div class="box-title">
                        <i class="fa fa-history" aria-hidden="true"></i>
                        Nested Serializer API
                      </div>
                      <div class="box-content">
                        <button
                          type="button"
                          class="btn btn-successs pull-right btnPadding"
                          style
                        >Details</button>
                        <div class="box-item">
                          <strong class="labelMargin">Todo ID:</strong>
                          <span>25468</span>
                        </div>
                        <div class="box-item">
                          <strong class="labelMargin">Spent hour:</strong>
                          <span>50:50 Hours</span>
                        </div>

                        <div class="box-item">
                          <strong class="labelMargin">Todo status:</strong>
                          <span class="badge badge-pill badge-success">Done</span>
                        </div>

                        <div class="row progresssMarign">
                          <div class="col-sm-5">
                            <div class="FinalIssue">
                              <strong class="labelMargin">Progress:</strong>
                              <span>100%</span>
                            </div>
                          </div>
                          <div class="col-sm-7 colMargin">
                            <div class="progress" style="height: 7px;">
                              <div
                                class="progress-bar"
                                role="progressbar"
                                aria-valuenow="100"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 100%;"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="box-footer">
                        <i class="fa fa-user" aria-hidden="true"></i>
                        Asif Rahman
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- tree  previus design-->
        <!-- <div class="mt-4" v-if="all_activity">
          <div class="activity-timeline-container">
            <div class="timeline">
              <div class="timeline-month">January</div>
              <div class="timeline-section" v-for="(acitivity,index) in all_activity" :key="index">
                <template v-for="acitivity in acitivity.issue_sub_issue" :key="acitivity">
                  <div class="timeline-date">{{acitivity.updated_at}}</div>

                  <div class="row">
                    <div class="col-sm-4">
                      <div class="timeline-box">
                        <div class="box-title">
                          <i class="fa fa-history" aria-hidden="true"></i>
                          {{acitivity.subject}}
                        </div>
                        <div class="box-content">
                          <a
                            class="btn btn-xs btn-dark pull-right"
                            data-toggle="modal"
                            data-target="#activityModal813"
                            @click="OpenModal(acitivity.id)"
                          >Details</a>
                          <div class="box-item">
                            <strong>Issue ID:</strong>
                            {{acitivity.issue}}
                          </div>
                          <div class="box-item">
                            <strong>Spent hour:</strong>
                            {{acitivity.working_hour+':00 Hours'}}
                          </div>

                          <div class="box-item">
                            <strong>Sub issue status:</strong>
                            {{ acitivity.status}}
                          </div>
                          <div class="row">
                            <div class="col-sm-6">
                              <div class="FinalIssue">
                                <strong>Progress:</strong>
                                {{ acitivity.progress + '%'}}
                              </div>
                            </div>
                            <div class="col-sm-6">
                              <div class="progress progress-sm progress-striped active">
                                <div
                                  class="progress-bar bg-info"
                                  data-toggle="tooltip"
                                  :data-original-title="acitivity.progress"
                                  :style="{'width': `${acitivity.progress}%`}"
                                >{{acitivity.progress + '%' }}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="box-footer">
                          <i class="fa fa-user" aria-hidden="true"></i>
                          {{ acitivity.assignee.first_name+ " " +acitivity.assignee.last_name}}
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>-->
      </div>
    </template>
  </Master>
</template>

<script>
import axios from "axios";
import Master from "../../layouts/Master";
import ViewActivityModal from "../Activity/ViewActivityModal";
// import "../authheader";

export default {
  name: "LastDayActivities",
  components: {
    Master,
    ViewActivityModal,
  },
  data() {
    return {
      sub_issue_id: null,
      filterIssue: null,
      all_assignee: null,
      progressPercent: null,
      all_activity: null,
      issueObject: null,
      pagination: {
        count: null,
        next: null,
        previous: null,
        showing: 0,
        page: null,
      },
    };
  },

  created() {
    this.initialLoad();
    console.log("created");
  },
  updated() {
    this.initialLoad();
    console.log("updated");
  },
  computed: {
    isModalVisible() {
      return this.$store.state.projectRelated.ActivityModalVisible;
    },
  },

  methods: {
    initialLoad: function () {
      this.loadActivity();
    },

    OpenModal() {
      this.$store.commit("projectRelated/toggleActivityModal");
    },

    loadActivity() {
      axios
        .get(`projects/1/`, {
        })
        .then((response) => {
          this.all_activity = response.data.project_issue;
          // this.filterIssue = response.data.project_issue.filter((element) => {
          //   return element.issue_sub_issue;
          // });
          // this.filterSubIssue = this.filterIssue.filter((element) => {
          //   return element.updated_at;
          // });
          // console.log("177/////////////", this.all_activity);
          // console.log("178=========/////////////", this.filterSubIssue);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    setPage(page) {
      this.pagination.page = page;
      this.searchUser();
    },
    searchUser() {
      console.log(this.searchName);
      console.log(this.searchMail);
      this.$router.push({
        path: "user-list",
        query: {
          first_name: this.first_name,
          username: this.username,
          department: this.department,
          groups: this.groups,
          skills: this.skills,
          page: this.pagination.page,
        },
      });
    },
  },
  // end of Methods
};
</script>
<style scoped>
.row {
  /* text-align: center; */
  color: #2c3e50;
  /*margin-top: 60px;*/
  margin-bottom: 8px;
}

.card {
  margin-top: 30px;
  padding-top: 30px;
  margin-bottom: 30px;
}

.card-content p {
  padding-bottom: 3px;
}

/* .calenderIcon{
  margin-right:px;
} */
/* new Css  */
.fa-calendar:before {
  content: "\f133";
  color: #ffffff;
  font-size: 14px;
  margin-right: 5px;
}

.fa-history:before {
  content: "\f1da";
  cursor: pointer;
  padding: 10px 5px 10px 0px;
  color: #ffffff;
}
.btnPadding {
  padding: 2px 10px;
}
.box-item {
  margin-bottom: 3px;
}
.progresssMarign {
  margin-top: 7px;
}
.colMargin {
  margin-top: 7px;
}
.lastActivityCard {
  background: #e6f7f4;
  padding: 10px;
  border-left: 2px solid #69c5a5;
}
h5,
.h5 {
  margin-bottom: 0px !important;
}
.fa-user-circle:before {
  content: "\f2bd";
  color: #ffffff;
  font-size: 14px;
  margin-right: 5px;
}
.noActivity {
  color: #e74c3c;
  margin-left: 10px;
}
</style>
