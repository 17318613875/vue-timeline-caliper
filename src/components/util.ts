/**
 * @description 时间 转 文本
 * @param time 时间 单位秒
 */
export function PointTime(time: number) {
  const A = (num: number) => ("00" + num).slice(-2);
  const B = (num: number) => ("000" + num).slice(-3);
  const t = new Date(Math.floor(1e3 * time)),
    a = t.getUTCHours(),
    n = t.getUTCMinutes(),
    i = t.getUTCSeconds(),
    o = Math.floor(1000 * time) % 1000,
    r = `${A(n)}:${A(i)}.${B(o)}`;
  return `${A(a)}:${r}`;
}
/**
 *
 * @param account
 * @param timeLinePice
 * @param param2
 * @param canvas
 */
type DrawOpts = {
  width: number;
  height: number;
  offsetTime: number;
  PxS: number;
  unitPx: number;
};
function DrawTimeLineItem(
  ctx: CanvasRenderingContext2D,
  [BX, BY]: [number, number],
  time: number | boolean,
  unit: number
): void {
  ctx.beginPath();
  ctx.moveTo(BX, BY);
  ctx.lineTo(BX, 70);
  if (time || time === 0) {
    ctx.font = "12px Arial";
    ctx.fillStyle = "#333";
    ctx.strokeStyle = "#333";
    ctx.fillText(PointTime(time as number), BX, 30);
    time === 0 && ctx.fillText(`${unit.toFixed(1)}px/s`, BX, 42);
  } else {
    ctx.fillStyle = "#999";
    ctx.strokeStyle = "#888";
  }
  ctx.lineWidth = 1;
  ctx.stroke();
}
export function DrawTimeLine(
  ctx: CanvasRenderingContext2D,
  { width, height, PxS, unitPx, offsetTime }: DrawOpts
) {
  ctx.clearRect(0, 0, width, height);
  let account = 0;
  let X = -(offsetTime * PxS);
  const h1 = height / 1.3;
  const h2 = height / 1.25;
  const h3 = height / 1.1;
  const duration_ = offsetTime + width / PxS;
  do {
    const Y = account % 5 === 0 ? (account % 10 === 0 ? h1 : h2) : h3;
    X >= 0 && DrawTimeLineItem(ctx, [X + 1, Y], Y == h1 ? account : false, PxS);
    X += unitPx;
    account++;
  } while (account < duration_);
}
