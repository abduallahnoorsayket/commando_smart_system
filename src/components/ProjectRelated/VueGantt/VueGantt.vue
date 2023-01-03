
<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner" id="recordsModal">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-list-alt icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                Project Details
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
        <DefaultTheme>
          <Gantt
            class="left-container"
            :tasks="tasks"
            :links="links"
            :scales="scales"
            :columns="columns"
          />
        </DefaultTheme>
      </div>
    </template>
  </Master>
</template>


<script>
import Master from "../../layouts/Master";
import { Gantt, DefaultTheme } from "@dhtmlx/trial-vue-gantt";
import { columns, scales, tasks, links } from "./data";

export default {
  name: "VueGantt",
  components: {
    Gantt,
    DefaultTheme,
    Master,
  },
  data: () => ({
    columns,
    scales,
    tasks,
    links,
  }),
};
</script>
<style scoped>
.left-container {
  overflow: hidden;
  position: relative;
  height: 75%;
  width: 100%;
}


</style>