<template>
  <div class="footerContainer">
    <p class="text-center mt-2">
      <strong>
        <span>A product of Bondstein Technology Limited</span>
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
  /* border-top: 1px solid #eaeaea; */
  color: white !important;
  background: #3c4048;
  padding: 10px;
}
</style>
