<template lang="pug">
  v-app(light)
    v-toolbar(style="z-index: 12", :color="(!$vuetify.breakpoint.mdAndUp) ? 'transparent' : 'white'", flat, fixed, light, clipped-left, app)
      v-layout(justify-space-between)
        v-layout(xs4, style="width: 100%")
          v-btn.mobile.pointer(@click.stop="drawer = !drawer", icon, flat, aria-label="Expandir")
            v-icon menu
          v-btn(flat, icon)
            img(src="../assets/images/search.svg")
          
          v-menu(open-on-hover, offset-y)
            v-btn.desktop(slot="activator", flat, @click="goToArmario", style="font-weight:bold").quicksand.text-capitalize Catálogo
            v-card(flat)
              v-layout
                v-layout.pa-4(column, align-center, style="background-color: #1c1c1c")
                  p.playfair.white--text(style="font-size: 1.5em") Descubre nuestro plan mensual
                  .playfair.white--text.font-weight-bold(style="font-size: 1.5em") 59€ /mes
                  v-layout(column, align-start)
                    v-layout.white--text.pa-2.px-4(justify-center).pt-4
                        v-icon(small).white--text check
                        .quicksand.ml-2 Prendas por un valor de hasta 600€
                    v-layout.white--text.pa-2.px-4(justify-center)
                        v-icon(small).white--text check
                        .quicksand.ml-2 Usa tus prendas todo el tiempo que quieras
                    v-layout.white--text.pa-2.px-4(justify-center)
                        v-icon(small).white--text check
                        .quicksand.ml-2 Compra tus prendas favoritas
                    v-layout.white--text.pa-2.px-4(justify-center)
                        v-icon(small).white--text check
                        .quicksand.ml-2 Puedes utilizarlo meses sueltos
                    v-layout.white--text.pa-2.px-4(justify-center)
                        v-icon(small).white--text check
                        .quicksand.ml-2 Cambia las prendas que quieras cada mes
                    v-layout.white--text.pa-2.px-4(justify-center)
                        v-icon(small).white--text check
                        .quicksand.ml-2 Envío y devoluciones gratuitas
                div.pa-4
                  .quicksand.font-weight-bold.mb-3 Categorías
                  v-btn.quicksand.font-weight-bold.text-capitalize(flat, small, style="font-size: .8em") Ver todo
                  v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Vestidos
                  v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Pantalones
                  v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Abrigos
                  v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Camisetas
                  v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Bolsos
                div.pa-4
                  .quicksand.font-weight-bold.mb-3 Por tipo
                  v-btn.quicksand.font-weight-bold.text-capitalize(flat, small, style="font-size: .8em") Ver todo
                  v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Vestidos
                  v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Pantalones
                  v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Abrigos
                  v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Camisetas
                  v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Bolsos
          v-btn.desktop(flat, @click="goToFaq", style="font-weight:bold").quicksand.text-capitalize Dudas
          v-btn.desktop(flat, @click="goToFaq", style="font-weight:bold").quicksand.text-capitalize Opiniones
        v-layout(justify-center, align-center, xs4, style="width: 100%")
          img.pointer(src="../assets/images/LogoMobileBlack.png", @click="$router.push({ path: '/' })", height="40px", alt="Logo de mouo")
        v-layout(justify-end, xs4, style="width: 100%")
          v-menu(v-model="cartPopup", v-if="user.email", :close-on-content-click="false", offset-y, left)
            v-btn(slot="activator", flat, icon)
              img(src="../assets/images/shop.svg")
              div.black--text(style="font-size: 10px; position: absolute; top: 10px; left: 15px") {{ (user.temporalList.length < 10) ? user.temporalList.length : '+' }}
            v-card.pa-2(color="mblack", dark)
              v-subheader.quicksand Tus próximas prendas
              v-list(style="background-color: #1c1c1c")
                v-list-tile(v-for="(clothing, index) in user.temporalList", :key="index")
                  v-list-tile-avatar
                    img(:src="clothing.Images[0]", style="object-fit: cover;")
                  v-list-tile-content
                    v-list-tile-title.quicksand {{ clothing.Title }}
                    v-list-tile-sub-title.quicksand {{ clothing.Brand }}
                  v-list-tile-action
                      v-btn(flat, icon, @click="removeClothing(index)")
                          v-icon close
              v-alert(type="error", outline, :value="user.temporalList.length > 3") Has superado el número de prendas, elimina alguna para poder continuar con tu pedido
              v-alert(type="error", outline, :value="user.temporalList.length < 3") Debes seleccionar 3 prendas para poder gestionar el pedido
              v-btn.quicksand.font-weight-bold(outline, color="white", dark, block, :disabled="user.temporalList.length != 3", nuxt, to="/#scroll", @click="cartPopup = false") Realizar pedido
          .desktop(v-if="!user.email")
            signup(color="mblack", theme="light", msg="Crear Cuenta")
            login
          v-menu.desktop(v-else, offset-y)
            v-chip(slot="activator")
              v-avatar.grey {{ user.displayName.charAt(0) }}
              div.quicksand.font-weight-bold {{ user.displayName }}
            v-list
              v-list-tile(@click="logOut") Cerrar Sesion

    v-navigation-drawer#sidebar(v-model="drawer", style="z-index:11", app, clipped, temporary, light, fixed)
      v-layout.mt-5(column, align-center)
        v-btn(flat, @click="$router.push({ path: '/armario' })", style="font-weight:bold").quicksand Catálogo
        v-btn(flat, @click="$router.push({ path: '/armario' })", small).text-capitalize.quicksand Vestidos
        v-btn(flat, @click="$router.push({ path: '/armario' })", small).text-capitalize.quicksand Pantalones
        v-btn(flat, @click="$router.push({ path: '/armario' })", small).text-capitalize.quicksand Abrigos
        v-btn(flat, @click="$router.push({ path: '/armario' })", small).text-capitalize.quicksand Camisetas
        v-btn(flat, @click="$router.push({ path: '/armario' })", small).text-capitalize.quicksand Bolsos
        v-btn(flat, @click="$router.push({ path: '/faq' })", style="font-weight:bold").quicksand Dudas
        v-btn(flat, @click="$router.push({ path: '/faq' })", style="font-weight:bold").quicksand Opiniones
        v-btn(v-if="user.email", color="mblack", @click="logOut", outline).quicksand Cerrar sesion
        signup(v-if="!user.email", color="mblack", theme="light", msg="Crear Cuenta")
        login(v-if="!user.email")
      div(style="position: absolute; bottom: 0px; width: 100%")
        v-layout.px-3(justify-space-around)
          v-btn(flat, icon, color="mblack") 
            v-icon fab fa-facebook
          v-btn(flat, icon, color="mblack") 
            v-icon fab fa-instagram
          v-btn(flat, icon, color="mblack") 
            v-icon fab fa-twitter
        v-layout.px-3(justify-space-between)
          .quicksand.py-3.px-2 Nosotros
          .quicksand.py-3.px-2 Nosotros
          .quicksand.py-3.px-2 Nosotros
      //- v-chip
        v-avatar.teal C
        div Andrés García
    v-content.background
      router-view
    v-footer(v-if="$vuetify.breakpoint.mdAndUp", height="auto")
      v-layout.pa-5(justify-space-between, style="border-top: 1px solid #1c1c1c; border-bottom: 1px solid #1c1c1c; background-color: white;")
        v-layout(xs7, style="border-right: 1px solid #1c1c1c").mr-3
          v-layout(column, align-center)
            .quicksand.font-weight-bold.mb-3 Categorías
            v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Vestidos
            v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Pantalones
            v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Abrigos
            v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Camisetas
            v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Bolsos
            v-btn.quicksand.font-weight-bold.text-capitalize(flat, small, style="font-size: .8em") Ver todo
          v-layout(column, align-center)
            .quicksand.font-weight-bold.mb-3 Compañía
            v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Como funciona
            v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Sobre nosotros
            v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) FAQ
            v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Testimonios
            v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Empleo
          v-layout(column, align-center)
            .quicksand.font-weight-bold.mb-3 Ayuda
            v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Contacta con nosotros
            v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Devoluciones
            v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Privacidad
            v-btn.quicksand.mb-1.text-capitalize(flat, small, display: block) Términos y condiciones
        v-flex.ml-3(xs4)
          .quicksand.font-weight-bold.mb-3 Newsletter
          p.quicksand.font-weight-light(align="justify") Estamos en constante contacto con vosotras para ofreceros vuestras prendas favoritas, si quieres recibir nuestras últimas novedades y ofertas, escribe tu correo y estaremos en contacto contigo.
          v-text-field.quicksand.font-weight-light(prepend-inner-icon="email", label="Tu email", append-icon="send", box)
          v-layout
            v-btn(icon, dark, large, color="mblack")
              v-icon fab fa-facebook
            v-btn(icon, dark, large, color="mblack")
              v-icon fab fa-instagram
            v-btn(icon, dark, large, color="mblack")
              v-icon fab fa-twitter
      v-snackbar(v-model="threeClothes", bottom, color="green", :timeout=6000) Ya tienes 3 prendas, ahora toca gestionar el pedido
      v-snackbar(v-model="moreClothes", bottom, color="red", :timeout=6000) Has escogido mas de 3 prendas, tendrás que quitar alguna antes de actualizar
      v-snackbar(v-model="clothingAdded", bottom, right, color="green", :timeout=6000) Prenda Agregada
      v-snackbar(v-model="checkCookie", bottom, auto-height, :timeout=0, color="mblack", dark, multi-line)
        div Utilizamos cookies propias y de terceros para mejorar la experiencia de la navegación de nuestros usuarios y mejorar nuestros servicios. Si acepta o continúa navegando, consideramos que acepta su uso.
        v-btn(color="white", outline, @click="setCookie") Aceptar
