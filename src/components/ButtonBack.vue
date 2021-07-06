<template>
    <v-btn
        :to="{ name: history }"
        class="mt-3 ml-3"
        dark
        icon
    >
        <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
</template>

<script>
export default {
    props: ["history"]
}
</script>
