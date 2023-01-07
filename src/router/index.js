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

/* Auth Module */
// user components
import CreateNewUser from "../components/AuthModule/User/CreateNewUser";
import UserList from "../components/AuthModule/User/UserList";
import UpdateUser from "../components/AuthModule/User/UpdateUser";
import UserDetails from "../components/AuthModule/User/UserDetails";

// profile components
import UserProfile from "../components/AuthModule/Profile/UserProfile";
import UpdatePassword from "@/components/AuthModule/Profile/UpdatePassword";
import UpdateProfile from "@/components/AuthModule/Profile/UpdateProfile";

// group components
import CreateGroup from "../components/AuthModule/Group/CreateGroup";
import GroupList from "../components/AuthModule/Group/GroupList";
import UpdateGroup from "../components/AuthModule/Group/UpdateGroup";

// department components
import CreateDepartment from "../components/AuthModule/Department/CreateDepartment";
import UpdateDepartment from "../components/AuthModule/Department/UpdateDepartment";
import DepartmentList from "../components/AuthModule/Department/DepartmentList";

// branch component
import CreateBranch from "../components/AuthModule/Branch/CreateBranch";
import BranchList from "../components/AuthModule/Branch/BranchList";
import UpdateBranch from "../components/AuthModule/Branch/UpdateBranch";

// Designation components
import CreateDesignation from "../components/AuthModule/Designation/CreateDesignation";
import UpdateDesignation from "../components/AuthModule/Designation/UpdateDesignation";
import DesignationList from "../components/AuthModule/Designation/DesignationList";

/* Attendance Module */
// Attendance components
import AttendanceRecords from "../components/AttendanceModule/AttendanceRecords/AttendanceRecords";
import MyAttendanceRecords from "../components/AttendanceModule/AttendanceRecords/MyAttendanceRecords";
// import AttendanceEntry from "../components/AttendanceModule/AttendanceRecords/AttendanceEntry";
// import EmployeeAttendanceEntry from "../components/AttendanceModule/AttendanceRecords/EmployeeAttendanceRecords";

// Holiday
import HolidayList from "../components/AttendanceModule/Holiday/HolidayList";
import CreateHoliday from "../components/AttendanceModule/Holiday/CreateHoliday";
import UpdateHoliday from "../components/AttendanceModule/Holiday/UpdateHoliday";

// Branch Holiday Components
import BranchHolidayList from "../components/AttendanceModule/BranchHoliday/BranchHolidayList";
import CreateBranchHoliday from "../components/AttendanceModule/BranchHoliday/CreateBranchHoliday";
import UpdateBranchHoliday from "../components/AttendanceModule/BranchHoliday/UpdateBranchHoliday";

// leave Types
import LeaveTypes from "../components/AttendanceModule/LeaveType/LeaveTypes";
import AddLeaveTypes from "../components/AttendanceModule/LeaveType/AddLeaveTypes";
import UpdateLeaveTypes from "../components/AttendanceModule/LeaveType/UpdateLeaveTypes";

// AllLeaves
import AddLeaveRequest from "../components/AttendanceModule/AllLeaves/AddLeaveRequest";
import UpdateLeaveReq from "../components/AttendanceModule/AllLeaves/UpdateLeaveReq";
import AllLeaves from "../components/AttendanceModule/AllLeaves/AllLeaves";
import AllLeavesDetails from "../components/AttendanceModule/AllLeaves/AllLeavesDetails";
import MyLeaveDetails from "../components/AttendanceModule/AllLeaves/MyLeaveDetails";

// My leave History
import MyLeaveHistory from "../components/AttendanceModule/MyLeaveHistory";

/* Evaluation Module */
// Evaluation Graph
import SingleMember from "../components/EvaluationModule/EvaluationGraph/SingleMember";
// import DepartmentWise from "../components/EvaluationModule/EvaluationGraph/DepartmentWise";
import MyEvaluation from "../components/EvaluationModule/EvaluationGraph/MyEvaluation";

// Rating point
import CreateRatingPoint from "../components/EvaluationModule/Rating Points/CreateRatingPoint";
import RatingPointList from "../components/EvaluationModule/Rating Points/RatingPointList";
import EditRatingPoint from "../components/EvaluationModule/Rating Points/EditRatingPoint";

//  Rating
import CreateRating from "../components/EvaluationModule/Ratings/CreateRating";
import RatingList from "../components/EvaluationModule/Ratings/RatingList";
import EditRating from "../components/EvaluationModule/Ratings/EditRating";

//  Evaluation
import AddEvaluation from "../components/EvaluationModule/AddEvaluation";

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

