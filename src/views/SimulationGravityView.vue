<template>
  <v-container>
    <SimulationHeader title="重力">
        中心の円は固定されていて, 質量と半径のみスライダーで変更可能です (質点として計算するため半径はシミュレーションには影響しません)。<br>
        クリックすると点が描画され, ドラッグすると速度ベクトルを設定できます。<br><br>
    </SimulationHeader>
    <SimulationGravity />
  </v-container>
</template>

<script>
import SimulationGravity from "@/components/SimulationGravity.vue";
import SimulationHeader from "@/components/SimulationHeader.vue";

export default {
  components: {
    SimulationGravity,
    SimulationHeader
  }
};
</script>
