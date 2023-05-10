<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-slider
            v-model="radius"
            label="半径"
            :max="200"
            :min="10"
            step="1"
            thumb-label="always"
          />
          <v-slider
            v-model="mass"
            label="質量"
            :max="100"
            :min="1"
            step="1"
            thumb-label="always"
          />
          <v-btn v-if="simulationRunning" color="primary" @click="toggleSimulation">⏸</v-btn>
          <v-btn v-else color="primary" @click="toggleSimulation">▶️</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <vue-p5 @setup="setup" @draw="draw" @mousepressed="mousePressed" @mousereleased="mouseReleased" />
  </div>
</template>

<script>
import p5 from 'p5';
import VueP5 from "vue-p5";

export default {
  data() {
    return {
      radius: 50,
      mass: 10,
      dragging: false,
      startDrag: null,
      endDrag: null,
      simulationRunning: false,
      pointPosition: null,
      pointVelocity: null,
      pointAcceleration: null,
      center: null,
      history: null,
    };
  },
  components: {
    VueP5:VueP5
  },
  methods: {
    setup(sketch) {
      sketch.createCanvas(800, 600);
      sketch.frameRate(30);
      this.center = sketch.createVector(sketch.width / 2, sketch.height / 2);
    },
    draw(sketch) {
      sketch.background(220);

      // Draw central sphere
      sketch.fill(100, 100, 200);
      sketch.noStroke();
      sketch.ellipse(sketch.width / 2, sketch.height / 2, this.radius * 2, this.radius * 2);

      // Draw moving point and initial vector
      if (this.dragging) {
        sketch.stroke(1);
        sketch.line(this.pointPosition.x, this.pointPosition.y, sketch.mouseX, sketch.mouseY);
      }
      if (this.simulationRunning) {
        const accel = this.calculateAcceleration();
        this.pointVelocity.add(accel);
        this.pointPosition.add(this.pointVelocity);
        this.history.push(this.pointPosition.copy());
        if(this.history.length > 100){
          this.history.shift();
        }
      }else if(this.pointVelocity){
        sketch.stroke(1);
        const velocity_end = this.pointVelocity.copy().add(this.pointPosition);
        sketch.line(this.pointPosition.x, this.pointPosition.y, velocity_end.x, velocity_end.y);
      }
      if (this.pointPosition){
        // Draw point
        sketch.stroke(1);
        sketch.fill(200, 100, 100);
        sketch.ellipse(this.pointPosition.x, this.pointPosition.y, 10, 10);
      }
      if (this.history){
        for(let i = 0; i < this.history.length; i++){
          sketch.noStroke();
          sketch.fill(200, 100, 100, i*2);
          sketch.ellipse(this.history[i].x, this.history[i].y, 5, 5);
        }
      }
    },

    mousePressed(sketch) {
      if (sketch.mouseX < 0 || sketch.mouseX > sketch.width || sketch.mouseY < 0 || sketch.mouseY > sketch.height){
        return;
      }
      if (!this.dragging && sketch.mouseButton === "left") {
        this.history = new Array()
        this.startDrag = sketch.createVector(sketch.mouseX, sketch.mouseY);
        this.pointPosition = this.startDrag.copy();
        this.pointVelocity = sketch.createVector(0, 0);
        this.dragging = true;
      }
    },

    mouseReleased(sketch) {
      if (this.dragging) {
        this.dragging = false;
        this.endDrag = sketch.createVector(sketch.mouseX, sketch.mouseY);
        this.pointVelocity = p5.Vector.sub(this.endDrag, this.startDrag);
      }
    },
    toggleSimulation() {
      if (this.pointPosition == null) {
        alert("点の初期値を設定してください。");
        return;
      }
      this.simulationRunning = !this.simulationRunning;
    },
    calculateAcceleration() {
      const G = 10000; // Gravitational constant
      const r = this.pointPosition.dist(this.center);
      const forceMagnitude = (G * this.mass * this.mass) / Math.pow(r, 2);

      const forceDirection = p5.Vector.sub(
        this.center,
        this.pointPosition
      ).normalize();
      return forceDirection.mult(forceMagnitude / this.mass);
    }
  }
};
</script>
