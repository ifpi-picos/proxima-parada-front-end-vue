<template>

    <v-card>

        <v-card-text>
            <div class="imagem">
                <v-img src="../../src/assets/stite.jpg" class="img" />
            </div>
            <!-- <v-alert :value="erroAlert" color="red" elevation="3" outlined type="warning">{{messageError}}</v-alert>
            <v-progress-linear :active="loading" :indeterminate="loading" absolute top height="6">
            </v-progress-linear> -->

            <v-form @submit.prevent="auht" v-model="valid">

                <v-text-field prepend-icon="perm_identity" name="name" label="Nome Completo" type="text"
                    :rules="[rules.required]" password v-model="userData.name">
                </v-text-field>

                <v-text-field prepend-icon="perm_device_information" name="phone_number" label="Número de Whatsapp"
                    :rules="[rules.required]" v-mask="'(##) # ####-####'" type="phone" v-model="userData.phone_number">
                </v-text-field>

                <v-select prepend-icon="work_outline" name="occupation" label="Ocupação no IFPI" :items="items"
                    v-model="userData.occupation" :rules="[rules.required]">
                </v-select>

                <v-text-field prepend-icon="mail_outline" name="email" label="E-mail" type="text"
                    :rules="[rules.required, rules.email]" v-model="userData.email">
                </v-text-field>

                <v-text-field prepend-icon="home" name="text" label="Nome da Cidade">
                </v-text-field>

                <v-text-field prepend-icon="home" label="Bairro" type="text">
                </v-text-field>

                <v-text-field prepend-icon="password" name="password" label="Senha"
                    :rules="[rules.required, rules.min ]" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" v-model="userData.password">

                </v-text-field>

                <v-text-field prepend-icon="password" name="password_confirm" label="Comfirmar senha"
                    :rules="[rules.required, rules.min, rules.matchPassword]"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2" v-model="userData.samePasswords">
                </v-text-field>
                <br>
                <!-- 
                <v-btn :disabled="!valid" block color="primary" elevation="6" type="submit">Salvar Alterações</v-btn>
                <br>

                <v-btn :disabled="!valid" block color="primary" elevation="6" type="submit">Cancelar Alterações</v-btn>
                 -->
                <v-row>
                    <v-btn depressed color="primary" type="submit" width="100vw" font-size="45px">Salvar</v-btn>
                </v-row>
                <br>
                <br>

                <v-row>
                    <v-btn depressed color="primary" type="submit" width="100vw">Cancelar</v-btn>
                </v-row>

            </v-form>

        </v-card-text>
    </v-card>
</template>
<script>
import Auth from "../services/auth"

export default {
    name: "ProfileEscreen",
    data() {
        return {
            items: ['Aluno(a)', 'Professor(a)', 'Outro(a)'],
            userData: {
                name: "",
                occupation: "",
                phone_number: "",
                email: "",
                password: "",
                samePasswords: "",
            },
            messageError: "Erro ao conetar-se a internet!",
            loading: false,
            erroAlert: false,
            show1: false,
            show2: false,
            valid: false,
            rules: {
                required: value => !!value || 'Obrigatório.',
                min: value => value.length >= 6 || 'Mínimo 6 caracteres',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'E-mail inválido.'
                },
                matchPassword: () => this.userData.password === this.userData.samePasswords || `Senhas diferentes`,
            }
        }
    },
    methods: {
        async auht() {
            this.loading = true
            try {
                const res = await Auth.signup(this.userData)
                if (res.status == 200) {
                    this.loading = false
                    this.$router.push({ name: 'HomeView', query: { usuario: res.data['name'] } })
                }
            } catch (error) {
                const response = error.response
                this.loading = false
                this.erroAlert = true
                if (response.data.message) {
                    this.messageError = response.data.message
                }
                console.log(response.data)
            }
        }
    },
    watch: {
        erroAlert(val) {
            if (!val) return
            setTimeout(() => (this.erroAlert = false), 3000)
        }
    },
}
</script>

<style scoped>
.img {
    border-radius: 50%;
    border: 2px solid rgba(0, 0, 0, 0.575);
    width: 150px;
    display: block;
    margin-left: auto;
    margin-right: auto;

}
</style>