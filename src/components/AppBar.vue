<template>
    <v-app-bar
    absolute
    color="white"
    >
    <v-btn
        icon
        color="teal"
        :to="page.link"
    >
        <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <span class="subtitle font-weight-medium">{{ page.title }}</span>
    </v-app-bar>
</template>

<script>
export default {
    props: {
        page: { type: Object, required: true },
    },
}
</script>

<style>

</style>