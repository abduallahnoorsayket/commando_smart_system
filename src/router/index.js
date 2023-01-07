// default
import { createRouter, createWebHistory } from "vue-router";

// Forgot pasword
import ForgotPassword from "../components/layouts/partials/ForgetPassword/ForgotPassword";
// import ConfirmMail from "../components/layouts/partials/ForgetPassword/ConfirmMail";
import ResetPasswordForm from "../components/layouts/partials/ForgetPassword/ResetPasswordForm";
// dashBoard page
import Dashboard from "../views/Dashboard";
//  Error 404 page
import Error from "../components/layouts/partials/Error";
// permissions
import permissions from "@/authorization/permissions";

/* Project Related Module */
// client
import AddClient from "../components/ProjectRelated/Client/AddClient";
import ClientList from "../components/ProjectRelated/Client/ClientList";
import UpdateClient from "../components/ProjectRelated/Client/UpdateClient";

// Project
import AddNewProject from "../components/ProjectRelated/Projects/AddNewProject";
import ProjectList from "../components/ProjectRelated/Projects/ProjectList";
import ProjectDetails from "../components/ProjectRelated/Projects/ProjectDetails";
import UpdateNewProject from "../components/ProjectRelated/Projects/UpdateNewProject";

// Version
import VersionList from "../components/ProjectRelated/Versions/VersionList";
import VersionDetails from "../components/ProjectRelated/Versions/VersionDetails";

// Sprint
import SprintList from "../components/ProjectRelated/Sprints/SprintList";
import SprintDetails from "../components/ProjectRelated/Sprints/SprintDetails";
// task
import AddNewTask from "../components/ProjectRelated/tasks/AddNewTask";
import taskList from "../components/ProjectRelated/tasks/taskList";
import taskDetails from "../components/ProjectRelated/tasks/taskDetails";
import UpdateTask from "../components/ProjectRelated/tasks/UpdateTask";

// SubTasks
import SubTasksList from "../components/ProjectRelated/SubTasks/SubTasksList";
import SubTasksDetails from "../components/ProjectRelated/SubTasks/SubTasksDetails";

// Gantt Chart
import GanttChart from "../components/ProjectRelated/GanttChart/GanttChart";
// import SprintGantt from "../components/ProjectRelated/GanttChart/SprintGantt";

// VueGantt Chart
// import VueGantt from "../components/ProjectRelated/VueGantt/VueGantt";

// Files
import FilesList from "../components/ProjectRelated/FilesList";

// Activity
import Activities from "../components/ProjectRelated/Activity/Activities";

// Last Day Activity
// import LastDayActivities from "../components/ProjectRelated/LastDayActivity/LastDayActivities";

// All Category
import WorkType from "../components/ProjectRelated/AllCategory/WorkType/WorkType";
import WorkStatus from "../components/ProjectRelated/AllCategory/WorkStatus/WorkStatus";
import WorkPriority from "../components/ProjectRelated/AllCategory/WorkPriority/WorkPriority";

/* Multilang Module */
import AddNewLanguage from "../components/MultilangModule/Multilang/AddNewLanguage";
import EditLanguage from "../components/MultilangModule/Multilang/EditLanguage";
import AllLanguages from "../components/MultilangModule/Multilang/AllLanguages";
import langDetails from "../components/MultilangModule/Multilang/langDetails";

// notification list
import NotificationList from "../components/NotificationList/NotificationList";
/* Voice Module */
import VoiceCustomization from "../components/VoiceModule/VoiceCustomization";
import VoiceConfiguration from "../components/VoiceModule/VoiceConfiguration";
// dashboard widgets
// notice

import SmokeDetected from "../views/SmokeDetected";
import MotionIncidentDetected from "../views/MotionIncidentDetected";
import GasIncidentDetected from "../views/GasIncidentDetected";

/*  test componenWorkStatust*/
// import TestComponent from "../components/layouts/partials/Attendance/AttendanceRecords/TestComponent.vue";
// Test component
// import testComponent from "../components/ProjectRelated/AllCategory/WorkPriority/testComponent";
/*ForTestPurpose*/
// import ForTestPurpose from "../components/layouts/partials/update_password/ForTestPurpose";

