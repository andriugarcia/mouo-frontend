<template lang="pug">
    #pedido
        v-layout.mt-3(v-if="user.email", justify-center)
            v-card(flat, style="width: 80%")
                v-stepper(alt-labels, v-model="stepper", color="mblack")
                    v-stepper-header
                        v-stepper-step(step="1", :complete="stepper > 1")
                        v-stepper-step(step="2", :complete="stepper > 2")
                        v-stepper-step(step="3", :complete="stepper > 3")
                    v-stepper-content(step="1")
                        h1.quicksand Prendas para tu próximo mes
                        v-list.mt-2
                            v-list-tile(v-for="(clothing, index) in user.temporalList", :key="index")
                            v-list-tile-avatar
                                img(:src="clothing.Images[0]", style="object-fit: cover;")
                            v-list-tile-content
                                v-list-tile-title.quicksand {{ clothing.Title }}
                                v-list-tile-sub-title.quicksand {{ clothing.Brand }}
                            v-list-tile-action
                                v-btn(flat, icon, @click="removeClothing(index)")
                                    v-icon close
            v-layout.ma-3(justify-space-between, style="position: fixed; bottom: 0px; left: 0; right: 0")
                v-btn.quicksand(color="mblack", outline) Cancelar
                v-btn.quicksand(color="mblack", outline) Siguiente
</template>

<script>
export default {
    data() {
        return {
            stepper: 1
        }
    },

    computed: {
        user() {
            const user = this.$store.state.user
            if (!user) return {}
            
            if (user.email) {
            return user
            }

            return {} 
        },
    }
}
</script>

