import React from "react";
import { useState } from 'react';
import { View, StyleSheet, StatusBar, Text, Image, Keyboard, TextInput, TouchableOpacity} from 'react-native';
import config from "../../../config/config.json"
import { useNavigation } from "@react-navigation/native"
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SingIn(){

    const navigation = useNavigation();

    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);
    const [message, setMessage] = useState(null);

    //Fazer Login
    async function doLogin() {

      if(login == null || password == null || login == '' || password == ''){
        setMessage('Preencha Todos os campos')
        setTimeout(()=>{
          setMessage(null)
        }, 3000)
      }
      else {
        let reqs = await fetch(config.urlRootPhp+'PROJETOS/grafica-print/Controller.php',{
          method: 'POST',
              headers:{
                  'Accept':'application/json',
                  'Content-Type':'application/json'
              },
              body: JSON.stringify({
                  loginAdmin: login,
                  passwordAdmin: password
              })
        });
  
        let ress = await reqs.json();
  
        Keyboard.dismiss();
  
        
  
        if(ress){
          navigation.navigate('Home')
        }else{
          setMessage('Credenciais Inválidas!')
          setTimeout(()=>{
            setMessage(null)
          }, 3000)
        } 
      }
    }

    return(
      <View style={styles.container}>
        <StatusBar 
            backgroundColor={'#1C1D21'} 
            barStyle={'light-content'} 
        />

        <Image style={styles.logo} source={require('../../assets/logo.png')}/>
        
        <TextInput style={styles.login} placeholder='Login'  placeholderTextColor="#6B6967" onChangeText={(login) => setLogin(login)} />

        <TextInput style={styles.password} placeholder='Senha' secureTextEntry={true} placeholderTextColor="#6B6967" onChangeText={(password) => setPassword(password)} />

        <TouchableOpacity style={styles.submit} onPress={doLogin}>
          <Text style={styles.submitText}>Entrar</Text>
        </TouchableOpacity>

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