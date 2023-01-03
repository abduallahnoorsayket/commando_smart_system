<template>
  <nav class="navbar navbar-expand-lg navbar navbar navbar-light">
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li
          v-if="hasPermission('view_project')"
          class="nav-item"
          :class="[ route_name == '/project-details' ? 'active' : null]"
        >
          <router-link
            class="nav-link"
            :to="{name: 'ProjectDetails', query:queryString }"
          >Project Overview</router-link>
        </li>
        <li
          v-if="hasPermission('view_version')"
          class="nav-item"
          :class="[ route_name == '/version-list' || route_name ==  '/version-details' ? 'active' : null]"
        >
          <router-link class="nav-link" :to="{name: 'VersionList' ,query: queryString }">Versions</router-link>
        </li>
        <li
          v-if="hasPermission('view_sprint')"
          class="nav-item"
          :class="[ route_name == '/sprint-list' ||  route_name == '/sprint-details' ? 'active' : null]"
        >
          <router-link class="nav-link" :to="{name: 'SprintList',query: queryString}">Sprints</router-link>
        </li>
        <li
          v-if="hasPermission('view_issue')"
          class="nav-item"
          :class="[ route_name == '/task-list' || route_name == '/add-new-task'|| route_name == '/update-task' || route_name == '/task-details'  ? 'active' : null]"
        >
          <router-link class="nav-link" :to="{name: 'taskList' ,query: queryString}">Tasks</router-link>
        </li>
        <li
          v-if="hasPermission('view_subissue')"
          class="nav-item"
          :class="[ route_name == '/sub-task-list' || route_name == '/sub-task-details' ? 'active' : null]"
        >
          <router-link class="nav-link" :to="{name: 'SubTasksList' ,query: queryString}">SubTasks</router-link>
        </li>

        <!-- <li class="nav-item" :class="[ route_name == '/activities' ? 'active' : null]">
          <router-link
            class="nav-link"
            :to="{name: 'Activities' ,query: { project_id: this.$route.query.project_id,version_id: this.$route.query.version_id ,sprint_id: this.$route.query.sprint_id ,task_id: this.$route.query.task_id ,subTask_id: this.$route.query.subTask_id } }"
          >Activity</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'GanttChart'}">Gantt Chart</router-link>
        </li>-->
        <li
          v-if="hasPermission('view_file')"
          class="nav-item"
          :class="[ route_name == '/files-list' ? 'active' : null]"
        >
          <router-link class="nav-link" :to="{name: 'FilesList' ,query: queryString}">Files</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import permissions from "../../../../authorization/permissions";
export default {
  data() {
    return {
      route_name: null,
      queryString: {},
    };
  },
  created() {
    console.log("45", this.$route.path);
    this.route_name = this.$route.path;
    this.processQueryString();
  },
  updated() {
    this.processQueryString();
  },
  methods: {
    processQueryString() {
      // this.projectID = this.$route.query.project_id;
      // this.versionID = this.$route.query.version_id;
      // this.sprintID = this.$route.query.sprint_id;
      if (this.$route.query.project_id) {
        this.queryString["project_id"] = this.$route.query.project_id;
      }
       if (this.$route.query.project) {
        this.queryString["project_id"] = this.$route.query.project;
      }
       if (this.$route.query.version__project) {
        this.queryString["project_id"] = this.$route.query.version__project;
      }
       if (this.$route.query.sprint__version__project) {
        this.queryString["project_id"] = this.$route.query.sprint__version__project;
      }
      // if (this.$route.query.project_id || this.$route.query.project) {
      //   this.queryString["project_id"] = this.$route.query.project_id ?this.$route.query.project_id  : this.$route.query.project;
      // }
      // if (this.$route.query.version_id) {
      //   this.queryString["version_id"] = this.$route.query.version_id;
      // }
      // if (this.$route.query.sprint_id) {
      //   this.queryString["sprint_id"] = this.$route.query.sprint_id;
      // }
      // if (this.$route.query.task_id) {
      //   this.queryString["task_id"] = this.$route.query.task_id;
      // }
    },
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
  },
};
</script>

<style>
</style>