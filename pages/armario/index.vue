<template lang="pug">
    #armario
        v-navigation-drawer(app, clipped, v-model="drawer")
            v-form.pa-3
                v-layout(justify-space-between, align-center)
                    strong.my-2(style="font-size: 1.3em").quicksand.font-weight-bold.desktop FILTRAR
                    strong.my-2(style="font-size: 1.3em").quicksand.font-weight-bold.mt-5.mobile FILTRAR
                    v-btn(flat, icon, @click="drawer = false").mobile.mt-5
                        v-icon close
                //- h3.mb-3.mt-3.quicksand Buscar
                //- v-text-field(v-model="searchText", single-line, label="Buscar")
                //- h3.mb-3.mt-3.quicksand Ordenar
                //- v-select(color="mblack", :items="orders", single-line, v-model="order", label="Orden", offset-y)
                //- h3.mb-3.quicksand Valor
                //- v-range-slider.mt-5.mx-2(v-model="price", :max="400", :min="0", color="mblack", track-color="gray", thumb-label="always")
                h3.mb-3.quicksand Tipo de producto
                v-select(color="mblack", v-model="department", single-line, :items="departments", label="Departamento", menu-props="offsetY")
                h3.mb-3.quicksand Marca
                v-select(color="mblack", :items="brands", single-line, v-model="brand", label="Marca", menu-props="offsetY")
                //- h3.mb-3 Talla
                //- v-layout
                    v-flex.mx-2
                        v-range-slider(v-model="price", persistent-hint, :max="100", disabled, :min="0", color="mblack", track-color="gray", thumb-label)
                //- h3.mb-3 Género
                //- v-select(color="mblack", :items="genre", label="Género", offset-y)
                //- h3.mb-3.quicksand Color
                //- v-select(color="mblack", :items="colors", single-line, v-model="color", label="Color", offset-y)
                v-btn(block, color="mblack", dark, @click="resetFilters").quicksand Restaurar
                v-spacer
        v-content.pa-0
            no-ssr
                //- masonry.pa-2(:cols="{default: 5, 1500: 4, 1000: 3, 800: 2, 500: 1}", :gutter="30")
                v-layout(v-if="visible", wrap, justify-center)
                    card.media(v-for="(clothing, index) in clothes", :key="index", :clothing="clothing", :ismobile="isMobile")
            v-layout.pa-2(v-if="visible && clothes.length < 157 && loadingClothes", justify-center)
                v-progress-circular.py-5(indeterminate, color="mblack")
            v-card.pa-4(v-if="clothes.length == 0 && !loadingClothes")
                v-layout(justify-center)
                    div.quicksand.font-weight-bold No existen prendas con este filtro

            v-card.mt-3(v-if="!user.email", color="mblack", dark).pa-5.mx-4.my-3
                v-layout(column, align-center)
                    div.headline.font-weight-bold.align-center ¡Registrate para poder ver nuestras prendas!
                    div.quicksand.align-center Inicia sesión o crea una cuenta nueva para verlas todas
                    v-layout.mt-2.px-3(row, justify-center)
                        signup(color="white", theme="dark", msg="Crear Cuenta")
                        login(color="white", theme="dark", msg="Iniciar Sesion")
            v-card.mt-3(v-else, color="mblack", dark).pa-5.my-3
                v-layout(column, align-center)
                    div.headline.font-weight-bold.align-center Servicio no disponible
                    div.quicksand.align-center Ahora mismo no tenemos más plazas disponibles, te mandaremos un email cuando volvamos a tener.
                    div.quicksand.align-center.mt-3 Sentimos las molestias
                    div.quicksand Pulsa <a class="font-weight-bold; color: white" href="mailto:contacto@mouo.es?&subject=Consulta&body=Muy%20buenas!%0A%0AQuer%C3%ADa%20haceros%20la%20siguiente%20consulta%3A%20%0A">AQUÍ</a> para mandarnos un mail y te contestaremos lo antes posible

        v-btn(style="z-index: 10", fixed, bottom, left, color="mblack", dark, @click="drawer = true", large).mobile
            .quicksand.font-weight-bold Filtrar
                


</template>

<script>
import { getQuery } from '../../tools'

import Signup from '../../components/Signup'
import Login from '../../components/Login'
import Card from '../../components/Card'
import db from '../../db'
import NoSSR from 'vue-no-ssr'

