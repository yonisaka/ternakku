<template>
    <div>
        <AppBar :page="page"/>
        <v-container fluid fill-height>
            <v-row class="my-15">
                <v-col cols="12" lg="8" class="mx-auto">
                    <v-row>
                        <v-col 
                        cols="12" 
                        lg="4"
                        class="mx-auto"
                        v-for="(img, i) in images"
                        :key="i"
                        >
                            <img :src="img" width="100%" class="px-5" @click="showImage(img)">
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="dialogImage" max-width="700px">
            <v-img
            scrollable
            max-width="700px"
            :src="image"
            ></v-img>
        </v-dialog>
    </div>
</template>
<script>
import AppBar from '@/components/AppBar.vue';

export default {
    components: {
        AppBar,
    },
    data: () => ({
        image: '',
        dialogImage: false,
        page: {
            link: '/',
            title: 'Spesial Promo',
        },
        images: [
          'https://api.caltymart.com/promo/jabodetabek_pr1.png',
          'https://api.caltymart.com/promo/jabodetabek_pr2.png',
          'https://api.caltymart.com/promo/jabodetabek_pr3.png',
          'https://api.caltymart.com/promo/jogja_pr1.png',
          'https://api.caltymart.com/promo/jogja_pr2.png',
          'https://api.caltymart.com/promo/jogja_pr3.png',
          'https://api.caltymart.com/promo/tegal_pr1.png',
          'https://api.caltymart.com/promo/tegal_pr2.png',
          'https://api.caltymart.com/promo/tegal_pr3.png',
        ],
    }),
    methods: {
        showImage (file_path) {
            this.image = file_path
            this.dialogImage = true
        },
    }
}
</script>