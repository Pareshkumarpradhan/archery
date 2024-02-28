import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game-scene");

    this.shot = false;
    this.bow, this.bag, this.arrow, this.angle, this.newArrow;
    this.score = 0;
    this.x;
    this.y;
    this.oldx, this.oldy;
    this.xVel; // calculate this based on distance
    this.yVel; //
    this.g = 0.25;
    this.sb;
    this.arrowCreated = false;
  }

  preload() {
    this.load.image("arrow", "assets/arrow.png");
    this.load.image("bow", "assets/bow.png");
    this.load.image("bag", "assets/bag.png");
    // this.load.image("bg", "assets/bg.png");

    this.load.audio("hitSound", "sound/arrow-hit.wav");
    this.load.audio("shootSound", "sound/arrow-move.wav");
    this.load.audio("bgSound", "sound/background-music.wav");
  }

  create() {


    // let bg1 = this.add
    //   .image(0, 0, "bg")
    //   .setOrigin(0)
    //   .setScale(1.3)
    //   .setTint(0x3d6f9c);
    this.bow = this.add.image(120, 450, "bow");
    this.bag = this.add.image(700, 450, "bag");
    // this.arrow = this.add.image(120, 300, "arrow").setScale(0.5).setOrigin(0.5);

    
    // this.physics.world.enable([this.bow, this.bag]);
    // this.physics.add.collider(this.bow, this.bag);
    



    this.sb = this.add.text(600, 20, "Score 0", {
      fontFamily: "Arial",
      fontSize: 30,
      color: "#ffff00",
    });

    this.add.text(60, 20, "Archery Game ", {
      fontFamily: "Arial",
      fontSize: 20,
      color: "#ffff00",
    });

    this.createArrow();
    console.log(this.shot);

    this.arrow = this.add
      .sprite(this.bow.x, this.bow.y, "arrow")
      .setScale(0.5)
      .setOrigin(0.5);
    this.arrow.angle = this.bow.angle;
    this.x = this.oldx = this.arrow.x;
    this.y = this.oldy = this.arrow.y;
    this.input.on("pointerdown", (pointer) => {
      this.createArrow();
    });
    this.input.on("pointerup", (pointer) => {
      this.shootArrow();
    });

    this.hitSound = this.sound.add("hitSound");
    this.shootSound = this.sound.add("shootSound");

    this.bgSound = this.sound.add("bgSound", { loop: true });
    this.bgSound.play();
    this.bgSound.setVolume(1);
   
  }

  update() {
    if (!this.shot) {
      this.arrow.setAlpha(1);
      this.angle =
        Math.atan2(
          this.input.mousePointer.x - this.bow.x,
          -(this.input.mousePointer.y - this.bow.y)
        ) *
          (180 / Math.PI) -
        180;
      this.bow.angle = this.arrow.angle = this.angle;
    } else {
      this.arrow.setAlpha(0);
      //console.log("x",x,"y",y,"xVel",xVel,"yVel",yVel,"oldx",oldx,"oldy",oldy);
      this.x += this.xVel;
      this.y += this.yVel;
      this.yVel += this.g;
      this.newArrow.x = this.x;
      this.newArrow.y = this.y;
      this.arrowAngle =
        Math.atan2(this.x - this.oldx, -(this.y - this.oldy)) * (180 / Math.PI);
      this.newArrow.angle = this.arrowAngle;
      /*var a = game.add.sprite(x,y,'arrow');
          a.angle = arrowAngle;
          a.scale.setTo(0.5);
          a.anchor.setTo(0.5);
          a.alpha-=0.1;
          */
      this.oldx = this.x;
      this.oldy = this.y;
      let random = Math.random() * 80 + 500;
      if (this.newArrow.y > random) {
        this.resetArrow();
      }
      if (this.hitTest(this.newArrow, this.bag)) {
        //console.log(intersects.width);

        this.hitSound.play();
        // this.newArrow.destroy();

        this.resetArrow();
        this.score = this.score + 10;
        this.sb.text = "Score " + this.score;
      }
    }
  }

  resetArrow() {
    this.shot = false;
    this.arrow.x = this.bow.x;
    this.arrow.y = this.bow.y;
    this.x = this.oldx = this.arrow.x;
    this.y = this.oldy = this.arrow.y;
  }

  createArrow() {
    // console.log("arrow created");
    this.arrowCreated = true;
  }

  shootArrow() {
    this.shootSound.play();
    this.shootSound.setVolume(3);
    // console.log("shoot started");
    if (!this.shot) {
      this.shot = true;
      this.newArrow = this.add
        .sprite(this.bow.x, this.bow.y, "arrow")
        .setScale(0.5)
        .setOrigin(0.5)
        .setTint(0xffffff);
      this.newArrow.angle = this.bow.angle;
      this.xVel = -(this.input.mousePointer.x - this.bow.x) / 6;
      this.yVel = -(this.input.mousePointer.y - this.bow.y) / 6;
    }
  }

  hitTest(object1, object2) {
    var left1 = parseInt(object1.x);
    var left2 = parseInt(object2.x);
    var top1 = parseInt(object1.y);
    var top2 = parseInt(object2.y);
    var width1 = parseInt(object1.displayWidth);
    var width2 = parseInt(object2.displayWidth);
    var height1 = parseInt(object1.displayHeight);
    var height2 = parseInt(object2.displayHeight);
    var horTest = false;
    var verTest = false;
    if (
      (left1 >= left2 && left1 <= left2 + width2) ||
      (left2 >= left1 && left2 <= left1 + width1)
    ) {
      horTest = true;
    }
    if (
      (top1 >= top2 && top1 <= top2 + height2) ||
      (top2 >= top1 && top2 <= top1 + height1)
    ) {
      verTest = true;
    }
    if (horTest && verTest) {
      return true;
    }
    return false;
  }
}
