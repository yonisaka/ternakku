<template>
    <v-app id="inspire">
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-0">
                        <v-img
                        class="mx-auto"
                        position="center center"
                        src="img/brand/ternakmart.png"
                        max-height="150"
                        max-width="150"
                        ></v-img>
                        <v-card-text>
                            <div class="text-center headline font-weight-bold my-3">
                                Selamat Datang
                            </div>
                            <div class="text-center subtitle font-weight-bold my-3">
                                Dapatkan Kebutuhan Hewan Kurban, Hewan Ternak dan Aqiqah
                                berkualitas dengan pengawasan langsung dari dokter hewan
                                sehingga terjamin kualitasnya.
                            </div>
                            <div class="text-center">
                                <v-btn :to="{ name: 'login' }"
                                class="ma-2 white--text font-weight-bold px-10 py-5"
                                color="#139CA4"
                                >
                                Masuk
                                </v-btn>
                                <v-btn :to="{ name: 'register' }"
                                outlined
                                class="ma-2 font-weight-bold px-10 py-5"
                                color="#139CA4"
                                >
                                Daftar
                                </v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>