<template>
    <v-dialog max-width="400px">
        <v-card>
            <v-card-title class="headline">
                <span class="mx-auto"> Keluar dari akun ? </span>
            </v-card-title>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="confirm">OK</v-btn>
            <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
// import { LOGOUT } from "@/store/actions.type";

export default {
    data () {
        return {
            
        }
    },
    methods: {
        // logout() {
        //     this.dialogLogout = true
        // },
        close() {
            this.$emit('closeLogout')
        },
        confirm () {
            this.$emit('logoutItemConfirm')
        },
    }
}
</script>
