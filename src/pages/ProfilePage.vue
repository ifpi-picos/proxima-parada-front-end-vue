<template>
    <v-container id="user-profile" fluid tag="section">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <base-material-card>
            <v-col cols="12" md="4">
                <v-img
                    class="card-profile"
                    max-height="150"
                    max-width="150" src="../assets/stite.jpg">
                
                </v-img>
                <h6 class="display-1 mb-1 grey--text">{{nomeUsuario}}</h6>
            </v-col>

            <v-form>
              <v-container class="py-0">
                <v-row>
               
                  <v-col cols="12" md="6" >
                    <v-text-field  label="Nome completo" class="purple-input"  />
                  </v-col>
  
                  <v-col cols="12" md="6">
                    <v-text-field label="Email" class="purple-input" />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field label="Endereço" class="purple-input" />
                  </v-col>
  
                  <v-col cols="12" md="4">
                    <v-text-field label="Cidade" class="purple-input" />
                  </v-col>
  
                  <v-col cols="12" md="4">
                    <v-text-field label="Bairro" class="purple-input" />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field label="Senha Atual" class="purple-input" type="password" />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field label="Nova Senha" class="purple-input" type="password" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field label="Confirmar Nova Senha" class="purple-input" type="password" />
                  </v-col>
    
                </v-row>
                <v-row cols="12" class="text-right" >
                  <v-col cols="12" class="text-right">
                    <v-btn color="blue" class="mr-0"> Editar Perfil </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </base-material-card>
        </v-col>
  
       

      </v-row>
    </v-container>
  </template>
  
<script>
  export default {
    //justify-content: center
    data(){
        return{
            nomeUsuario:"Edivan Dos Santos"
        }
       
    }
  };
</script>
<style>
  .card-profile {
    border-radius: 50%;
  }
</style>
  
