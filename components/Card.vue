<template lang="pug">
    v-card.pointer(ripple, flat, @click.native="goToClothing").mb-3.pb-2
        v-img
            //- v-lazy-image(:src="clothing.Image", style="width:100%; min-height: 350px; object-fit: cover; object-position: center;", :alt="clothing.Title")
            img(:src="clothing.Images[0]", style="width:100%; min-height: 450px; object-fit: cover; object-position: center;", :alt="clothing.Title")
        v-card-title(primary-title).pt-3
            v-layout(column, align-center)
                i.quicksand {{ clothing.Title }}
                h3.quicksand(style="font-weight: bolder; font-size: 1.5em") {{ clothing.Brand }}
                v-layout
                    .quicksand.font-weight-bold 59€
                    .quicksand.font-weight-bold.grey--text &nbsp| {{ clothing.Value }}€ valor
</template>

<script>
import Signup from '../components/Signup'
import VLazyImage from "v-lazy-image";


export default {

  props: ['clothing', 'ismobile'],
  components: {
    Signup,
    VLazyImage
  },

  computed: {
      user() {
        const user = this.$store.state.user
        if (!user) return {}

        if (user.email) {
          return user
        }

        return {} 
      }
  },

  methods: {

    getSize() {

        if (!this.user.email) {
            return 'NaN'
        }

        var size

        if (this.clothing.Type == 'accesories') {
            size = -1
        }
        else if (this.clothing.Type == 'jacket' || this.clothing.Type == 'shirt' || this.clothing.Type == 'sweatshirt') {
            if (this.clothing.Sizes.includes(this.user.size.shirt)) size = this.user.size.shirt
            else if (this.user.size.shirt == 4) size = 4
            else size = this.user.size.shirt + 1
        }
        else if (this.clothing.Type == 'skirt' || this.clothing.Type == 'pants') {
            size = this.user.size.pants
        }
        else if (this.clothing.Type == 'dress') {
            size = this.user.size.dress
        }
        else {
            size = -1
        }

        switch (size) {
            case -1:
                return 'Única'
                break;
            case 0:
                return 'XS'
                break;
            case 1:
                return 'S'
                break;
            case 2:
                return 'M'
                break;
            case 3:
                return 'L'
                break;
            case 4:
                return 'XL'
                break;
        }

    },

    addClothing() {
        this.$store.dispatch('addClothing', {
            id: this.clothing.id,
            Image: this.clothing.Image,
            Title: this.clothing.Title,
            Size: this.getSize(),
            Brand: this.clothing.Brand,
            Value: this.clothing.Value
        })
    },

    goToClothing () {
      this.$router.push({ path: `/armario/${this.clothing.id}` })
    },

    share(network) {
        ga('send', 'event', 'Prenda', 'Compartir', 'Landing Page');
        fbq('trackCustom', 'Compartido')
        switch (network) {
            case 'whatsapp':
                window.location.href = `whatsapp://send?text=Échale un vistazo a esta prenda de mouo 🌴 https://mouo.es/armario/${this.clothing.id}`
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=https://mouo.es/armario/${this.clothing.id}`, 'Facebook Share', 'height=500, width=600')
                break;
            case 'twitter':
                window.open(`https://twitter.com/home?status=Échale un vistazo a esta prenda de mouo 🌴 https://mouo.es/armario/${this.clothing.id}`, 'Twitter Share', 'height=500, width=600')
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/shareArticle?mini=true&url=https://mouo.es/armario/${this.clothing.id}`, 'Linkedin Share', 'height=500, width=600')
                break;
            case 'telegram':
                window.location.href = `tg://msg_url?url=Échale un vistazo a esta prenda de mouo 🌴 https://mouo.es/armario/${this.clothing.id}`, 'Linkedin Share', 'height=500, width=600'
                break;
            case 'email':
                window.location.href = `mailto:?&subject=Mira esta prenda de mouo&body=Échale un vistazo a esta prenda de mouo 🌴 https://mouo.es/armario/${this.clothing.id}`, 'Linkedin Share', 'height=500, width=600'
                break;
        }

        this.$store.dispatch('addShare')
    }
  }
}
</script>

<style lang="scss" scoped>
    .v-lazy-image {
        filter: blur(10px);
        transition: filter 0.7s;
    }
    .v-lazy-image-loaded {
        filter: blur(0);
    }
</style>



