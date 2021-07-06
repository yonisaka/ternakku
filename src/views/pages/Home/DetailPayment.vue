<template>
    <div>
        <AppBar :page="page"/>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm12 md12>
                    
                    <v-row class="mt-12">

                      <v-btn
                          color="orange lighten-2"
                          dark
                          :to="{ name: 'payment_confirmation'}"
                          class="mb-3 ml-3"
                        >
                            Konfirmasi Sudah Bayar
                        </v-btn>
                        
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
            title: 'Metode Pembayaran',
        },
    }),
}
</script>