/* Notice Module */
import AddNewNotice from "../components/NoticeModule/Notice/AddNewNotice";
import EditNotice from "../components/NoticeModule/Notice/EditNotice";
import AllNotices from "../components/NoticeModule/Notice/AllNotices";
import NoticeDetails from "../components/NoticeModule/Notice/NoticeDetails";

/* Multilang Module */
import AddNewLanguage from "../components/MultilangModule/Multilang/AddNewLanguage";
import EditLanguage from "../components/MultilangModule/Multilang/EditLanguage";
import AllLanguages from "../components/MultilangModule/Multilang/AllLanguages";
import langDetails from "../components/MultilangModule/Multilang/langDetails";

/* Comment Module */
import CommentList from "../components/CommentModule/CommentStore/CommentList";
/* File Module */
import AllFilesList from "../components/FileModule/FileStore/AllFilesList";
import AddNewFile from "../components/FileModule/FileStore/AddNewFile";
import EditFile from "../components/FileModule/FileStore/EditFile";
// notification list
import NotificationList from "../components/NotificationList/NotificationList";
/* Voice Module */
import VoiceCustomization from "../components/VoiceModule/VoiceCustomization";
import VoiceConfiguration from "../components/VoiceModule/VoiceConfiguration";
// dashboard widgets
// notice
import NoticeWidget from "../components/Dashboard/NoticeWidget";
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
  // User
  {
    path: "/create-new-user",
    name: "CreateNewUser",
    component: CreateNewUser,
    beforeEnter: guardMyRoute,
    meta: { title: "add_user", authentication_required: true },
  },

  {
    path: "/user-list",
    name: "UserList",
    component: UserList,
    beforeEnter: guardMyRoute,
    meta: { title: "view_user", authentication_required: true },
  },

  {
    path: "/update-user/:id",
    name: "UpdateUser",
    component: UpdateUser,
    beforeEnter: guardMyRoute,
    meta: { title: "change_user", authentication_required: true },
  },

  {
    path: "/user-details/:id",
    name: "UserDetails",
    component: UserDetails,
    beforeEnter: guardMyRoute,
    meta: { title: "view_user", authentication_required: true },
  },

  {
    path: "/user-profile",
    name: "UserProfile",
    component: UserProfile,
    beforeEnter: guardMyRoute,
    meta: { title: "common", authentication_required: true },
  },

  // Group
  {
    path: "/create-group",
    name: "CreateGroup",
    component: CreateGroup,
    beforeEnter: guardMyRoute,
    meta: { title: "add_group", authentication_required: true },
  },

  {
    path: "/update-group/:id",
    name: "UpdateGroup",
    component: UpdateGroup,
    beforeEnter: guardMyRoute,
    meta: { title: "change_group", authentication_required: true },
  },

  {
    path: "/group-list",
    name: "GroupList",
    component: GroupList,
    beforeEnter: guardMyRoute,
    meta: { title: "view_group", authentication_required: true },
  },

  // department
  {
    path: "/create-department",
    name: "CreateDepartment",
    component: CreateDepartment,
    beforeEnter: guardMyRoute,
    meta: { title: "add_department", authentication_required: true },
  },

  {
    path: "/update-department/:id",
    name: "UpdateDepartment",
    component: UpdateDepartment,
    beforeEnter: guardMyRoute,
    meta: { title: "change_department", authentication_required: true },
  },

  {
    path: "/department-list",
    name: "DepartmentList",
    component: DepartmentList,
    beforeEnter: guardMyRoute,
    meta: { title: "view_department", authentication_required: true },
  },

  // branch
  {
    path: "/create-branch",
    name: "CreateBranch",
    component: CreateBranch,
    beforeEnter: guardMyRoute,
    meta: { title: "add_branch", authentication_required: true },
  },

  {
    path: "/update-branch/:id",
    name: "UpdateBranch",
    component: UpdateBranch,
    beforeEnter: guardMyRoute,
    meta: { title: "change_branch", authentication_required: true },
  },

  {
    path: "/branch-list",
    name: "BranchList",
    component: BranchList,
    beforeEnter: guardMyRoute,
    meta: { title: "view_branch", authentication_required: true },
  },

  {
    path: "/update-password",
    name: "UpdatePassword",
    component: UpdatePassword,
    beforeEnter: guardMyRoute,
    meta: { title: "common", authentication_required: true },
  },
  {
    path: "/update-profile",
    name: "UpdateProfile",
    component: UpdateProfile,
    beforeEnter: guardMyRoute,
    meta: { title: "common", authentication_required: true },
  },

  // Designation
  {
    path: "/create-designation",
    name: "CreateDesignation",
    component: CreateDesignation,
    beforeEnter: guardMyRoute,
    meta: { title: "add_designation", authentication_required: true },
  },

  {
    path: "/update-designation/:id",
    name: "UpdateDesignation",
    component: UpdateDesignation,
    beforeEnter: guardMyRoute,
    meta: { title: "change_designation", authentication_required: true },
  },

  {
    path: "/designation-list",
    name: "DesignationList",
    component: DesignationList,
    beforeEnter: guardMyRoute,
    meta: { title: "view_designation", authentication_required: true },
  },

  // Attendance Module

  {
    path: "/all-attendance-records",
    name: "AttendanceRecords",
    component: AttendanceRecords,
    beforeEnter: guardMyRoute,
    meta: { title: "view_attendancerecord", authentication_required: true },
  },
  {
    path: "/my-attendance-records",
    name: "MyAttendanceRecords",
    component: MyAttendanceRecords,
    beforeEnter: guardMyRoute,
    meta: { title: "common", authentication_required: true },
  },

  //  Create Holiday
  {
    path: "/holiday-list",
    name: "HolidayList",
    component: HolidayList,
    beforeEnter: guardMyRoute,
    meta: { title: "view_holiday", authentication_required: true },
  },

  {
    path: "/create-holiday",
    name: "CreateHoliday",
    component: CreateHoliday,
    beforeEnter: guardMyRoute,
    meta: { title: "add_holiday", authentication_required: true },
  },

  {
    path: "/update-holiday/:id",
    name: "UpdateHoliday",
    component: UpdateHoliday,
    beforeEnter: guardMyRoute,
    meta: { title: "change_holiday", authentication_required: true },
  },
  // Branch Holiday
  {
    path: "/branch-holiday-list",
    name: "BranchHolidayList",
    component: BranchHolidayList,
    beforeEnter: guardMyRoute,
    meta: { title: "view_branchholiday", authentication_required: true },
  },
  {
    path: "/create-branch-holiday",
    name: "CreateBranchHoliday",
    component: CreateBranchHoliday,
    beforeEnter: guardMyRoute,
    meta: { title: "add_branchholiday", authentication_required: true },
  },
  {
    path: "/update-branch-holiday/:id",
    name: "UpdateBranchHoliday",
    component: UpdateBranchHoliday,
    beforeEnter: guardMyRoute,
    meta: { title: "change_branchholiday", authentication_required: true },
  },
  // Leave Type
  {
    path: "/leave-types",
    name: "LeaveTypes",
    component: LeaveTypes,
    beforeEnter: guardMyRoute,
    meta: { title: "view_leavetype", authentication_required: true },
  },

  {
    path: "/create-leave-types",
    name: "AddLeaveTypes",
    component: AddLeaveTypes,
    beforeEnter: guardMyRoute,
    meta: { title: "add_leavetype", authentication_required: true },
  },

  {
    path: "/update-leave-types/:id",
    name: "UpdateLeaveTypes",
    component: UpdateLeaveTypes,
    beforeEnter: guardMyRoute,
    meta: { title: "change_leavetype", authentication_required: true },
  },

  // AllLeaves
  {
    path: "/all-leaves",
    name: "AllLeaves",
    component: AllLeaves,
    beforeEnter: guardMyRoute,
    meta: { title: "view_leave", authentication_required: true },
  },

  {
    path: "/all-leaves-details/:id",
    name: "AllLeavesDetails",
    component: AllLeavesDetails,
    beforeEnter: guardMyRoute,
    meta: { title: "view_leave", authentication_required: true },
  },
  {
    path: "/my-leaves-details/:id",
    name: "MyLeaveDetails",
    component: MyLeaveDetails,
    beforeEnter: guardMyRoute,
    meta: { title: "common", authentication_required: true },
  },

  {
    path: "/my-leaves",
    name: "MyLeaveHistory",
    component: MyLeaveHistory,
    beforeEnter: guardMyRoute,
    meta: { title: "common", authentication_required: true },
  },

  {
    path: "/add-leaves-request",
    name: "AddLeaveRequest",
    component: AddLeaveRequest,
    beforeEnter: guardMyRoute,
    meta: { title: "add_leave", authentication_required: true },
  },

  {
    path: "/update-leave-request/:id",
    name: "UpdateLeaveReq",
    component: UpdateLeaveReq,
    beforeEnter: guardMyRoute,
    meta: { title: "change_leave", authentication_required: true },
  },
  // {
  //   path: "/attendance-entry",
  //   name: "AttendanceEntry",
  //   component: AttendanceEntry,
  //   beforeEnter: guardMyRoute,
  //   meta: { title: "common", authentication_required: true },
  // },
  // {
  //   path: "/employee-attendance-entry",
  //   name: "EmployeeAttendanceEntry",
  //   component: EmployeeAttendanceEntry,
  //   beforeEnter: guardMyRoute,
  //   meta: { title: "common", authentication_required: true },
  // },

  // test compoenent by sayket
  // {
  //   path: "/test-component",
  //   name: "TestComponent",
  //   component: TestComponent,
  //   beforeEnter: guardMyRoute,
  //   meta: { title: "common", authentication_required: true },
  // },

  {
    path: "/evaluation-graph",
    name: "SingleMember",
    component: SingleMember,
    beforeEnter: guardMyRoute,
    meta: { title: "view_evaluation", authentication_required: true },
  },

  // {
  //   path: "/department-wise",
  //   name: "DepartmentWise",
  //   component: DepartmentWise,
  //   beforeEnter: guardMyRoute,
  //   meta: { title: "common", authentication_required: true },
  // },

  {
    path: "/my-evaluation",
    name: "MyEvaluation",
    component: MyEvaluation,
    beforeEnter: guardMyRoute,
    meta: { title: "common", authentication_required: true },
  },

  // Add Evaluation
  {
    path: "/add-evaluation",
    name: "AddEvaluation",
    component: AddEvaluation,
    beforeEnter: guardMyRoute,
    meta: { title: "add_evaluation", authentication_required: true },
  },
  // Rating point
  {
    path: "/create-rating-point",
    name: "CreateRatingPoint",
    component: CreateRatingPoint,
    beforeEnter: guardMyRoute,
    meta: { title: "add_ratingpoint", authentication_required: true },
  },
  {
    path: "/rating-point-list",
    name: "RatingPointList",
    component: RatingPointList,
    beforeEnter: guardMyRoute,
    meta: { title: "view_ratingpoint", authentication_required: true },
  },
  {
    path: "/edit-rating-point/:id",
    name: "EditRatingPoint",
    component: EditRatingPoint,
    beforeEnter: guardMyRoute,
    meta: { title: "change_ratingpoint", authentication_required: true },
  },

  //  Rating
  {
    path: "/create-rating",
    name: "CreateRating",
    component: CreateRating,
    beforeEnter: guardMyRoute,
    meta: { title: "add_rating", authentication_required: true },
  },
  {
    path: "/rating-list",
    name: "RatingList",
    component: RatingList,
    beforeEnter: guardMyRoute,
    meta: { title: "view_rating", authentication_required: true },
  },
  {
    path: "/edit-rating/:id",
    name: "EditRating",
    component: EditRating,
    beforeEnter: guardMyRoute,
    meta: { title: "change_rating", authentication_required: true },
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

  /* Notice Module */
  // Notices
  {
    path: "/add-new-notice",
    name: "AddNewNotice",
    component: AddNewNotice,
    beforeEnter: guardMyRoute,
    // permission / router work ?
    meta: { title: "add_notice", authentication_required: true },
  },
  {
    path: "/all-notices",
    name: "AllNotices",
    component: AllNotices,
    beforeEnter: guardMyRoute,
    meta: { title: "view_notice", authentication_required: true },
  },
  {
    // path: "/edit-notice/:id",
    path: "/edit-notice/:id",
    name: "EditNotice",
    component: EditNotice,
    beforeEnter: guardMyRoute,
    meta: { title: "change_notice", authentication_required: true },
  },
  {
    path: "/notice-widget",
    name: "NoticeWidget",
    component: NoticeWidget,
    beforeEnter: guardMyRoute,
    meta: { title: "common", authentication_required: true },
  },
  {
    path: "/notice-details/:id",
    name: "NoticeDetails",
    component: NoticeDetails,
    beforeEnter: guardMyRoute,
    meta: { title: "view_notice", authentication_required: true },
  },
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

  /* Comment Module */
  // comment list
  {
    path: "/comment-list",
    name: "CommentList",
    component: CommentList,
    beforeEnter: guardMyRoute,
    meta: { title: "common", authentication_required: true },
  },

  /* File Module */
  // file list
  {
    path: "/file-list",
    name: "AllFilesList",
    component: AllFilesList,
    beforeEnter: guardMyRoute,
    meta: { title: "common", authentication_required: true },
  },

  {
    path: "/add-new-file",
    name: "AddNewFile",
    component: AddNewFile,
    beforeEnter: guardMyRoute,
    meta: { title: "common", authentication_required: true },
  },
  {
    path: "/Edit-file",
    name: "EditFile",
    component: EditFile,
    beforeEnter: guardMyRoute,
    meta: { title: "common", authentication_required: true },
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
