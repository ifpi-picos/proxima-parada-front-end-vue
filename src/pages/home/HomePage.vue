<template>
    <v-container fluid >
        <v-row dense>
            <v-col v-for="(item, i) in items" :key="i" cols="12" sm="6" md="4" lg="3">
                <v-card  :color="item.color" dark>
                    <v-card-title class="text-h5" v-text="item.bairro"></v-card-title>
                    <v-card-subtitle v-text="item.driver"></v-card-subtitle>
                    <v-card-actions>
                        <v-btn outlined small>
                            Conversar com o motorista
                        </v-btn>
                    </v-card-actions>
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
            }, {
                color: '#a8a8a8',
                src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
                bairro: 'Pantanal',
                driver: 'Roberto',
            }, {
                color: '#a8a8a8',
                src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
                bairro: 'Balao',
                driver: 'CArlos',
            }, {
                color: '#a8a8a8',
                src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
                bairro: 'Morrinhos',
                driver: 'Amanda',
            }, {
                color: '#a8a8a8',
                src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
                bairro: 'Catavento',
                driver: 'Maria',
            }, {
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
    border: 1px solid red;
}

.container {
    min-width: 360px;
}
</style>