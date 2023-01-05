<template lang="pug">
    #Home
        v-layout.hide-scroll.pt-1.pb-3.px-4(v-if="!$vuetify.breakpoint.mdAndUp", justify-space-between)
            v-layout.mx-1(column, align-center)
                div(style="border-radius: 50%; width: 60px; height: 60px; background-color: #1c1c1c")
                .quicksand(style="font-size: .8em") Novedades
            v-layout.mx-1(column, align-center)
                div(style="border-radius: 50%; width: 60px; height: 60px; background-color: #1c1c1c")
                .quicksand(style="font-size: .8em") Novedades
            v-layout.mx-1(column, align-center)
                div(style="border-radius: 50%; width: 60px; height: 60px; background-color: #1c1c1c")
                .quicksand(style="font-size: .8em") Novedades
            v-layout.mx-1(column, align-center)
                div(style="border-radius: 50%; width: 60px; height: 60px; background-color: #1c1c1c")
                .quicksand(style="font-size: .8em") Novedades
            v-layout.mx-1(column, align-center)
                div(style="border-radius: 50%; width: 60px; height: 60px; background-color: #1c1c1c")
                .quicksand(style="font-size: .8em") Novedades
        div
            div(style="position: relative; background-color: #fafafa; height: 500px")
                v-layout(style="position: absolute; right: -80px; top: 0px;")
                    img(src="../assets/images/portada1.png", style="height: 500px; width: 350px")
                    img.ml-3.desktop(src="../assets/images/portada2.png", style="height: 500px; width: 350px")
                div(style="position: absolute; top: 20vh; left: 60px")
                    p.playfair(style="font-size: 3em; color: #1c1c1c; width: 80%;") Actualiza tu armario cada mes.
                    .quicksand.gray--text.mt-3 3 prendas cada mes por 59€
                    v-layout.mt-3(align-center)
                        v-btn.quicksand.font-weight-bold.text-capitalize(color="mblack", large, dark, style="font-size: .8em", @click="$router.push({path: '/closet'})") Ver catálogo
                        login
            div.mb-4
                v-layout(column, align-center).mt-5
                    h2.playfair.font-weight-bold(style="font-size: 2em; color: #1c1c1c;") Imagina tener cualquier prenda
                    i.playfair(style="color: #1c1c1c;") Sin tener que comprarla
                v-layout.px-5(wrap, justify-center)
                    v-flex(xs6, md3)    
                        v-layout.pa-2.my-4(column, align-center)
                            .quicksand(style="font-size: 3em") 1
                            .quicksand.font-weight-bold Ventaja 1
                            p.quicksand.font-weight-light.gray--text Descripción de la ventaja 1
                    v-flex(xs6, md3)    
                        v-layout.pa-2.my-4(column, align-center)
                            .quicksand(style="font-size: 3em") 2
                            .quicksand.font-weight-bold Ventaja 2
                            p.quicksand.font-weight-light.gray--text Descripción de la ventaja 2
                    v-flex(xs6, md3)    
                        v-layout.pa-2.my-4(column, align-center)
                            .quicksand(style="font-size: 3em") 3
                            .quicksand.font-weight-bold Ventaja 3
                            p.quicksand.font-weight-light.gray--text Descripción de la ventaja 3
                    v-flex(xs6, md3)    
                        v-layout.pa-2.my-4(column, align-center)
                            .quicksand(style="font-size: 3em") 4
                            .quicksand.font-weight-bold Ventaja 4
                            p.quicksand.font-weight-light.gray--text Descripción de la ventaja 4
            hr.mx-5
            div.mb-4
                v-layout(column, align-center).mt-5
                    h2.playfair.font-weight-bold(style="font-size: 2em; color: #1c1c1c;") Como Funciona
                    i.playfair(style="color: #1c1c1c;") Tres Simples Pasos
                v-layout.px-5.my-3(justify-center, wrap)
                    v-flex(xs12, md3, style="width: 240px").mx-4.mb-5
                        v-layout(column, align-center)
                            img(src="../assets/images/descripcion1.png")
                            div(style="background-color: #a0a0a0; ")
                            h3.quicksand.mt-2(style="font-weight: bolder; font-size: 1.5em") Elige tu pedido
                            .quicksand Escoge tus 3 prendas y disfrutalas durante un mes.
                    v-flex(xs12, md3, style="width: 240px").mx-4.mb-5
                        v-layout(column, align-center)
                            img(src="../assets/images/descripcion2.png")
                            h3.quicksand.mt-2(style="font-weight: bolder; font-size: 1.5em") Elige tu pedido
                            .quicksand Escoge tus 3 prendas y disfrutalas durante un mes.
                    v-flex(xs12, md3, style="width: 240px").mx-4.mb-5
                        v-layout(column, align-center)
                            img(src="../assets/images/descripcion3.png")
                            h3.quicksand.mt-2(style="font-weight: bolder; font-size: 1.5em") Elige tu pedido
                            .quicksand Escoge tus 3 prendas y disfrutalas durante un mes.
            
            v-layout.pa-5.mt-4.mb-5(justify-space-between, wrap, style="background-color: #fafafa;")
                v-flex(xs12, md5).mb-5
                    div.mt-4.mx-5
                        .playfair(style="font-size: 2em") La revolución de la moda <br>ya está aquí
                        p.quicksand.mt-3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        v-btn.mt-3.quicksand.font-weight-bold(color="mblack", flat, style="border-bottom: 2px solid #1c1c1c") Saber más
                        hr.mt-5(style="border: 1px solid #C0C0C0")
                        v-layout.mt-5(justify-start)
                            img(src="../assets/images/LogoMobileBlack.png", style="width: 80px")
                v-flex(xs12, md5)
                    v-card(style="border-top: 4px solid #1c1c1c;", :style="($vuetify.breakpoint.mdAndUp) ? 'width: 60%' : ''")
                        v-layout.pa-3(justify-center)
                            .playfair.font-weight-bold Plan Mensual
                        hr(style="border: 1px solid #C0C0C0")
                        v-layout.pa-3(justify-center)
                            .playfair.font-weight-bold(style="font-size: 2em") 59€/mes
                        hr(style="border: 1px solid #e0e0e0")
                        v-layout.pa-2.px-4(justify-center).pt-4
                            v-icon(small) check
                            .quicksand.ml-2 Prendas por un valor de hasta 600€
                        v-layout.pa-2.px-4(justify-center)
                            v-icon(small) check
                            .quicksand.ml-2 Usa tus prendas todo el tiempo que quieras
                        v-layout.pa-2.px-4(justify-center)
                            v-icon(small) check
                            .quicksand.ml-2 Compra tus prendas favoritas
                        v-layout.pa-2.px-4(justify-center)
                            v-icon(small) check
                            .quicksand.ml-2 Puedes utilizarlo meses sueltos
                        v-layout.pa-2.px-4(justify-center)
                            v-icon(small) check
                            .quicksand.ml-2 Cambia las prendas que quieras cada mes
                        v-layout.pa-2.px-4(justify-center)
                            v-icon(small) check
                            .quicksand.ml-2 Envío y devoluciones gratuitas
                        v-btn.quicksand(color="mblack", large, block, dark, style="font-size: .8em") Ver catálogo
            
            div.mb-5
                v-layout(justify-center)
                    .playfair(style="font-size: 2em") Recién llegado
                v-layout.mt-3(justify-center, wrap)
                    v-flex(v-for="i in 4", :key="i", xs-6, md-3)
                        v-card.ma-2.mx-4(flat)
                            //- v-img(:src="", style="width: 100%")
                            div(style="height: 300px; background-color: #c0c0c0")
                            v-card-title(primary-title).pt-3
                                v-layout(column, align-center)
                                    i.quicksand Titulo
                                    h3.quicksand(style="font-weight: bolder; font-size: 1.5em") Nombre de marca
                                    v-layout
                                        .quicksand.font-weight-bold 59€
                                        .quicksand.font-weight-bold.grey--text &nbsp| 600€ valor
                v-layout(justify-center)
                    v-btn.mt-3.quicksand.font-weight-bold(color="mblack", flat, style="border-bottom: 2px solid #1c1c1c") Ver más
                
            v-layout(justify-center)
                v-card.mb-5.pa-5(color="mblack", dark)
                    v-layout(column, align-center)
                        .playfair.mb-3(style="font-size: 2em") ¿Tienes alguna duda?
                        .quicksand Consulta las <a href="/faq" style="color: white">preguntas más frecuentes</a> donde están contestadas las dudas más comunes
                        .quicksand También puedes mandar un correo a <a href="mailto:contacto@mouo.es" style="color: white">contacto@mouo.es</a> o a través de instagram
                        v-layout.mt-3(justify-center)
                            v-btn(flat) Preguntas frecuentes
                            v-btn(flat) Envíar correo


                
                    
            //- v-card
                v-layout(row, wrap)
                    v-card(:width="width")
                        v-parallax.portada(src="https://firebasestorage.googleapis.com/v0/b/mouo-app.appspot.com/o/portada.jpg?alt=media&token=99117b6d-c8b8-4d25-b7d5-e8cb501763dd", alt="Imagen de portada de mouo")
                            v-layout(fill-height, align-center, justify-center)
                                .black-background.pa-4
                                    v-layout(column, align-center, justify-center)
                                        div.quicksand.font-weight-thin.align-center(style="font-size:2.5em;") Tu Armario Infinito
                                        div.body-2 3 Prendas <u>premium</u> diferentes cada mes, ¡Las que tu quieras!
                                        i.quicksand.mt-3(style="font-size: 1.5em") Por 59€/mes
                                        div.quicksand Prendas por un valor de <strong>250€</strong>
                                        v-layout.mt-4.buttons
                                            signup(color="white", theme="dark", msg="Registrate")
                                            login(color="white", theme="dark", msg="Iniciar Sesión")
            //- v-card
                v-layout(row, wrap)
                    v-card(:width="width")
                        v-img(src="https://firebasestorage.googleapis.com/v0/b/mouo-app.appspot.com/o/registerImage.jpg?alt=media&token=14aa7be6-69cf-4f18-b4ed-c91c664164bf", height="250px", alt="Imagen de registro de mouo")
                            v-layout(fill-height, align-center, justify-center)
                                .black-background.pa-4(style="width:100%;")
                                    v-layout(column, align-center, justify-center)
                                        div.quicksand.white--text.font-weight-thin(style="font-size:2em") ELIGE
                                        div.body-2.white--text Escoge las prendas premium que más te gusten de la gran variedad de ellas que encontrarás en nuestra plataforma.
                    v-card(:width="width")
                        v-img(src="https://firebasestorage.googleapis.com/v0/b/mouo-app.appspot.com/o/openImage.jpg?alt=media&token=600e7bc8-ae2e-47ae-ae60-ff80377cadb9", height="250px", alt="Imagen de disfrutar las prendas de mouo")
                            v-layout(fill-height, align-center, justify-center)
                                .white-background.pa-4(style="width:100%;")
                                    v-layout(column, align-center, justify-center)
                                        div.quicksand.black--text.font-weight-thin(style="font-size:2em") DISFRUTA
                                        div.body-2.black--text Antes de que te des cuenta las tendrás en tu casa y podrás disfrutarlas durante un mes entero
                    v-card(:width="width")
                        v-img(src="https://firebasestorage.googleapis.com/v0/b/mouo-app.appspot.com/o/selectImage.jpg?alt=media&token=ab5a41a1-4ce1-4e5a-bff3-ca9b9302a891", height="250px", alt="Imagen de seleccionar prendas de mouo")
                            v-layout(fill-height, align-center, justify-center)
                                .black-background.pa-4(style="width:100%;")
                                    v-layout(column, align-center, justify-center)
                                        div.quicksand.white--text.font-weight-thin(style="font-size:2em") REPITE
                                        div.body-2.white--text Devuelve a final de mes las prendas que quieras y disfruta tus siguientes prendas 🌴
            //- v-card.mt-3(color="mblack", dark)
                v-layout.pa-4.py-5(column, align-center)
                    h2.align-center.quicksand 🌴¿Qué es mouo?🌴
                    div.subheading.align-center.mt-3 Mouo es el Netflix de la ropa. Un armario ilimitado de prendas premium con el cual nunca más tendrás que repetir conjunto ni gastarte una cantidad desorbitada en ropa que no evoluciona con tus gustos. Selecciona las 3 prendas o accesorios que más te gusten, los recibirás en tu casa antes de que te des cuenta, disfrútalas durante un mes y vuelve a seleccionar tu set de prendas para el siguiente mes.

                v-card.pa-4(light)
                    v-layout.mb-3
                        v-icon.mr-3(color="mblack", large) laptop
                        div <strong>Regístrate</strong> en mouo y empieza a disfrutar de tu suscripción.
                    v-layout.mb-3
                        v-icon.mr-3(color="mblack", large) check_circle
                        div <strong>Selecciona</strong> los 3 productos que más te gusten de entre todas nuestras prendas, bolsos y accesorios.
                    v-layout.mb-3
                        v-icon.mr-3(color="mblack", large) card_giftcard
                        div <strong>Tic-tac Tic-tac</strong> En un plazo de 5 días recibirás tu pedido en la puerta de tu casa y si algo no te convence no te preocupes porque… ¡tienes 24 horas para pedirnos un cambio!
                    v-layout
                        v-icon.mr-3(color="mblack", large) loop
                        div <strong>Devuelve y renueva tu armario:</strong> Al final de cada mes te mandaremos una notificación para que elijas tus nuevos productos. Dinos que prendas te gustaría quedarte un mes más y cuales quieres devolver a Mouo.
            //- v-card(flat, color="mblack", dark).pa-4.mt-3
                v-layout(align-center, column)
                    h1.quicksand.white--text ¿Qué incluye la suscripción?
                    v-layout
                        v-icon(small) check
                        div.ml-2.quicksand Prendas por un valor de hasta 250€
                    v-layout
                        v-icon(small) check
                        div.ml-2.quicksand Usa tus prendas todo el tiempo que quieras
                    v-layout
                        v-icon(small) check
                        div.ml-2.quicksand Puedes utilizarlo meses sueltos, ¡Sin ningún tipo de compromiso!
                    v-layout
                        v-icon(small) check
                        div.ml-2.quicksand Cambia las prendas que quieras cada mes
                    v-layout
                        v-icon(small) check
                        div.ml-2.quicksand Envío y devoluciones gratuitas
            //- v-card(flat, color="mblack").py-4.my-3
                v-layout(column, align-center)
                    .quicksand.white--text(style="font-size:2em") NUESTRAS PRENDAS
            //- v-card(flat)
                no-ssr
                    masonry(:cols="{default: 8, 1000: 4, 500: 2}", :gutter="5")   
                        v-lazy-image.pointer(v-for="clothing in clothes", :key="clothing.id", @click.native="$router.push({ path: '/closet/' + clothing.id })", :src="clothing.Image", style="width: 100%;", :alt="clothing.Title")
            
            //- v-card(color="mblack", dark, height="200px")
                v-layout.py-5(column, align-center)
                    b.quicksand(style="font-weight: bold;") DESCUBRE TODAS NUESTRAS PRENDAS
                    v-btn(color="white", light, large, @click="$router.push({ path: '/closet' })") Ir a Ropa
            //- v-card.pa-4.mt-3
                .quicksand.mb-3(style="font-size:1.8em").mb-3 ¿Tienes alguna duda más?
                div Si tienes alguna duda o incidencia, consulta nuestras <a href="/faq">preguntas frecuentes</a> o contacta con nosotros en <a href="mailto:contacto@mouo.es">contacto@mouo.es</a> y te contestaremos enseguida!

        //- div(v-else)
            v-card.mt-3(color="mblack", dark).pa-5
                v-layout(column, align-center)
                    div.headline.font-weight-bold.align-center Servicio no disponible
                    div.quicksand.align-center Ahora mismo no tenemos más plazas disponibles, te mandaremos un email cuando volvamos a tener.
                    div.quicksand.align-center.mt-3 Sentimos las molestias
                    div.quicksand Pulsa <a class="font-weight-bold; color: white" href="mailto:contacto@mouo.es?&subject=Consulta&body=Muy%20buenas!%0A%0AQuer%C3%ADa%20haceros%20la%20siguiente%20consulta%3A%20%0A">AQUÍ</a> para mandarnos un mail y te contestaremos lo antes posible


        //- div(v-else)
            v-card.pa-4.mb-3(color="mblack", dark)
                v-layout(align-center, column)
                    .quicksand(style="font-size:1.8em") Bienvenida a Mouo
                    div Recuerda que para poder realizar tu pedido, tienes que añadir una dirección y un método de pago, al final de esta página encontrarás la opción que te permitirá hacerlo.
                    div.mt-3 Añade facilmente tus tres prendas
                    v-btn(block, outline, @click="$router.push({path: '/closet'})", color="white") Ir a Ropa
                    div.mt-3 Una vez decidas las 3 prendas que te acompañarán el próximo mes, inicia tu suscripción y tomaremos una <strong>fianza de 50 euros</strong> que se devolverá en el momento en el que se cancele la suscripción.
                    v-layout
                        v-dialog(width="500", :disabled="sameLists")
                            v-btn(slot="activator", color="teal", block, :disabled="sameLists", light, @click="updateSuscription") {{ this.user.active ? 'Cambia la ropa para el próximo mes' : 'Inicia tu pedido mensual' }}
                            v-card(flat)
                                v-subheader.quicksand Mouo
                                v-layout.pa-4(column, align-center)
                                    .quicksand(style="font-size: 2.5em") Suscripción actualizada
                                    .quicksand(style="font-size: 1.5em") Las prendas para el próximo mes han sido actualizadas
            v-card.pa-4
                .quicksand.mb-3(style="font-size:1.8em").mb-3 ¿Tienes alguna duda?
                div Si tienes alguna duda o incidencia, consulta nuestras <a href="/faq">preguntas frecuentes</a> o contacta con nosotros en <a href="mailto:contacto@mouo.es">contacto@mouo.es</a> y te contestaremos enseguida!
            v-card.pa-4.mt-3
                .quicksand(style="font-size:1.8em").mb-3 Información de cuenta
                v-layout
                    v-avatar.mr-3(color="teal", style="height: 64px; width: 64px")
                        span.white--text.headline {{ user.displayName.charAt(0) }}
                    div
                        v-layout(align-end, wrap)
                            .quicksand(style="font-size:1.2em") Nombre:
                            .font-weight-bold.ml-2 {{ user.displayName }}
                        v-layout(align-end, wrap)
                            .quicksand(style="font-size:1.2em") Email:
                            .font-weight-bold.ml-2 {{ user.email }}
                        v-layout(column, align-start)
                            .quicksand(style="font-size:1.2em") Próximo Cambio:
                            .font-weight-bold {{ getNextDate }}

            v-card.mt-3(v-if="user.actualList.length != 0")
                v-toolbar(color="mblack", dark)
                    v-toolbar-title.ps Tus prendas actuales
                v-list
                    div#scroll
                    v-list-tile(v-for="clothing in user.actualList", :key="clothing.id")
                        v-list-tile-avatar
                            img(:src="clothing.Image")
                        v-list-tile-content
                            v-list-tile-title {{ clothing.Title }}
                            v-list-tile-sub-title {{ clothing.Brand }}
                        //- v-list-tile-action
                            v-dialog(v-if="clothing.Price != 0", width="500")
                                v-btn.pa-2(slot="activator", color="mblack", dark).quicksand
                                    div Comprar
                                    i.ml-2.text-weight-bold {{ clothing.Price }}€
                                v-card
                                    v-card-title.quicksand(style="font-size: 1.6em") Comprando
                                    v-layout.pa-3
                                        v-avatar(size="120px")
                                            img(:src="clothing.Image")
                                        div.ml-3
                                            div.quicksand(style="font-size: 1.3em") {{ clothing.Title }}
                                            div {{ clothing.Brand }}
                                            .headline.font-weight-bold {{ clothing.Price }}€
                                    v-alert.ma-3(type="info", :value="true", outline) Una vez comprado, no te pediremos su devolución, ¡Será todo tuyo!
                                    v-btn(block, color="mblack", dark, @click="buyClothing(clothing)") Comprar

            v-card.mt-3
                v-toolbar(color="mblack", dark)
                    v-toolbar-title.ps Prendas para el próximo mes
                v-list
                    v-list-tile(v-for="(clothing, index) in user.temporalList", :key="index")
                        v-list-tile-avatar
                            img(:src="clothing.Image")
                        v-list-tile-content
                            v-list-tile-title {{ clothing.Title }}
                            v-list-tile-sub-title {{ clothing.Brand }} - Talla {{ clothing.Size }}
                        v-list-tile-action
                            v-btn(flat, icon, @click="removeClothing(index)")
                                v-icon close
                v-layout.pa-2(align-center, row, wrap)
                    v-btn(v-if="user.temporalList.length != 0", color="red", small, @click="restoreList", dark).quicksand Restaurar lista
                    v-btn(color="blue", dark, @click="$router.push({path: '/closet'})") VER ROPA
                    v-layout(align-center)
                        div.ml-3(style="font-size:1.5em").quicksand.font-weight-bold Precio: {{ (user.temporalList.length != 0) ? 59 : 0 }} €/mes 
                        v-subheader.ml-0.font-weight-bold {{ (!user.active && serviceActive) ? '+ 50€ de fianza' : '' }}
                div.pa-3
                    v-alert(type="warning", outline, :value="(user.paymentList.length == 0 || user.directionList.length == 0) && serviceActive") Para actualizar, debes tener una dirección y un método de pago seleccionado
                    v-alert(type="warning", outline, :value="user.temporalList.length != 3  && serviceActive") Debes tener 3 prendas para realizar tu pedido
                    v-alert(type="error", :value="!serviceActive") Actualmente el servicio no está disponible, te avisaremos cuando esté funcionando.
                    v-dialog(v-model="updated", width="500", persistent, :disabled="sameLists")
                        v-btn(slot="activator", color="teal", block, :disabled="sameLists", light, @click="updateSuscription") {{ this.user.active ? 'Cambia la ropa para el próximo mes' : 'Inicia tu pedido mensual' }}
                        v-card(flat)
                            v-subheader.quicksand Mouo
                            div.pa-4
                                v-layout(column, align-center)
                                    .quicksand(style="font-size: 2.5em") Pedido realizado con éxito
                                    .quicksand(style="font-size: 1.5em") Te mandaremos un mail de confirmación con la fecha de entrega

                                div.quicksand.mt-3 ¡Esperemos que te encante!
                                v-btn(block, color="mblack", dark, @click="updated = false") Cerrar
                    strong.green--text(v-if="user.active && user.actualList == 0") Tu pedido llegará a casa en los próximos días

                    //- v-dialog(width="500") //v-if="!user.active and sameLists",
                        v-btn(slot="activator", color="mblack", outline) Alquilar dias sueltos
                        v-card
                            v-layout(wrap)
                                v-date-picker(v-model="rentDate", locale="es-es", :first-day-of-week="1", header-color="mblack", color="teal", :min="today")
                                div.pa-3
                                    .quicksand(style="font-size:1.3em") Dias de alquiler: {{ rentDays }}
                                    .grey--text.mt-3 Precio por día: <strong> {{rentDayPrice | displayEuro}}€</strong>
                                    .grey--text.mt-1.mb-4 4,99€ Gastos de Envio
                                    strong(style="font-size: 1.8em") Total
                                    .quicksand.font-weight-bold(style="font-size: 1.5em") {{ rentPrice | displayEuro }}€
                                    v-btn(color="mblack", dark, style="position: absolute; bottom: 0px;", @click="rent") Alquilar
            //- v-card.pa-4.mt-3
                .quicksand(style="font-size:1.8em").mb-3 Tallas
                v-alert(type="info", :value="true", outline) La información de talla se utiliza para facilitar la busqueda de ropa disponible
                v-subheader.pl-0 Camiseta
                v-slider(:tick-labels="sizesLabels", v-model="sizes.shirt", :min="0", :max="4", step="1", tick-size="2", thumb-label="always", always-dirty)
                    template(slot="thumb-label", slot-scope="props")
                        span {{ getSize(sizes.shirt) }}
                v-subheader.pl-0 Pantalón y Falda
                v-slider(:tick-labels="sizesLabels", v-model="sizes.pants", :min="0", :max="4", step="1", tick-size="2", thumb-label="always", always-dirty)
                    template(slot="thumb-label", slot-scope="props")
                        span {{ getSize(sizes.pants) }}
                v-subheader.pl-0 Vestido
                v-slider(:tick-labels="sizesLabels", v-model="sizes.dress", :min="0", :max="4", step="1", tick-size="2", thumb-label="always", always-dirty)
                    template(slot="thumb-label", slot-scope="props")
                        span {{ getSize(sizes.dress) }}
                v-btn(outline, color="mblack", @click="setSize", :disabled="sameSizes") Actualizar tallas
                //- v-btn(v-if="user.actualList && user.active", outline, color="error") Solicitar devolución
            v-card.pa-4.mt-3
                .quicksand(style="font-size:1.8em").mb-3 Domicilios de entrega
                    v-list
                        v-list-tile(v-for="(direction, index) in user.directionList", :key="index", @click="selectDirection(direction.direction)")
                            v-list-tile-avatar
                                v-icon(color="mblack") fas fa-truck
                            v-list-tile-content
                                v-list-tile-title {{ direction.direction }}
                                v-list-tile-sub-title {{ direction.city }} - {{ direction.cp }} - {{ direction.province }}
                            v-list-tile-action
                                v-icon(v-if="direction.selected", large).green--text check_circle
                                v-btn(v-else, flat, icon, large, @click.stop="removeDirection(index)")
                                    v-icon close
                add-direction
           
            v-card.pa-4.mt-3
                .quicksand(style="font-size:1.8em").mb-3 Métodos de pago
                v-alert(type="error", :value="$store.state.paymentError") Ha habido un error

                v-list
                    v-list-tile(v-for="(payment, index) in user.paymentList", :key="index", @click="selectPayment(payment.token.id)")
                        v-list-tile-avatar
                            v-icon(color="mblack") fas fa-credit-card
                        v-list-tile-content
                            v-list-tile-title {{ payment.name }}
                        v-list-tile-action
                            v-icon(v-if="payment.selected", large).green--text check_circle
                            v-btn(v-else, flat, icon, large, @click.stop="removePayment(index)")
                                v-icon close
                add-payment
            
            v-card.pa-4.mt-3(v-if="user.active")
                .quicksand(style="font-size: 1.8em").mb-3 Cancelar suscripción
                v-alert(type="warning", outline, :value="true") Una vez cancelada la suscripción, el {{ getNextDate }} se iniciará el proceso para recoger las prendas que tengas actualmente, te devolveremos la fianza una vez se haga la devolución.
                v-alert(type="info", outline, :value="true") Podrás reactivar el servicio siempre que quieras, solo vuelve a escoger 3 prendas y actualiza el pedido
                v-btn(color="red", outline, block, :disabled="!user.active", @click="cancelSuscription") Cancelar suscripción
            v-dialog(width="500", v-model="cancellationCompleted")
                v-card(flat)
                    v-subheader.quicksand Mouo
                    v-layout.pa-4(column, align-center)
                        .quicksand(style="font-size: 2.5em") Cancelación completada
                        .quicksand(style="font-size: 1.5em") Cuando finalice la suscripción, un mensajero vendrá a recuperar las prendas y recibirás tu fianza
        v-dialog(width="500", persistent, v-model="user.email && !user.size")
            v-card.pa-3
                .quicksand(style="font-size: 1.5em") Tallas
                v-alert(type="info", outline, :value="true").my-3 Hola! Para comenzar déjanos algunos datos <u>aproximados</u> que nos permitirán ofrecerte una mejor experiencia.
                v-subheader.pl-0 Estatura
                v-slider(v-model="height", thumb-label="always", step="1", :min="80", :max="230")
                v-subheader.pl-0 Top
                v-select(v-model="shirt", :items="sizesLabels", label="Top", menu-props="offsetY")
                v-subheader.pl-0 Pantalón
                v-select(v-model="pants", :items="sizesLabels", label="Pantalón", menu-props="offsetY")
                v-subheader.pl-0 Vestido
                v-select(v-model="dress", :items="sizesLabels", label="Vestido", menu-props="offsetY")
                v-btn(block, color="mblack", dark, :loading="loading", @click="setSize") Aceptar
