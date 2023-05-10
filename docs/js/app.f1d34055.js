(function(){var t={1685:function(t,i,s){"use strict";var e=s(144),n=s(1096),a=s(3246),o=function(){var t=this,i=t._self._c;return i(n.Z,[i(a.Z,[i("router-view")],1)],1)},r=[],l={name:"App"},u=l,h=s(1001),c=(0,h.Z)(u,o,r,!1,null,null,null),m=c.exports,p=s(2250);e.ZP.use(p.Z);var d=new p.Z({}),g=s(1828),_=s(4437),f=s(1200),v=s(5294),y=function(){var t=this,i=t._self._c;return i(f.Z,[i(v.Z,[i(_.Z,[i(g.Z,{attrs:{color:"primary",to:"/"}},[t._v("ホームに戻る")]),i("h1",[t._v("勾配降下法")]),i("p",[t._v(" 説明文 ")]),i("GradientDescent")],1)],1)],1)},b=[],x=s(4539),Z=s(2059),w=function(){var t=this,i=t._self._c;return i("div",[i(f.Z,{attrs:{fluid:""}},[i(v.Z,[i(_.Z,[i(x.Z,{attrs:{label:"Landscape",items:["quadratic","cos quadratic","long plateau"]},on:{change:t.change_landscape},model:{value:t.landscape,callback:function(i){t.landscape=i},expression:"landscape"}})],1),i(_.Z,[i(x.Z,{attrs:{label:"Optimizer",items:["steepest descent","momentum","adam"]},on:{change:t.change_optimizer},model:{value:t.optimizer,callback:function(i){t.optimizer=i},expression:"optimizer"}})],1)],1),i(v.Z,[i(Z.Z,{attrs:{label:"Learning Rate",min:"0",max:"1",step:"0.01","thumb-label":""},on:{change:t.change_optimizer},model:{value:t.lr,callback:function(i){t.lr=i},expression:"lr"}}),"momentum"==t.optimizer?i(Z.Z,{attrs:{label:"Momentum",min:"0",max:"1",step:"0.01","thumb-label":""},on:{change:t.change_optimizer},model:{value:t.momentum,callback:function(i){t.momentum=i},expression:"momentum"}}):t._e(),"adam"==t.optimizer?i(Z.Z,{attrs:{label:"Beta1",min:"0",max:"1",step:"0.001","thumb-label":""},on:{change:t.change_optimizer},model:{value:t.beta1,callback:function(i){t.beta1=i},expression:"beta1"}}):t._e(),"adam"==t.optimizer?i(Z.Z,{attrs:{label:"Beta2",min:"0",max:"1",step:"0.001","thumb-label":""},on:{change:t.change_optimizer},model:{value:t.beta2,callback:function(i){t.beta2=i},expression:"beta2"}}):t._e()],1),i(v.Z,[i(_.Z,{attrs:{cols:"12"}},[t.simulationRunning?i(g.Z,{attrs:{color:"primary"},on:{click:t.toggleSimulation}},[t._v("⏸")]):i(g.Z,{attrs:{color:"primary"},on:{click:t.toggleSimulation}},[t._v("▶️")])],1)],1)],1),i("vue-p5",{on:{setup:t.setup,draw:t.draw,mousepressed:t.mousePressed}})],1)},k=[],P=s(4934),D=s.n(P),S={data(){return{tick2pt:20,landscape_x:null,landscape_y:null,simulationRunning:!1,pointPosition:null,landscape:"quadratic",landscape_func:null,grad_func:null,optimizer:"steepest descent",updater:null,lr:.1,momentum:.9,beta1:.9,beta2:.999,N:200}},components:{VueP5:D()},methods:{setup(t){t.createCanvas(800,600),t.frameRate(30),this.landscape_x=Array(this.N).fill().map(((t,i)=>40*i/this.N)),this.change_landscape(),this.change_optimizer()},draw(t){if(t.background(220),this.simulationRunning){const t=this.pointPosition.x;this.pointPosition.x=this.updater.step(t,this.grad_func(t)),this.pointPosition.y=this.landscape_func(this.pointPosition.x)}for(let i=0;i<this.landscape_x.length-1;i++){t.stroke(1);const[s,e]=this.p2c(this.landscape_x[i],this.landscape_y[i]),[n,a]=this.p2c(this.landscape_x[i+1],this.landscape_y[i+1]);t.line(s,e,n,a)}if(this.pointPosition){t.fill(255,0,0);const[i,s]=this.p2c(this.pointPosition.x,this.pointPosition.y);t.circle(i,s,10)}},toggleSimulation(){this.pointPosition?(this.change_optimizer(),this.simulationRunning=!this.simulationRunning):alert("初期位置を設定してください")},change_landscape(){switch(this.landscape){case"cos quadratic":this.landscape_func=this.quad_sin,this.grad_func=this.grad_qsin;break;case"long plateau":this.landscape_func=this.long_plateau,this.grad_func=this.grad_long_plateau;break;default:this.landscape_func=this.quadratic,this.grad_func=this.grad_quadratic}this.landscape_y=Array(this.N).fill().map(((t,i)=>this.landscape_func(this.landscape_x[i]))),this.pointPosition&&(this.pointPosition.y=this.landscape_func(this.pointPosition.x))},change_optimizer(){switch(this.optimizer){case"momentum":this.updater=new R(this.lr,this.momentum);break;case"adam":this.updater=new M(this.lr,this.beta1,this.beta2);break;default:this.updater=new V(this.lr);break}},p2c(t,i){return[t*this.tick2pt,600-i*this.tick2pt]},c2p(t,i){return[t/this.tick2pt,(600-i)/this.tick2pt]},mousePressed(t){if(t.mouseX<0||t.mouseX>800||t.mouseY<0||t.mouseY>600)return;const[i]=this.c2p(t.mouseX,t.mouseY);this.pointPosition=t.createVector(i,this.landscape_func(i))},quadratic(t){return(t-30)*(t-30)*3/160+2},grad_quadratic(t){return 3*(t-30)/80},quad_sin(t){return-3*Math.cos(t-30)+.02*(t-30)*(t-30)+5},grad_qsin(t){return 3*Math.sin(t-30)+.04*(t-30)},long_plateau(t){const i=t-20;return.001*(.4*Math.pow(i,4)-7*Math.pow(i,3)-i*i+150*i)+5},grad_long_plateau(t){const i=t-20;return.001*(1.6*Math.pow(i,3)-21*Math.pow(i,2)-2*i+150)}}};class V{constructor(t){this.lr=t}step(t,i){return t-this.lr*i}}class R{constructor(t,i){this.lr=t,this.momentum=i,this.v=0}step(t,i){return this.v=this.momentum*this.v-this.lr*i,t+this.v}}class M{constructor(t,i,s){this.lr=t,this.beta1=i,this.beta2=s,this.m=0,this.v=0}step(t,i){const s=1e-6;this.m=this.beta1*this.m+(1-this.beta1)*i,this.v=this.beta2*this.v+(1-this.beta2)*i*i;const e=this.m/(1-this.beta1),n=this.v/(1-this.beta2);return t-this.lr*e/(Math.sqrt(n)+s)}}var z=S,O=(0,h.Z)(z,w,k,!1,null,null,null),q=O.exports,X={components:{GradientDescent:q}},Y=X,A=(0,h.Z)(Y,y,b,!1,null,null,null),j=A.exports,B=s(3058),E=s(5223),G=s(248),C=s(1908),T=s(8760),H=function(){var t=this,i=t._self._c;return i(f.Z,[i(v.Z,[i(_.Z,[i(B.Z,[i(E.EB,[t._v("Physics")]),i(G.Z,t._l(t.physics_simulations,(function(s){return i(C.Z,{key:s.name,attrs:{to:s.path}},[i(T.km,[i(T.V9,[t._v(t._s(s.name))])],1)],1)})),1)],1)],1),i(_.Z,[i(B.Z,[i(E.EB,[t._v("Machine Learning")]),i(G.Z,t._l(t.ml_simulations,(function(s){return i(C.Z,{key:s.name,attrs:{to:s.path}},[i(T.km,[i(T.V9,[t._v(t._s(s.name))])],1)],1)})),1)],1)],1)],1)],1)},N=[],I={data(){return{physics_simulations:[{name:"重力 (衝突なし)",path:"/gravity_simple"},{name:"重力 (衝突あり)",path:"/gravity_bound"}],ml_simulations:[{name:"勾配降下法",path:"/gradient_descent"}]}}},L=I,F=(0,h.Z)(L,H,N,!1,null,null,null),$=F.exports,J=function(){var t=this,i=t._self._c;return i(f.Z,[i("SimulationHeader",{attrs:{title:"重力"}},[t._v(" 中心の円は固定されていて, 質量と半径のみスライダーで変更可能です。"),i("br"),t._v(" クリックすると点が描画され, ドラッグすると速度ベクトルを設定できます。"),i("br"),t._v(" 赤い点はExplicit Euler法, 青い点はImplicit Euler法で軌道が計算されます。"),i("br"),i("br")]),i("SimulationGravity2")],1)},K=[],Q=function(){var t=this,i=t._self._c;return i("div",[i(f.Z,{attrs:{fluid:""}},[i(v.Z,[i(_.Z,{attrs:{cols:"12"}},[i(Z.Z,{attrs:{label:"半径",max:250,min:50,step:"1","thumb-label":"always"},model:{value:t.radius,callback:function(i){t.radius=i},expression:"radius"}}),i(Z.Z,{attrs:{label:"質量",max:100,min:1,step:"1","thumb-label":"always"},model:{value:t.mass,callback:function(i){t.mass=i},expression:"mass"}}),t.simulationRunning?i(g.Z,{attrs:{color:"primary"},on:{click:t.toggleSimulation}},[t._v("⏸")]):i(g.Z,{attrs:{color:"primary"},on:{click:t.toggleSimulation}},[t._v("▶️")])],1)],1)],1),i("vue-p5",{on:{setup:t.setup,draw:t.draw,mousepressed:t.mousePressed,mousereleased:t.mouseReleased}})],1)},U=[],W=(s(7658),s(4286)),tt=s(6927),it={data(){return{radius:180,mass:10,dragging:!1,startDrag:null,endDrag:null,simulationRunning:!1,implicit_r:null,implicit_v:null,explicit_r:null,explicit_v:null,time:0,center:null,history_implicit:null,history_explicit:null,dt:1/30,omega:1}},components:{VueP5:D()},methods:{setup(t){t.createCanvas(800,600),t.frameRate(30),this.center=t.createVector(t.width/2,t.height/2)},draw(t){if(t.background(220),t.fill(100,100,200),t.noStroke(),t.ellipse(t.width/2,t.height/2,2*this.radius,2*this.radius),this.simulationRunning&&([this.explicit_r,this.explicit_v]=st(this.explicit_r,this.explicit_v,this.mass,this.dt),[this.explicit_r,this.explicit_v]=nt(this.explicit_r,this.explicit_v,this.radius,this.mass),[this.implicit_r,this.implicit_v]=et(this.implicit_r,this.implicit_v,this.mass,this.dt),[this.implicit_r,this.implicit_v]=nt(this.implicit_r,this.implicit_v,this.radius,this.mass),this.time+=this.dt),this.dragging?(t.stroke(1),t.line(this.startDrag.x,this.startDrag.y,t.mouseX,t.mouseY)):!this.simulationRunning&&this.endDrag&&(t.stroke(1),t.line(this.startDrag.x,this.startDrag.y,this.endDrag.x,this.endDrag.y)),this.implicit_r){const i=t.createVector(this.explicit_r*Math.cos(this.omega*this.time),this.explicit_r*Math.sin(this.omega*this.time)).add(this.center),s=t.createVector(this.implicit_r*Math.cos(this.omega*this.time),this.implicit_r*Math.sin(this.omega*this.time)).add(this.center);this.history_explicit.push(i),this.history_implicit.push(s),this.history_implicit.length>100&&(this.history_explicit.shift(),this.history_implicit.shift()),t.stroke(1),t.fill(200,100,100),t.ellipse(i.x,i.y,10,10),t.fill(100,100,200),t.ellipse(s.x,s.y,10,10)}if(this.history_implicit)for(let i=0;i<this.history_implicit.length;i++)t.noStroke(),t.fill(200,100,100,2*i),t.ellipse(this.history_explicit[i].x,this.history_explicit[i].y,5,5),t.fill(100,100,200,2*i),t.ellipse(this.history_implicit[i].x,this.history_implicit[i].y,5,5)},mousePressed(t){t.mouseX<0||t.mouseX>t.width||t.mouseY<0||t.mouseY>t.height||this.dragging||"left"!==t.mouseButton||(this.history_explicit=new Array,this.history_implicit=new Array,this.startDrag=t.createVector(t.mouseX,t.mouseY),this.implicit_r=this.startDrag.dist(this.center),this.explicit_r=this.implicit_r,this.time=Math.atan2(this.startDrag.y-this.center.y,this.startDrag.x-this.center.x),this.implicit_v=0,this.explicit_v=0,this.dragging=!0,this.omega=1)},mouseReleased(t){this.dragging&&(this.dragging=!1,this.endDrag=t.createVector(t.mouseX,t.mouseY),this.calcVelocity(this.startDrag.copy(),this.endDrag.copy()))},calcVelocity(t,i){const s=t.sub(this.center),e=i.sub(this.center);this.omega=Math.acos(s.dot(e)/(s.mag()*e.mag())),this.omega<.001&&(this.omega=.001),this.time/=this.omega,this.implicit_v=e.mag()-s.mag(),this.explicit_v=this.implicit_v},toggleSimulation(){null!=this.implicit_r?(this.simulationRunning=!this.simulationRunning,this.endDrag=null,this.simulationRunning&&(this.history_explicit=new Array,this.history_implicit=new Array)):alert("点の初期値を設定してください。")}}};function st(t,i,s,e){const n=1e5,a=-s*n/Math.pow(t,2);return[t+i*e,i+a*e]}function et(t,i,s,e){const n=1e5,a=-s*n/Math.pow(t,2),o=2*s*n/Math.pow(t,3),r=W.pIu([[-1,e],[-o*e,1]]),l=W.pIu([[-t],[i+a*e-o*t*e]]),u=tt.tS(r).inv().multiply(l).done();return[u.get([0,0]),u.get([1,0])]}function nt(t,i,s,e){if(t>s)return[t,i];const n=1e5,a=.5*Math.pow(i,2)-n*e/t;return[s,Math.sqrt(2*a+2*n*e/s)]}var at=it,ot=(0,h.Z)(at,Q,U,!1,null,null,null),rt=ot.exports,lt=function(){var t=this,i=t._self._c;return i(f.Z,[i(v.Z,[i(g.Z,{attrs:{color:"#def",to:"/"}},[t._v("ホームに戻る")])],1),i(v.Z,[i("br"),i("br")]),i(v.Z,[i(B.Z,[i(E.EB,[i("h2",[t._v(" "+t._s(t.title)+" ")])]),i(E.ZB,[t._t("default")],2)],1)],1)],1)},ut=[],ht={props:["title"]},ct=ht,mt=(0,h.Z)(ct,lt,ut,!1,null,null,null),pt=mt.exports,dt={components:{SimulationGravity2:rt,SimulationHeader:pt}},gt=dt,_t=(0,h.Z)(gt,J,K,!1,null,null,null),ft=_t.exports,vt=function(){var t=this,i=t._self._c;return i(f.Z,[i("SimulationHeader",{attrs:{title:"重力"}},[t._v(" 中心の円は固定されていて, 質量と半径のみスライダーで変更可能です (質点として計算するため半径はシミュレーションには影響しません)。"),i("br"),t._v(" クリックすると点が描画され, ドラッグすると速度ベクトルを設定できます。"),i("br"),i("br")]),i("SimulationGravity")],1)},yt=[],bt=function(){var t=this,i=t._self._c;return i("div",[i(f.Z,{attrs:{fluid:""}},[i(v.Z,[i(_.Z,{attrs:{cols:"12"}},[i(Z.Z,{attrs:{label:"半径",max:200,min:10,step:"1","thumb-label":"always"},model:{value:t.radius,callback:function(i){t.radius=i},expression:"radius"}}),i(Z.Z,{attrs:{label:"質量",max:100,min:1,step:"1","thumb-label":"always"},model:{value:t.mass,callback:function(i){t.mass=i},expression:"mass"}}),t.simulationRunning?i(g.Z,{attrs:{color:"primary"},on:{click:t.toggleSimulation}},[t._v("⏸")]):i(g.Z,{attrs:{color:"primary"},on:{click:t.toggleSimulation}},[t._v("▶️")])],1)],1)],1),i("vue-p5",{on:{setup:t.setup,draw:t.draw,mousepressed:t.mousePressed,mousereleased:t.mouseReleased}})],1)},xt=[],Zt=s(4035),wt=s.n(Zt),kt={data(){return{radius:50,mass:10,dragging:!1,startDrag:null,endDrag:null,simulationRunning:!1,pointPosition:null,pointVelocity:null,pointAcceleration:null,center:null,history:null}},components:{VueP5:D()},methods:{setup(t){t.createCanvas(800,600),t.frameRate(30),this.center=t.createVector(t.width/2,t.height/2)},draw(t){if(t.background(220),t.fill(100,100,200),t.noStroke(),t.ellipse(t.width/2,t.height/2,2*this.radius,2*this.radius),this.dragging&&(t.stroke(1),t.line(this.pointPosition.x,this.pointPosition.y,t.mouseX,t.mouseY)),this.simulationRunning){const t=this.calculateAcceleration();this.pointVelocity.add(t),this.pointPosition.add(this.pointVelocity),this.history.push(this.pointPosition.copy()),this.history.length>100&&this.history.shift()}else if(this.pointVelocity){t.stroke(1);const i=this.pointVelocity.copy().add(this.pointPosition);t.line(this.pointPosition.x,this.pointPosition.y,i.x,i.y)}if(this.pointPosition&&(t.stroke(1),t.fill(200,100,100),t.ellipse(this.pointPosition.x,this.pointPosition.y,10,10)),this.history)for(let i=0;i<this.history.length;i++)t.noStroke(),t.fill(200,100,100,2*i),t.ellipse(this.history[i].x,this.history[i].y,5,5)},mousePressed(t){t.mouseX<0||t.mouseX>t.width||t.mouseY<0||t.mouseY>t.height||this.dragging||"left"!==t.mouseButton||(this.history=new Array,this.startDrag=t.createVector(t.mouseX,t.mouseY),this.pointPosition=this.startDrag.copy(),this.pointVelocity=t.createVector(0,0),this.dragging=!0)},mouseReleased(t){this.dragging&&(this.dragging=!1,this.endDrag=t.createVector(t.mouseX,t.mouseY),this.pointVelocity=wt().Vector.sub(this.endDrag,this.startDrag))},toggleSimulation(){null!=this.pointPosition?this.simulationRunning=!this.simulationRunning:alert("点の初期値を設定してください。")},calculateAcceleration(){const t=1e4,i=this.pointPosition.dist(this.center),s=t*this.mass*this.mass/Math.pow(i,2),e=wt().Vector.sub(this.center,this.pointPosition).normalize();return e.mult(s/this.mass)}}},Pt=kt,Dt=(0,h.Z)(Pt,bt,xt,!1,null,null,null),St=Dt.exports,Vt={components:{SimulationGravity:St,SimulationHeader:pt}},Rt=Vt,Mt=(0,h.Z)(Rt,vt,yt,!1,null,null,null),zt=Mt.exports,Ot=s(8345);e.ZP.use(Ot.ZP);const qt=new Ot.ZP({routes:[{path:"/",component:$},{path:"/gravity_simple",component:zt},{path:"/gravity_bound",component:ft},{path:"/gradient_descent",component:j}]});var Xt=qt;e.ZP.config.productionTip=!1,new e.ZP({vuetify:d,render:t=>t(m),router:Xt}).$mount("#app")},5042:function(){}},i={};function s(e){var n=i[e];if(void 0!==n)return n.exports;var a=i[e]={id:e,loaded:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.loaded=!0,a.exports}s.m=t,function(){s.amdD=function(){throw new Error("define cannot be used indirect")}}(),function(){s.amdO={}}(),function(){var t=[];s.O=function(i,e,n,a){if(!e){var o=1/0;for(h=0;h<t.length;h++){e=t[h][0],n=t[h][1],a=t[h][2];for(var r=!0,l=0;l<e.length;l++)(!1&a||o>=a)&&Object.keys(s.O).every((function(t){return s.O[t](e[l])}))?e.splice(l--,1):(r=!1,a<o&&(o=a));if(r){t.splice(h--,1);var u=n();void 0!==u&&(i=u)}}return i}a=a||0;for(var h=t.length;h>0&&t[h-1][2]>a;h--)t[h]=t[h-1];t[h]=[e,n,a]}}(),function(){s.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(i,{a:i}),i}}(),function(){s.d=function(t,i){for(var e in i)s.o(i,e)&&!s.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:i[e]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)}}(),function(){s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){s.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t}}(),function(){var t={143:0};s.O.j=function(i){return 0===t[i]};var i=function(i,e){var n,a,o=e[0],r=e[1],l=e[2],u=0;if(o.some((function(i){return 0!==t[i]}))){for(n in r)s.o(r,n)&&(s.m[n]=r[n]);if(l)var h=l(s)}for(i&&i(e);u<o.length;u++)a=o[u],s.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return s.O(h)},e=self["webpackChunksimulations"]=self["webpackChunksimulations"]||[];e.forEach(i.bind(null,0)),e.push=i.bind(null,e.push.bind(e))}();var e=s.O(void 0,[998],(function(){return s(1685)}));e=s.O(e)})();
//# sourceMappingURL=app.f1d34055.js.map