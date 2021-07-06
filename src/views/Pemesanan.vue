<template>
    <v-container>
        <v-card
        elevation="4"
        class="mx-auto my-12"
        max-width="674"
        >
            <v-img
                src="img/brand/banner_pemesanan.jpeg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="150px"
            >
            </v-img>
            <v-card-text>
                <v-form
                    ref="form"
                    @submit.prevent="onSubmit()"
                    >
                    <v-container>
                        <v-row>
                            <v-col
                                cols="12"
                                lg="12"
                                sm="12"
                            >
                                <div class="title">Pemesanan Hewan Qurban Ternakmart.id</div>
                                <!-- <div class="text--red">* Required</div> -->
                            </v-col>
                        </v-row>
                        <v-row v-if="errors" >
                            <ul class="red--text my-3">
                                <li v-for="(v, k) in errors" :key="k"> {{ v[0] | error }}</li>
                            </ul>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="12"
                                lg="10"
                                sm="12"
                                class="mx-auto"
                            >
                                <v-text-field
                                v-model="form.email"
                                color="teal darken-2"
                                label="Email"
                                outlined
                                dense
                                required
                                ></v-text-field>
                                <v-text-field
                                v-model="form.nama"
                                color="teal darken-2"
                                label="Nama Lengkap"
                                outlined
                                dense
                                required
                                ></v-text-field>
                                <v-select
                                v-model="form.province_id"
                                item-text="province"
                                item-value="province_id"
                                :items="provinsi"
                                color="teal"
                                label="Provinsi"
                                outlined
                                dense
                                required
                                @change="filterCity"
                                ></v-select>
                                <v-select
                                v-model="form.city_id"
                                item-text="city_name"
                                item-value="city_id"
                                :items="kota"
                                color="teal"
                                label="Kota / Kabupaten"
                                outlined
                                dense
                                required
                                @change="filterCity"
                                ></v-select>
                                <v-textarea
                                v-model="form.detail_alamat"
                                color="teal darken-2"
                                rows="2"
                                outlined
                                dense
                                row-height="10"
                                >
                                <template v-slot:label>
                                    <div>
                                    Detail Alamat
                                    </div>
                                </template>
                                </v-textarea>
                                <v-text-field
                                v-model="form.nomor_hp"
                                type="number"
                                color="teal darken-2"
                                label="No. Handphone"
                                prefix="+62 "
                                outlined
                                dense
                                required
                                ></v-text-field>
                                <v-radio-group
                                v-model="form.kurban_sapi"
                                column
                                >
                                <template v-slot:label>
                                    <div>Minat Hewan Kurban Sapi</div>
                                </template>
                                <v-radio
                                    v-for="data in hewan_sapi"
                                    :key="data.value"
                                    :label="`Berat `+data.value+` kg`"
                                    :value="data.value"
                                ></v-radio>
                                </v-radio-group>
                                <v-text-field
                                v-model="form.jumlah_sapi"
                                type="number"
                                color="teal darken-2"
                                label="Jumlah Permintaan Hewan Kurban Sapi"
                                outlined
                                dense
                                required
                                ></v-text-field>
                                <v-radio-group
                                v-model="form.kurban_kambing"
                                column
                                >
                                <template v-slot:label>
                                    <div>Minat Hewan Kurban Kambing</div>
                                </template>
                                <v-radio
                                    v-for="data in hewan_kambing"
                                    :key="data.value"
                                    :label="`Berat `+data.value+` kg`"
                                    :value="data.value"
                                ></v-radio>
                                </v-radio-group>
                                <v-text-field
                                v-model="form.jumlah_kambing"
                                type="number"
                                color="teal darken-2"
                                label="Jumlah Permintaan Hewan Kurban Kambing"
                                outlined
                                dense
                                required
                                ></v-text-field>
                                <v-radio-group
                                v-model="form.kurban_domba"
                                column
                                >
                                <template v-slot:label>
                                    <div>Minat Hewan Kurban Domba</div>
                                </template>
                                <v-radio
                                    v-for="data in hewan_domba"
                                    :key="data.value"
                                    :label="`Berat `+data.value+` kg`"
                                    :value="data.value"
                                ></v-radio>
                                </v-radio-group>
                                <v-text-field
                                v-model="form.jumlah_domba"
                                type="number"
                                color="teal darken-2"
                                label="Jumlah Permintaan Hewan Kurban Kambing"
                                outlined
                                dense
                                required
                                ></v-text-field>
                                <v-menu
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="form.tgl_pengiriman"
                                        label="Pengiriman Hewan Kurban"
                                        append-icon="mdi-calendar"
                                        readonly
                                        outlined
                                        dense
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                    v-model="form.tgl_pengiriman"
                                    @input="menu = false"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                         <v-row class="text-right">
                            <v-col>
                                <v-btn
                                type="submit"
                                color="primary"
                                :disabled="isLoading"
                                >
                                    <span v-if="isLoading">
                                        Loading 
                                        <v-progress-circular
                                        :size="15"
                                        indeterminate
                                        color="secondary"
                                        ></v-progress-circular>
                                    </span>
                                    <span v-else>
                                        Simpan
                                    </span>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
         </v-card>
         <v-snackbar
            v-model="snackbar"
            timeout="2000"
            :color="color"
            >
            {{ message }}
        </v-snackbar>
        <v-dialog v-model="dialogInfo" max-width="500px">
            <v-card>
                <v-card-title class="headline">
                    <h1 class="mx-auto my-3"><v-icon color="#139CA4" x-large>mdi-checkbox-marked-circle-outline</v-icon></h1>
                    <div class="subtitle-1"> 
                        Terima kasih, <br>
                        ternakmart.id akan mengirimkan rincian
                        daftar pesanan dan rincian biaya. 
                    </div>
                </v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeInfo">Close</v-btn>
                <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