</template>


<script>
  import Signup from '../components/Signup.vue'
  import Login from '../components/Login.vue'

  export default {

    data () {
      return {
        drawer: false,
        cartPopup: false,
        checkCookie: false
      }
    },

    components: {
      Signup,
      Login
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

      clothingAdded: {
        get() {
          return this.$store.state.clothingAdded
        },

        set(value) {
          this.$store.commit('setClothingAdded', value)
        }
      },

      threeClothes: {
        get() {
          return this.$store.state.threeClothes
        },

        set(value) {
          this.$store.commit('setThreeClothes', value)
        }
      },

      moreClothes: {
        get() {
          return this.$store.state.moreClothes
        },

        set(value) {
          this.$store.commit('setMoreClothes', value)
        }
      }
    },

    beforeMount () {
      require('intersection-observer')
      ga('send', 'event', 'Pagina', 'Visita', 'Landing Page');
      this.$store.dispatch('getCurrentUser')
    },
    mounted () {
      this.$store.dispatch('addVisit')

        var cookie = this.getCookie('checkCookie')

        if (cookie == 'true') {
          this.checkCookie = false
        }

        else {
          this.checkCookie = true
        }

    },

    methods: {
      goToHome () {
        this.$router.push({ path: '/' })
      },

      setCookie() {
          var d = new Date();
          d.setTime(d.getTime() + (365*24*60*60*1000));
          var expires = "expires="+ d.toUTCString();
          document.cookie = 'checkCookie' + "=" + 'true' + ";" + expires + ";path=/";

          this.checkCookie = false
      },

      getCookie(cname) {
          var name = cname + "=";
          var decodedCookie = decodeURIComponent(document.cookie);
          var ca = decodedCookie.split(';');
          for(var i = 0; i <ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) == ' ') {
                  c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                  return c.substring(name.length, c.length);
              }
          }
          return "";
      },

      goToArmario () {
        this.$router.push({ path: '/armario' })
      },

      goToFaq () {
        this.$router.push({ path: '/faq' })
      },

      logOut() {
        this.$store.dispatch('logOut')
      },

      removeClothing(index) {
        this.$store.dispatch('removeClothing', index)
      },

      openFacebook() {
        window.open('https://www.facebook.com/mouo.spain/')
      },

      openInstagram() {
        window.open('https://www.instagram.com/mouo.social/')
      },
    }
  }
</script>

<style lang="scss" scoped>

  #sidebar {
    background-color: #fafafa;
  }

  .background {
    background-color: white;
  }
</style>

