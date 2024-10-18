import React from "react";
import { View, StyleSheet, StatusBar, Text, Image, TextInput, TouchableOpacity} from 'react-native';

import { useNavigation } from "@react-navigation/native"

export default function SingIn(){

    const navigation = useNavigation();

    return(
        <View style={styles.container}>
      <StatusBar 
          backgroundColor={'#1C1D21'} 
          barStyle={'light-content'} 
      />

      <Image style={styles.logo} source={require('../../assets/logo.png')}/>
      
      <TextInput style={styles.login} placeholder='Login'  placeholderTextColor="#6B6967"/>

      <TextInput style={styles.password} placeholder='Senha' placeholderTextColor="#6B6967"/>

      <TouchableOpacity style={styles.submit} onPress={ () => navigation.navigate('Home')}>
        <Text style={styles.submitText}>Entrar</Text>
      </TouchableOpacity>

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
  }
}) 