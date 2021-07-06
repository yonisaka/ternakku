<template>
    <div>
        <v-btn
        elevation="0"
        icon
        plain
        x-large
        >
        <!-- <v-icon color="#139CA4"></v-icon> -->
        {{data.icon}}
        </v-btn>
        <span class="subtitle">{{ data.title }}</span>
    </div>
</template>

<script>
export default {
    props: {
        data: { type: Object, required: true },
    },
}
</script>
