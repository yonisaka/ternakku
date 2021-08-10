<template>
    <div>
        <v-btn
        elevation="0"
        icon
        plain
        x-large
        >
        <!-- <v-icon color="#A58A5A"></v-icon> -->
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
