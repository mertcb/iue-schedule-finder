<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>IUE</span>
        <span class="font-weight-light">Schedule Finder</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <ScheduleFinder />
    </v-content>
  </v-app>
</template>

<script>
import ScheduleFinder from "./components/ScheduleFinder";

export default {
  name: "App",
  components: {
    ScheduleFinder
  },
  data: () => ({
    //
  })
};
</script>
