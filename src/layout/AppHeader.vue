<template>
    <!-- <v-card class="overflow-hidden">
        <v-app-bar
        color="#139CA4"
        flat
        >
            <v-img
            src="img/brand/ternakmart.png"
            max-height="30"
            max-width="30"
            ></v-img>
            <v-card-text>
                <v-text-field
                    class="ml-2 mt-7"
                    label="Cari"
                    single-line
                    solo
                    style="
width: 240px;
                    "
                ></v-text-field>
            </v-card-text>
            <v-btn 
            color="white"
            icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn 
            color="white"
            icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>
        </v-app-bar>
    </v-card> -->
    <div>
    <v-app-bar
      color="#139CA4"
      flat
      
    >
        <v-img
          src="img/brand/ternakmart.png"
          max-height="30"
          max-width="30"
          
          ></v-img>
      <v-spacer></v-spacer>
      <v-text-field
            class="ml-2 mt-7"
            label="Cari"
            single-line
            solo
            dense
            append-icon="mdi-magnify"
          ></v-text-field>
      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn> -->

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            @click="() => {this.$router.push({ path: '/profile' })}"
          >
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="logout"
          >
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { LOGOUT } from "@/store/actions.type";

export default {
    computed: {
        ...mapGetters(["currentUser", "isAuthenticated"])
    },
    methods: {
        logout() {
            this.$store.dispatch(LOGOUT).then(() => {
                this.$router.push({ name: "login" });
            });
        }
    }
};
</script>
<style>
</style>
