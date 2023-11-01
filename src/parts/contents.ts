import { Func } from "../core/func";
import { MousePointer } from "../core/mousePointer";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
// import { Val } from "../libs/val";
import { Item } from "./item";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _item: Array<Item> = []

  constructor(opt:any) {
    super(opt)

    const num = Func.val(50, 100)
    for(let i = 0; i < num; i++) {
      const el = document.createElement('div')
      el.classList.add('js-item')
      this.el.prepend(el)

      this._item.push(new Item({
        el: el,
        id: i,
      }))
    }
  }

  protected _update():void {
    super._update()

    const mx = MousePointer.instance.easeNormal.x
    const my = MousePointer.instance.easeNormal.y
    const sw = Func.sw()
    const sh = Func.sh()
    const centerX = sw / 2
    const centerY = sh / 2

    this._item.forEach((item, i) => {
      const radius = Math.min(sh, sw) * 0.25 * Util.map(Math.sqrt(mx * mx + my * my), 1, 0.1, 0, 2)

      const w = (Math.max(sw, sh) / this._item.length) * 4
      const h = w * 1
      const fontSize = h * 0.5

      const rad = Util.radian(this._c * 0.5 * (i % 2 == 0 ? 1 : -1) + i * (360 / this._item.length))
      const x = Math.sin(rad) * radius
      const y = Math.cos(rad) * radius
      const dx = x
      const dy = y
      const ang = Math.atan2(dy, dx)
      Tween.set(item.el, {
        x: centerX + x,
        y: centerY + y,
        fontSize: fontSize,
        rotationZ: Util.degree(ang) + 90 + this._c * 2 * (i % 2 == 0 ? 1 : -1),
      })
    })
  }
}