// import { mapGetters } from "vuex";
import axios from "axios";

export default {
    components: {
        // DatePicker
    },
    data() {
        return {
            snackbar: false,
            message: '',
            isLoading: false,
            form: {},
            errors: {},
            provinsi: [],
            kota:[
                {
                    'city_name' : 'Pilih provinsi terlebih dahulu',
                    'city_id' : ''
                }
            ],
            hewan_sapi: [
                {'value': '300-350'},
                {'value': '351-400'},
                {'value': '401-450'},
                {'value': '451-500'},
                {'value': '501-600'},
                {'value': '601-1000'}
            ],
            hewan_kambing: [
                {'value': '20-24'},
                {'value': '25-29'},
                {'value': '30-34'},
                {'value': '35-45'},
                {'value': '> 50'}
            ],
            hewan_domba: [
                {'value': '15-20'},
                {'value': '21-24'},
                {'value': '25-34'},
                {'value': '35-44'},
                {'value': '> 45'}
            ],
            color:'',
            menu: false,
            dialogInfo: false,
        }
    },
    mounted() {
        axios.get("/lokasi/provinsi")
        .then((res) => {
            this.provinsi = res.data.provinsi
        })
    },
    methods: {
        filterCity() {
            axios
            .get("lokasi/kota/"+ this.form.province_id)
            .then((res) => {
                this.kota = res.data.kota;
            })
        },
        onSubmit() {
            this.isLoading = true
            axios.post("/pemesanan", this.form)
            .then(() => {
                this.dialogInfo = true
                this.isLoading = false
                this.snackbar = true
                this.message = 'Berhasil Simpan Data'
                this.color = '#139CA4'
                
            })
            .catch((err) => {
                this.isLoading = false
                this.errors = err.response.data
                this.snackbar = true
                this.message = 'Gagal Simpan Data'
                this.color = 'red'
            });
        },
        closeInfo () {
            this.dialogDelete = false
            this.$router.go()
            // setTimeout( () => this.$router.go(), 1000);
        },
    }
}

</script>