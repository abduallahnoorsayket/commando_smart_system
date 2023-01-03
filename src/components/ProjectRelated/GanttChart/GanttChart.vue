<template>
  <Master>
    <template v-slot:content>
      <div
        class="app-main__inner"
        id="recordsModal"
        v-if="taskGanttFormData ||sprintGanttFormData || versionGanttFormData|| projectGanttFormData "
      >
        <!-- v-if="taskGanttFormData ||sprintGanttFormData || versionGanttFormData" -->
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-list-alt icon-gradient bg-tempting-azure"></i>
              </div>
              <ProjectName :project_ID="projectID" />
              <router-link v-if="hasPermission('view_project')" :to="{ path: '/project-list' }">
                <a class="float" style="position: absolute; right: 0">
                  <button type="button" class="btn btn-successs" style="font-size: 15px">
                    <span class="fas fa-list"></span> Project List
                  </button>
                </a>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Gannt  control -->
        <div class="gantt_control">
          <!-- <input value="Export to " type="button" />
          <input value="Export" type="button" />
          <input value="Export" type="button" />-->
          <h6
            class="mt-2"
            v-if="taskGanttFormData &&taskGanttFormData.subject"
          >Task name: {{taskGanttFormData.subject}} (Gantt Chart)</h6>
          <h6
            class="mt-2"
            v-else-if="sprintGanttFormData && sprintGanttFormData.sprint_name"
          >Sprint name: {{sprintGanttFormData.sprint_name}} (Gantt Chart)</h6>
          <h6
            class="mt-2"
            v-else-if="versionGanttFormData && versionGanttFormData.version_name"
          >Version name: {{versionGanttFormData.version_name}} (Gantt Chart)</h6>
          <h6
            class="mt-2"
            v-else-if="projectGanttFormData && projectGanttFormData.project_name"
          >Project name: {{projectGanttFormData.project_name}} (Gantt Chart)</h6>
        </div>
        <!-- <gantt class="left-container"></gantt> -->
        <template
          v-if="taskID   && main_tasks.data.length >0 || sprintID  &&  main_tasks.data.length >0  || versionID  &&  main_tasks.data.length >0 || projectID  &&  main_tasks.data.length >0"
        >
          <gantt class="left-container" :maintasks="main_tasks" :links="links"></gantt>
        </template>
        <!-- <template v-else-if="sprintID  && sprintGanttData && main_sprints.data.length >0">
          <gantt class="left-container" :maintasks="main_sprints"></gantt>
        </template>-->

        <br />
        <br />
        <div
          v-if="main_tasks.data.length ==0"
          class="alert alert-success"
          role="alert"
        >No Data Found!</div>
      </div>
    </template>
  </Master>
</template>

<script>
import axios from "axios";
import Master from "../../layouts/Master";
import Gantt from "./Gantt";
import ProjectName from "../../layouts/partials/projectRelated/ProjectName.vue";
import permissions from "../../../authorization/permissions";
// import { columns, scales, tasks, links } from "../VueGantt/data";

