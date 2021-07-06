<template>
  <v-container fluid mt-5 mb-12>
    <v-row>
      <v-col cols="12" lg="6" class="mx-auto">
        <v-row class="justify-md" mt-8 align="center">
        <v-col cols="4">
                <v-avatar 
                  color="primary"
                  size="100"
                  >{{profile.name}}</v-avatar>
        </v-col>
        <v-col cols="8">
            <h2>{{profile.name}}</h2>
            <subtitle-1>{{profile.email}}</subtitle-1> <br>
            <small @click="logout">Logout</small>
        </v-col >
    </v-row>
      <div class="row mt-3">
          <v-card class="col-12">

        <v-tabs
          v-model="tab"
          background-color="transparent"
          grow
        >
          <v-tab>Activity</v-tab>
          <v-tab>Transaksi</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item
          >
            <v-card
              color="basil"
              flat
            >
              <v-row dense>

            <v-col
              v-for="(item, i) in carts"
              :key="i"
              cols="12"
            >
              <v-card>
                <div class="d-flex flex-no-wrap">
                  <v-avatar
                    class="ma-3"
                    size="125"
                    tile
                  >
                    <v-img :src="item.file_path"></v-img>
                  </v-avatar>
                  <div>
                    
                    <v-card-title
                      class="text-h5"
                      v-text="item.ternak_nama"
                    ></v-card-title>

                    <v-card-subtitle v-text="item.ternak_deskripsi"></v-card-subtitle>
                    <v-card-subtitle>
                      <div class="subtitle font-weight-bold" color="#FF8F0B">
                        Rp. {{ formatPrice(item.ternak_harga) }}
                    </div>
                    </v-card-subtitle>
                    <v-card-actions>
                      <div class="text-center">
                        <v-dialog
                          v-model="dialog"
                          width="500"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              color="#139CA4"
                              dark
                              v-bind="attrs"
                              v-on="on"
                            >
                              Details
                            </v-btn>
                            <v-btn
                              color="orange lighten-2"
                              dark
                              :to="'payment/'+item.id"
                            >
                              Checkout
                            </v-btn>
                          </template>

                          <v-card>
                            <v-card-title class="headline grey lighten-2">
                              Detail Pesanan
                            </v-card-title>

                            <v-card-text>
                              <table class="table">
                                <tbody>
                                  <tr>
                                    <td>Nama Ternak</td>
                                    <td> : </td>
                                    <td>{{item.ternak_nama}}</td>
                                  </tr>
                                  <tr>
                                    <td>Deskripsi</td>
                                    <td> : </td>
                                    <td>{{item.ternak_deskripsi}}</td>
                                  </tr>
                                  <tr>
                                    <td>Harga</td>
                                    <td> : </td>
                                    <td>{{item.ternak_harga}}</td>
                                  </tr>
                                  <tr>
                                    <td>Penerima</td>
                                    <td> : </td>
                                    <td>{{JSON.parse(item.transaksi_alamat).name}}</td>
                                  </tr>
                                  <tr>
                                    <td>Detail Alamat</td>
                                    <td> : </td>
                                    <td>{{JSON.parse(item.transaksi_alamat).alamat}}, 
                                        {{JSON.parse(item.transaksi_alamat).detail_alamat}}
                                      </td>
                                  </tr>
                                  <tr>
                                    <td>Note</td>
                                    <td> : </td>
                                    <td>{{JSON.parse(item.transaksi_alamat).note}}</td>
                                  </tr>
                                </tbody>
                                </table>
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                              color="orange lighten-2"
                              dark
                              :to="'payment/'+item.id"
                            >
                              Checkout
                            </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </div>
                    </v-card-actions>
                  </div>

                  
                </div>
              </v-card>
            </v-col>
          </v-row>
            </v-card>
          </v-tab-item>
          <v-tab-item
          >
            <v-card
              color="basil"
              flat
            >
              <v-card-text>Transaksi yg dilakukan</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import axios from "axios";
import { LOGOUT } from "@/store/actions.type";

export default {
  name: 'Profile',
  components: {
    
  },
  data() {
    return {
      profile: [],
      carts:{},
      tab: null,
        items: [
          'Appetizers', 'Entrees', 'Deserts', 'Cocktails',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    };
  },
  methods: {
    logout() {
            this.$store.dispatch(LOGOUT).then(() => {
                this.$router.push({ name: "login" });
            });
        },
    setProfile(data) {
      this.profile = data;
    },
    setCarts(data) {
    this.carts = data;
    console.log(this.carts);
    },
    formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
  },
  mounted(){
      this.setProfile(this.$store.state.auth.user)
      console.log(this.$store.state.auth.user);

      axios
      .get("transaksi/"+this.$store.state.auth.user.id)
      .then((response) => this.setCarts(response.data.cart))
      .catch((error) => console.log(error));
  
  },
}
</script>
