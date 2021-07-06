<template>
    <div>
        <AppBar :page="page"/>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm12 md12>
                    
                    <v-row class="mt-12">
                        <v-card class="elevation-0" >
                        <v-card-text>
                            <!-- <ul v-if="errors" class="red--text my-3">
                                <li v-for="(v, k) in errors" :key="k"> {{ v[0] | error }}</li>
                            </ul> -->
                            <v-form @submit.prevent="konfirmasi" id="register">
                                <v-text-field
                                    append-icon="mdi-account"
                                    v-model="detail.nama_pemilik"
                                    label="Nama"
                                    type="text"
                                >
                                </v-text-field>
                                <v-text-field
                                    append-icon="mdi-note"
                                    v-model="detail.rekening"
                                    label="Rekening"
                                    type="text"
                                >
                                </v-text-field>
                                <v-file-input
                                @change="onFilePicked"
                                show-size
                                counter
                                multiple
                                dense
                                label="Foto Ternak"
                                ></v-file-input>
                            </v-form> 
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
                    </v-row>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
  import AppBar from '@/components/AppBar.vue';
// import axios from 'axios';

export default{
  components: {
    AppBar,
  },
  data: () => ({
        page: {
            link: '/cart',
            title: 'Konfirmasi Pembayaran',
        },
        detail:{},
    }),
}
</script>