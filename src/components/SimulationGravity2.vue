<template>
    <div>
        <v-container fluid>
            <v-row>
                <v-col cols="12">
                    <v-slider v-model="radius" label="半径" :max="250" :min="50" step="1" thumb-label="always" />
                    <v-slider v-model="mass" label="質量" :max="100" :min="1" step="1" thumb-label="always" />
                    <v-btn v-if="simulationRunning" color="primary" @click="toggleSimulation">⏸</v-btn>
                    <v-btn v-else color="primary" @click="toggleSimulation">▶️</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <vue-p5 @setup="setup" @draw="draw" @mousepressed="mousePressed" @mousereleased="mouseReleased" />
    </div>
</template>
  
<script>
import * as math from "mathjs";
import VueP5 from "vue-p5";

export default {
    data() {
        return {
            radius: 180,
            mass: 10,
            dragging: false,
            startDrag: null,
            endDrag: null,
            simulationRunning: false,
            implicit_r: null,
            implicit_v: null,
            explicit_r: null,
            explicit_v: null,
            time: 0,
            center: null,
            history_implicit: null,
            history_explicit: null,
            dt: 1/30,
            omega: 1.0,
        };
    },
    components: {
        VueP5: VueP5
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

            if (this.simulationRunning) {
                [this.explicit_r, this.explicit_v] = explicit_euler(this.explicit_r, this.explicit_v, this.mass, this.dt);
                [this.explicit_r, this.explicit_v] = reflection(this.explicit_r, this.explicit_v, this.radius, this.mass);
                [this.implicit_r, this.implicit_v] = implicit_euler(this.implicit_r, this.implicit_v, this.mass, this.dt);
                [this.implicit_r, this.implicit_v] = reflection(this.implicit_r, this.implicit_v, this.radius, this.mass);
                this.time += this.dt;
            }

            if (this.dragging) {
                sketch.stroke(1);
                sketch.line(this.startDrag.x, this.startDrag.y, sketch.mouseX, sketch.mouseY);
            }else if(!this.simulationRunning && this.endDrag){
                sketch.stroke(1);
                sketch.line(this.startDrag.x, this.startDrag.y, this.endDrag.x, this.endDrag.y);
            }

            if (this.implicit_r) {
                const explicitPosition = sketch.createVector(this.explicit_r * Math.cos(this.omega*this.time), this.explicit_r * Math.sin(this.omega*this.time)).add(this.center);
                const implicitPosition = sketch.createVector(this.implicit_r * Math.cos(this.omega*this.time), this.implicit_r * Math.sin(this.omega*this.time)).add(this.center);
                this.history_explicit.push(explicitPosition);
                this.history_implicit.push(implicitPosition);
                if (this.history_implicit.length > 100) {
                    this.history_explicit.shift();
                    this.history_implicit.shift();
                }
                // Draw point
                sketch.stroke(1);
                sketch.fill(200, 100, 100);
                sketch.ellipse(explicitPosition.x, explicitPosition.y, 10, 10);
                sketch.fill(100, 100, 200);
                sketch.ellipse(implicitPosition.x, implicitPosition.y, 10, 10);
            }
            if (this.history_implicit) {
                for (let i = 0; i < this.history_implicit.length; i++) {
                    sketch.noStroke();
                    sketch.fill(200, 100, 100, i * 2);
                    sketch.ellipse(this.history_explicit[i].x, this.history_explicit[i].y, 5, 5);
                    sketch.fill(100, 100, 200, i * 2);
                    sketch.ellipse(this.history_implicit[i].x, this.history_implicit[i].y, 5, 5);
                }
            }
        },

        mousePressed(sketch) {
            if (sketch.mouseX < 0 || sketch.mouseX > sketch.width || sketch.mouseY < 0 || sketch.mouseY > sketch.height) {
                return;
            }
            if (!this.dragging && sketch.mouseButton === "left") {
                this.history_explicit = new Array();
                this.history_implicit = new Array();
                this.startDrag = sketch.createVector(sketch.mouseX, sketch.mouseY);
                this.implicit_r = this.startDrag.dist(this.center);
                this.explicit_r = this.implicit_r;
                this.time = Math.atan2(this.startDrag.y - this.center.y, this.startDrag.x - this.center.x);
                this.implicit_v = 0.0;
                this.explicit_v = 0.0;
                this.dragging = true;
                this.omega = 1.0;
            }
        },

        mouseReleased(sketch) {
            if (this.dragging) {
                this.dragging = false;
                this.endDrag = sketch.createVector(sketch.mouseX, sketch.mouseY);
                this.calcVelocity(this.startDrag.copy(), this.endDrag.copy());
            }
        },
        calcVelocity(startPoint, endPoint) {
            const r1 = startPoint.sub(this.center);
            const r2 = endPoint.sub(this.center);
            this.omega = Math.acos(r1.dot(r2)/(r1.mag()*r2.mag()));
            if (this.omega < 1e-3){
                this.omega = 1e-3;
            }
            this.time /= this.omega;
            this.implicit_v = r2.mag()-r1.mag();
            this.explicit_v = this.implicit_v;
        }
        ,
        toggleSimulation() {
            if (this.implicit_r == null) {
                alert("点の初期値を設定してください。");
                return;
            }
            this.simulationRunning = !this.simulationRunning;
            this.endDrag = null;
            if(this.simulationRunning){
                this.history_explicit = new Array();
                this.history_implicit = new Array();
            }
        },
    }
};

function explicit_euler(r, v, mass, dt){
    const G = 1e5;
    const f = -mass * G / Math.pow(r, 2);
    return [r + v * dt, v + f * dt];
}
function implicit_euler(r, v, mass, dt){
    const G = 1e5;
    const f = -mass * G / Math.pow(r, 2);
    const dfdr = 2.0*mass*G / Math.pow(r, 3);
    const A = math.matrix([[-1.0, dt], [-dfdr*dt, 1.0]]);
    const b = math.matrix([[-r], [v+f*dt-dfdr*r*dt]]);
    const ret = math.chain(A).inv().multiply(b).done();
    return [ret.get([0, 0]), ret.get([1, 0])];
}
function reflection(r, v, radius, mass){
    if (r > radius) return [r, v];
    const G = 1e5;
    const E = 0.5*Math.pow(v, 2) - G*mass / r;
    return [radius, Math.sqrt(2*E + 2*G*mass / radius)];
}
</script>
  