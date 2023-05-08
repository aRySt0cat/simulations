(function(){"use strict";var t={6366:function(t,i,n){var e=n(144),s=n(1096),a=n(3246),o=function(){var t=this,i=t._self._c;return i(s.Z,[i(a.Z,[i("router-view")],1)],1)},r=[],l={name:"App"},u=l,c=n(1001),h=(0,c.Z)(u,o,r,!1,null,null,null),p=h.exports,m=n(2250);e.ZP.use(m.Z);var d=new m.Z({}),g=n(1828),f=n(4437),_=n(1200),b=n(5294),v=function(){var t=this,i=t._self._c;return i(_.Z,[i(b.Z,[i(f.Z,[i(g.Z,{attrs:{color:"primary",to:"/"}},[t._v("ホームに戻る")]),i("h1",[t._v("勾配降下法")]),i("p",[t._v(" 説明文 ")]),i("GradientDescent")],1)],1)],1)},y=[],Z=n(4539),P=n(2059),x=function(){var t=this,i=t._self._c;return i("div",[i(_.Z,{attrs:{fluid:""}},[i(b.Z,[i(f.Z,[i(Z.Z,{attrs:{label:"Landscape",items:["quadratic","cos quadratic","long plateau"]},on:{change:t.change_landscape},model:{value:t.landscape,callback:function(i){t.landscape=i},expression:"landscape"}})],1),i(f.Z,[i(Z.Z,{attrs:{label:"Optimizer",items:["steepest descent","momentum","adam"]},on:{change:t.change_optimizer},model:{value:t.optimizer,callback:function(i){t.optimizer=i},expression:"optimizer"}})],1)],1),i(b.Z,[i(P.Z,{attrs:{label:"Learning Rate",min:"0",max:"1",step:"0.01","thumb-label":""},on:{change:t.change_optimizer},model:{value:t.lr,callback:function(i){t.lr=i},expression:"lr"}}),"momentum"==t.optimizer?i(P.Z,{attrs:{label:"Momentum",min:"0",max:"1",step:"0.01","thumb-label":""},on:{change:t.change_optimizer},model:{value:t.momentum,callback:function(i){t.momentum=i},expression:"momentum"}}):t._e(),"adam"==t.optimizer?i(P.Z,{attrs:{label:"Beta1",min:"0",max:"1",step:"0.001","thumb-label":""},on:{change:t.change_optimizer},model:{value:t.beta1,callback:function(i){t.beta1=i},expression:"beta1"}}):t._e(),"adam"==t.optimizer?i(P.Z,{attrs:{label:"Beta2",min:"0",max:"1",step:"0.001","thumb-label":""},on:{change:t.change_optimizer},model:{value:t.beta2,callback:function(i){t.beta2=i},expression:"beta2"}}):t._e()],1),i(b.Z,[i(f.Z,{attrs:{cols:"12"}},[t.simulationRunning?i(g.Z,{attrs:{color:"primary"},on:{click:t.toggleSimulation}},[t._v("⏸")]):i(g.Z,{attrs:{color:"primary"},on:{click:t.toggleSimulation}},[t._v("▶️")])],1)],1)],1),i("vue-p5",{on:{setup:t.setup,draw:t.draw,mousepressed:t.mousePressed}})],1)},k=[],w=n(4934),z=n.n(w),V={data(){return{tick2pt:20,landscape_x:null,landscape_y:null,simulationRunning:!1,pointPosition:null,landscape:"quadratic",landscape_func:null,grad_func:null,optimizer:"steepest descent",updater:null,lr:.1,momentum:.9,beta1:.9,beta2:.999,N:200}},components:{VueP5:z()},methods:{setup(t){t.createCanvas(800,600),t.frameRate(30),this.landscape_x=Array(this.N).fill().map(((t,i)=>40*i/this.N)),this.change_landscape(),this.change_optimizer()},draw(t){if(t.background(220),this.simulationRunning){const t=this.pointPosition.x;this.pointPosition.x=this.updater.step(t,this.grad_func(t)),this.pointPosition.y=this.landscape_func(this.pointPosition.x)}for(let i=0;i<this.landscape_x.length-1;i++){t.stroke(1);const[n,e]=this.p2c(this.landscape_x[i],this.landscape_y[i]),[s,a]=this.p2c(this.landscape_x[i+1],this.landscape_y[i+1]);t.line(n,e,s,a)}if(this.pointPosition){t.fill(255,0,0);const[i,n]=this.p2c(this.pointPosition.x,this.pointPosition.y);t.circle(i,n,10)}},toggleSimulation(){this.pointPosition?(this.change_optimizer(),this.simulationRunning=!this.simulationRunning):alert("初期位置を設定してください")},change_landscape(){switch(this.landscape){case"cos quadratic":this.landscape_func=this.quad_sin,this.grad_func=this.grad_qsin;break;case"long plateau":this.landscape_func=this.long_plateau,this.grad_func=this.grad_long_plateau;break;default:this.landscape_func=this.quadratic,this.grad_func=this.grad_quadratic}this.landscape_y=Array(this.N).fill().map(((t,i)=>this.landscape_func(this.landscape_x[i]))),this.pointPosition&&(this.pointPosition.y=this.landscape_func(this.pointPosition.x))},change_optimizer(){switch(this.optimizer){case"momentum":this.updater=new S(this.lr,this.momentum);break;case"adam":this.updater=new O(this.lr,this.beta1,this.beta2);break;default:this.updater=new R(this.lr);break}},p2c(t,i){return[t*this.tick2pt,600-i*this.tick2pt]},c2p(t,i){return[t/this.tick2pt,(600-i)/this.tick2pt]},mousePressed(t){if(t.mouseX<0||t.mouseX>800||t.mouseY<0||t.mouseY>600)return;const[i]=this.c2p(t.mouseX,t.mouseY);this.pointPosition=t.createVector(i,this.landscape_func(i))},quadratic(t){return(t-30)*(t-30)*3/160+2},grad_quadratic(t){return 3*(t-30)/80},quad_sin(t){return-3*Math.cos(t-30)+.02*(t-30)*(t-30)+5},grad_qsin(t){return 3*Math.sin(t-30)+.04*(t-30)},long_plateau(t){const i=t-20;return.001*(.4*Math.pow(i,4)-7*Math.pow(i,3)-i*i+150*i)+5},grad_long_plateau(t){const i=t-20;return.001*(1.6*Math.pow(i,3)-21*Math.pow(i,2)-2*i+150)}}};class R{constructor(t){this.lr=t}step(t,i){return t-this.lr*i}}class S{constructor(t,i){this.lr=t,this.momentum=i,this.v=0}step(t,i){return this.v=this.momentum*this.v-this.lr*i,t+this.v}}class O{constructor(t,i,n){this.lr=t,this.beta1=i,this.beta2=n,this.m=0,this.v=0}step(t,i){const n=1e-6;this.m=this.beta1*this.m+(1-this.beta1)*i,this.v=this.beta2*this.v+(1-this.beta2)*i*i;const e=this.m/(1-this.beta1),s=this.v/(1-this.beta2);return t-this.lr*e/(Math.sqrt(s)+n)}}var q=V,M=(0,c.Z)(q,x,k,!1,null,null,null),D=M.exports,j={components:{GradientDescent:D}},X=j,Y=(0,c.Z)(X,v,y,!1,null,null,null),A=Y.exports,B=n(3058),T=n(5223),C=n(248),G=n(1908),N=n(8760),E=function(){var t=this,i=t._self._c;return i(_.Z,[i(b.Z,[i(f.Z,[i(B.Z,[i(T.EB,[t._v("Physics")]),i(C.Z,t._l(t.physics_simulations,(function(n){return i(G.Z,{key:n.name,attrs:{to:n.path}},[i(N.km,[i(N.V9,[t._v(t._s(n.name))])],1)],1)})),1)],1)],1),i(f.Z,[i(B.Z,[i(T.EB,[t._v("Machine Learning")]),i(C.Z,t._l(t.ml_simulations,(function(n){return i(G.Z,{key:n.name,attrs:{to:n.path}},[i(N.km,[i(N.V9,[t._v(t._s(n.name))])],1)],1)})),1)],1)],1)],1)],1)},L=[],F={data(){return{physics_simulations:[{name:"重力",path:"/gravity_simple"}],ml_simulations:[{name:"勾配降下法",path:"/gradient_descent"}]}}},$=F,H=(0,c.Z)($,E,L,!1,null,null,null),I=H.exports,J=function(){var t=this,i=t._self._c;return i(_.Z,[i(b.Z,[i(f.Z,[i(g.Z,{attrs:{color:"primary",to:"/"}},[t._v("ホームに戻る")]),i("h1",[t._v("重力")]),i("p",[t._v(" 中心の円は固定されていて, 質量と半径のみスライダーで変更可能です (質点として計算するため半径はシミュレーションには影響しません)。"),i("br"),t._v(" クリックすると点が描画され, ドラッグすると速度ベクトルを設定できます。"),i("br"),i("br")]),i("SimulationGravity")],1)],1)],1)},K=[],Q=function(){var t=this,i=t._self._c;return i("div",[i(_.Z,{attrs:{fluid:""}},[i(b.Z,[i(f.Z,{attrs:{cols:"12"}},[i(P.Z,{attrs:{label:"半径",max:200,min:10,step:"1","thumb-label":"always"},model:{value:t.radius,callback:function(i){t.radius=i},expression:"radius"}}),i(P.Z,{attrs:{label:"質量",max:100,min:1,step:"1","thumb-label":"always"},model:{value:t.mass,callback:function(i){t.mass=i},expression:"mass"}}),t.simulationRunning?i(g.Z,{attrs:{color:"primary"},on:{click:t.toggleSimulation}},[t._v("⏸")]):i(g.Z,{attrs:{color:"primary"},on:{click:t.toggleSimulation}},[t._v("▶️")])],1)],1)],1),i("vue-p5",{on:{setup:t.setup,draw:t.draw,mousepressed:t.mousePressed,mousereleased:t.mouseReleased}})],1)},U=[],W=(n(7658),n(4035)),tt=n.n(W),it={data(){return{radius:50,mass:10,dragging:!1,startDrag:null,endDrag:null,simulationRunning:!1,pointPosition:null,pointVelocity:null,pointAcceleration:null,center:null,history:null}},components:{VueP5:z()},methods:{setup(t){t.createCanvas(800,600),t.frameRate(30),this.center=t.createVector(t.width/2,t.height/2)},draw(t){if(t.background(220),t.fill(100,100,200),t.noStroke(),t.ellipse(t.width/2,t.height/2,2*this.radius,2*this.radius),this.dragging&&(t.stroke(1),t.line(this.pointPosition.x,this.pointPosition.y,t.mouseX,t.mouseY)),this.simulationRunning){const t=this.calculateAcceleration();this.pointVelocity.add(t),this.pointPosition.add(this.pointVelocity),this.history.push(this.pointPosition.copy()),this.history.length>100&&this.history.shift()}else if(this.pointVelocity){t.stroke(1);const i=this.pointVelocity.copy().add(this.pointPosition);t.line(this.pointPosition.x,this.pointPosition.y,i.x,i.y)}if(this.pointPosition&&(t.stroke(1),t.fill(200,100,100),t.ellipse(this.pointPosition.x,this.pointPosition.y,10,10)),this.history)for(let i=0;i<this.history.length;i++)t.noStroke(),t.fill(200,100,100,2*i),t.ellipse(this.history[i].x,this.history[i].y,5,5)},mousePressed(t){t.mouseX<0||t.mouseX>t.width||t.mouseY<0||t.mouseY>t.height||this.dragging||"left"!==t.mouseButton||(this.history=new Array,this.startDrag=t.createVector(t.mouseX,t.mouseY),this.pointPosition=this.startDrag.copy(),this.pointVelocity=t.createVector(0,0),this.dragging=!0)},mouseReleased(t){this.dragging&&(this.dragging=!1,this.endDrag=t.createVector(t.mouseX,t.mouseY),this.pointVelocity=tt().Vector.sub(this.endDrag,this.startDrag))},toggleSimulation(){null!=this.pointPosition?this.simulationRunning=!this.simulationRunning:alert("点の初期値を設定してください。")},calculateAcceleration(){const t=1e4,i=this.pointPosition.dist(this.center),n=t*this.mass*this.mass/Math.pow(i,2),e=tt().Vector.sub(this.center,this.pointPosition).normalize();return e.mult(n/this.mass)}}},nt=it,et=(0,c.Z)(nt,Q,U,!1,null,null,null),st=et.exports,at={components:{SimulationGravity:st}},ot=at,rt=(0,c.Z)(ot,J,K,!1,null,null,null),lt=rt.exports,ut=n(8345);e.ZP.use(ut.ZP);const ct=new ut.ZP({routes:[{path:"/",component:I},{path:"/gravity_simple",component:lt},{path:"/gradient_descent",component:A}]});var ht=ct;e.ZP.config.productionTip=!1,new e.ZP({vuetify:d,render:t=>t(p),router:ht}).$mount("#app")}},i={};function n(e){var s=i[e];if(void 0!==s)return s.exports;var a=i[e]={exports:{}};return t[e].call(a.exports,a,a.exports,n),a.exports}n.m=t,function(){var t=[];n.O=function(i,e,s,a){if(!e){var o=1/0;for(c=0;c<t.length;c++){e=t[c][0],s=t[c][1],a=t[c][2];for(var r=!0,l=0;l<e.length;l++)(!1&a||o>=a)&&Object.keys(n.O).every((function(t){return n.O[t](e[l])}))?e.splice(l--,1):(r=!1,a<o&&(o=a));if(r){t.splice(c--,1);var u=s();void 0!==u&&(i=u)}}return i}a=a||0;for(var c=t.length;c>0&&t[c-1][2]>a;c--)t[c]=t[c-1];t[c]=[e,s,a]}}(),function(){n.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(i,{a:i}),i}}(),function(){n.d=function(t,i){for(var e in i)n.o(i,e)&&!n.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:i[e]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};n.O.j=function(i){return 0===t[i]};var i=function(i,e){var s,a,o=e[0],r=e[1],l=e[2],u=0;if(o.some((function(i){return 0!==t[i]}))){for(s in r)n.o(r,s)&&(n.m[s]=r[s]);if(l)var c=l(n)}for(i&&i(e);u<o.length;u++)a=o[u],n.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return n.O(c)},e=self["webpackChunksimulations"]=self["webpackChunksimulations"]||[];e.forEach(i.bind(null,0)),e.push=i.bind(null,e.push.bind(e))}();var e=n.O(void 0,[998],(function(){return n(6366)}));e=n.O(e)})();
//# sourceMappingURL=app.2ecdf45a.js.map