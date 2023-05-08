<template>
  <div>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-select label="Landscape" :items="['quadratic', 'cos quadratic', 'long plateau']" v-model="landscape" @change="change_landscape"></v-select>
            </v-col>
            <v-col>
                <v-select label="Optimizer" :items="['steepest descent', 'momentum', 'adam']" v-model="optimizer" @change="change_optimizer"></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-slider v-model="lr" label="Learning Rate" min="0" max="1" step="0.01" @change="change_optimizer" thumb-label></v-slider>
            <v-slider v-if="optimizer=='momentum'" v-model="momentum" label="Momentum" min="0" max="1" step="0.01" @change="change_optimizer" thumb-label></v-slider>
            <v-slider v-if="optimizer=='adam'" v-model="beta1" label="Beta1" min="0" max="1" step="0.001" @change="change_optimizer" thumb-label></v-slider>
            <v-slider v-if="optimizer=='adam'" v-model="beta2" label="Beta2" min="0" max="1" step="0.001" @change="change_optimizer" thumb-label></v-slider>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-btn v-if="simulationRunning" color="primary" @click="toggleSimulation">⏸</v-btn>
                <v-btn v-else color="primary" @click="toggleSimulation">▶️</v-btn>
            </v-col>
        </v-row>
    </v-container>
    <vue-p5 @setup="setup" @draw="draw" @mousepressed="mousePressed"/>
  </div>
</template>

<script>
import VueP5 from "vue-p5";

export default {
  data() {
    return {
        tick2pt: 20,
        landscape_x: null,
        landscape_y: null, 
        simulationRunning: false,
        pointPosition: null,
        landscape: "quadratic",
        landscape_func: null,
        grad_func: null,
        optimizer: "steepest descent",
        updater: null,
        lr: 0.1,
        momentum: 0.9,
        beta1: 0.9,
        beta2: 0.999,
        N: 200,
    };
  }, 
  components: {
    VueP5:VueP5
  },
  methods: {
    setup(sketch) {
      sketch.createCanvas(800, 600);
      sketch.frameRate(30);
      this.landscape_x = Array(this.N).fill().map((_, i) => 40*i/this.N);
      this.change_landscape();
      this.change_optimizer();
    },
    draw(sketch) {
      sketch.background(220);
      if(this.simulationRunning){
        const x = this.pointPosition.x;
        this.pointPosition.x = this.updater.step(x, this.grad_func(x));
        this.pointPosition.y = this.landscape_func(this.pointPosition.x);
      }
      for(let i=0; i<this.landscape_x.length-1; i++) {
        sketch.stroke(1);
        const [x1, y1] = this.p2c(this.landscape_x[i], this.landscape_y[i]);
        const [x2, y2] = this.p2c(this.landscape_x[i+1], this.landscape_y[i+1])
        sketch.line(x1, y1, x2, y2);
      }
      if(this.pointPosition){
        sketch.fill(255, 0, 0);
        const [x, y] = this.p2c(this.pointPosition.x, this.pointPosition.y);
        sketch.circle(x, y, 10);
      }
    },
    toggleSimulation() {
        if(!this.pointPosition){
            alert("初期位置を設定してください");
            return;
        }
        this.change_optimizer();
        this.simulationRunning = !this.simulationRunning;
    },
    change_landscape(){
        switch(this.landscape){
            case "cos quadratic":
                this.landscape_func = this.quad_sin;
                this.grad_func = this.grad_qsin;
                break;
            case "long plateau":
                this.landscape_func = this.long_plateau;
                this.grad_func = this.grad_long_plateau;
                break;
            default:
                this.landscape_func = this.quadratic;
                this.grad_func = this.grad_quadratic;
        }
        this.landscape_y = Array(this.N).fill().map((_, i) => this.landscape_func(this.landscape_x[i]));
        if(this.pointPosition){
            this.pointPosition.y = this.landscape_func(this.pointPosition.x);
        }
    },
    change_optimizer(){
        switch(this.optimizer){
            case "momentum":
                this.updater = new Momentum(this.lr, this.momentum);
                break;
            case "adam":
                this.updater = new Adam(this.lr, this.beta1, this.beta2);
                break;
            default:
                this.updater = new SteepestDescent(this.lr);
                break
        }
    },
    p2c(x, y) {
        return [x*this.tick2pt, 600-y*this.tick2pt];
    },
    c2p(X, Y) {
        return [X/this.tick2pt, (600-Y)/this.tick2pt]
    },
    mousePressed(sketch){
        if (sketch.mouseX < 0 || sketch.mouseX > 800 || sketch.mouseY < 0 || sketch.mouseY > 600) return;
        const [x, ] = this.c2p(sketch.mouseX, sketch.mouseY);
        this.pointPosition = sketch.createVector(x, this.landscape_func(x));
    },
    quadratic(x) {
        return (x-30)*(x-30)*3/160+2;
    }, 
    grad_quadratic(x){
        return (x-30)*3/80;
    },
    quad_sin(x) {
        return -3*Math.cos(x-30) + 0.02*(x-30)*(x-30) + 5;
    },
    grad_qsin(x){
        return 3*Math.sin(x-30)+0.04*(x-30);
    },
    long_plateau(x){
        const x_shift = x - 20;
        return (0.4*Math.pow(x_shift, 4) - 7*Math.pow(x_shift, 3)-x_shift*x_shift+150*x_shift)*0.001+5
    },
    grad_long_plateau(x){
        const x_shift = x - 20;
        return (1.6*Math.pow(x_shift, 3) - 21*Math.pow(x_shift, 2)-2*x_shift+150)*0.001
    }
  },
}
class SteepestDescent {
    constructor(lr){
        this.lr = lr;
    }
    step(x, grad){
        return x - this.lr*grad;
    }
}
class Momentum {
    constructor(lr, momentum){
        this.lr = lr;
        this.momentum = momentum;
        this.v = 0;
    }
    step(x, grad){
        this.v = this.momentum*this.v - this.lr*grad;
        return x + this.v;
    }
}
class Adam {
    constructor(lr, beta1, beta2){
        this.lr = lr
        this.beta1 = beta1
        this.beta2 = beta2
        this.m = 0
        this.v = 0
    }
    step(x, grad){
        const epsilon = 1e-6;
        this.m = this.beta1*this.m + (1-this.beta1)*grad
        this.v = this.beta2*this.v + (1-this.beta2)*grad*grad
        const m_hat = this.m/(1-this.beta1)
        const v_hat = this.v/(1-this.beta2)
        return x - this.lr*m_hat/(Math.sqrt(v_hat)+epsilon)
    }
}
</script>