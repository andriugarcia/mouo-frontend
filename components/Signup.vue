<template lang="pug">
    v-dialog(v-model="dialog", persistent, width="800")
        v-btn(slot="activator", :color="color", outline, @click="triggerFB").text-capitalize.quicksand.font-weight-bold {{ msg }}
        v-card
            v-toolbar(color="mblack", light)
                v-toolbar-title.quicksand.text-capitalize Crear Cuenta
                v-spacer
                v-btn(flat, icon, @click="dialog = false")
                    v-icon close

        v-card.pa-4
            //- div(v-if="!oAuth")
                div Crea tu cuenta con:
                v-btn(color="blue darken-2", @click="loginFacebook", block)
                    v-icon.mr-2.white--text fab fa-facebook
                    div.white--text Facebook
                v-btn(color="yellow darken-2", @click="loginGoogle", block)
                    v-icon.mr-2.white--text fab fa-google
                    div.white--text Google
                v-alert(type="info", :value="true", outline) Con este metodo no tendrás que acordarte de ninguna contraseña
            //- v-alert(v-if="oAuth", type="info", :value="true", outline) Se ha iniciado sesión correctamente
            v-form.mt-3
                b Nombre y apellidos
                v-text-field(label="Nombre y apellidos", v-model="displayName", outline)
                b Email
                v-text-field(label="Email", type="email", :rules="[rules.required, rules.email]", v-model="email", outline)
                v-text-field(label="Verificar email", type="email", :rules="[rules.required, rules.verifyEmail]", v-model="emailVerify", outline)
                div(v-if="!oAuth")
                    b Contraseña
                    v-text-field(label="Contraseña", v-model="password", :rules="[rules.required, rules.length]", type="password", outline)
                    v-text-field(label="Repite la contraseña", type="password", v-model="passwordVerify", :rules="[rules.verifyPass]", outline)
                b Telefono de Contacto
                v-text-field(label="Telefono", v-model="phone", mask="### ### ###", outline)
                a(href="/conditions", target="_blank", rel="noopener noreferrer") Política de privacidad y términos de uso
                v-checkbox(label="He leído y acepto la política de privacidad y los términos de uso", v-model="conditions")
                v-alert(type="error", :value="email != emailVerify") Los emails no coinciden
                v-alert(type="error", :value="password != passwordVerify") Las contraseñas no coinciden
                v-alert(type="error", :value="email.length != 0 && emailExists") {{(notFormat) ? "Dirección de correo no válido" : "Ya existe este email" }}
            v-btn(:disabled="stepOneDisabled || emailExists", block, color="primary", @click="createAccount", :loading="loading") Crear cuenta

            //- v-alert(:value="added", type="info") Te avisaremos cuando lo tengamos listo 
            //- v-alert.mt-0(:value="!added", type="warning") Debido a la alta demanda hemos tenido que pausar las nuevas suscripciones a Mouo. Déjanos tu email y te avisaremos cuando volvamos a estar disponibles
            //- .pa-4
                v-form
                    v-text-field(v-model="displayName", :rules="[rules.required]",label="Nombre y apellidos", outline)
                    v-text-field(v-model="email", :rules="[rules.required, rules.email]", label="Correo Electrónico", outline)
                    v-text-field(v-model="birth", mask="####", label="Año de nacimiento (opcional)", outline)
                    v-text-field(v-model="city", label="Ciudad (Opcional)", outline)
                    div.quicksand Cuentanos algo más sobre ti, tus aficiones, tus gustos, tus hobbies... (Opcional)
                    v-textarea(v-model="more", label="Escríbenos sobre ti", outline)
                    v-layout.mb-4(column, align-center)
                        div.quicksand ¿Tienes alguna duda o consulta que nos quieras contar? 
                        div.quicksand Pulsa <a class="font-weight-bold" href="mailto:contacto@mouo.es?&subject=Consulta&body=Muy%20buenas!%0A%0AQuer%C3%ADa%20haceros%20la%20siguiente%20consulta%3A%20%0A">AQUÍ</a> para mandarnos un mail y te contestaremos lo antes posible
                    v-alert(type="info", :value="!added") Nos gustaría saber de ti para crear el mejor servicio posible para nuestros futuros clientes, los datos son opcionales, pero nos encantaria escucharlos
                    v-alert(:value="added", type="info") Te avisaremos cuando lo tengamos listo
                    v-btn(:disabled="disabled", :loading="loading", block, outline, color="black", @click="addInterest").quicksand.font-weight-bold Avisame
                    v-dialog(width="500", v-model="message")
                        v-card(flat)
                            v-subheader.quicksand Mouo
                            v-layout.pa-4(column, align-center)
                                .quicksand(style="font-size: 2.5em") ¡Gracias!
                                .quicksand(style="font-size: 1.5em") Te avisaremos cuando esté listo

</template>

<script>

// import { Card, createToken } from 'vue-stripe-elements-plus'
// import { create, destroy } from 'vue-stripe-elements-plus'

import axios from 'axios'
var card
var stripe

