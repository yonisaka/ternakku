<template>
    <div>
        <v-app-bar
        color="#139CA4"
        flat
        >   
            <router-link
            to="/"
            >
            <v-img
                src="img/brand/ternakmart.png"
                max-height="30"
                max-width="30"
                ></v-img>
            </router-link>
            <v-spacer></v-spacer>
            <v-btn 
                icon
                @click="extend()"
            >
                <v-icon color="white">mdi-magnify</v-icon>
            </v-btn>
            <v-menu
                left
                bottom
                v-if="profile.name"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon color="white">mdi-dots-vertical</v-icon>
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
        <v-expand-transition>
            <v-sheet
                v-if="searchbar"
                color="#139CA4"
                height="150"
            >
                <v-container>
                    <v-row
                    class="fill-height"
                    no-gutters
                    >
                        <v-col cols="12" lg="8" class="mx-auto">
                            <v-text-field
                            v-model="search.nama"
                            @keyup="searchProduk"
                                label="Cari Produk"
                                solo
                                dense
                                append-icon="mdi-magnify"
                                color="white"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="8" class="mx-auto">
                            <v-select
                            v-model="search.produk_jenis"
                            item-text="text"
                            item-value="value"
                            :items="produk_jenis"
                            label="Jenis Produk"
                            solo
                            dense
                            @change="searchProduk"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-container>
            </v-sheet>
        </v-expand-transition>
        <v-container>
             <v-row justify="space-around">
                <v-col
                    cols="12"
                    sm="10"
                    md="8"
                >
                    <v-sheet
                    class="py-1 px-1"
                    >
                    <v-chip-group
                        :mandatory="mandatory"
                        active-class="primary--text"
                    >
                        <v-chip
                        v-for="tag in city"
                        :key="tag.city_id"
                        @click="searchLokasi(tag.city_id)"
                        >
                        {{ tag.city_name }}
                        </v-chip>
                    </v-chip-group>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row v-if="loading">
                <v-col cols="12" lg="8" class="mx-auto">
                    <v-row>
                        <v-col cols="6" lg="4" v-for="i in 9" :key="i">
                            <v-sheet
                            color="grey lighten-4"
                            >
                            <v-skeleton-loader
                                elevation="2"
                                :loading="loading"
                                type="card"
                            ></v-skeleton-loader>
                            </v-sheet>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row v-else class="mb-15">
                <v-col cols="12" lg="8" class="mx-auto">
                    <v-row>
                        <v-col cols="6" lg="4" v-for="produk in produks" :key="produk.id">
                            <CardProduk :produk="produk"/>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="dialogLogout" max-width="400px">
            <v-card>
                <v-card-title class="headline">
                    <span class="mx-auto"> 
                    <div class="text-center">
                        <v-icon
                        size="100"
                        color="orange"
                        >
                        mdi-alert-circle-outline
                        </v-icon>
                    </div>
                    <h4> Keluar dari akun ? </h4>
                    </span>
                </v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeLogout">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="logoutItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

import CardProduk from "@/components/CardProduk";
import axios from "axios";
import { mapGetters } from "vuex";
import { LOGOUT } from "@/store/actions.type";

  export default {
    name: 'Qurban',
  components: {
    CardProduk,
  },
  computed: 
    {
        ...mapGetters(["currentUser", "isAuthenticated"])
    },
    data () {
      return {
        loading: true,
        page: 1,
        produks: [],
        profile: [],
        search: {},
        searchbar: false,
        mandatory: false,
        produk_jenis:[
            {
                'text' : 'Pack',
                'value' : 'pack'
            },
            {
                'text' : 'Kaleng',
                'value' : 'kaleng'
            }
        ],
        lokasi: [],
        dialogLogout: false,
        city: []
      }
    },

    methods: {
    extend(){
        if (this.searchbar == false){
            this.searchbar = true
        } else {
            this.searchbar = false
        }
    },
    setProduks(data) {
      this.produks = data;
    },
    setCity(data) {
      this.city = data;
    },
    setProfile(data) {
      this.profile = data;
    },
    setLokasi(data) {
      this.lokasi = data;
    },
    logout() {
      this.dialogLogout = true
    },
    closeLogout () {
      this.dialogLogout = false
    },
    logoutItemConfirm () {
        this.$store.dispatch(LOGOUT).then(() => {
          this.$router.push({ name: "login" });
      });
    },
    searchLokasi(city_id){
        this.search.city_id = city_id
        this.searchProduk();
    },
    searchProduk() {
        axios
        .post("cariproduk",this.search)
        .then((response) => {
            console.log(response)
            this.setProduks(response.data.data)
        })
        .catch((error) => console.log(error))
    },
  },
  mounted() {
    this.setProfile(this.$store.state.auth.user)
    this.search.nama = ''
    this.search.produk_jenis = ''
    this.search.lokasi = ''
    axios
      .get("produk")
      .then((response) => 
            {
                this.loading = false
                this.setProduks(response.data.data)  
            }
        )
      .catch((error) => console.log(error))
    axios
      .get("lokasi/kota_aktif_produk")
      .then((response) => this.setCity(response.data.kota))
      .catch((error) => console.log(error))
  },
  }
</script>