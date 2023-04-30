export class Tile{
     constructor(gridElement){
          this.tileElement = document.createElement("div");
          this.tileElement.classList.add("tile");
          this.setValue(Math.random() > 0.25 ? 2 : 4);
          // this.setValue(Math.floor(Math.random() *10));
          gridElement.append(this.tileElement);
     }
     setXY(x, y){
          this.x = x;
          this.y = y;
          this.tileElement.style.setProperty("--x", x);
          this.tileElement.style.setProperty("--y", y);

     }
     setValue(value){
          this.value = value;
          this.tileElement.textContent = this.value;
          const bgLightness = 100 - Math.log2(value) * 9;
          this.tileElement.style.setProperty("--bg-lightness", bgLightness+"%");
          this.tileElement.style.setProperty("--text-lightness", (bgLightness > 50 ? 10 : 90)+"%");
     }
     removeFromDOM(){
          this.tileElement.remove();
     }
     waitForTransitionEnd(){
          return new Promise(resolve => {
               this.tileElement.addEventListener("transitionend", resolve, {once:true});
          })
     }
     waitForAnimationEnd() {
          return new Promise(resolve => {
               this.tileElement.addEventListener(
                   "animationend", resolve, { once: true });
          });
     }
}