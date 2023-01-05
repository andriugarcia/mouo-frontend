<template lang="pug">
    #carousel(style="position: fixed; top: 0; bottom: 0; left: 0; right: 0")
        #slider(v-touch="{up: () => swipe(1), down: () => swipe(-1)}")
            v-img#img(v-for="(img, i) in src", :key="i", :src="img")
        v-layout.ml-3.mt-5(column, align-center, style="position: absolute; top: 40%; left: 8px")
            .mb-1(v-for="i in src.length", :key="i")
                .dotSelected(v-if="index+1 == i")
                .dot(v-else)

</template>

<script>

export default {
    data() {
        return {
            index: 0,
        }
    },

    props: ["src"],

    methods: {
        swipe(dir) {
            const el = document.getElementById('slider')
            //window.innerHeight BREAK
            //el.scrollTop POSICION
            //el.scroll()

            if (dir == 1) {
                this.index++
                if (this.index >= this.src.length) this.index = this.src.length - 1
            }
            else if (dir == -1) {
                this.index--
                if (this.index <= 0) this.index = 0
            }

            el.scroll(0, this.index * window.innerHeight)
        
        }
    }
}
</script>

<style lang="scss" scoped>
    #slider::-webkit-scrollbar { width: 0 !important }
    #slider { overflow: -moz-scrollbars-none; }
    #slider { -ms-overflow-style: none; }


    #slider {
        overflow-y: scroll;
        width: 100%;
        height: 100vh;
        scroll-behavior: smooth;
    }

    #img {
        height: 100%;
    }

    .dot {
        border-radius: 50%; 
        background-color: #1c1c1c; 
        opacity: 0.6; 
        width: 8px; 
        height: 8px;
    }

    .dotSelected {
        border-radius: 50%; 
        background-color: #1c1c1c; 
        width: 10px; 
        height: 10px; 
        opacity: 1;
    }
</style>


