/* IMPORTAÇÕES DA PÁGINA */
import React from "react";
import { useState } from 'react';
import { View, StyleSheet, StatusBar, Text, Image, Keyboard, TextInput, TouchableOpacity} from 'react-native';

import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';

import config from "../../../config/config.json";
import axios from 'axios';

/* COMPONENTE SIGNIN */
export default function SingIn(){
 
    const navigation = useNavigation();

    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);
    const [message, setMessage] = useState(null);

    /* FUNÇÃO DE LOGIN */
    async function doLogin() {

      /* VERIFICAÇÃO SE OS CAMPOS ESTÃO PREENCHIDOS */
      if(login == null || password == null || login == '' || password == ''){
        /* CASO OS CAMPOS ESTEJAM VAZIOS, ENTÃO RETORNARÁ A MENSAGEM PARA PREENCHE-LOS */
        setMessage('Preencha Todos os campos')
        setTimeout(()=>{
          setMessage(null)
        }, 3000)
      }
      else {
        /* CASO PREENCHIDOS, SERÃO ENVIADOS AS CREDENCIAIS DE LOGIN PARA O BACKEND */

        try {
          /* CHAMANDO A API */
          const reqs = await axios.get(config.urlRootPhp+'PROJETOS/grafica-print/login.php?login='+login+'&password='+password)

          let ress = reqs.data.sucess;
  
          Keyboard.dismiss();
          
          /* VERIFICAÇÃO DOS DADOS RETORNADOS PELA API */
          if(ress == true){
            /* SE AS CREDENCIAIS ESTIVEREM CERTAS, O USUÁRIO SERÁ DIRECIONADO PARA DENTRO DO SISTEMA */
            navigation.navigate('Home')
          }else{
            /* SE AS CREDENCIAIS ESTIVEREM ERRADAS, RETORNARÁ PRA QUE O USUÁRIO INFORME-AS CORRETAMENTE */
            setMessage('Credenciais Inválidas!')
            setTimeout(()=>{
              setMessage(null)
            }, 3000)
          } 
          
        } catch (error) {
          console.log(error)
        }
      
      }
    }

    return(
      /* VIEW PRINCIPAL DA PÁGINA */
      <View style={styles.container}>
        <StatusBar 
            backgroundColor={'#1C1D21'} 
            barStyle={'light-content'} 
        />
        {/* LOGO DA EMPRESA */}
        <Image style={styles.logo} source={require('../../assets/logo.png')}/>

        {/* CAMPO DE LOGIN */}
        <TextInput style={styles.login} placeholder='Login'  placeholderTextColor="#6B6967" onChangeText={(login) => setLogin(login)} />

        {/* CAMPO DE SENHA */}
        <TextInput style={styles.password} placeholder='Senha' secureTextEntry={true} placeholderTextColor="#6B6967" onChangeText={(password) => setPassword(password)} />

        {/* BOTÃO PARA ENVIO DAS CREDENCIAIS */}
        <TouchableOpacity style={styles.submit} onPress={doLogin}>
          <Text style={styles.submitText}>Entrar</Text>
        </TouchableOpacity>

      {/* LOCAL QUE RETORNA AS MENSAGENS INFORMATIVAS DA PÁGINA DE SIGNIN */}
        {message && (
            <View style={styles.message}>
              <Ionicons name="alert-circle-sharp" size={24} color="#F98402"/>
              <Text style={styles.messageText}>{message}</Text>
            </View>
        )}

    </View>
  )

}

const styles = StyleSheet.create({
  // ESTILO DA VIEW PRINCIAL
  container:{
    flex:1,
    backgroundColor: '#1C1D21',
    justifyContent:  'center',
    alignItems: 'center'
  },
  logo:{
    width:200,
    height:114,
    marginTop: -80,
  },
  login:{
    fontSize:25, 
    marginTop:40,
    padding: 9,
    paddingLeft: 20,
    height:50,
    width:350,
    textAlignVertical: 'top',
    borderWidth: 1.5,
    borderColor: '#F98402',
    color: "#F98402",
    borderRadius:5
  },
  password:{
    fontSize:25, 
    marginTop:30,
    padding: 9,
    paddingLeft: 20,
    height:50,
    width:350,
    textAlignVertical: 'top',
    borderWidth: 1.5,
    borderColor: '#F98402',
    color: "#F98402",
    borderRadius:5,
    
  },
  submit:{
    justifyContent:  'center',
    alignItems: 'center', 
    marginTop:30,
    padding: 9,
    height:50,
    width:350,
    textAlignVertical: 'top',
    backgroundColor: "#F98402",
    borderRadius:5
  },
  submitText:{
    fontSize:25, 
    fontWeight: 'bold'
  }, 
  message:{
    flexDirection:"row",
    gap:10,
    justifyContent:  'center',
    alignItems: 'center',
    marginTop:30,
    borderWidth:1,
    borderColor: "#F98402",
    padding:10,
    paddingLeft:15,
    paddingRight:15,
    borderRadius:5
  },
  messageText:{
    color:"#F98402",
    fontWeight: 'bold'
  }
}) 