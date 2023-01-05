<template lang="pug">
    #faq
        v-card.pa-4.mb-3.elevation-3
            v-layout(justify-center)
                h1.quicksand ¿Cómo funciona Mouo?
            .mb-2.quicksand.font-weight-bold 1. Regístrate como usuario e introduce la información que se te solicita
            .mb-2.quicksand.font-weight-bold 2. Indica la dirección de envío/recogida
            .mb-2.quicksand.font-weight-bold 3. Indica el método de pago
            .mb-2.quicksand.font-weight-bold 4. Échale un vistazo a las prendas y añade a la cesta las 3 que más te gusten
            .mb-2.quicksand.font-weight-bold 5. Finalmente haz click en "INICIA TU PEDIDO MENSUAL"
            .mb-2.quicksand.font-weight-bold 6. Entrega: Tu set de prendas será entregada por correos express
            .mb-2.quicksand.font-weight-bold 7. Desde el momento de la entrefa, tienes 24 horas para notificar t solicitar un cambio de talla, de producto o en caso de que tenga algún desperfecto en las prendas o el pedido
            .mb-2.quicksand.font-weight-bold 8. Devuelve y Renueva: al final de cada mes (en tu fecha de fin de alquiler), podrás decirnos que prendas te quedas (quieres alargar su alquiler), y cuales devuelves a Mouo. No te preocupes de la limpiesa de las prendas, nosotros nos encargamos de ello.
            .mb-2.quicksand.font-weight-bold 9. Devuélvelo: Las devoluciones son gratuitas. Coloca tus prendas en el paquete en el que se te enviaron las prendas. En el caso de que no se utilice el paquete de devolución enviado por MOUO y el set de prendas llegue a nuestras manos con algún tipo de daño debido a la elección de un envoltorio o paquete inadecuado, el usuario se hará responsable de los daños ocasionados y aceptará en todo caso que “MOUO” le cobre el precio por la reparación o reemplazo del producto por uno nuevo. En definitiva, como si finalmente comprases la prenda/as en cuestión.
            .mb-4.quicksand.font-weight-bold 10. Cerrado el paquete, nosotros nos encargamos de recoger el pedido en tu casa, limpiar las prendas y prepararlas para su próxima cliente.
            .quicksand.font-weight-bold Y… Recuerda que puedes cancelar la subscripción de MOUO siempre que quieras y en cualquier momento
        v-card
            v-toolbar(color="mblack", dark)
                v-toolbar-title.quicksand Preguntas frecuentes
            v-expansion-panel
                v-expansion-panel-content(v-for="question in questions", :key="question.question")
                    div(slot="header").quicksand.font-weight-bold {{ question.question }}
                    v-card
                        v-card-text {{ question.answer }}
</template>

<script>
export default {
    data() {
        return {
            questions: [
            {
                question: '¿Por qué usar Mouo?',
                answer: 'Porque te permite variar de prendas cada mes y de este modo nunca te aburrirás de la ropa que hay en tu armario.'
            },
            {
                question: '¿Cuántas prendas/accesorios recibiré cada mes?',
                answer: 'Con Mouo podrás disfrutar de 3 prendas o accesorios cada mes.'
            },
            {
                question: '¿Qué ocurre si una de las prendas no me queda bien?',
                answer: 'Si alguna de las prendas que has recibido no te queda bien, no te preocupes, dispondrás de 24 horas para avisarnos y pedirnos una nueva talla.'
            },
            {
                question: '¿Qué ocurre si se estropea la ropa?',
                answer: 'En el momento de la suscripción, se tomará una fianza de 50€ por si la ropa se estopea, una vez cancelada la suscripción, si toda la ropa llega en buen estado, se devolverá la totalidad de la fianza. Cualquier problema que haya con el estado de la ropa, será informado y resuelto por mail.'
            },
            {
                question: '¿Cuánto cuesta ser parte de Mouo?',
                answer: 'Mouo tiene un coste mensual de 59€ al mes.'
            },
            {
                question: '¿Tengo que limpiar las prendas?',
                answer: '¡No te preocupes por esto! Nosotros nos encargamos de la limpieza y dejarla a punto para su próximo usuario. No obstante, cuando la ropa este en tu posesión, si deseas limpiarla no habría ningún problema siempre y cuando sigas las instrucciones de su etiqueta.'
            },
            {
                question: '¿Qué es el consumo sostenible de ropa?',
                answer: 'En Mouo trabajamos para reducir el impacto medioambiental, tratando de sacar el máximo partido a las prendas y alargando la vida de las mismas.'
            },
            {
                question: '¿Qué pasa si no me va la talla?',
                answer: 'No está permitido realizar modificaciones en las prendas, ¡pero no te preocupes!, en Mouo tenemos soluciones para todo, tienes 24 horas para probarte la prenda y de no ser tu talla cambiarla por la talla que desees.'
            },
            {
                question: '¿Cuál es el estado de las prendas?',
                answer: 'Nos encargamos de revisar con detalle cada prenda, en Mouo nuestra prioridad es que la prenda esté siempre en perfecto estado. Si tu prenda no está en las mejores condiciones no dudes en contactarnos y procederemos a enviar otra que no tenga ningún desperfecto.'
            },
            {
                question: '¿Puedo renovar el período de Subscripción de los productos de MOUO?',
                answer: 'Sí, cuando termine el período de alquiler de MOUO recibirás un aviso para que nos digas con que productos quieres continuar, o que prendas nuevas quieres seleccionar para el próximo mes.'
            },
            {
                question: '¿Me puedo arreglar las prendas?',
                answer: `La modificación o arreglo de una prenda hecha por el usuario, se considera como un daño por un uso inapropiado (daños no cubiertos por el Seguro de Daños). En este caso, MOUO te cobrará el importe estimado del valor de compra del producto modificado. Una vez cobrado este importe, el producto dañado pasará a ser de tu propiedad y se te hará llegar, en el caso de que esté en manos de MOUO. 
                Como usuario, debes recordar que en el momento en el que alquilas, autorizas expresamente a MOUO a descontar los gastos adicionales detallados en este apartado para realizar el cargo correspondiente en su tarjeta de crédito.`
            },
            {
                question: '¿Tengo que llevar las prendas a la tintorería antes de devolverlas?',
                answer: 'No, tú solo tienes que disfrutar de tus prendas y nosotros nos ocupamos del resto.'
            },
            {
                question: '¿Qué pasa si accidentalmente mancho o daño una prenda?',
                answer: 'Sabemos de primera mano que esto puede pasar y por ello si este evento ocurre Mouo estimará el valor de los daños y te los descontará de la fianza.'
            },
            ]
        }
    }
}
</script>