export default {
  name: "GanttChart",
  components: { Master, Gantt, ProjectName },
  // data: () => ({
  //   columns,
  //   scales,
  //   tasks,
  //   links,
  // }),
  // previous data property
  data() {
    return {
      projectID: null,
      versionID: null,
      sprintID: null,
      taskID: null,
      taskGanttFormData: null,
      sprintGanttFormData: null,
      versionGanttFormData: null,
      projectGanttFormData: null,
      task_response_ID: null,
      sprint_response_ID: null,
      version_response_ID: null,
      project_response_ID: null,
      taskGanttData: null,
      sprintGanttData: null,
      versionGanttData: null,
      projectGanttData: null,
      pagination: {
        count: null,
        next: null,
        previous: null,
        showing: 0,
        page: null,
      },
      main_sprints: {
        data: [],
      },
      main_tasks: {
        data: [
          // {
          //   id: 1,
          //   text: "Designation CRUD",
          //   start_date: "2021-05-05",
          //   end_date: "2021-05-07",
          // },
          // {
          //   id: 2,
          //   text: "User CRUD up",
          //   start_date: "2021-07-16",
          //   end_date: "2021-07-17",
          // },
          // {
          //   id: 3,
          //   text: "Leave Management up",
          //   start_date: "2021-07-22",
          //   end_date: "2021-07-23",
          // },
          // {
          //   id: 4,
          //   text: "Dept CRUD",
          //   start_date: "2021-07-07",
          //   end_date: "2021-07-16",
          // },
          // {
          //   id: 5,
          //   text: "User profile update",
          //   start_date: "2021-06-02",
          //   end_date: "2021-06-04",
          //   parent: 1,
          // },
          // {
          //   id: 6,
          //   text: "Designation create page",
          //   start_date: "2021-07-07",
          //   end_date: "2021-07-09",
          //   parent: 1,
          // },
          // {
          //   id: 7,
          //   text: "Designation Delete page",
          //   start_date: "2021-07-09",
          //   end_date: "2021-07-10",
          //   parent: 1,
          // },
          // {
          //   id: 8,
          //   text: "Branch List",
          //   start_date: "2021-07-03",
          //   end_date: "2021-07-06",
          //   parent: 1,
          // },
        ],
        links: [
          {
            // id: 1,
            // source: "t_" + 8,
            // target: "t_" + 20,
            // type: 0,
          },
        ],
      },

      // links: [
      //   { id: "1", source: "8", target: "20", type: "0" },
      //   { id: "2", source: "2", target: "3", type: "0" },
      //   { id: "3", source: "3", target: "4", type: "0" },
      // ],
      // },
    };
  },
  created() {
    this.main_tasks.data = [];
    this.taskID = this.$route.query.task_id;
    this.sprintID = this.$route.query.sprint_id;
    this.versionID = this.$route.query.version_id;
    this.projectID = this.$route.query.project_id;
    this.initialLoad();
  },
  updated() {
    this.initialLoad();
  },
  methods: {
    initialLoad: function () {
      if (this.taskID) {
        this.loadTaskGanttChart();
      }
      if (this.sprintID) {
        this.loadSprintGanttChart();
      }
      if (this.versionID) {
        this.loadVersionGanttChart();
      }
      if (this.projectID) {
        this.loadProjectGanttChart();
      }
    },
    // ganttChartLoad() {
    //   console.log("212");
    //   // this.main_tasks.data = [];
    //   // this.loadTaskGanttChart();
    //   // this.loadSprintGanttChart();
    // },

    async loadTaskGanttChart() {
      this.main_tasks.data = [];
      axios
        .get("issues-gantt-chart/" + this.taskID + "/", {})
        .then((response) => {
          this.taskGanttFormData = response.data;
          this.task_response_ID = response.data.id;
          this.taskGanttData = response.data.issue_sub_issue;
          this.taskGanttData.forEach((element) => {
            this.main_tasks.data.push({
              id: element.id,
              text: element.subject,
              start_date: element.expected_start_date,
              end_date: element.expected_end_date,
              // parent: 19,
              // duration: 3,
              // progress: 0.6,
            });
          });
          // console.log("182=====", this.main_tasks.data);
          // for (let i = 0; i < this.taskGanttData.length; i++) {
          //   this.main_tasks.data.push({
          //     id: i.id,
          //     text: i.subject,
          //     start_date: "2020-01-04",
          //     duration: 2,
          //     progress: 0.6,
          //   });
          // }
        });
    },
    async loadSprintGanttChart() {
      // this.main_tasks.data = [];

      axios
        .get("sprints-gantt-chart/" + this.sprintID + "/", {})
        .then((response) => {
          this.sprintGanttFormData = response.data;
          this.sprint_response_ID = response.data.id;
          this.sprintGanttData = response.data.sprint_issue;
          this.sprintGanttData.forEach((element) => {
            this.main_tasks.data.push({
              id: "t_" + element.id,
              text: element.subject,
              start_date: element.start_date,
              end_date: element.due_date,
            });

            element.issue_sub_issue.forEach((item) => {
              this.main_tasks.data.push({
                id: item.id,
                text: item.subject,
                start_date: item.expected_start_date,
                end_date: item.expected_end_date,
                parent: "t_" + element.id,
              });
            });
            if(element.parent_issue && element.parent_issue.id){
              this.main_tasks.links.push({
              id: element.id,
              source: "t_" + element.id,
              target: "t_" + element.parent_issue.id,
              type: 2,
            });
            }
           
          });
          // console.log("182=====", this.main_tasks.data);
        });
    },
    async loadVersionGanttChart() {
      // this.main_tasks.data = [];

      axios
        .get("versions-gantt-chart/" + this.versionID + "/", {})
        .then((response) => {
          this.versionGanttFormData = response.data;
          this.version_response_ID = response.data.id;
          this.versionGanttData = response.data.version_sprint;
          this.versionGanttData.forEach((sprint) => {
            this.main_tasks.data.push({
              id: "v_" + sprint.id,
              text: sprint.sprint_name,
              start_date: sprint.expected_start_date,
              end_date: sprint.expected_end_date,
            });
            sprint.sprint_issue.forEach((issue) => {
              this.main_tasks.data.push({
                id: "t_" + issue.id,
                text: issue.subject,
                start_date: issue.start_date,
                end_date: issue.due_date,
                parent: "v_" + sprint.id,
              });
              issue.issue_sub_issue.forEach((sub_issue) => {
                this.main_tasks.data.push({
                  id: sub_issue.id,
                  text: sub_issue.subject,
                  start_date: sub_issue.expected_start_date,
                  end_date: sub_issue.expected_end_date,
                  parent: "t_" + issue.id,
                });
              });
              if(issue.parent_issue && issue.parent_issue.id){
              this.main_tasks.links.push({
              id: issue.id,
              source: "t_" + issue.id,
              target: "t_" + issue.parent_issue.id,
              type: 2,
            });
            }
            });
          });
          // console.log("182=====", this.main_tasks.data);
        });
    },
    async loadProjectGanttChart() {
      // this.main_tasks.data = [];

      axios
        .get("projects-gantt-chart/" + this.projectID + "/", {})
        .then((response) => {
          this.projectGanttFormData = response.data;
          this.project_response_ID = response.data.id;
          this.projectGanttData = response.data.project_version;
          this.projectGanttData.forEach((version) => {
            this.main_tasks.data.push({
              id: "p_" + version.id,
              text: version.version_name,
              start_date: version.expected_start_date,
              end_date: version.expected_end_date,
            });
            version.version_sprint.forEach((sprint) => {
              this.main_tasks.data.push({
                id: "v_" + sprint.id,
                text: sprint.sprint_name,
                start_date: sprint.expected_start_date,
                end_date: sprint.expected_end_date,
                parent: "p_" + version.id,
              });
              sprint.sprint_issue.forEach((issue) => {
                this.main_tasks.data.push({
                  id: "t_" + issue.id,
                  text: issue.subject,
                  start_date: issue.start_date,
                  end_date: issue.due_date,
                  parent: "v_" + sprint.id,
                });
                issue.issue_sub_issue.forEach((sub_issue) => {
                  this.main_tasks.data.push({
                    id: sub_issue.id,
                    text: sub_issue.subject,
                    start_date: sub_issue.expected_start_date,
                    end_date: sub_issue.expected_end_date,
                    parent: "t_" + issue.id,
                  });
                });
               if(issue.parent_issue && issue.parent_issue.id){
                  this.main_tasks.links.push({
                  id: issue.id,
                  source: "t_" + issue.id,
                  target: "t_" + issue.parent_issue.id,
                  type: 2,
                });
                }
              });
            });
          });
        });
    },
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
  },
};
</script>

<style scoped>
.nav-item {
  margin: 0px 30px;
}
/* for gannt chart  */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.container {
  height: 75%;
  width: 100%;
}
.left-container {
  overflow: hidden;
  position: relative;
  height: 75%;
  width: 100%;
}
/* gantcontrol */
.gantt_control {
  margin-top: 10px;
  padding: 10px 0 12px;
  background: #ededed;
  text-align: center;
}

.gantt_control input[type="button"],
.gantt_control input[type="file"],
.gantt_control input[type="checkbox"],
.gantt_control button {
  font: 500 14px Roboto;
  line-height: normal;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  padding: 4px 12px;
  margin: 0 5px;
  color: rgba(0, 0, 0, 0.7);
  line-height: 20px;
  cursor: pointer;
}
.gantt_control input[type="button"]:hover {
  color: #ffffff;
  background: #69c5a5;
}
/* new css for progress */
.gantt_task_content {
  background: red;
}
</style>