<script lang="tsx">
import { Vue, Component, Prop, PropSync, Watch } from "vue-property-decorator";
import { PointTime, DrawTimeLine } from "./util";

@Component({})
export default class VueTimeline extends Vue {
  @Prop({ default: 500, type: Number }) width!: number;
  @PropSync("currentTime") currentTimeSync!: number;
  @Prop({ default: 46, type: Number }) height!: number;
  @Prop({
    default: 10,
    type: Number,
    validator: (val: number) => val * 1 > 0
  })
  unitPx!: number;
  @Prop({ default: 1, type: Number }) unitTime!: number;
  @Prop({ default: 1, type: Number }) duration!: number;

  private myContent!: HTMLDivElement;
  private ctx!: CanvasRenderingContext2D;
  private offsetTime = 5;

  get offsetTimeSync() {
    return this.offsetTime;
  }

  set offsetTimeSync(val) {
    if (typeof val === "number" && val >= 0) {
      this.$emit("update:offsetTime", val);
      this.offsetTime = val;
      this.Draw();
    }
  }

  get currentTimeStr() {
    return PointTime(this.currentTimeSync);
  }

  get PxS() {
    const { unitPx, unitTime } = this;
    return unitPx / unitTime;
  }

  get pointerTranslate3d() {
    const { currentTimeSync, PxS } = this;
    return `translate3d(${currentTimeSync * PxS}px, 0, 0)`;
  }

  @Watch("PxS")
  onChangePxSVal(newVal: number, oldVal: number) {
    newVal != oldVal && this.Draw();
  }

  public Draw() {
    const { ctx, width, height, PxS, unitPx, offsetTime } = this;
    ctx &&
      DrawTimeLine(ctx, {
        width,
        height,
        PxS,
        unitPx,
        offsetTime
      });
  }

  public SetScrollTo() {
    const { offsetTimeSync, PxS } = this;
    this.myContent.scrollTo(~~(offsetTimeSync * PxS), 0);
  }

  public GetScroll(event: Event) {
    const div = event.target as HTMLDivElement;
    this.offsetTimeSync = div.scrollLeft / this.PxS;
  }

  public SetCurrentTime({ offsetX, pageX }: MouseEvent, flag: boolean) {
    const { PxS, offsetTimeSync } = this;
    if (flag) {
      this.currentTimeSync += (pageX - this.pageX) / PxS;
      this.pageX = pageX;
    } else {
      this.currentTimeSync = offsetX / PxS + offsetTimeSync;
    }
  }

  private pageX!: number;
  private moveFlag = false;
  onMouseDown({ pageX }: MouseEvent) {
    this.pageX = pageX;
    this.moveFlag = true;
    window.addEventListener("mouseup", this.onMouseup);
    window.addEventListener("mousemove", this.onMouseMove);
  }
  onMouseMove(event: MouseEvent) {
    this.moveFlag && this.SetCurrentTime(event, true);
  }
  onMouseup() {
    this.pageX = 0;
    this.moveFlag = false;
    window.removeEventListener("mouseup", this.onMouseup);
    window.removeEventListener("mousemove", this.onMouseMove);
  }

  mounted() {
    const { width, height } = this;
    this.myContent = this.$refs.myContent as HTMLDivElement;
    const canvas = this.$refs.myTimeLine as HTMLCanvasElement;
    canvas.width = width;
    canvas.height = height;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.Draw();
    this.SetScrollTo();
  }

  protected render() {
    const {
      width,
      height,
      pointerTranslate3d,
      currentTimeStr,
      $slots: { default: slotDefault },
      GetScroll,
      SetCurrentTime,
      onMouseDown
    } = this;
    return (
      <div
        ref="myContent"
        class="timeline__content"
        style={{ width: `${width}px`, paddingTop: `${height}px` }}
        onScroll={GetScroll}
      >
        <canvas
          ref="myTimeLine"
          class="timeline__canvas"
          style={{ height: `${height}px` }}
          onClick={SetCurrentTime}
        />
        <div class="timeline__body">{slotDefault}</div>
        <div
          class="timeline__pointer"
          title="播放指针"
          style={{ transform: pointerTranslate3d }}
        >
          <div class="timer">
            <span class="time-show" onMousedown={onMouseDown}>
              {currentTimeStr}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
</script>
<style scoped>
.timeline__content {
  position: relative;
  overflow-x: auto;
}
.timeline__content .timeline__canvas {
  position: fixed !important;
  top: 0px;
}
.timeline__content .timeline__pointer {
  position: absolute !important;
  width: 1px;
  top: 0;
  z-index: 1000;
  height: 100%;
  background-color: #df2c2f;
  pointer-events: none;
  user-select: none;
}
.timeline__content .timeline__pointer .timer {
  display: inline-block;
  min-width: 120px;
  height: 25px;
  position: relative;
  background: #df2c2f;
  color: #f9f9f9;
  border-radius: 2px;
  text-align: center;
  cursor: ew-resize;
  align-items: center;
  justify-content: space-around;
  pointer-events: initial;
  display: flex;
  flex-direction: row;
  padding-right: 5px;
}
.timeline__content .timeline__body {
  min-width: 1000px;
  min-height: 50px;
}
</style>
