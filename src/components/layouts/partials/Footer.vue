<template>
  <div class="footerContainer">
    <p class="text-center mt-2">
      <strong>
        <span class="company" v-if="this_year"
          >Cloud Production © {{ this_year }}</span
        >
      </strong>
    </p>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      this_year: null,
    };
  },
  created() {
    this.loadYear();
  },
  methods: {
    loadYear() {
      const d = new Date();
      this.this_year = d.getFullYear();
    },
  },
};
</script>

<style>
.company {
  color: #69c5a5;
}
.footerContainer {
  border-top: 1px solid #eaeaea;
}
</style>
