<template lang="pug">
    v-dialog(v-model="dialog", width='500px')
        v-btn(slot="activator", color="black", light, outline) Añadir tarjeta
        v-card.pa-4
            .quicksand(style="font-size:2em").mb-4 Añadir tarjeta
            v-alert(type="error", :value="$store.state.paymentError") Ha habido un error
            v-text-field(v-model="cardName", label="Nombre del titular", outline)
            #card-element-add.mb-3
            v-btn(color="primary", block, :loading="loading", @click="purchase") Añadir pago
</template>


<script>
var stripe
var card

export default {
    data() {
        return {
            dialog: false,
            complete: false,
            cardName: '',
        }
    },

    mounted() {
        stripe = this.$stripe.import()
        const elements = stripe.elements();
        card = elements.create('card');
        // // Add an instance of the card Element into the `card-element` <div>
        card.mount('#card-element-add');
    },

    computed: {
        length() {
            return this.$store.state.user.paymentList.length
        },

        loading() {
            return this.$store.state.loading
        }
    },

    methods: {
        purchase() {
        this.$store.commit('switchLoading', true);
        var selected = false

        if (this.length == 0) {
            selected = true
        }
        this.$store.state.paymentError = false
        if (this.cardName) {
            stripe.createToken(card).then((data) => {

                this.$store.dispatch('addPayment', {
                    name: this.cardName,
                    selected,
                    token: data.token
                }).then(() => {
                    this.$store.commit('switchLoading', false);
                    this.dialog = false
                }).catch((err) => {
                    this.$store.commit('switchLoading', false);
                    console.log("Error creando token de pago")
                    console.log(err)
                    this.$store.commit("setPaymentError")
                })
            })

        }
    },
    }
}
</script>

