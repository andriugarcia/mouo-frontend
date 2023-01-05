<template lang="pug">
    #clothing
        #mobile(v-if="!$vuetify.breakpoint.mdAndUp")
            v-card.pa-3(style="z-index: 200; margin-top: 80vh;")
                v-layout(style="position: absolute; top: -12px; width: 100%;", justify-center)
                    div(style="width: 20%; height: 4px; opacity: 0.70; background-color: white; border-radius: 4px")
                v-card.pb-4(flat, style="position: -webkit-sticky; position: sticky; top: 0; z-index: 20")
                    v-layout.pt-2(justify-space-between)
                        div
                            .font-weight-bold.quicksand {{ clothing.Title }}
                            .quicksand {{ clothing.Brand }}
                        v-spacer
                        v-bottom-sheet(v-model="shareDialog")
                            v-btn(slot="activator", flat, icon, style="margin-top: 0px")
                                v-icon share
                            v-card.mx-2.pa-2
                                v-subheader.quicksand Compartir
                                v-list
                                    v-list-tile(@click="share('facebook')")
                                        v-list-tile-avatar
                                            v-icon fab fa-facebook
                                        v-list-tile-content
                                            v-list-tile-title Facebook
                                    v-list-tile(@click="share('twitter')")
                                        v-list-tile-avatar
                                            v-icon fab fa-twitter
                                        v-list-tile-content
                                            v-list-tile-title Twitter
                                    v-list-tile(@click="share('instagram')")
                                        v-list-tile-avatar
                                            v-icon fab fa-instagram
                                        v-list-tile-content
                                            v-list-tile-title Instagram
                        v-bottom-sheet(v-model="selectSize")
                            v-btn.quicksand.font-weight-bold(slot="activator", color="mblack", flat, dark, large, style="border: 2px solid #1c1c1c; margin-top: -4px") AÑADIR
                            v-card.pa-2.pb-3.mx-2
                                v-subheader.quicksand Añadir prenda
                                v-layout.hide-scroll(justify-start, style="overflow-x: scroll; scroll-behavior: smooth;")
                                    v-btn.quicksand(v-if="clothing.Sizes.includes(5)", outline, @click="sizeSelected = 5", :color="colorSelected(5)") XXS
                                    v-btn.quicksand(:disabled="!clothing.Sizes.includes(0)", outline, @click="sizeSelected = 0", :color="colorSelected(0)") XS
                                    v-btn.quicksand(:disabled="!clothing.Sizes.includes(1)", outline, @click="sizeSelected = 1", :color="colorSelected(1)") S
                                    v-btn.quicksand(:disabled="!clothing.Sizes.includes(2)", outline, @click="sizeSelected = 2", :color="colorSelected(2)") M
                                    v-btn.quicksand(:disabled="!clothing.Sizes.includes(3)", outline, @click="sizeSelected = 3", :color="colorSelected(3)") L
                                    v-btn.quicksand(:disabled="!clothing.Sizes.includes(4)", outline, @click="sizeSelected = 4", :color="colorSelected(4)") XL
                                    v-btn.quicksand(v-if="clothing.Sizes.includes(6)", outline, @click="sizeSelected = 6", :color="colorSelected(6)") XXL
                                v-layout.mt-2(justify-center)
                                    v-btn.py-1.quicksand(large, dark, color="mblack", style="width: 90%", @click="addClothing") Añadir a la cesta
                div(style="background-color: #1c1c1c").pa-4
                    v-layout(align-center, column)
                        b.subheading.white--text.align-center.quicksand DISFRUTA DE ESTA PRENDA Y DOS MÁS
                        h2.white--text.quicksand.align-center <i>desde</i> <b> 59€/mes</b>
                .quicksand.mt-4.font-weight-bold(style="font-size: 1.5em;") DESCRIPCIÓN
                p.quicksand.font-weight-light.mt-3(align="justify") Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                .quicksand.mt-4.font-weight-bold(style="font-size: 1.5em;") COMBÍNALO CON
                v-layout(wrap, justify-space-between)
                    v-card.ma-2(v-for="i in 4", :key="i", flat, style="width: 45%")
                        v-img(:src="clothing.Images[0]", style="width: 100%")
                        v-card-title(primary-title).pt-3
                            v-layout(column, align-center)
                                i.quicksand {{ clothing.Title }}
                                h3.quicksand(style="font-weight: bolder; font-size: 1.5em") {{ clothing.Brand }}
                                v-layout
                                    .quicksand.font-weight-bold 59€
                                    .quicksand.font-weight-bold.grey--text &nbsp| {{ clothing.Value }}€ valor
                        v-card-actions
                            v-btn.quicksand.font-weight-bold(large, block, outline, color="mblack") Agregar
                .quicksand.mt-4.font-weight-bold(style="font-size: 1.5em;") PRODUCTOS SIMILARES
                v-layout(wrap, justify-space-between)
                    v-card.ma-2(v-for="i in 4", :key="i", flat, style="width: 45%")
                        v-img(:src="clothing.Images[0]", style="width: 100%")
                        v-card-title(primary-title).pt-3
                            v-layout(column, align-center)
                                i.quicksand {{ clothing.Title }}
                                h3.quicksand(style="font-weight: bolder; font-size: 1.5em") {{ clothing.Brand }}
                                v-layout
                                    .quicksand.font-weight-bold 59€
                                    .quicksand.font-weight-bold.grey--text &nbsp| {{ clothing.Value }}€ valor
                        v-card-actions
                            v-btn.quicksand.font-weight-bold(large, block, outline, color="mblack") Agregar

            carousel(:src="clothing.Images")
        #desktop(v-else)
            v-layout(row, wrap, justify-center)
                div.ma-2.pa-0.portada
                    img(v-for="(img, i) in clothing.Images", :key="i", :src="img")

                v-card.ma-2.px-3.card(flat)
                    v-card.py-3(color="white", flat, style="position: -webkit-sticky; position: sticky; top: 60px;")
                        v-layout.pt-2(justify-space-between)
                            div
                                .font-weight-bold.quicksand {{ clothing.Title }}
                                .quicksand {{ clothing.Brand }}
                            v-spacer
                            v-bottom-sheet(v-model="shareDialog")
                                v-btn(slot="activator", flat, icon, style="margin-top: 0px")
                                    v-icon share
                                v-card.mx-2.pa-2
                                    v-subheader.quicksand Compartir
                                    v-list
                                        v-list-tile(@click="share('facebook')")
                                            v-list-tile-avatar
                                                v-icon fab fa-facebook
                                            v-list-tile-content
                                                v-list-tile-title Facebook
                                        v-list-tile(@click="share('twitter')")
                                            v-list-tile-avatar
                                                v-icon fab fa-twitter
                                            v-list-tile-content
                                                v-list-tile-title Twitter
                                        v-list-tile(@click="share('instagram')")
                                            v-list-tile-avatar
                                                v-icon fab fa-instagram
                                            v-list-tile-content
                                                v-list-tile-title Instagram
                            v-bottom-sheet(v-model="selectSize")
                                v-btn.quicksand.font-weight-bold(slot="activator", color="mblack", flat, dark, large, style="border: 2px solid #1c1c1c; margin-top: -4px") AÑADIR
                                v-card.pa-2.pb-3.mx-2
                                    v-subheader.quicksand Añadir prenda
                                    v-layout(justify-start)
                                        v-btn.quicksand(v-if="clothing.Sizes.includes(5)", outline, @click="sizeSelected = 5", :color="colorSelected(5)") XXS
                                        v-btn.quicksand(:disabled="!clothing.Sizes.includes(0)", outline, @click="sizeSelected = 0", :color="colorSelected(0)") XS
                                        v-btn.quicksand(:disabled="!clothing.Sizes.includes(1)", outline, @click="sizeSelected = 1", :color="colorSelected(1)") S
                                        v-btn.quicksand(:disabled="!clothing.Sizes.includes(2)", outline, @click="sizeSelected = 2", :color="colorSelected(2)") M
                                        v-btn.quicksand(:disabled="!clothing.Sizes.includes(3)", outline, @click="sizeSelected = 3", :color="colorSelected(3)") L
                                        v-btn.quicksand(:disabled="!clothing.Sizes.includes(4)", outline, @click="sizeSelected = 4", :color="colorSelected(4)") XL
                                        v-btn.quicksand(v-if="clothing.Sizes.includes(6)", outline, @click="sizeSelected = 6", :color="colorSelected(6)") XXL
                                    v-layout.mt-2(justify-center)
                                        v-btn.py-1.quicksand(large, dark, color="mblack", style="width: 90%", @click="addClothing") Añadir a la cesta
                    div(style="background-color: #1c1c1c").pa-4.mt-3
                        v-layout(align-center, column)
                            b.subheading.white--text.align-center.quicksand DISFRUTA DE ESTA PRENDA Y DOS MÁS
                            h2.white--text.quicksand.align-center <i>desde</i> <b> 59€/mes</b>
                    .quicksand.mt-4.font-weight-bold(style="font-size: 1.5em;") DESCRIPCIÓN
                    p.quicksand.font-weight-light.mt-3(align="justify") Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    .quicksand.mt-4.font-weight-bold(style="font-size: 1.5em;") COMBÍNALO CON
                    v-layout(wrap, justify-space-between)
                        v-card.ma-2(v-for="i in 3", :key="i", flat, xs1)
                            v-img(:src="clothing.Images[0]", style="width: 100%")
                            v-card-title(primary-title).pt-3
                                v-layout(column, align-center)
                                    i.quicksand {{ clothing.Title }}
                                    h3.quicksand(style="font-weight: bolder; font-size: 1.5em") {{ clothing.Brand }}
                                    v-layout
                                        .quicksand.font-weight-bold 59€
                                        .quicksand.font-weight-bold.grey--text &nbsp| {{ clothing.Value }}€ valor
                            v-card-actions
                                v-btn.quicksand.font-weight-bold(large, block, outline, color="mblack") Agregar
                    .quicksand.mt-4.font-weight-bold(style="font-size: 1.5em;") PRODUCTOS SIMILARES
                    v-layout(wrap, justify-space-between)
                        v-card.ma-2(v-for="i in 3", :key="i", flat, xs1)
                            v-img(:src="clothing.Images[0]", style="width: 100%")
                            v-card-title(primary-title).pt-3
                                v-layout(column, align-center)
                                    i.quicksand {{ clothing.Title }}
                                    h3.quicksand(style="font-weight: bolder; font-size: 1.5em") {{ clothing.Brand }}
                                    v-layout
                                        .quicksand.font-weight-bold 59€
                                        .quicksand.font-weight-bold.grey--text &nbsp| {{ clothing.Value }}€ valor
                            v-card-actions
                                v-btn.quicksand.font-weight-bold(large, block, outline, color="mblack") Agregar


                    //- div(v-else) SELECTOR DE TALLAS
                        v-card.my-3.pa-2(v-if="clothing.Type != 'Accesorio' && clothing.Sizes", style="border: 1px solid #1c1c1c")
                            v-subheader Seleccione su talla
                            v-layout(wrap)
                                v-btn(v-if="clothing.Sizes.includes(5)", outline, @click="sizeSelected = 5", :color="colorSelected(5)") XXS
                                v-btn(:disabled="!clothing.Sizes.includes(0)", outline, @click="sizeSelected = 0", :color="colorSelected(0)") XS
                                v-btn(:disabled="!clothing.Sizes.includes(1)", outline, @click="sizeSelected = 1", :color="colorSelected(1)") S
                                v-btn(:disabled="!clothing.Sizes.includes(2)", outline, @click="sizeSelected = 2", :color="colorSelected(2)") M
                                v-btn(:disabled="!clothing.Sizes.includes(3)", outline, @click="sizeSelected = 3", :color="colorSelected(3)") L
                                v-btn(:disabled="!clothing.Sizes.includes(4)", outline, @click="sizeSelected = 4", :color="colorSelected(4)") XL
                                v-btn(v-if="clothing.Sizes.includes(6)", outline, @click="sizeSelected = 6", :color="colorSelected(6)") XXL
                        v-card(flat, color="mblack", dark).my-3.pa-4
                            v-layout(column, align-center)
                                div.body-2.font-weight-bold ¿Quieres probar esta prenda?
                                div Añade esta prenda a tu lista y disfrutala el tiempo que quieras
                                v-btn.mt-4(:disabled="clothing.Type != 'Accesorio' && sizeSelected == null", color="white", light, block, outline, @click="addClothing").quicksand.font-weight-bold Añadir

                    v-snackbar(v-model="snackbar", bottom, right, color="mblack", :timeout=6000) Copiado


