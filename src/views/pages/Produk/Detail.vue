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
                    height="100%"
                    class="mx-auto"
                >
                    <v-img
                    :src="data.file_path"
                    height="350px"
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
                                    <span style="color:#139CA4;">{{data.produk_nama}}</span>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <div class="subtitle font-weight-bold text-center">
                                    <b style="color:#139CA4;">{{data.qty}}</b><br>
                                    QTY
                                </div>
                            </v-col>
                            <v-col cols="6">
                                <div class="subtitle font-weight-bold text-center">
                                    <b style="color:#139CA4;">{{toUpperCase(data.produk_jenis)}}</b><br>
                                    Jenis 
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
                                        {{data.produk_deskripsi}} <br/>
 
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
                            <div class="subtitle font-weight-bold">
                                    <span class="title" style="color:#fca311;">Rp {{formatPrice(data.produk_harga)}} </span>
                                    <span class="title"> / {{ data.qty }} {{ toUpperCase(data.produk_jenis) }} </span> <br>
                            </div>
                            <v-spacer></v-spacer>
                            <v-btn
                            color="#139CA4"
                            class="white--text px-10"
                            :to="{ path: 'add/'+ data.id}"
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
    },
    toUpperCase(value){
        if(!value) return ''
            value = value.toString()
        return value.toUpperCase()
    },
  },
  mounted() {
    axios
      .get("produk/" + this.$route.params.id)
      .then((response) => 
        {
            this.loading = false
            this.setData(response.data.data)
        })
      .catch((error) => console.log(error));
  },
}
</script>
<style scoped>
.rounded-card {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    border-radius: 1rem 1rem 0 0;
}
</style>
