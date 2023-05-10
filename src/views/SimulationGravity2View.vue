<template>
<v-container>
    <SimulationHeader title="重力">
          中心の円は固定されていて, 質量と半径のみスライダーで変更可能です。<br>
          クリックすると点が描画され, ドラッグすると速度ベクトルを設定できます。<br>
          赤い点はExplicit Euler法, 青い点はImplicit Euler法で軌道が計算されます。<br>
          <br>
    </SimulationHeader>
    <SimulationGravity2 />
    </v-container>
</template>
  
  <script>
import SimulationGravity2 from "@/components/SimulationGravity2.vue";
import SimulationHeader from "@/components/SimulationHeader.vue";
  
export default {
components: {
    SimulationGravity2,
    SimulationHeader
}
};
</script>