</template>

<script>
import Signup from '../../components/Signup'
import db from '../../db'
import Login from '../../components/Login'
import Carousel from '../../components/Carousel'

export default {
    data() {
        return {
            clothing: {},
            isMobile: false,
            snackbar: false,
            sizeSelected: null,
            structuredData: {},
            shareDialog: false,
            selectSize: false,
        }
    },

    head() {
        return {
            title: `${this.clothing.Title} ${this.clothing.Brand} - mouo`,
            meta: [{
                    hid: 'description',
                    name: 'description',
                    content: `${this.clothing.Title} ${this.clothing.Brand} en mouo, tu nube de ropa ilimitado`
                },
                {
                    name: 'keywords',
                    content: `${this.clothing.Title.replace(' ', ', ')}, ${this.clothing.Brand.replace(' ', ', ')}, mouo, ropa, armario, prendas, nube, suscripción, prendas, moda`
                },
                {
                    'property': 'og:image',
                    'itemprop': "image",
                    'content': this.clothing.Image
                },
                {
                    'property': 'og:image:width',
                    'content': "516"
                },
                {
                    'property': 'og:image:height',
                    'content': "640"
                },
                {
                    'property': 'og:title',
                    'content': `${this.clothing.Title} ${this.clothing.Brand} en mouo, tu nube de ropa ilimitado`
                },
                {
                    'property': 'og:url',
                    'content': `https://mouo.es/armario/${this.$route.params.clothing}`
                },
                {
                    'property': 'og:site_name',
                    'content': 'Mouo'
                },
                {
                    'property': 'og:updated_time',
                    'content': '2018-08-23T16:13:30+02:00'
                },
            ],
            script: [{
                type: 'application/ld+json',
                src: JSON.stringify(this.structuredData)
            }]
        }
    },

    components: {
        Signup,
        Login,
        Carousel
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
        colorSelected(size) {
            if (size == this.sizeSelected) {
                return 'blue'
            } else return 'mblack'
        },

        addClothing() {

            var size = ''

            switch (this.sizeSelected) {
                case 0:
                    size = 'XS'
                    break;
                case 1:
                    size = 'S'
                    break;
                case 2:
                    size = 'M'
                    break;
                case 3:
                    size = 'L'
                    break;
                case 4:
                    size = 'XL'
                    break;
                case 5:
                    size = 'XXS'
                    break;
                case 6:
                    size = 'XXL'
                    break;
                default:
                    size = 'Única'
                    break;
            }

            console.log({
                id: this.clothing.id,
                Images: [this.clothing.Images[0]],
                Title: this.clothing.Title,
                Size: size,
                Brand: this.clothing.Brand,
                Value: this.clothing.Value,
                Price: this.clothing.Price
            })

            this.$store.dispatch('addClothing', {
                id: this.clothing.id,
                Images: [this.clothing.Images[0]],
                Title: this.clothing.Title,
                Size: size,
                Brand: this.clothing.Brand,
                Value: this.clothing.Value,
                Price: this.clothing.Price
            })
        },

        share(network) {
            ga('send', 'event', 'Prenda', 'Compartir', 'Landing Page');
            fbq('trackCustom', 'Compartido')
            switch (network) {
                case 'whatsapp':
                    window.location.href = `whatsapp://send?text=Échale un vistazo a esta prenda de mouo 🌴 https://mouo.es/armario/${this.$route.params.clothing}`
                    break;
                case 'copy':
                    var self = this
                    this.$copyText(`mouo.es/armario/${this.$route.params.clothing}`).then(function (e) {
                        self.snackbar = true
                    })
                    break;
                case 'facebook':
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=https://mouo.es/armario/${this.$route.params.clothing}`, 'Facebook Share', 'height=500, width=600')
                    break;
                case 'twitter':
                    window.open(`https://twitter.com/home?status=Échale un vistazo a esta prenda de mouo 🌴 https://mouo.es/armario/${this.$route.params.clothing}`, 'Twitter Share', 'height=500, width=600')
                    break;
                case 'googleplus':
                    window.open(`https://plus.google.com/share?url=https://mouo.es/armario/${this.$route.params.clothing}`, 'Google+ Share', 'height=500, width=350')
                    break;
                case 'linkedin':
                    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=Échale un vistazo a esta prenda de mouo 🌴 https://mouo.es/armario/${this.$route.params.clothing}`, 'Linkedin Share', 'height=500, width=600')
                    break;
                case 'telegram':
                    window.location.href = `tg://msg_url?url=Échale un vistazo a esta prenda de mouo 🌴 https://mouo.es/armario/${this.$route.params.clothing}`, 'Linkedin Share', 'height=500, width=600'
                    break;
                case 'email':
                    window.location.href = `mailto:?&subject=Mira esta prenda de mouo&body=Échale un vistazo a esta prenda de mouo 🌴 https://mouo.es/armario/${this.$route.params.clothing}`, 'Linkedin Share', 'height=500, width=600'
                    break;
            }

            this.$store.dispatch('addShare')
        }
    },

    mounted() {
        window.scrollTo(0, 0)

        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        this.isMobile = check;
        ga('send', 'Prenda', location.pathname);
        if (typeof (FB) != 'undefined' &&
            FB != null) {
            FB.AppEvents.logEvent("Prenda Visualizada")
        }
    },

    asyncData({
        params,
        error
    }) {
        return db.collection('clothes').doc(params.clothing).get()
            .then((doc) => {
                return {
                    clothing: doc.data(),
                    structuredData: {

                        "@context": "http://schema.org/",
                        "@type": "Product",
                        "name": doc.data().Title,
                        "image": doc.data().Image,
                        "description": "Prueba esta prenda por solo 59€ al mes en Mouo | Tu armario",
                        "brand": doc.data().Brand,
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "EUR",
                            "price": doc.data().Value,
                            "priceValidUntil": "2018-09-15",
                            "availability": "http://schema.org/InStock",
                            "itemCondition": "http://schema.org/UsedCondition"
                        }

                    }
                }
            })
            .catch((e) => {
                error({
                    statusCode: 404,
                    message: 'Post not found'
                })
            })
    },

    beforeMount() {
        fbq('track', 'ViewContent', {
            content_name: this.clothing.Title,
            value: this.clothing.Value,
            currency: 'EUR',
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            language: navigator.language
        });
    },


    // if (typeof document !== 'undefined') {
    //     document.title = `${clothing.Title} ${clothing.Brand} - mouo`
    //     var keywords = `${clothing.Title.replace(' ', ', ')}, ${clothing.Brand.replace(' ', ', ')}`
    //     document.querySelector('meta[name="keywords"]').setAttribute('content', keywords)
    //     document.querySelector('meta[name="description"]').setAttribute('content', `${clothing.Title} ${clothing.Brand}`)
    // }

    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.toUpperCase()
        }
    }

}

</script>

<style lang="scss" scoped>
    .brand {
        font-size: 24px;
    }

    @media (max-width: 600px) {
        .portada {
            width: 100%;
            height: 100%;
        }

        .card {
            width: 100%;
        }
    }

    @media (min-width: 600px) {
        .portada {
            width: 40%;
            height: 100%;
        }

        .card {
            width: 40%;
        }
    }


</style>


