<template>
    <v-card>
        <v-card-text>
            <v-alert :value="erroAlert" color="red" elevation="3" outlined type="warning">{{messageError}}</v-alert>
            <v-progress-linear :active="loading" :indeterminate="loading" absolute top height="6">
            </v-progress-linear>
            <v-form @submit.prevent="signup" v-model="valid">
                <v-text-field prepend-icon="perm_identity" name="name" label="Nome Completo" type="text"
                    :rules="[rules.required]" password v-model="userData.name">
                </v-text-field>
                <v-text-field prepend-icon="work_outline" name="occupation" label="Ocupação no IFPI" type="text"
                    :rules="[rules.required]" v-model="userData.occupation">
                </v-text-field>
                <v-text-field prepend-icon="perm_device_information" name="phone_number" label="Número de Whatsapp"
                    :rules="[rules.required]" type="phone" v-model="userData.phone_number">
                </v-text-field>
                <v-text-field prepend-icon="mail_outline" name="email" label="E-mail" type="text"
                    :rules="[rules.required, rules.email]" v-model="userData.email">
                </v-text-field>
                <v-text-field prepend-icon="password" name="password" label="Senha"
                    :rules="[rules.required, rules.min ]" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" v-model="userData.password">
                </v-text-field>
                <v-text-field prepend-icon="password" name="password_confirm" label="Comfirmar senha"
                    :rules="[rules.required, rules.min, rules.matchPassword]"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2" v-model="password_confirm">
                </v-text-field>
                <v-btn :disabled="!valid" block color="primary" elevation="6" type="submit">Cadastrar</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>
<script>
import Auth from "../services/auth"
export default {
    name: "SignUp",
    data() {
        return {
            userData: {
                name: "",
                occupation: "",
                phone_number: "",
                email: "",
                password: ""
            },
            password_confirm: "",
            messageError: "",
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
                matchPassword: () => this.userData.password === this.password_confirm || `Senhas diferentes`,
            }
        }
    },
    methods: {
        async auth() {
            this.loading = true
            try {
                const res = await Auth.signin(this.userData)
                if (res.status == 200) {
                    this.loading = false
                    this.$router.push({ name: 'HomeView', query: { usuario: res.data['name'] } })
                }
            } catch (error) {
                const response = error.response
                this.loading = false
                this.erroAlert = true
                this.messageError = response.data.message
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