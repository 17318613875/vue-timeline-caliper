# vue-timeline

## install

```shell
yarn add vue-gl-transitions
```

## use

```tsx
...
import VueTimeline from "./components/VueTimeline.vue";

@Component({ components: { VueTimeline } })
export default class App extends Vue {
  private width = 600;
  private currentTime = 10.123;
  private unitPx = 10;
  private unitTime = 1;
  private duration = 63;

  protected render() {
    const { currentTime, unitPx, unitTime, duration }
    return (
      <VueTimeline
        currentTime.sync={currentTime}
        unitPx={unitPx}
        unitTime={unitTime}
        duration={duration}
      >
        <div>videoLine</div>
      </VueTimeline>
    )
  }
}
```
