<!--HTML-->
<template>
  <div
    class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header"
    :class="[is_active ? 'closed-sidebar' : null]"
  >
    <Navbar />
    <div class="app-main">
      <Sidebar />
      <div class="app-main__outer">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
  <div>
    <Footer />
  </div>
</template>


<script>
import Sidebar from "./partials/Sidebar";
import Navbar from "./partials/Navbar";
import Footer from "./partials/Footer";
// import "../../assets/scripts/main";
// import ".../scripts/main.js";
// import '@/';

export default {
  name: "Master",
  components: { Navbar, Sidebar, Footer },
  data() {
    return {};
  },
  computed: {
    is_active() {
      return this.$store.state.is_active;
    },
  },
  methods: {},
};
</script>


<style>
@import "../../main.css";
</style>

