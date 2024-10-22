import React from 'react';
import { useState } from 'react';
import { View, 
         Text, 
         StyleSheet, 
         StatusBar, 
         TouchableOpacity, 
         Image, 
         ScrollView } from 'react-native';

import { useNavigation } from "@react-navigation/native"

import Ionicons from '@expo/vector-icons/Ionicons';

export default function Debits(){

    const navigation = useNavigation();

    return( 
        <View style={styles.container}>
            <StatusBar backgroundColor={'#1C1D21'} barStyle={'light-content'} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="arrow-back-sharp" size={40} color="#F98402"/>
                </TouchableOpacity>
             <Image style={styles.logo} source={require('../../assets/logo.png')}/>
            </View>
            <ScrollView>
                <View style={styles.body}>
                    <View style={styles.customer}>
                        <Text style={styles.customerName}>NOME DO CLIENTE</Text>
                        <TouchableOpacity style={styles.bodyButton}>
                            <Ionicons name="pencil-sharp" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.customerInfo}>
                        <Text style={styles.primaryText}>Endereço:</Text>
                        <Text style={styles.primaryText}>Contato: <Text style={styles.secondText}>(XX) X.XXXX-XXXX</Text></Text>
                        <Text style={styles.primaryText}>Débito Total: <Text style={styles.secondText}>R$ XXX,XX</Text></Text>
                    </View>
                    <Text style={styles.customerRegisterText}>REGISTROS</Text>
                    <View style={styles.customerActions}>
                        <TouchableOpacity style={styles.btnAction}>
                            <Ionicons name="remove-circle" size={24} color="black" />
                            <Text style={styles.btnActionText}>Apagar Registros</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnAction}>
                            <Ionicons name="create" size={24} color="black" />
                            <Text style={styles.btnActionText}>Novo Registro</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.register}>
                        <View style={styles.customerRegister}>
                            <Text style={styles.customerRegisterTitle}>Serviço 1</Text>
                            <View style={styles.customerRegisterActions}>
                                <TouchableOpacity style={styles.bodyButton}>
                                    <Ionicons name="trash-sharp" size={24} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.bodyButton}>
                                    <Ionicons name="pencil-sharp" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.customerRegisterInfo}>
                            <Text style={styles.primaryText}>Breve Descrição do Serviço</Text>
                            <Text style={styles.primaryText}>Valor: <Text style={styles.secondText}>R$ XXX,XX</Text></Text>
                            <Text style={styles.primaryText}>Data: <Text style={styles.secondText}>XX/XX/XXXX</Text></Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#1C1D21',
        padding:5
    },


    //SCREEN HEADER STYLE
    header:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:15,
        paddingLeft:10,
        paddingRight:10
    },
    logo:{
        width:150,
        height:86,
        display:'flex',
        marginLeft: 1,
    },


    //SCREEN DEBTS STYLES
    body:{
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:5,
        paddingTop:5,
        marginTop:10,
    },
    customer:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:30,
    },
    customerName:{
        fontSize:25,
        fontWeight:'bold',
        color:"#fff",
        textAlign:'center'
    },
    customerInfo:{
        marginLeft:5
    },
    primaryText:{
        color:"#fff",
        fontSize:15,
    },
    secondText:{
        color:"#F98402",
        fontWeight: 'bold'
    },
    bodyButton:{
        backgroundColor: "#F98402",
        width:35, 
        height:35,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
    },
    customerActions:{
        flexDirection:'row',
        justifyContent:'space-between',
        gap:5
    },
    btnAction:{
        backgroundColor: "#F98402",
        height:40,
        width:'45%',
        marginTop:30,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
    },
    btnActionText:{
        fontSize:15,
        fontWeight: 'bold'
    },    
    customerRegisterText:{
        color:"#fff",
        fontSize:20,
        fontWeight:'bold',
        marginTop:30,
    },
    register:{
        marginTop:30,
        borderWidth:1,
        borderColor: "#F98402",
        padding:10,
        paddingLeft:15,
        paddingRight:15,
        borderRadius:5
    },
    customerRegister:{
        paddingBottom:10,
        borderBottomWidth:1,
        borderBottomColor: "#F98402",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    customerRegisterTitle:{
        color:"#fff",
        fontSize:20,
        fontWeight:'bold',
    },
    customerRegisterActions:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:10
    },
    customerRegisterInfo:{
        paddingTop:10,
        gap:5
    }
})
