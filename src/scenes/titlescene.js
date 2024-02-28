import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {
    preload() {
       
    }

    create() {
       const title = this.add.text(400, 250, "old School Archery",{
             fontSize: 38,
       });
         title.setOrigin(0.5, 0.5);

         this.add.text(400, 350, "Press Space to Start", {
              // fontSize: 38,
          })
          .setOrigin(0.5);

          this.input.keyboard.once("keydown-SPACE", () => {
              this.scene.start("Game-scene");
          }
          );
    } 
}
