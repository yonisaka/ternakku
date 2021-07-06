<template>
  <v-app>
    <div id="app">
        <!-- <SystemBar/> -->
        <!-- <router-view name="header"></router-view> -->
        <v-main>
          <fade-transition origin="center" mode="out-in" :duration="250">
              <router-view/>
          </fade-transition>
        </v-main>
        <router-view name="footer"></router-view>
    </div>
  </v-app>
</template>
<script>
// import SystemBar from "@/components/SystemBar";
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    // SystemBar,
    FadeTransition
  }
};
</script>

