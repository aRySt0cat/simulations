<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- ホームに戻るボタン -->
        <v-btn color="primary" to="/">ホームに戻る</v-btn>
        <h1>重力</h1>
        <p>
        中心の円は固定されていて, 質量と半径のみスライダーで変更可能です (質点として計算するため半径はシミュレーションには影響しません)。<br>
        クリックすると点が描画され, ドラッグすると速度ベクトルを設定できます。<br><br>
        </p>
        <SimulationGravity />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SimulationGravity from "@/components/SimulationGravity.vue";

export default {
  components: {
    SimulationGravity
  }
};
</script>
