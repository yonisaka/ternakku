<template>
    <div>
        <AppBar :page="page" />
        <v-container fluid mt-12 mb-12 mx-0>
            <v-row>
                <v-col cols="12" lg="6" class="mx-auto">
                    <v-tabs
                    v-model="tab"
                    background-color="transparent"
                    grow
                    >
                        <v-tab>Dalam Proses</v-tab>
                        <v-tab>Paid</v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tab">
                        <v-tab-item class="mt-3">
                            <v-row v-if="pendings.length != 0" dense>
                                <v-col 
                                    v-for="(item, i) in pendings"
                                    :key="i"
                                    cols="12">
                                    <v-card
                                        elevation="1"
                                        outlined
                                        @click="showDetail(item.id)"
                                    >
                                        <div class="d-flex flex-no-wrap justify-space-between">
                                            <div>
                                                <v-card-title
                                                class="subtitle-1"
                                                >{{toUpperCase(item.ternak_nama)}}</v-card-title>
                            
                                                <v-card-subtitle>
                                                    Harga : Rp. {{formatPrice(item.total_harga)}} <br/>
                                                    <v-chip 
                                                    small
                                                    class="mt-1"
                                                    color="orange"
                                                    outlined
                                                    label
                                                    v-if="item.transaksi_st == 'PENDING'"
                                                    >
                                                        Menunggu Pembayaran
                                                    </v-chip>
                                                    
                                                </v-card-subtitle>
                                                <v-card-actions class="ml-2">
                                                    <v-btn
                                                    color="orange lighten-2"
                                                    dark
                                                    :to="'payment/'+item.id"
                                                    >
                                                    Checkout
                                                    </v-btn>
                                                </v-card-actions>
                                            </div>

                                            <v-avatar
                                                class="ma-3"
                                                size="150"
                                                tile
                                            >
                                                <v-img :src="item.file_path" ></v-img>
                                            </v-avatar>
                                        </div>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-row v-else class="mt-3">
                                <v-col cols="12" class="text-center">
                                    <span class="font-weight-medium grey--text">Tidak ada transaksi</span> 
                                </v-col>
                            </v-row>
                        </v-tab-item>
                        <v-tab-item>
                            <v-row v-if="paids.length != 0" dense>
                                <v-col 
                                    v-for="(item, i) in paids"
                                    :key="i"
                                    cols="12">
                                    <v-card
                                        @click="showDetail(item.id)"
                                        elevation="1"
                                        outlined
                                    >
                                        <div class="d-flex flex-no-wrap justify-space-between">
                                            <div>
                                                <v-card-title
                                                class="text-h6"
                                                >{{item.ternak_nama}}</v-card-title>

                                                <v-card-subtitle>
                                                    Harga : Rp. {{formatPrice(item.total_harga)}} <br/>
                                                    <v-chip 
                                                    label
                                                    small
                                                    class="mt-1"
                                                    color="success"
                                                    outlined
                                                    v-if="item.transaksi_st == 'PAID'">
                                                        Sudah Dibayar
                                                    </v-chip>
                                                </v-card-subtitle>
                                                <v-card-actions class="ml-2">
                                                    <v-btn
                                                    color="green lighten-2"
                                                    dark
                                                    @click="btnConfirmation(item.id)"
                                                    >
                                                    Sudah Diterima
                                                    </v-btn>
                                                </v-card-actions>
                                            </div>

                                            <v-avatar
                                                class="ma-3"
                                                size="125"
                                                tile
                                            >
                                                <v-img :src="item.file_path" ></v-img>
                                            </v-avatar>
                                        </div>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-row v-else class="mt-3">
                                <v-col cols="12" class="text-center">
                                    <span class="font-weight-medium grey--text">Tidak ada transaksi</span> 
                                </v-col>
                            </v-row>
                        </v-tab-item>
                    </v-tabs-items>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog
            v-model="dialogDetail"
            width="500"
        >
            <v-card>
                <v-card-title class="headline grey lighten-2">
                    Detail Pesanan
                </v-card-title>

                <v-card-text>
                    <div class="mt-3">
                    <v-row>
                        <v-col cols="4">Nama Ternak</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="7">{{detail.ternak_nama}}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">Deskripsi</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="12" class="text-justify">{{detail.ternak_deskripsi}}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">Harga</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="7">Rp. {{formatPrice(detail.total_harga)}}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">Penerima</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="7">{{detail.nama_penerima}}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">Alamat Penerima</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="7">{{detail.detail_alamat}}, {{detail.city_name}}, {{detail.province}}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">Catatan</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="7">{{detail.transaksi_note}}</v-col>
                    </v-row>
                    </div>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions v-if="detail.transaksi_st != 'PAID'">
                    <v-spacer></v-spacer>
                    
                    <v-btn
                    color="orange lighten-2"
                    dark
                    :to="'payment/'+detail.id"
                >
                    Checkout
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogConfirmation" max-width="400px">
            <v-card>
                <v-card-title class="subtitle">
                    <span class="mx-auto"> Pengiriman Sudah Diterima ?</span>
                </v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialogConfirmation">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="confirmationDialogItemConfirm(detail.id)">Ya</v-btn>
                <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue';
import axios from "axios";

export default {
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
            detail: {},
            dialogDetail: false,
            dialogConfirmation: false,
        }
    },
    methods:{
        setPendings(data) {
            this.pendings = data;
        },
        setPaids(data) {
            this.paids = data;
        },
        setDetail(data) {
            this.detail = data;
        },
        subStr(value) {
            return value.substring(0,100) + '...';
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
        showDetail(id) {
            axios
            .get("transaksi/"+id+"/detail")
            .then((response) => {
                this.setDetail(response.data.cart)
                this.dialogDetail = true
            })
            .catch((error) => console.log(error));
        },
        btnConfirmation(id) {
            axios
            .get("/transaksi/"+ id +"/detail")
            .then((res) => {
                this.detail = res.data.cart
                this.dialogConfirmation = true
            })
        },
        confirmationDialogItemConfirm(id) {
            this.detail.pengiriman_st = 'Sudah Diterima'
            axios
            .put("/transaksi/"+ id, this.detail)
            .then((res) => {
                console.log(res)
                this.snackbar = true
                this.message = 'Berhasil Update Data'
                this.color = '#139CA4'
                this.dialogConfirmation = false
                setTimeout( () => this.$router.go(), 1000);
            })
            .catch((err) => console.log(err));
        },
        closeDialogConfirmation(){
            this.dialogConfirmation = false
        }
    },

    mounted() {
        axios
        .get("transaksi/"+this.$store.state.auth.user.id+"/waiting")
        .then((response) => this.setPendings(response.data.cart) )
        .catch((error) => console.log(error));

        axios
        .get("transaksi/"+this.$store.state.auth.user.id+"/confirmation")
        .then((response) => this.setPaids(response.data.cart))
        .catch((error) => console.log(error));
    },
}

</script>
