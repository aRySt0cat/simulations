<template>
  <v-container>
    <v-row>
        <v-btn color="#def" to="/">ホームに戻る</v-btn>
    </v-row>
    <v-row>
        <br><br>
    </v-row>
    <v-row>
        <v-card>
            <v-card-title> <h2> {{ title }} </h2></v-card-title>
            <v-card-text><slot></slot></v-card-text>
        </v-card>
    </v-row>
  </v-container>
</template>
<script>
export default({
    props: ['title'],
})
</script>