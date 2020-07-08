# vue-timeline

## install

```shell
yarn add vue-gl-transitions
```

## use

```tsx
...
import VueTimelineCaliper from "./components/VueTimelineCaliper.vue";

@Component({ components: { VueTimelineCaliper } })
export default class App extends Vue {
  private width = 600;
  private currentTime = 10.123;
  private unitPx = 10;
  private unitTime = 1;
  private duration = 63;

  protected render() {
    const { currentTime, unitPx, unitTime, duration }
    return (
      <VueTimelineCaliper
        currentTime.sync={currentTime}
        unitPx={unitPx}
        unitTime={unitTime}
        duration={duration}
      >
        <div>videoLine</div>
      </VueTimelineCaliper>
    )
  }
}
```
