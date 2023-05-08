<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- ホームに戻るボタン -->
        <v-btn color="primary" to="/">ホームに戻る</v-btn>
        <h1>勾配降下法</h1>
        <p>
          説明文
        </p>
        <GradientDescent />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GradientDescent from "@/components/GradientDescent.vue";

export default {
  components: {
    GradientDescent
  }
};
</script>
