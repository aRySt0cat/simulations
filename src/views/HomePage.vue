<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Physics</v-card-title>
          <v-list>
            <v-list-item v-for="simulation in physics_simulations" :key="simulation.name" :to="simulation.path">
              <v-list-item-content>
                <v-list-item-title>{{ simulation.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>Machine Learning</v-card-title>
          <v-list>
            <v-list-item v-for="simulation in ml_simulations" :key="simulation.name" :to="simulation.path">
              <v-list-item-content>
                <v-list-item-title>{{ simulation.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      physics_simulations: [
        { name: "重力", path: "/gravity_simple" }
        // Add more simulations here
      ],
      ml_simulations: [
        { name: "勾配降下法", path: "/gradient_descent" }
      ]
    };
  }
};
</script>
