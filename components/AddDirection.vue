<template lang="pug">
    v-dialog(v-model="dialog", width='500px')
        v-btn(slot="activator", color="black", light, outline) Añadir dirección
        v-card.pa-4
            .quicksand(style="font-size:2em").mb-4 Añadir dirección
            v-alert(type="error", :value="directionError") Ha habido un error
            b Dirección Postal
            v-text-field(v-model="direction", label="Dirección", outline)
            b Codigo Postal
            v-text-field(v-model="cp", label="CP", mask="#####", outline)
            b Provincia
            v-select(v-model="province", :items="provinceList", label="Provincia", outline, menu-props="offsetY")
            b Localidad
            v-text-field(v-model="city", label="Ciudad", outline)
            v-btn(block, color="mblack", dark, :loading="loading", @click="addDirection") Añadir
            
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            direction: '',
            city: '',
            cp: '',
            province: '',
            provinceList: ['A Coruña', 'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Baleares', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Girona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Jaén', 'La Rioja', 'Las Palmas', 'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Pontevedra', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'],
            directionError: false
        }
    },

    methods: {
        addDirection() {

            var selected = false

            if (this.length == 0) {
                selected = true
            }

            const data = {
                direction: this.direction,
                city: this.city,
                cp: this.cp,
                province: this.province,
                selected
            }

            this.$store.dispatch('addDirection', data).then(() => {
                this.$store.commit('switchLoading', true)
                this.dialog = false
            }).catch(() => {
                this.directionError = true
            })
        }
    },

    computed: {

        length() {
            return this.$store.state.user.directionList.length
        },

        isDisabled() {
            return !(this.direction && this.cp && this.city && this.province)
        },

        loading() {
            return this.$store.state.loading
        }
    }
}
</script>