</template>

<script>
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'
import Card from '../components/Card.vue'
import AddPayment from '../components/AddPayment.vue'
import AddDirection from '../components/AddDirection.vue'
import db from '../db'
import NoSSR from 'vue-no-ssr'
import VLazyImage from 'v-lazy-image'

var card
var stripe

export default {

  data () {
    return {
      clothes: [],
      sizesLabels: ['XS', 'S', 'M', 'L', 'XL'],
      portadaImage: '',
        shirt: '',
        pants: '',
        dress: '',
        height: 150,
      rentDate: '',
      updated: false,
      rentDays: 0,
      rentPrice: '0',
      cancellationCompleted: false,
      width: this.$vuetify.breakpoint.mdAndUp ? '33.33333%' : '100%',
      sizes: {

      },
      today: '',
    }
  },

  computed: {
      user() {
        var user = this.$store.state.user
        if (!user) return {}

        if (user.email) {
            if (!this.sizes) {
                // this.sizes = user.size
                this.sizes = this.copy(user.size)
                
            } 
            return user
        }

        return {} 
      },

    loading() {
        return this.$store.state.loading
    },

    rentDayPrice() {
        if (this.user.temporalList.length <= 3) {
            return 3.2
        }

        else {
            return 1.07*this.user.temporalList.length
        }
    },

      serviceActive() {
          if (this.user.active) {
              return true
          }

          else {
            this.$store.dispatch('fetchServiceActive')
            return this.$store.state.serviceActive
          }
      },

    sameSizes() {
        return JSON.stringify(this.user.size) === JSON.stringify(this.sizes) 
    },

      sameLists() {
        if (this.user.temporalList.length != 3) return true
        if (this.user.directionList.length == 0 || this.user.paymentList.length == 0) return true
        if (this.user.temporalList.length !== this.user.nextList.length) return false;

        var temporalList = []
        var nextList = []
        let key

        for (key in this.user.temporalList) {
            temporalList[key] = this.user.temporalList[key]; // copies each property to the objCopy object
        }

        for (key in this.user.nextList) {
            nextList[key] = this.user.nextList[key]; // copies each property to the objCopy object
        }

        var arr1 = temporalList.sort((a,b) => {
            if (a.id < b.id) return -1
            else return 1
        });
        var arr2 = nextList.sort((a,b) => {
            if (a.id < b.id) return -1
            else return 1
        });

        for (var i = 0; i < arr1.length; i++) {

            if (arr1[i].id !== arr2[i].id)
                return false;

        }

        return true;
      },

      getNextDate() {
        var date = new Date
        const day = date.getUTCDate()
        var month = date.getMonth() + 1

        if (!this.user.active) {
            return 'No hay ninguna suscripcion activa'
        }

        if (day >= this.user.payday) {
            month += 1
        }

        var monthString

        switch(month) {
            case 1:
                monthString = 'Enero'
                break;
            case 2:
                monthString = 'Febrero'
                break;
            case 3:
                monthString = 'Marzo'
                break;
            case 4:
                monthString = 'Abril'
                break;
            case 5:
                monthString = 'Mayo'
                break;
            case 6:
                monthString = 'Junio'
                break;
            case 7:
                monthString = 'Julio'
                break;
            case 8:
                monthString = 'Agosto'
                break;
            case 9:
                monthString = 'Septiembre'
                break;
            case 10:
                monthString = 'Octubre'
                break;
            case 11:
                monthString = 'Noviembre'
                break;
            case 12:
                monthString = 'Diciembre'
                break;
        }

        return `${(this.user.payday + 5) % 30} de ${monthString}`
        

      }
  },

  filters: {
      displayEuro(value) {
          if (!value) return '0'
                    
          return value.toLocaleString("es-ES", {minimumFractionDigits: 2})
      }
  },

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
        }   
    },

    setSize() {
          var size = {
              shirt: this.shirt,
              pants: this.pants,
              dress: this.dress,
              height: this.height
          }

          this.$store.dispatch('setSize', size).then(() => {
            this.$store.commit('switchLoading', false)
          })
      },

    goToClothing (id) {
      this.$router.push({
        path: `/closet/${id}`
      })
    },

    copy(mainObj) {
        let objCopy = {}; // objCopy will store a copy of the mainObj
        let key;

        for (key in mainObj) {
            objCopy[key] = mainObj[key]; // copies each property to the objCopy object
        }
        return objCopy;
    },

    buyClothing(clothing) {
        this.$store.dispatch('buyClothing', clothing)
    },

    rent() {
        this.$store.dispatch('rent', {
            date: this.rentDate,
            amount: this.rentPrice
        })
    },

    selectDirection(direction) {
        this.$store.dispatch('selectDirection', direction)
    },

    selectPayment(payment) {
        this.$store.dispatch('selectPayment', payment)
    },

    removeClothing(index) {
        this.$store.dispatch('removeClothing', index)
    },

    removeDirection(index) {
        this.$store.dispatch('removeDirection', index)
    },

    removePayment(index) {
        this.$store.dispatch('removePayment', index)
    },

    restoreList() {
        this.$store.dispatch('restoreList')
    },

    updateSuscription() {
        this.$store.dispatch('updateSuscription')
    },

    cancelSuscription() {
        this.$store.dispatch('cancelSuscription').then(() => {
            this.cancellationCompleted = true
        })
    }
  },

  watch: {
      rentDate(value) {
            const mdx = value.split('-');
            const mdy = this.today.split('-');

            const rentDate = new Date(mdx[0], mdx[1]-1, mdx[2])
            const todayDate = new Date(mdy[0], mdy[1]-1, mdy[2])

            this.rentDays = Math.round((rentDate-todayDate)/(1000*60*60*24)) + 2
            this.rentPrice = (this.rentDays * 3.2 + 4.99)
      }
  },

  mounted() {
      console.log('TEST')
    window.scrollTo(0,0)
    ga('send', 'Home', location.pathname);

    const date = new Date()
    this.today = `${date.getFullYear()}-${date.getMonth()+1}-${('0' + (date.getDate() + 2)).slice(-2)}`
},

asyncData ({ params, error }) {
return db.collection('clothes').get()
    .then((snapshot) => {
        var closet = []
        snapshot.docs.forEach(doc => {
            closet.push(doc.data())
        })
        closet = closet.slice(0, 8)
        return { clothes: closet }
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'Post not found' })
    })
  },

  components: {
    Signup,
    Login,
    Card,
    AddPayment,
    AddDirection,
    'no-ssr': NoSSR,
    VLazyImage
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

    .white-background {
        background-color: white;
    }

    .black-background {
        background-color: #1c1c1c;
    }

    .imageInfo {
        position: absolute;
        top: 50%;
        left: 50%;
        color: black;
    }

    @media(max-width: 960px) {
        .portada {
            width: 100%;
        }
    }

    @media(min-width: 960px) {
        .portada {
            width: calc(100vw - 64px);
        }
    }


</style>

