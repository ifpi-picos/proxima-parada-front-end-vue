<template>
    <v-container>
        <v-row dense>
            <v-col v-for="(item, i) in items" :key="i" cols="3">
                <v-card :color="item.color" dark>
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-card-title class="text-h5" v-text="item.bairro"></v-card-title>

                            <v-card-subtitle v-text="item.driver"></v-card-subtitle>

                            <v-card-actions>
                                <v-btn class="ml-2 mt-5" outlined rounded small>
                                    Conversar com o motorista
                                </v-btn>
                            </v-card-actions>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data: () => ({
        items: [
            {
                color: '#a8a8a8',
                src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
                bairro: 'Centro',
                driver: 'Afonso',
            },{
                color: '#a8a8a8',
                src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
                bairro: 'Pantanal',
                driver: 'Roberto',
            },{
                color: '#a8a8a8',
                src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
                bairro: 'Balao',
                driver: 'CArlos',
            },{
                color: '#a8a8a8',
                src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
                bairro: 'Morrinhos',
                driver: 'Amanda',
            },{
                color: '#a8a8a8',
                src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
                bairro: 'Catavento',
                driver: 'Maria',
            },{
                color: '#a8a8a8',
                src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
                bairro: 'Cohab',
                driver: 'Pedro',
            },
        ],
    }),
}
</script>
<style>
.border {
    border: 2px solid red;
}

.v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
}
</style>