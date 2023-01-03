<template>
  <div class="app-sidebar sidebar-shadow">
    <div class="app-header__logo">
      <!-- <div class="logo-src"></div> -->
      <div class="header__pane ml-auto">
        <!-- <div>
          <button
            type="button"
            class="hamburger close-sidebar-btn hamburger--elastic"
            data-class="closed-sidebar"
          >
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </button>
        </div> -->
      </div>
    </div>
    <div class="app-header__mobile-menu">
      <div>
        <button
          type="button"
          class="hamburger hamburger--elastic mobile-toggle-nav"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>
    <div class="app-header__menu">
      <span>
        <button
          type="button"
          class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
        >
          <span class="btn-icon-wrapper">
            <i class="fa fa-ellipsis-v fa-w-6"></i>
          </span>
        </button>
      </span>
    </div>

    <!--Sidebar Menu Start-->
    <div class="scrollbar-sidebar">
      <div class="app-sidebar__inner">
        <!-- new dashboard menu -->
        <ul class="vertical-nav-menu mt-2">
          <li>
            <router-link
              :to="{ path: '/dashboard' }"
              :class="{ 'mm-active': currentRoutePath(['/dashboard']) }"
            >
              <i class="metismenu-icon pe-7s-timer"></i>
              {{ $store.getters.GET_DASHBOARD }}
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ path: '/dashboard' }"
              :class="{ 'mm-active': currentRoutePath(['/dashboard']) }"
            >
              <i class="metismenu-icon pe-7s-timer"></i>
              Activity
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ path: '/dashboard' }"
              :class="{ 'mm-active': currentRoutePath(['/dashboard']) }"
            >
              <i class="metismenu-icon pe-7s-timer"></i>
              Settings
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ path: '/dashboard' }"
              :class="{ 'mm-active': currentRoutePath(['/dashboard']) }"
            >
              <i class="metismenu-icon pe-7s-timer"></i>
              Help & Support
            </router-link>
          </li>
        </ul>
        <!-- new dashboard menu  end-->
        <!-- demo Menu start -->
        <!-- demo Menu end -->
      </div>
    </div>
    <!--Sidebar Menu End-->
  </div>
</template>

<script>
import permissions from "@/authorization/permissions";
import "../../../assets/scripts/main";
// import $ from "jquery";

export default {
  name: "Sidebar",
  data() {
    return {};
  }, // data

  methods: {
    colseOther(event) {
      // var nav = document.querySelector(".vertical-nav-menu");
      // if (!event.target.open) return;
      // // Get all other open dropdowns and close them
      // var dropdowns = nav.querySelectorAll(".dropdown[open]");
      // Array.prototype.forEach.call(dropdowns, function (dropdown) {
      //   if (dropdown === event.target) return;
      //   dropdown.removeAttribute("open");
      // });
      console.log("kjkjkj", event);
      let removeAnchors = [...document.querySelectorAll("details")];
      removeAnchors.forEach((removeAnchor) => {
        removeAnchor.removeAttribute("open");
      });
      // e.target.nextSibling.removeAttribute("open");
      event.target.setAttribute("open", "");
    },
    new_method() {
      var nav = document.querySelector(".my-nav");
      nav.addEventListener(
        "toggle",
        function (event) {
          // Only run if the dropdown is open
          if (!event.target.open) return;
          // Get all other open dropdowns and close them
          var dropdowns = nav.querySelectorAll(".dropdown[open]");
          Array.prototype.forEach.call(dropdowns, function (dropdown) {
            if (dropdown === event.target) return;
            dropdown.removeAttribute("open");
          });
        },
        true
      );
    },
    currentRoutePath(routeName) {
      return routeName.includes(this.$route.path);
    },
    hasModulePermission(...module_name) {
      return permissions.hasModulePermission(...module_name);
      // return permissions.hasModulePermission.apply(...module_name)
    },

    hasModelPermission(model_name) {
      return permissions.hasModelPermission(model_name);
    },

    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
    OpenMenu(e) {
      let accordionItems = [...document.getElementsByClassName("mm-collapse")];
      accordionItems.forEach((accordionItem) => {
        accordionItem.classList.remove("mm-show");
      });
      let liItems = [...document.querySelectorAll("li")];
      liItems.forEach((liItem) => {
        liItem.classList.remove("mm-active");
      });
      let removeAnchors = [...document.querySelectorAll("a")];
      removeAnchors.forEach((removeAnchor) => {
        removeAnchor.classList.remove("mm-active");
      });
      e.target.nextSibling.classList.add("mm-show");
      // console.log(".", e.target.nextSibling.classList.add("mm-show"));
    },

    // opren menu back
    // OpenMenu(e) {
    //   let accordionItems = [...document.getElementsByClassName("mm-collapse")];
    //   accordionItems.forEach((accordionItem) => {
    //     accordionItem.classList.remove("mm-show");
    //   });
    //   let liItems = [...document.querySelectorAll("li")];
    //   liItems.forEach((liItem) => {
    //     liItem.classList.remove("mm-active");
    //   });
    //   let removeAnchors = [...document.querySelectorAll("a")];
    //   removeAnchors.forEach((removeAnchor) => {
    //     removeAnchor.classList.remove("mm-active");
    //   });

    //   console.log(".", e.target.nextSibling.classList.add("mm-show"));
    // },
  }, // methods

  created() {}, // created
}; // export default
// $(document).ready(function () {
//   $("#nav-mobile ul").hide();
//   $("#nav-mobile a").click(function (e) {
//     e.preventDefault();
//     var $menuItem = $(this).next("ul");
//     $menuItem.slideToggle();
//     $("#nav-mobile ul").not($menuItem).slideUp();
//   });
// });
</script>

