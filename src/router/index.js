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
import ActivityMotion from "../views/ActivityMotion";

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
    path: "/dashboard/Activity_motion",
    name: "ActivityMotion",
    component: ActivityMotion,
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
