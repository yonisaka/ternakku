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
                                    <label> Masa Perawatan </label>
                                </v-col>
                                <v-col cols="6" class="text-right">                                    
                                    <div class="subtitle">{{masa_perawatan}} Hari</div>
                                </v-col>
                            </v-row>            
                            <v-row>
                                <v-col cols="6">
                                    <label> Harga Perawatan </label>
                                </v-col>
                                <v-col cols="6" class="text-right">                                    
                                    <div class="subtitle">Rp. {{formatPrice(ternak.perawatan_harga*masa_perawatan)}}</div>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <label> Harga Ternak </label>
                                </v-col>
                                <v-col cols="6" class="text-right">                                    
                                    <div class="subtitle">Rp. {{formatPrice(ternak.harga_perkilo*ternak.ternak_berat)}}</div>
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
                            <v-row v-if="ternak.diskon_st == 1">
                                <v-col cols="6">
                                    <label> Diskon </label>
                                </v-col>
                                <v-col cols="6" class="text-right">                                    
                                    <div class="subtitle">Rp. {{formatPrice(ternak.diskon_harga)}}</div>
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
                                    <div class="subtitle">Rp. {{formatPrice((total_harga)-ternak.diskon_harga)}}</div>
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
import moment from 'moment';

export default {
    components: {
        AppBar,
    },
    data() {
        return {
            page: {
                link: '/detail/'+this.$route.params.id,
                title: 'Detail Pemesanan',
            },
            ternak:{},
            // alamat:{},
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
        setTernak(data) {
        this.ternak = data;
        },
        pemesanan() {
        
        //set data ke tabel transaksi
        this.order.id_ternak = this.ternak.id;
        this.order.id_user =  this.$store.state.auth.user.id;
        this.order.ternak_harga = this.ternak.harga_perkilo*this.ternak.ternak_berat;  
        this.order.masa_perawatan = this.masa_perawatan;
        this.order.total_harga = this.total_harga;
        // this.order.masa_perawatan = 12; //contoh
        // this.order.total_harga = 80*this.ternak.ternak_harga;
        this.order.transaksi_st = "CART";
        // this.order.transaksi_alamat = JSON.stringify(this.alamat);
        this.order.order_id = "ORDER-"+(new Date().getTime());
        // this.order.origin_id = this.ternak.city_id;
        // this.order.destination_id = 472;
        // ongkir
        this.order.distance = this.distance;
        this.order.harga_ongkir = this.harga_ongkir;
        //set data parameter getToken
        // this.parameter.order_id = this.order.order_id;
        // this.parameter.gross_amount = this.order.total_harga;
        // this.parameter.name = this.profile.name;
        // this.parameter.email = this.profile.email;
        // this.parameter.phone = "089602015445";

        // console.log(this.order)
        // set data parameter ger Cost Rajaognkri
        // this.costData.origin = this.ternak.city_id;
        // this.costData.destination = this.order.destination_id;
        // this.costData.weight = 800;
        // this.costData.courier = "jne";

        this.invoice.external_id = this.order.order_id;
        this.invoice.amount = this.total_harga;
        this.invoice.payer_email = this.profile.email;
        this.invoice.description = this.ternak.ternak_nama;
        console.log(this.costData)
                axios
                    .post("transaksi", this.order)
                    .then(() => {
                        this.$router.push({ path: "/cart"})
                        this.snackbar = true
                        this.message = 'Berhasil Login'
                        this.color = '#139CA4'
                    })
                    .catch((err) => console.log(err));

            // var instance = axios.create();
            // delete instance.defaults.headers.common['Authorization'];
            //     instance.post("https://api.rajaongkir.com/starter/cost",  
            //         {
            //             headers: {
            //             'content-type': 'application/x-www-form-urlencoded',
            //             'key': 'acbbd724a63c95cde3c321e1edafee7c',
            //             },
            //             data:this.costData
            //         })
            //         .then(() => {
            //             console.log(this.costData)
            //             });

            // XENDIT
            // var instance = axios.create();
            // delete instance.defaults.headers.common['Authorization'];
            // instance.post("https://api.ternakmart.id/api/transaksi_createinvoice",  
            // {
            //     headers: { 
            //         'Content-Type': 'application/json', 
            //         'Authorization': 'Basic eG5kX2RldmVsb3BtZW50X3dhdzlucmJ0TlNRQk5VVmJvNDdoUXdrVXdQcWRNNTVkQ0lWM0RORk5lVFBEa2w1Sndad2VST25RYWE0aW1qZUY6', 
            //         'Cookie': 'visid_incap_2182539=f5doSCL4TcW2shUF74hn0cq5wWAAAAAAQUIPAAAAAAAdtoEduPjphkSZEy6WRCyn; nlbi_2182539=GEXsFlcMjTLFqzSojjCKbQAAAABdzeyiMmnIbOEpB5YMhYfG; incap_ses_1117_2182539=hcrwPWPgLgJZ+eUf62GAD8q5wWAAAAAAjpk2reA33cMS055xl0xxGQ=='
            //     },
            //     data:this.invoice
            // })
            // .then((response) => {
            //     console.log(this.invoice)
            //     console.log(response)
            // });

            // axios
            //         .post("transaksi_createinvoice", this.invoice)
            //         .then((response) => {
            //             console.log(this.invoice)
            //             console.log(response)
            //         })
            //         .catch((err) => console.log(err));
            
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
                        let end_point = (this.ternak.latitude + "," + this.ternak.longitude)
                        
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
                                // console.log('harga asli ='+ ((this.ternak.perawatan_harga*this.masa_perawatan)+(this.ternak.harga_perkilo*this.ternak.ternak_berat)+Math.round(res.data.distance)*5620))
                                // console.log('promo ='+ this.promo_ongkir_harga)
                                this.total_harga = ((this.ternak.perawatan_harga*this.masa_perawatan)+(this.ternak.harga_perkilo*this.ternak.ternak_berat)+(Math.round(res.data.distance)*5620))-this.promo_ongkir_harga
                            } else {
                                // console.log('ssss')
                                this.total_harga = (this.ternak.perawatan_harga*this.masa_perawatan)+(this.ternak.harga_perkilo*this.ternak.ternak_berat)+Math.round(res.data.distance)*5620
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
        //get data ternak by id ternak
        axios
            .get("ternak/" + this.$route.params.id)
            .then((response) => {
                this.setTernak(response.data.ternak)
                let start = moment();
                let end = moment("2021-07-19");
                let duration = moment.duration(end.diff(start));
                let days = duration.asDays();
                this.masa_perawatan = Math.round(days);
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