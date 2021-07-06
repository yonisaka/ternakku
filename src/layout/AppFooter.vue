<template>
    <!-- <v-bottom-navigation
        v-model="value"
        :background-color="color"
        shift
    > -->
    <v-bottom-navigation
        background-color="#139CA4"
        color="dark-grey"
        class="nav-bottom position"
        fixed
    >
        <v-btn :to="{ name: 'home' }">
        <span>Home</span>

        <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn :to="{ name: 'activity' }">
        <span>Activity</span>

        <v-icon>mdi-clipboard-list-outline</v-icon>
        </v-btn>

        
        <v-btn :to="{ name: 'cart' }">
        <span>Cart</span>
        <v-badge
        overlap
        color="#139CA4"
        v-if="(updateCart ? updateCart.length : jumlah_cart.length)==0"
          :content="updateCart ? updateCart.length : jumlah_cart.length"
          bordered
          :value=false
        >
        <v-icon>mdi-cart</v-icon>
        </v-badge>
        <v-badge
        overlap
        color="#139CA4"
        v-else
          :content="updateCart ? updateCart.length : jumlah_cart.length"
          bordered
        >
        <v-icon>mdi-cart</v-icon>
        </v-badge>
        </v-btn>

        <v-btn :to="{ name: 'profile' }">
        <span>Account</span>

        <v-icon>mdi-account</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>
<script>

import axios from "axios";

export default {
    name: 'app-footer',
        props: ["updateCart"],

    data() {
        return {
            // value: 1,
            year: new Date().getFullYear(),

            e3: 0,
            counts: [],
            jumlah_cart:[],
        }
    },
    computed: {
        // color () {
        //     switch (this.value) {
        //     case 0: return 'blue-grey'
        //     case 1: return 'teal'
        //     case 2: return 'brown'
        //     case 3: return 'indigo'
        //     default: return 'blue-grey'
        //     }
        // },
    },
    methods:{
    setJumlah(data) {
      this.jumlah_cart = data;
    },
    },
    mounted() {
    axios
      .get("transaksi/"+this.$store.state.auth.user.id+"/cart")
      .then((response) => this.setJumlah(response.data.cart))
      .catch((error) => console.log(error));
  },
};
</script>
<style>

.nav-bottom {
    border-radius: 1rem 1rem 0 0;
}
</style>
