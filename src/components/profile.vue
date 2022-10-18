<template>
    <v-card>
        <v-card-text>
            <v-form @submit.prevent="createUser">

                <v-text-field prepend-icon="perm_identity" name="name" label="Nome Completo" type="text"
                    v-model="userData.name">
                </v-text-field>

                <v-text-field prepend-icon="perm_device_information" name="phone_number" label="Número de Whatsapp"
                    type="number" v-model="userData.phone_number">
                </v-text-field>


                <v-text-field prepend-icon="work_outline" name="occupation" label="Ocupação no IFPI" type="text"
                    v-model="userData.occupation">
                </v-text-field>

                <v-text-field prepend-icon="mail_outline" name="email" label="E-mail" type="text"
                    v-model="userData.email">
                </v-text-field>

                <v-text-field prepend-icon="perm_identity" name="name" label="Cidade" type="text"
                    v-model="userData.name">
                </v-text-field>

                <v-text-field prepend-icon="perm_identity" name="name" label="Bairro" type="text"
                    v-model="userData.name">
                </v-text-field>

                <v-text-field prepend-icon="password" name="password" label="Senha" type="password"
                    v-model="userData.password">
                </v-text-field>

                <v-text-field prepend-icon="password" name="password-confirm" label="Comfirmar senha" type="password">
                    
                </v-text-field>
                <v-btn block color="primary" elevation="6" type="submit">Cadastre-se</v-btn>
            </v-form>
        </v-card-text>
      
    </v-card>
</template>

<script>
import User from "../services/users"
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
            }
        }
    },
    methods: {
        createUser() {
            User.create(this.userData).then(res => {
                console.log(res);
            })
        }
    }
}
</script>