<template>
    <v-card>
        <v-card-text>
            <v-form>
                <v-text-field prepend-icon="perm_identity" name="name" label="Nome Completo" type="text">
                </v-text-field>
                <v-text-field prepend-icon="work_outline" name="occupation" label="Ocupação no IFPI" type="text">
                </v-text-field>
                <v-text-field prepend-icon="perm_device_information" name="phone" label="Número de Whatsapp"
                    type="phone">
                </v-text-field>
                <v-text-field prepend-icon="mail_outline" name="login" label="E-mail" type="text">
                </v-text-field>
                <v-text-field prepend-icon="password" name="password" label="Senha" type="password">
                </v-text-field>
                <v-text-field prepend-icon="password" name="password-confirm" label="Comfirmar senha" type="password">
                </v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn block color="primary" elevation="6">Cadastre-se</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    name: "SignUp",
    data() {
    },
}
</script>