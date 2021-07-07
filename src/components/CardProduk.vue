<template>
    <v-hover>
        <template v-slot:default="{ hover }">
            <v-card
            :loading="loading"
            class="mx-auto mb-2"
            height="300px"
            >
                <v-img
                    :src=produk.file_path
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="180px"
                >
                    <v-card-title class="mt-15 mb-0">
                        <!-- <div class="text-caption white--text font-weight-medium">{{ toUpperCase(produk.produk_nama) }}</div> -->
                    </v-card-title>
                </v-img>
                <v-card-text
                    align="left"
                >
                    <span class="subtitle-2 font-weight-medium" > {{ toUpperCase(produk.produk_nama) }}</span> <br>
                    <v-chip x-small label> {{ produk.city_name }} </v-chip>
                    <div class="subtitle font-weight-bold">
                        <span style="color:#fca311;">Rp. {{ formatPrice(produk.produk_harga) }}</span>
                        <span> / {{ produk.qty }} {{ toUpperCase(produk.produk_jenis) }}</span>
                        <br>
                        
                    </div>

                </v-card-text>
        
                <v-fade-transition>
                    <v-overlay
                        v-if="hover"
                        absolute
                        color="grey"
                    >
                        <v-btn
                        color="#139CA4"
                        :to="'produk/detail/'+produk.id"
                        >Lihat Produk</v-btn>
                    </v-overlay>
                </v-fade-transition>
            </v-card>
        </template>
    </v-hover>
</template>
<script>
    export default {
        props: ["produk"],
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