<style scoped>
/* @import "../../main.css"; */
/* side bar scroll */
.app-sidebar__heading {
  color: #6e768e;
}
.vertical-nav-menu ul > li > a.mm-active {
  color: #57c5a5;
}
.vertical-nav-menu li.mm-active > a {
  color: #57c5a5;
}
.vertical-nav-menu li a.mm-active {
  color: white;
  /* background: #57c5a51f; */
  background: #00abb3;
}
.vertical-nav-menu li a {
  color: white !important;
}
/*  scroll sidebar */
.app-sidebar .app-sidebar__inner {
  padding: 2px 1.5rem 1.5rem;
  position: absolute;
  width: 279px;
  font-size: 13px;
  overflow-y: scroll;
  top: 0;
  bottom: 0;
  margin-top: 5px;
}
/* style  scrollbar*/
/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: none;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.1);
}

/*  a active  bg color */

.app-header__logo .logo-src {
  height: 23px;
  width: 97px;
  background: red;
  margin-left: 45px;
  opacity: 1;
}

/* demo Test menu CSS */

/* .my-nav {
  list-style: none;
  margin-left: -0.5em;
  margin-right: -0.5em;
  padding: 0;
}

.my-nav > li {
  display: block;
  margin-left: 0.5em;
  margin-right: 0.5em;
} */

@media (min-width: 40em) {
  .my-nav > li {
    display: inline-block;
  }
}

/**
 * @bugfix Prevent webkit from removing list semantics
 * 1. Add a non-breaking space
 * 2. Make sure it doesn't mess up the DOM flow
 */
/* .my-nav > li:before {
  content: "\200B";
  position: absolute;
} */

/**
 * Style the clickable text
 * Add your own styles to match other navigation items
 */
.dropdown > summary {
  cursor: pointer;
  /* Customize from here down */
  /* color: blue; */
}

/**
 * Position the dropdown content
 */
/* .dropdown {
  display: inline-block;
  position: relative;
} */

/**
 * Style the dropdown list
 */
/* .dropdown > ul {
  background-color: #ffffff;
  border-radius: 0.25em;
  list-style: none;
  margin: 0;
  padding: 0;
  min-width: 19em;
  position: absolute;
  top: 1.5em;
  z-index: 999;
} */

/**
 * @bugfix Prevent webkit from removing list semantics
 * 1. Add a non-breaking space
 * 2. Make sure it doesn't mess up the DOM flow
 */
/* .dropdown > ul > li:before {
  content: "\200B";
  position: absolute;
} */
/*  */
.CursorPointer {
  cursor: pointer;
}

/* HIDE SUMMERY MARKER */
details > summary {
  list-style: none;
}
details > summary::-webkit-details-marker {
  display: none;
}
/* VERTICAL NAV SPAN */
.vertical-nav-menu li summary span {
  display: block;
  line-height: 2.4rem;
  height: 2.4rem;
  padding: 0 1.5rem 0 45px;
  position: relative;
  border-radius: 0.25rem;
  /* color: #343a40; */
  color: white;
  white-space: nowrap;
  transition: all 0.2s;
  margin: 0.1rem 0;
}

.vertical-nav-menu li.mm-active > details summary span {
  color: #57c5a5;
}

.vertical-nav-menu li.mm-active > details summary span {
  font-weight: bold;
}
/* hover */
.vertical-nav-menu li summary span:hover {
  background: #00abb3 !important;
  text-decoration: none;
  /* color: red; */
}
/*  new invw design */

.app-theme-white.fixed-header .app-header__logo {
  background: #3c4048 !important;
}
.app-theme-white .app-header {
  background: #3c4048 !important;
}
.app-theme-white .app-sidebar {
  background: #3c4048 !important;
  color: white !important;
}
</style>