export default {
  data () {
    return {
    visible: true, //activa la visibilidad del armario
      drawer: this.$vuetify.breakpoint.mdAndUp,
      searchText: '',
      isMobile: false,
      bottom: false,
      loadingClothes: true,
      price: [0, 400],
      allClothes: [],

      department: 'Todos',
      genre: ['Todos', 'Hombre', 'Mujer', 'Niño', 'Niña'],

      colors: ['Todos', 'Amarillo', 'Azul', 'Azul Oscuro', 'Blanco', 'Carne', 'Gris', 'Naranja', 'Negro',
       'Rojo', 'Plateado', 'Rosa', 'Vaquero', 'Verde'],

      color: 'Todos',
      size: null,
      
      departments: ['Todos', 'Blazers', 'Chaquetas y abrigos', 'Vestidos', 'Monos', 'Camisas | Blusas', 'Tops', 'Camisetas', 'Pantalones', 'Faldas', 'Sudaderas', 'Pantalones', 'Faldas', 'Sudaderas', 'Bolsos'],
      brands: ['EMES', 'Beyonas', 'Thinking Mu', 'Ecoalf', 'Tiralahilacha', 'Maria Escote', 'Rita Row', 'Coosy', 'Hupit', 'Laagam', 'María Malo', 'Tulle Rouge', 'Bimani 13', 'Marine Layer', 'Ladypipa', 'Eseoese', 'Sophie&Lucie', 'SKFK', 'Cus', 'Moises Nieto', 'Diarte'],

      brand: 'Todos',
      orders: ['Fecha', 'Titulo (A - Z)', 'Titulo (Z - A)', 'Marca (A - Z)', 'Marca (Z - A)', 'Valor (Ascendente)', 'Valor (Descendente)'],
      order: 'Fecha'
    }
  },

    head() {
        return {
            title: `Armario - mouo`,
            meta: [
                { hid: 'description', name: 'description', content: `mouo, tu nube de ropa ilimitado` },
                { name: 'keywords', content: `mouo, ropa, armario, prendas, nube, suscripción, prendas, moda` },
            ]
        }
    },

    beforeCreate() {
        this.$store.dispatch("fetchClothes", {
            text: 'Todos',
            order: 'Fecha',
            asc: true,
            type: 'Todos',
            brand: 'Todos',
            sizes: null
        })
    },

    mounted() {
        // Comprobamos que estamos en movil
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        this.isMobile = check;

        window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible()
        })
        // fbq('track', 'ViewContent', {
        //     content_name: 'Armario',
        // referrer: document.referrer,
        // userAgent: navigator.userAgent,
        // language: navigator.language
        // });
        // ga('send', 'Armario', location.pathname);
    //     if (typeof(FB) != 'undefined'
    //  && FB != null ) {
    //      FB.AppEvents.logEvent("Armario Visualizado")
    //  }

    if (getQuery('visible') == 'true') {
        this.visible = true
    }
    },

  components: {
    Signup,
    Login,
    Card,
    'no-ssr': NoSSR
  },

  methods: {
      resetFilters() {
            // this.color = 'Todos'
            this.order = 'Fecha',
            this.brand = 'Todos',
            this.department = 'Todos',
            this.searchText = '',
            this.price = [0, 400]
      },

    getOrder(text) {
        if (text == 'Titulo (A - Z)') {
            return {
                order: 'Title',
                asc: true
            }
        }
        else if (text == 'Titulo (Z - A)') {
            return {
                order: 'Title',
                asc: false
            }
        }
        else if (text == 'Marca (A - Z)') {
            return {
                order: 'Marca',
                asc: true
            }
        }
        else if (text == 'Marca (Z - A)') {
            return {
                order: 'Marca',
                asc: false
            }
        }
        else if (text == 'Valor (Ascendente)') {
            return {
                order: 'Value',
                asc: true
            }
        }
        else if (text == 'Valor (Descendiente)') {
            return {
                order: 'Value',
                asc: false
            }
        }

        else {
            return {
                order: 'Fecha',
                asc: true
            }
        }
    },

    bottomVisible() {
      const scrollY = window.scrollY + 1000
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
  },

  watch: {
        bottom(bottom) {
          if (bottom && this.clothes.length != 0) {
              this.$store.dispatch("fetchClothes", {
                  brand: this.brand,
                  type: this.department

              })
          }
      },

      searchText(value) {
          this.searchText = value
            var orders = this.getOrder(this.order)
            this.$store.state.clothes = 0 //Limpia el array
            this.$store.dispatch("fetchClothes", {
                text: this.searchText,
                order: orders.order,
                asc: orders.asc,
                brand: this.brand,
                sizes: this.size,
                type: this.department
            })
      },
      order(value) {
          this.order = value
            var orders = this.getOrder(this.order)
            this.$store.state.clothes = 0 //Limpia el array
            this.$store.dispatch("fetchClothes", {
                text: this.searchText,
                order: orders.order,
                asc: orders.asc,
                brand: this.brand,
                sizes: this.size,
                type: this.department
            })
      },
      department(value) {

          this.loadingClothes = (this.brand == 'Todos' && this.department == 'Todos') ? true : false

          this.department = value
            var orders = this.getOrder(this.order)
            this.$store.state.clothes = [] //Limpia el array
            this.$store.dispatch("fetchClothes", {

                brand: this.brand,
                type: this.department
            })
      },
      brand(value) {

          this.loadingClothes = (this.brand == 'Todos' && this.department == 'Todos') ? true : false

          this.brand = value
            var orders = this.getOrder(this.order)
            this.$store.state.clothes = [] //Limpia el array
            this.$store.dispatch("fetchClothes", {

                brand: this.brand,
                type: this.department
            })
      },
      size(value) {
          this.size = value
            var orders = this.getOrder(this.order)
            this.$store.state.clothes = 0 //Limpia el array
            this.$store.dispatch("fetchClothes", {
                text: this.searchText,
                order: orders.order,
                asc: orders.asc,
                brand: this.brand,
                sizes: this.size,
                type: this.department
            })
      },
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
    
      clothes() {
    
        let clothes = []
        this.allClothes = this.$store.state.clothes
        console.log("TEST")
        console.log(this.allClothes)
        this.allClothes.forEach(clothing => {
            if (this.price[0] >= clothing.Value && this.price[1] <= clothing.Value ||
                this.price[0] <= clothing.Value && this.price[1] >= clothing.Value) {
                    if (this.typeFilter == '' || clothing.Type == this.typeFilter) {
                        if (this.brand == 'Todos' || this.brand == clothing.Brand) {
                            if (this.color == 'Todos' || this.color == clothing.Color) {
                                if (this.searchText == '' || clothing.Title.includes(this.searchText) || clothing.Brand.includes(this.searchText)) {
                                    clothes.push(clothing)
                                }
                            }
                        }
                    }
                }
        })

        switch (this.order) {
            case 'Fecha':
                return clothes
                break;
            case 'Titulo (A - Z)':
                return clothes.sort((a, b) => {
                    if (a.Title > b.Title) return 1
                    return -1
                })                
                break;
            case 'Titulo (Z - A)':
                return clothes.sort((a, b) => {
                    if (a.Title < b.Title) return 1
                    return -1
                })
                break;
            case 'Marca (A - Z)':
                return clothes.sort((a, b) => {
                    if (a.Brand > b.Brand) return 1
                    return -1
                })
                break;
            case 'Marca (Z - A)':
                return clothes.sort((a, b) => {
                    if (a.Brand < b.Brand) return 1
                    return -1
                })
                break;
            case 'Valor (Ascendente)':
                return clothes.sort((a, b) => {
                    if (a.Value > b.Value) return 1
                    return -1
                })
                break;
            case 'Valor (Descendente)':
                return clothes.sort((a, b) => {
                    if (a.Value < b.Value) return 1
                    return -1
                })
                break;

        }

        return clothes
      },

      typeFilter() {
          // ['Todo', 'Pantalones', 'Camisas', 'Camiseta', 'Accesorios', 'Zapatos']

          switch (this.department) {
            case 'Todos': 
                return ''
                break;
            default:
                return this.department 
                break;
          }
      }
  },

}
</script>

<style lang="scss" scoped>
    .media {
        margin: 8px;
    }

    @media(max-width: 620px) {
        .media {
            width: 100%;
        }
    }
    @media(min-width: 620px) {
        .media {
            width: 300px;
        }
    }
</style>

