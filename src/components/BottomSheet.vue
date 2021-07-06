<template>
    <v-list>
        <v-subheader>Metode Pembayaran</v-subheader>
        <v-list-item
            v-for="tile in tiles"
            :key="tile.title"
            @click="sheet = false"
        >
            <v-list-item-avatar>
            <v-avatar
                size="32px"
                tile
            >
                <img
                :src="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`"
                :alt="tile.title"
                >
            </v-avatar>
            </v-list-item-avatar>
            <v-list-item-title>{{ tile.title }}</v-list-item-title>
        </v-list-item>
    </v-list>
</template>
<script>
export default {
    props: ["tiles"],
}
</script>