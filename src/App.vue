<template>
  <div id="app">
    <VueTimeline
      :currentTime.sync="currentTime"
      :unitPx="unitPx"
      :unitTime="unitTime"
      :duration="duration"
    >
      <div>videoLine</div>
    </VueTimeline>
    <input type="number" v-model.number="unitPx" />
    <input type="number" v-model.number="unitTime" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VueTimeline from "./components/VueTimeline.vue";

@Component({
  components: {
    VueTimeline
  }
})
export default class App extends Vue {
  private width = 600;
  private currentTime = 10.123;
  private unitPx = 10;
  private unitTime = 1;
  private duration = 63;
}
</script>

<style>
#app {
  padding-left: 100px;
}
</style>