export default {

  data () {
    return {
        complete: false,
        conditions: false,
        notFormat: false,
        sameEmail: true,
        stripeOptions: {
            style: {
                base: {
                    color: '#303238',
                    fontSize: '16px',
                    color: "#32325d",
                    fontSmoothing: 'antialiased',
                    '::placeholder': {
                    color: '#ccc',
                    },
                }
            }
        },
        dialog: false,
        message: false,
        loading: false,
        email: '',
        emailVerify: '',
        emailExists: true,
        displayName: '',
        phone: '',
        more: '',
        customerInfo: '',
        direction: '',
        cardName: '',
        cp: '',
        oAuth: false,
        password: '',
        passwordVerify: '',
        province: '',
        city: '',
        sizes: ['XS','S','M','L','XL'],
        shirt: -1,
        shirtConverted: '',
        pants: -1,
        pantsConverted: '',
        birth: '',
        directionList: {},
        cardInfo: {},
        paymentError: false,
        paymentSuccess: false,
        lodaing: false,
        rules: {
            required: value => !!value || 'Este campo no puede estar vacío',
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Correo invalido' 
            },
            verifyEmail: value => {
                return this.email == this.emailVerify || 'Los emails no coinciden'
            },
            verifyPass: value => {
                return this.password == this.passwordVerify || 'Las contraseñas no coinciden'
            },
            length: value => value.length >= 8 || 'La contraseña debe tener mínimo 8 carácteres'
        },

      added: false
    }
  },

//   components: { Card },

  props: ['color', 'theme', 'msg'],

  methods: {

    getSize(value) {
        switch (value) {
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
            default: 
                return 'NONE'
                break;
        }   
    },

    createAccount() {

        fbq('track', 'NewUser', {
            content_name: 'Users'
        });
        FB.AppEvents.logEvent("NewUser")
        ga('send', 'event', 'Registro', 'Registrado', 'Landing Page');

        const date = new Date()

        var user = {
            displayName: this.displayName,
            email: this.email,
            phone: this.phone,
            oAuth: this.oAuth,
            password: this.password,
            phone: this.phone,
            // size: this.size,
            payday: 0,
            rentDate: null,
            active: false,
            rentActive: false,
            customerInfo: this.customerInfo,
            logs: [{
                text: 'El usuario se ha registrado',
                date
            }],
            createdAt: date,
            bought: [],
            rentList: [],
            paymentList: [],
            directionList: [],
            actualList: [],
            nextList: [],
            temporalList: []

        }


        if (!user.oAuth) {
            this.$store.dispatch('signupPassword', {
                email: user.email,
                password: user.password
            })
        }

        this.$store.dispatch('register', user)
    },

    loginGoogle() {
        this.$store.dispatch('loginGoogle').then((result) => {
            this.displayName = result.user.displayName
            this.email = result.user.email
            this.oAuth = true
            
        })
    },

    loginFacebook() {
        this.$store.dispatch('loginFacebook').then((result) => {
            this.displayName = result.user.displayName
            this.email = result.user.email
            this.oAuth = true
        })
    },

    loginTwitter() {

    },

    triggerFB() {
        FB.AppEvents.logEvent("Signup Popup")
        fbq('trackCustom', 'Popup Abierto')
        ga('send', 'event', 'Registro', 'Accedido', 'Landing Page');
    },

    addInterest () {
    fbq('track', 'CompleteRegistration', {
        content_name: 'Waiting List'
    });
    FB.AppEvents.logEvent("Registered")
    ga('send', 'event', 'Registro', 'Registrado', 'Landing Page');

      if (!this.email && !this.username) return
      this.loading = true
      this.message = true

      this.$store.dispatch('addInterested', {
        email: this.email,
        username: this.displayName,
        birth: this.birth,
        city: this.city,
        more: this.more
      }).then(() => {
        this.loading = false
        this.added = true

        setTimeout(() => {
            this.dialog = false
        }, 5000)
      })
    }
  },

  watch: {

      email(value) {
        this.email = value
        var self = this
        self.notFormat = false
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (pattern.test(value)) {
            this.$store.dispatch('checkemail', value).then(result => {
                self.emailExists = result
            })
        }

        else {
            self.emailExists = true
            self.notFormat = true
        }
      },

      emailVerify(value) {
          this.emailVerify = value
          if (this.email != value) {
              this.sameEmail = false
          }
          else {
              this.sameEmail = true
          }
      }
  },

  computed: {
    disabled () {
      return !(this.email && this.displayName)
    },

    stepOneDisabled() {

        if (this.displayName && this.email && this.phone)
        {
            if (this.oAuth) {
                return (!this.conditions)
            }

            else if (this.password) {
                if (this.password == this.passwordVerify && this.email == this.emailVerify) {
                    if (this.password.length >= 8)
                        return (!this.conditions)
                }
            }
        }

        return true
        
    },

    stepThreeDisabled() {
        return !(this.direction && this.cp && this.city && this.province)
    },

    lastStepDisabled() {
        return false
    }
  }
}
</script>




