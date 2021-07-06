<template>
    <v-hover>
        <template v-slot:default="{ hover }">
            <v-card
            :loading="loading"
            class="mx-auto mb-2"
            height="300px"
            >
                <v-img
                    :src=ternak.file_path
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="150px"
                >
                    <v-app-bar
                        flat
                        color="rgba(0, 0, 0, 0)"
                    >
                        <v-toolbar-title v-if="ternak.diskon_st == 1" class="pl-0 mb-5">
                            <v-chip
                            small
                            color="orange"
                            label
                            text-color="white"
                            >
                            <v-icon left>
                                mdi-label
                            </v-icon>
                            <!-- Diskon -->
                            <div v-bind:class="(ternak.diskon_st == 1) ?'text-decoration-line-through': ''">Rp. {{formatPrice(ternak.harga_perkilo*ternak.ternak_berat)}}</div>
                            </v-chip>
                        </v-toolbar-title>
                    </v-app-bar>
                    <template v-slot:placeholder>
                        <v-sheet>
                        <v-skeleton-loader />
                        </v-sheet>
                    </template>
                    <v-card-title class="mt-15 mb-0">
                        <!-- <div class="text-caption white--text font-weight-medium">{{ toUpperCase(ternak.ternak_nama) }}</div> -->
                    </v-card-title>
                </v-img>
                <v-card-text
                    align="left"
                >
                    <span class="subtitle-2 font-weight-medium" > {{ toUpperCase(ternak.ternak_nama) }}</span> <br>
                    <small style="color:#139CA4;">Dibawah Pengawasan <br/> 
                        <span v-if="ternak.dokter_nama == ''">{{ternak.dokter_nama}}</span>
                        <span v-else>{{ternak.admin_nama}}</span>
                    </small>
                    <div class="subtitle font-weight-bold">
                        <span style="color:#fca311;">Rp. {{ formatPrice(ternak.harga_perkilo) }}</span>
                        <span> / Kg</span> <br>
                        <!-- <small v-bind:class="(ternak.diskon_st == 1) ?'text-decoration-line-through': ''">Rp. {{formatPrice(ternak.harga_perkilo*ternak.ternak_berat)}}</small> <br> -->
                        <small v-if="ternak.diskon_st == 1"> Rp. {{formatPrice((ternak.harga_perkilo*ternak.ternak_berat)-ternak.diskon_harga)}} </small>
                        <small v-else>Rp. {{formatPrice(ternak.harga_perkilo*ternak.ternak_berat)}}</small>
                    </div>

                </v-card-text>
                <!-- <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                    <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                </v-card-actions> -->

                <v-fade-transition>
                    <v-overlay
                        v-if="hover"
                        absolute
                        color="grey"
                    >
                        <v-btn
                        color="#139CA4"
                        :to="'detail/'+ternak.id"
                        >Lihat Kurban</v-btn>
                    </v-overlay>
                </v-fade-transition>
            </v-card>
        </template>
    </v-hover>
</template>
<script>
    export default {
        props: ["ternak"],
        data: () => ({
            loading: false,
            selection: 1,
            overlay: false,
        }),

        methods: {
            reserve () {
                this.loading = true

                setTimeout(() => (this.loading = false), 2000)
            },
            formatPrice(value) {
                let val = (value/1).toFixed().replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            toUpperCase(value){
                if(!value) return ''
                    value = value.toString()
                return value.toUpperCase()
            },
        },
    }
</script>