// route guard
function guardMyRoute(to, from, next) {
  to.matched.some((record) => {
    // if (record.meta.authentication_required) {
    //   if (permissions.superuser_status || record.meta.title === "common") {
    //     next();
    //   } else if (localStorage.getItem("id") && permissions.hasPermission(record.meta.title)) {
    //     next();
    //   } else next("/");
    // } else next();
    //  new route guard
    if (record.meta.authentication_required && localStorage.getItem("token")) {
      if (
        permissions.superuser_status ||
        (record.meta.title === "common" && localStorage.getItem("token"))
      ) {
        next();
      } else if (
        localStorage.getItem("id") &&
        permissions.hasPermission(record.meta.title)
      ) {
        next();
      } else if (
        localStorage.getItem("id") &&
        !permissions.hasPermission(record.meta.title)
      ) {
        next("/error-page");
      } else next("/");
    } else next("/");
  });
}

// routes
const routes = [
  {
    path: "/dashboard/Incident_not_detected",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/dashboard/Smoke_Incident_detected",
    name: "DashSmokeDetectedboard",
    component: SmokeDetected,
  },
  {
    path: "/dashboard/Motion_Incident_detected",
    name: "MotionIncidentDetected",
    component: MotionIncidentDetected,
  },
  {
    path: "/dashboard/Gas_Incident_detected",
    name: "GasIncidentDetected",
    component: GasIncidentDetected,
  },
  {
    path: "/error-page",
    name: "Error",
    component: Error,
    beforeEnter: guardMyRoute,
    meta: { title: "common", authentication_required: true },
  },
  // Forget password
  {
    path: "/reset-password",
    name: "reset-password",
    component: ForgotPassword,
    meta: {
      authentication_required: false,
    },
  },
  // confirm Mail
  //  {
  //   path: '/confirm-mail',
  //   name: 'confirm-mail',
  //   component: ConfirmMail,
  //   meta: {
  //     authentication_required:false
  //   }
  // },
  // reset password request
  {
    // path: '/reset-password-form',
    path: "/reset-password-form/:uuid",
    name: "reset-password-form",
    component: ResetPasswordForm,
    meta: {
      auauthentication_required: false,
    },
  },

  /* Project Module */
  //  client
  {
    path: "/add-client",
    name: "AddClient",
    component: AddClient,
    beforeEnter: guardMyRoute,
    meta: { title: "add_client", authentication_required: true },
  },
  {
    path: "/client-list",
    name: "ClientList",
    component: ClientList,
    beforeEnter: guardMyRoute,
    meta: { title: "view_client", authentication_required: true },
  },
  {
    path: "/update-client/:id",
    name: "UpdateClient",
    component: UpdateClient,
    beforeEnter: guardMyRoute,
    meta: { title: "change_client", authentication_required: true },
  },

  // Projects
  {
    path: "/add-new-project",
    name: "AddNewProject",
    component: AddNewProject,
    beforeEnter: guardMyRoute,
    meta: { title: "add_project", authentication_required: true },
  },
  {
    path: "/project-list",
    name: "ProjectList",
    component: ProjectList,
    beforeEnter: guardMyRoute,
    meta: { title: "view_project", authentication_required: true },
  },

  {
    path: "/project-details",
    name: "ProjectDetails",
    component: ProjectDetails,
    beforeEnter: guardMyRoute,
    meta: { title: "view_project", authentication_required: true },
  },

  {
    path: "/update-new-project",
    name: "UpdateNewProject",
    component: UpdateNewProject,
    beforeEnter: guardMyRoute,
    meta: { title: "change_project", authentication_required: true },
  },

  // version
  {
    path: "/version-list",
    name: "VersionList",
    component: VersionList,
    beforeEnter: guardMyRoute,
    meta: { title: "view_version", authentication_required: true },
  },
  {
    path: "/version-details",
    name: "VersionDetails",
    component: VersionDetails,
    beforeEnter: guardMyRoute,
    meta: { title: "view_version", authentication_required: true },
  },

  // Sprint
  {
    path: "/sprint-list",
    name: "SprintList",
    component: SprintList,
    beforeEnter: guardMyRoute,
    meta: { title: "view_sprint", authentication_required: true },
  },
  {
    path: "/sprint-details",
    name: "SprintDetails",
    component: SprintDetails,
    beforeEnter: guardMyRoute,
    meta: { title: "view_sprint", authentication_required: true },
  },

  // task
  {
    path: "/task-list",
    name: "taskList",
    component: taskList,
    beforeEnter: guardMyRoute,
    meta: { title: "view_issue", authentication_required: true },
  },

  {
    // path: "/add-task/:id",
    path: "/add-new-task",
    name: "AddNewTask",
    component: AddNewTask,
    beforeEnter: guardMyRoute,
    meta: { title: "add_issue", authentication_required: true },
  },

  {
    path: "/task-details",
    name: "taskDetails",
    component: taskDetails,
    beforeEnter: guardMyRoute,
    meta: { title: "view_issue", authentication_required: true },
  },

  {
    // path: "/update-task/:id",
    path: "/update-task",
    name: "UpdateTask",
    component: UpdateTask,
    beforeEnter: guardMyRoute,
    meta: { title: "change_issue", authentication_required: true },
  },

  // SubTasks

  {
    path: "/sub-task-list",
    name: "SubTasksList",
    component: SubTasksList,
    beforeEnter: guardMyRoute,
    meta: { title: "view_subissue", authentication_required: true },
  },
  {
    path: "/sub-task-details",
    name: "SubTasksDetails",
    component: SubTasksDetails,
    beforeEnter: guardMyRoute,
    meta: { title: "view_subissue", authentication_required: true },
  },
  // GanttChart
  {
    path: "/gantt-chart",
    name: "GanttChart",
    component: GanttChart,
    beforeEnter: guardMyRoute,
    meta: { title: "common", authentication_required: true },
  },
  // SPrintGanttChart
  // {
  //   path: "/sprint-gantt",
  //   name: "SprintGantt",
  //   component: SprintGantt,
  //   beforeEnter: guardMyRoute,
  //   meta: { title: "common", authentication_required: true },
  // },

  // VueGanttChart
  // {
  //   path: "/vue-gantt-chart",
  //   name: "VueGantt",
  //   component: VueGantt,
  //   beforeEnter: guardMyRoute,
  //   meta: { title: "common", authentication_required: true },
  // },

  // All Category
  {
    path: "/work-type",
    name: "WorkType",
    component: WorkType,
    beforeEnter: guardMyRoute,
    meta: { title: "view_worktype", authentication_required: true },
  },

  {
    path: "/work-status",
    name: "WorkStatus",
    component: WorkStatus,
    beforeEnter: guardMyRoute,
    meta: { title: "view_workstatus", authentication_required: true },
  },

  {
    path: "/work-priority",
    name: "WorkPriority",
    component: WorkPriority,
    beforeEnter: guardMyRoute,
    meta: { title: "view_workpriority", authentication_required: true },
  },

  // files
  {
    path: "/files-list",
    name: "FilesList",
    component: FilesList,
    beforeEnter: guardMyRoute,
    meta: { title: "view_file", authentication_required: true },
  },

  // Activity
  {
    path: "/activities",
    name: "Activities",
    component: Activities,
    beforeEnter: guardMyRoute,
    meta: { title: "common", authentication_required: true },
  },

  // Last Day  Activity
  // {
  //   path: "/last-day-activity",
  //   name: "LastDayActivities",
  //   component: LastDayActivities,
  //   beforeEnter: guardMyRoute,
  //   meta: { title: "common", authentication_required: true },
  // },

  {
    path: "/notification-list",
    name: "NotificationList",
    component: NotificationList,
    beforeEnter: guardMyRoute,
    meta: { title: "common", authentication_required: true },
  },

  /* Multilang Module */
  // Multilangs
  // Language
  {
    path: "/add-new-language",
    name: "AddNewLanguage",
    component: AddNewLanguage,
    beforeEnter: guardMyRoute,
    meta: { title: "add_language", authentication_required: true },
  },
  {
    path: "/edit-language/:id",
    name: "EditLanguage",
    component: EditLanguage,
    beforeEnter: guardMyRoute,
    meta: { title: "change_language", authentication_required: true },
  },
  {
    path: "/all-languages",
    name: "AllLanguages",
    component: AllLanguages,
    beforeEnter: guardMyRoute,
    meta: { title: "view_language", authentication_required: true },
  },
  {
    path: "/language-details/:id",
    name: "langDetails",
    component: langDetails,
    beforeEnter: guardMyRoute,
    meta: { title: "view_language", authentication_required: true },
  },

  /* Voice Module */
  {
    path: "/voice-customization",
    name: "VoiceCustomization",
    component: VoiceCustomization,
    beforeEnter: guardMyRoute,
    meta: { title: "common", authentication_required: true },
  },
  {
    path: "/voice-configuration",
    name: "VoiceConfiguration",
    component: VoiceConfiguration,
    beforeEnter: guardMyRoute,
    meta: { title: "change_voiceeventdata", authentication_required: true },
  },

  // ForTestPurpose
  /* {
        path: '/test-purpose',
        name: 'ForTestPurpose',
        component: ForTestPurpose,
        beforeEnter: guardMyRoute,
        meta: {title: 'common', authentication_required: true}
    },*/
];

// calling routes
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// exporting
export default router;
