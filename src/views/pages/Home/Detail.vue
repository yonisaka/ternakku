<template>
    <div>
        <v-row>
            <v-col cols="12" lg="6" class="mx-auto">
                <v-card
                    v-if="loading"
                    max-width="100%"
                    height="100%"
                    class="mx-auto"
                >
                    <v-card-text>
                        <v-skeleton-loader
                        height="100%"
                        type="image, article , article, article, actions"
                        ></v-skeleton-loader>
                    </v-card-text>
                </v-card>
                <v-card
                    v-else
                    max-width="100%"
                    class="mx-auto"
                >
                    <v-img
                    :src="data.file_path"
                    height="300px"
                    dark
                    >
                    <v-row>
                        <v-card-title>
                        <ButtonBack :history="current"/>
                        <v-spacer></v-spacer>
                        </v-card-title>
                    </v-row>
                    </v-img>
                    <v-card-text>
                        <v-row>
                            <v-col>
                                <div class="title font-weight-bold text-center"
                                >
                                    <span style="color:#139CA4;">{{data.ternak_nama}}</span>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <div class="subtitle font-weight-bold text-center">
                                    <b style="color:#139CA4;">{{data.ternak_berat}} KG</b><br>
                                    Berat Hidup
                                </div>
                            </v-col>
                            <v-col cols="4">
                                <div class="subtitle font-weight-bold text-center">
                                    <b style="color:#139CA4;">{{data.jenis_nama}}</b><br>
                                    Jenis / Breed
                                </div>
                            </v-col>
                            <v-col cols="4">
                                <div class="subtitle font-weight-bold text-center">
                                    <b style="color:#139CA4;">{{data.ternak_umur}} Bulan</b> <br>
                                    Umur
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <div class=" text-center">
                                    <span style="color:#139CA4;">Dibawah pengawasan {{data.dokter_nama}}</span>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-card
                                    color="grey lighten-2"
                                    elevation="2"
                                    outlined
                                    flat
                                >
                                    <v-card-title>
                                        <div style="color:#139CA4;" class="subtitle font-weight-bold">
                                            Deskripsi
                                        </div>
                                    </v-card-title>
                                    <v-card-text class="text-justify">
                                        <div class="subtitle font-weight-bold">
                                            Peternakan
                                        </div>
                                        {{data.ternak_deskripsi}} <br/>
                                        <div class="subtitle font-weight-bold">
                                            Kesehatan Ternak
                                        </div>

                                        {{data.verifikasi_note}}
                                    </v-card-text>
                                    <v-card-title>
                                        
                                        <v-card-text>
                                            
                                        </v-card-text>
                                    </v-card-title>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card
                    elevation="2"
                    outlined
                    class="rounded-card"
                    >
                        <v-card-text>
                            <v-row
                            class="my-1 mx-3"
                            >
                            <div class="subtitle font-weight-bold ml-2">
                                    <span class="title" style="color:#fca311;">Rp {{formatPrice(data.ternak_harga)}} </span>
                                    <span class="title">/Kg </span> <br>
                                    <small v-if="data.diskon_st == 1">
                                        Diskon Rp. {{formatPrice(data.diskon_harga)}}
                                    </small>
                            </div>
                            <v-spacer></v-spacer>
                            <v-btn
                            color="#139CA4"
                            class="white--text px-10"
                            :to="{ name: 'detail_add'}"
                            >
                                Beli
                            </v-btn>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>

import ButtonBack from "@/components/ButtonBack";
import axios from "axios";

export default {
  name: 'Detail',
  components: {
    ButtonBack,
  },
  data(){
      return{
          loading: true,
          data:{},
          current:'home'
      }
  },
  methods:{
    setData(data) {
        this.data = data;
    },
    formatPrice(value) {
                let val = (value/1).toFixed(0).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
  },
  mounted() {
    axios
      .get("ternak/" + this.$route.params.id)
      .then((response) => 
        {
            this.loading = false
            this.setData(response.data.ternak)
        })
      .catch((error) => console.log(error));
  },
}
</script>
<style scoped>
.rounded-card {
    border-radius: 1rem 1rem 0 0;
}
</style>
