<template>
  <div>
    <AppBar :page="page"/>
    <v-container class="elevation-0 mt-12 mb-12">
      <v-tabs
      v-model="tab"
      background-color="transparent"
      grow
    >
      <v-tab>Pending</v-tab>
      <v-tab>Paid</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-row dense>

        <v-col
          v-for="(item, i) in pendings"
          :key="i"
          cols="12"
        >
          <v-card class="mt-3">
                <v-img
                  class="white--text align-end"
                  height="200px"
                  :src="item.file_path" 
                >
                  <v-card-title>{{item.ternak_nama}}</v-card-title>
                </v-img>

                <v-card-text> {{subStr(item.ternak_deskripsi)}}</v-card-text>
                <v-card-subtitle>
                  <v-row>
                    <v-col cols="5">Harga Ternak</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      <div class="subtitle font-weight-bold" color="#FF8F0B">
                        Rp. {{ formatPrice(item.ternak_harga) }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="5">Harga Pengiriman</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      <div class="subtitle font-weight-bold" color="#FF8F0B">
                        Rp. {{ formatPrice(item.harga_ongkir) }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="5">Masa Perawatan</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      <div class="subtitle font-weight-bold" color="#FF8F0B">
                        {{(item.masa_perawatan)}} Hari
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="5">Harga Perawatan</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      <div class="subtitle font-weight-bold" color="#FF8F0B">
                        Rp. {{ formatPrice(item.perawatan_harga*item.masa_perawatan) }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="5">Harga Perawatan</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      <div class="subtitle font-weight-bold" color="#FF8F0B">
                        Rp. {{ formatPrice(item.perawatan_harga*item.masa_perawatan) }}
                      </div>
                    </v-col>
                  </v-row>
                </v-card-subtitle>
                <v-card-actions>
                  <div class="text-center">
                    <v-dialog
                      
                      width="500"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="#139CA4"
                          dark
                          v-bind="attrs"
                          v-on="on"
                          class="mr-2"
                        >
                          Details
                        </v-btn>
                        <br>
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
                          <div class="mt-3">
                            <v-row>
                              <v-col cols="4">Nama Ternak</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="7">{{item.ternak_nama}}</v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="4">Deskripsi</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="12" class="text-justify">{{item.ternak_deskripsi}}</v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="4">Harga</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="7">Rp. {{formatPrice(item.ternak_harga)}}</v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="4">Penerima</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="7">{{item.nama_penerima}}</v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="4">Alamat Penerima</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="7">{{item.detail_alamat}}, {{item.city_name}}, {{item.province}}</v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="4">Catatan</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="7">{{item.transaksi_note}}</v-col>
                            </v-row>
                          </div>
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
          </v-card>
        </v-col>
      </v-row>
      </v-tab-item>
      <v-tab-item>
          <v-row dense>

        <v-col
          v-for="(item, i) in pendings"
          :key="i"
          cols="12"
        >
          <v-card class="mt-3">
                <v-img
                  class="white--text align-end"
                  height="200px"
                  :src="item.file_path" 
                >
                  <v-card-title>{{item.ternak_nama}}</v-card-title>
                </v-img>

                <v-card-text> {{subStr(item.ternak_deskripsi)}}</v-card-text>
                <v-card-subtitle>
                  <v-row>
                    <v-col cols="5">Harga Ternak</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      <div class="subtitle font-weight-bold" color="#FF8F0B">
                        Rp. {{ formatPrice(item.ternak_harga) }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="5">Harga Pengiriman</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      <div class="subtitle font-weight-bold" color="#FF8F0B">
                        Rp. {{ formatPrice(item.harga_ongkir) }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="5">Masa Perawatan</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      <div class="subtitle font-weight-bold" color="#FF8F0B">
                        {{(item.masa_perawatan)}} Hari
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="5">Harga Perawatan</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      <div class="subtitle font-weight-bold" color="#FF8F0B">
                        Rp. {{ formatPrice(item.perawatan_harga*item.masa_perawatan) }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="5">Harga Perawatan</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      <div class="subtitle font-weight-bold" color="#FF8F0B">
                        Rp. {{ formatPrice(item.perawatan_harga*item.masa_perawatan) }}
                      </div>
                    </v-col>
                  </v-row>
                </v-card-subtitle>
                <v-card-actions>
                  <div class="text-center">
                    <v-dialog
                      
                      width="500"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="#139CA4"
                          dark
                          v-bind="attrs"
                          v-on="on"
                          class="mr-2"
                        >
                          Details
                        </v-btn>
                        <br>
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
                          <div class="mt-3">
                            <v-row>
                              <v-col cols="4">Nama Ternak</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="7">{{item.ternak_nama}}</v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="4">Deskripsi</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="12">{{item.ternak_deskripsi}}</v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="4">Harga</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="7">Rp. {{formatPrice(item.ternak_harga)}}</v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="4">Penerima</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="7">{{item.nama_penerima}}</v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="4">Alamat Penerima</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="7">{{item.detail_alamat}}, {{item.city_name}}, {{item.province}}</v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="4">Catatan</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="7">{{item.transaksi_note}}</v-col>
                            </v-row>
                          </div>
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
          </v-card>
        </v-col>
      </v-row>
      </v-tab-item>
    </v-tabs-items>
    </v-container>
  </div>
</template>

<script>

import AppBar from '@/components/AppBar.vue';
import axios from "axios";

export default {
  name: 'Activity',
  components: {
    AppBar,
    
  },
  data(){
    return{
        tab: null,
        page: {
            link: '/',
            title: 'Activity',
        },
        pendings: [],
        paids: [],
    }
  },
  methods:{
    setPendings(data) {
      this.pendings = data;
    },
    setPaids(data) {
      this.paids = data;
    },
    subStr(value) {
      return value.substring(0,100) + '...';
    },
    formatPrice(value) {
      let val = (value/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  },

  mounted() {
    axios
      .get("transaksi/"+this.$store.state.auth.user.id+"/waiting")
      .then((response) => this.setPendings(response.data.cart))
      .catch((error) => console.log(error));
  },
}
</script>
