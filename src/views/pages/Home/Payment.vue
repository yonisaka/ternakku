<template>
    <div>
        <AppBar :page="page"/>
        <v-row>
          <v-col cols="12" lg="6" class="mx-auto">
            <v-container fluid fill-height>
              <v-layout align-center justify-center>
                <v-flex xs12 sm12 md12>
                  <v-row class="mt-12">
                    <v-col cols="12">
                      <v-card flat>
                        <v-card-text>
                          <h3 class="subtitle font-weight-bold ma-3"> 
                            Detail Pemesanan 
                          </h3>
                          <v-divider></v-divider>
                          <div v-if="data.st == 'ternak'" class="ma-3">
                            <v-row>
                              <v-col cols="12">
                                <v-img class="my-2" height="250" width="100%" :src="data.file_ternak" ></v-img>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="5">Penerima</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="6">{{data.nama_penerima}}</v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="5">Detail Alamat</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="6">{{data.detail_alamat}}</v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="5">Hewan Ternak</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="6">{{data.ternak_nama}}</v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="5">Masa perawatan</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="6">{{data.masa_perawatan}} Bulan</v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="5">Harga Ternak</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="6">Rp. {{formatPrice(data.ternak_harga)}}</v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="5">Harga Perawatan</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="6">Rp. {{formatPrice(data.perawatan_harga*data.masa_perawatan)}}</v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="5">Harga Pengiriman</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="6">Rp. {{formatPrice(data.harga_ongkir)}}</v-col>
                            </v-row>
                          </div>
                          <div v-else>
                            <v-row>
                              <v-col cols="12">
                                <v-img class="my-2" height="250" width="100%" :src="data.file_produk" ></v-img>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="5">Penerima</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="6">{{data.nama_penerima}}</v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="5">Detail Alamat</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="6">{{data.detail_alamat}}</v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="5">Produk</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="6">{{data.produk_nama}}</v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="5">Harga Produk</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="6">Rp. {{ formatPrice(data.ternak_harga) }} / {{ data.qty }} {{ toUpperCase(data.produk_jenis) }}</v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="5">Harga Pengiriman</v-col>
                              <v-col cols="1">:</v-col>
                              <v-col cols="6">Rp. {{formatPrice(data.harga_ongkir)}}</v-col>
                            </v-row>
                          </div>
                        </v-card-text>
                        <v-divider class="mx-4"></v-divider>
                        <v-card-text class="text-right">
                          <v-spacer></v-spacer>
                          <span class="subtitle font-weight ml-auto mr-3"
                                    > Total Pembayaran</span>
                                    <span class="subtitle font-weight-bold ml-auto mr-3">
                                        Rp {{formatPrice(data.total_harga)}}
                                    </span>
                                    
                        </v-card-text>
                        <v-card-actions>
                          <v-btn
                            color="orange lighten-2"
                            block
                            dark
                            v-on:click="createInvoice()"
                            :disabled="isLoading"
                            >
                            <span v-if="isLoading">
                            <v-progress-circular
                            :size="15"
                            indeterminate
                            color="orange lighten-2"
                            ></v-progress-circular>
                          </span>
                          <span v-else>
                            Bayar Sekarang
                          </span>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-flex>
              </v-layout>
            </v-container>
          </v-col>
        </v-row>
    </div>
</template>


<script>
import AppBar from '@/components/AppBar.vue';
import axios from 'axios';


export default {
    components: {
        AppBar,
    },
    data: () => ({
        page: {
            link: '/cart',
            title: 'Metode Pembayaran',
        },
        data:{},
        selectedPayment:null,
        radios: null,
        parameter: {},
        token:"",
        profile: [],
        loader: null,
        isLoading: false,
    }),

    methods:{
    setData(data) {
    this.data = data;
    console.log(this.data)
    },

    setProfile(data) {
      this.profile = data;
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
    // testPay(){
    //     this.parameter.order_id = this.data.order_id;
    //     this.parameter.gross_amount = this.data.ternak_harga;
    //     this.parameter.name = this.profile.name;
    //     this.parameter.email = this.profile.email;

    //     axios
    //         .post("http://ternakmart.id/ternakmart_api/public/api/transaksi_getToken",  this.parameter)
    //         .then((response) => {
    //             window.snap.pay(response.data.token);
    //         })
        
        // console.log(this.parameter.customer_details)

        // window.snap.pay(this.data.transaksi_token);
    // },

    createInvoice(){
      this.parameter.external_id = "Invoice-"+(new Date().getTime());
      this.parameter.amount = this.data.total_harga;
      this.parameter.payer_email = this.data.email;
      this.parameter.description = "Order Id "+ this.data.order_id;
      this.parameter.order_id = this.data.order_id;
      this.isLoading = true
      axios
            .post("transaksi_createinvoice",  this.parameter)
            .then((response) => {
              this.isLoading = false
              console.log(response.data)
              window.location = response.data.Response.invoice_url;
                
            })
    }

  },
  mounted() {
      this.setProfile(this.$store.state.auth.user)
            
      //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'; 
        //change this according to your client-key
        const myMidtransClientKey = 'SB-Mid-client-oFw30zXYyh5KvFiA'; 

        let scriptTag = document.createElement('script');
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute('data-client-key', myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
        document.body.removeChild(scriptTag);
        },

    axios
      .get("transaksi/"+this.$route.params.id+"/detail")
      .then((response) => {
          this.setData(response.data.cart)
          
      })
      .catch((error) => console.log(error));

    

  },
}
</script>