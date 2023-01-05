<template lang="pug">
    v-dialog(v-model="dialog", width="800")
        v-btn.text-capitalize(slot="activator", flat, :color="color", :theme="theme", :msg="msg").quicksand Iniciar Sesion
        v-card
            v-alert(:value="loginError", type="error") El usuario no existe
            v-alert(type="info", :value="messageSended") Se ha mandado un mail para cambiar la contraseña
            v-subheader {{(forgot) ? 'Recuperar Contraseña': 'Iniciar Sesión'}}
            v-form.pa-4
                v-text-field(label="Correo electrónico", v-model="email")
                v-text-field(v-if="!forgot", label="Contraseña", v-model="password", type="password")
                v-alert(type="error", :value="passError") El email o la contraseña no son correctos
                v-btn(v-if="!forgot", outline, color="mblack", block, @click="loginPassword").quicksand.font-weight-bold Iniciar Sesion
                v-btn(v-if="forgot", outline, color="mblack", block, @click="forgotPassword").quicksand.font-weight-bold Recuperar Contraseña
                a(v-if="!forgot", @click="forgot = true") <u>He olvidado la contraseña</u>
                a(v-if="forgot", @click="forgot = false") <u>Ya recuerdo la contraseña</u>
                //- v-divider.my-4
                //- v-btn(light, block, @click="loginGoogle", color="yellow darken-1", style="background-color:white;")
                //-     img.mr-2(src="../assets/images/GoogleLogo.png", height="25px", style="background-color: white; border-radius: 4px;")
                //-     div.quicksand.font-weight-bold Iniciar con Google
                //- v-btn(dark, block, color="blue darken-3", @click="loginFacebook")
                //-     img.mr-2(src="../assets/images/facebookLogo.png", height="20px")
                //-     div.quicksand.font-weight-bold Iniciar con Facebook


</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            loginError: false,
            forgot: false,
            email: '',
            password: '',
            messageSended: false
        }
    },

    props: ['color', 'theme', 'msg'],

    computed: {
        passError() {
            return this.$store.state.passError
        }
    },

    methods: {

        setLoginError() {
            this.loginError = true

            setTimeout(() => {
                this.loginError = false
            }, 5000)
        },
        
        login() {
            this.$store.dispatch('login').then(() => {
                this.setLoginError()
            })
        },

        loginPassword() {
            this.$store.dispatch('loginPassword', {
                email: this.email,
                password: this.password
            }).catch(() => {
                this.setLoginError()
            })
        },

        loginGoogle() {
            // this.$store.dispatch('authGoogle').then((result) => {
            //     if (!result) this.setLoginError()
            // })

            this.$store.dispatch('loginGoogle')
        },

        loginFacebook() {
            this.$store.dispatch('loginFacebook')
        },

        forgotPassword() {
            this.$store.dispatch('checkemail', this.email).then(result => {
                if (result) {
                    this.$store.dispatch('forgotPassword', this.email).then((result) => {
                        this.messageSended = result
                        setTimeout(function() {
                            this.messageSended = false
                        }, 5000)
                    })
                }

                else {
                    this.setLoginError()
                }

            })
        }
    }
}
</script>
