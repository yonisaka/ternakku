<template>
    <div>
        <AppBar :page="page"/>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-0 mt-10" >
                        <v-card-text>
                            <!-- <ul v-if="errors" class="red--text my-3">
                                <li v-for="(v, k) in errors" :key="k"> {{ v[0] | error }}</li>
                            </ul> -->
                            <v-form @submit.prevent="pemesanan" id="register">
                                <v-text-field
                                    append-icon="mdi-account"
                                    v-model="order.nama_penerima"
                                    label="Nama Penerima"
                                    type="text"
                                >
                                </v-text-field>
                                <v-select
                                v-model="order.province_id"
                                :items="provinces"
                                item-text="province"
                                item-value="province_id"
                                label="Provinsi"
                                append-outer-icon="mdi-map"
                                @change="getkotabyidProv"
                                >
                                </v-select>
                                <v-select
                                v-model="order.city_id"
                                :items="cities"
                                item-text="city_name"
                                item-value="city_id"
                                label="Kabupaten/Kota"
                                append-outer-icon="mdi-map"
                                @change="gethargaOngkir"
                                ></v-select>
                                <v-text-field
                                    append-icon="mdi-map-marker"
                                    v-model="order.detail_alamat"
                                    label="Alamat"
                                    type="text"
                                >
                                </v-text-field>
                                <v-text-field
                                    append-icon="mdi-note"
                                    v-model="order.transaksi_note"
                                    label="Note to Driver"
                                    type="text"
                                >
                                </v-text-field>
                            </v-form> 
                        </v-card-text>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <div class="title">Total Harga</div>
                                </v-col>
                            </v-row>                
                            <v-row>
                                <v-col cols="6">
                                    <label> Harga Produk </label>
                                </v-col>
                                <v-col cols="6" class="text-right">                                    
                                    <div class="subtitle">Rp. {{formatPrice(produk.produk_harga)}}</div>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <label> Harga Ongkir </label>
                                </v-col>
                                <v-col cols="6" class="text-right">                                    
                                    <div class="subtitle">Rp. {{formatPrice(harga_ongkir)}}</div>
                                </v-col>
                            </v-row>
                            <v-row v-if="promo_ongkir_st == 1">
                                <v-col cols="6">
                                    <label> Promo Ongkir </label>
                                </v-col>
                                <v-col cols="6" class="text-right">                                    
                                    <div class="subtitle">Rp. {{formatPrice(promo_ongkir_harga)}}</div>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <label> Total </label>
                                </v-col>
                                <v-col cols="6" class="text-right">                                    
                                    <div class="subtitle">Rp. {{formatPrice(total_harga)}}</div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-btn 
                                type="submit"
                                class="white--text font-weight-bold"
                                color="#139CA4"
                                block
                                form="register"
                                >
                                Save
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-snackbar
            v-model="snackbar"
            timeout="2000"
            :color="color"
            >
            {{ message }}
        </v-snackbar>
    </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue';
import axios from "axios";

export default {
    components: {
        AppBar,
    },
    data() {
        return {
            page: {
                link: '/produk/detail/'+this.$route.params.id,
                title: 'Detail Pemesanan',
            },
            produk:{},
            order:{},
            parameter:{},
            profile:[],
            cities:[],
            provinces:[],
            costData:{},
            distance: '',
            harga_ongkir: '',
            masa_perawatan: '',
            promo_ongkir_st: '',
            promo_ongkir_harga: '',
            total_harga: '',
            invoice:{},
            snackbar: false,
            message: '',
            color: '',
        }
    },
    methods:{
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        setProfile(data) {
        this.profile = data;
        }, 
        setProduk(data) {
        this.produk = data;
        },
        pemesanan() {
        
        //set data ke tabel transaksi
        this.order.id_produk = this.produk.id;
        this.order.id_user =  this.$store.state.auth.user.id;
        this.order.ternak_harga = this.produk.produk_harga;  
        this.order.total_harga = this.total_harga;
        this.order.transaksi_st = "CART";
        this.order.order_id = "ORDER-"+(new Date().getTime());
        this.order.distance = this.distance;
        this.order.harga_ongkir = this.promo_ongkir_st == 1 ? this.harga_ongkir-this.promo_ongkir_harga : this.harga_ongkir;

        // this.invoice.external_id = this.order.order_id;
        // this.invoice.amount = this.total_harga;
        // this.invoice.payer_email = this.profile.email;
        // this.invoice.description = this.produk.produk_nama;
            axios
                .post("transaksi", this.order)
                .then(() => {
                    this.$router.push({ path: "/cart"})
                    this.snackbar = true
                    this.message = 'Berhasil Login'
                    this.color = '#139CA4'
                })
                .catch((err) => console.log(err));
        },
        getkotabyidProv(){
            //get data kota
            axios
            .get("lokasi/kota/"+this.order.province_id)
            .then((response) => {
                this.cities = response.data.kota
            })
            .catch((error) => console.log(error));
        },
        gethargaOngkir(){
            // cek promo ongkir
            axios
                .get("promo_ongkir/"+this.order.city_id)
                .then((response) => {
                    let promo = response.data
                    if (promo.data != null){
                        this.promo_ongkir_st = promo.data.status_promo
                        this.promo_ongkir_harga = promo.data.promo_harga
                    } else {
                        this.promo_ongkir_st = 0
                        this.promo_ongkir_harga = 0
                    }
                    //get data kota
                    axios
                    .get("lokasi/kota/"+this.order.city_id+"/detail")
                    .then((response) => {
                        let start_point = (response.data.kota.latitude + "," + response.data.kota.longitude)
                        let end_point = (this.produk.latitude + "," + this.produk.longitude)
                        axios.get("https://distance-calculator.p.rapidapi.com/v1/one_to_one?start_point="+start_point+"&end_point="+end_point+"&unit=kilometers", {
                            headers: {
                                'x-rapidapi-key': '38066ec1d5msh0c6db7b7abef6cap10f235jsn47d20ec77887',
                                'x-rapidapi-host': 'distance-calculator.p.rapidapi.com',
                                'useQueryString': 'true'
                            }
                        }).then((res) => {
                            this.distance = Math.round(res.data.distance)
                            this.harga_ongkir = Math.round(res.data.distance)*5620
                      
                            if (this.promo_ongkir_st == 1){
                                this.total_harga = (parseInt(this.produk.produk_harga)+this.harga_ongkir)-this.promo_ongkir_harga
                            } else {
                                this.total_harga = (parseInt(this.produk.produk_harga)+this.harga_ongkir)
                            }
                        })
                    })
                    .catch((error) => console.log(error));
                })
                .catch((error) => console.log(error));
        }
    },
    mounted() {
        this.setProfile(this.$store.state.auth.user)
        //get data produk by id produk
        axios
            .get("produk/" + this.$route.params.id)
            .then((response) => {
                this.setProduk(response.data.data)
            })
            .catch((error) => console.log(error));
    },
    created: function () {
        //get data provinsi
        axios
        .get("lokasi/provinsi")
        .then((response) => {
                this.provinces = response.data.provinsi
        })
        .catch((error) => console.log(error));
    }
}

</script>
<style scoped>

</style>