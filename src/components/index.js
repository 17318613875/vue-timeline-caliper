import VueTimeline from "./VueTimeline.vue";

VueTimeline.install = function(Vue) {
  Vue.component(VueTimeline.name, VueTimeline);
};

export default VueTimeline;
