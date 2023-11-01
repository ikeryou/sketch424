import { MyDisplay } from "../core/myDisplay";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _txtList: Array<string> = []
  private _itemId: number = 0

  constructor(opt:any) {
    super(opt)

    this._itemId = opt.id

    const max = this._itemId % 2 != 0 ? 50 : 150
    for(let i = 0; i < max; i++) {
      if(this._itemId % 2 == 0) {
        this._txtList.push(i <= 1 ? 'a' : String.fromCharCode(65 + Math.floor(Math.random() * 26)))
      } else {
        if(Util.hit(20)) {
          // this._txtList.push(String.fromCharCode(65 + Math.floor(Math.random() * 26)))
          this._txtList.push('x')
        } else {
          this._txtList.push('a')
        }
      }
    }

    this.useGPU(this.el)
  }

  protected _update():void {
    super._update();

    const num = ~~(Util.map(Math.sin(this._c * 0.05 + ~~(this._itemId / 2) * 1), 0, this._txtList.length, -1, 1))
    let txt = ''
    for(let i = 0; i < num; i++) {
      txt += this._txtList[i]
    }
    this.el.innerHTML = txt
  }
}







