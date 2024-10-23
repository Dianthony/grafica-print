import React from 'react';
import { useState } from 'react';
import { View, 
         Text, 
         StyleSheet, 
         StatusBar, 
         SafeAreaView, 
         TouchableOpacity, 
         Image, 
         Modal,
         TextInput } from 'react-native';

import { useNavigation } from "@react-navigation/native"

import Ionicons from '@expo/vector-icons/Ionicons';

export default function Customer(){

    const navigation = useNavigation();

    const [openMenu, setOpenMenu] = useState(false)

    return( 
        <View style={styles.container}>
            <StatusBar backgroundColor={'#1C1D21'} barStyle={'light-content'} />
            <Modal 
                animationType="slide"
                transparent={true} 
                visible={openMenu}>

                <SafeAreaView style={styles.modal}>

                    <View style={styles.menuContainer}>
                        <View style={styles.menuHeader}>
                            <Text style={styles.menuHeaderTitle}>Menu</Text>

                            <TouchableOpacity style={styles.btnMenuClose} onPress={() => setOpenMenu(false)}>
                                <Ionicons name="close" size={40} color="#1C1D21" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menuBody}>
                            <TouchableOpacity style={styles.btnMenu} onPress={() => navigation.navigate('Home')}>
                            <Ionicons name="home-sharp" size={24} color="#1C1D21" />
                                <Text style={styles.btnMenuText}>Home</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnMenu}>
                                <Ionicons name="person-add-sharp" size={24} color="#1C1D21" />                        
                                <Text style={styles.btnMenuText}>Cadastrar Cliente</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menuFooter}>
                            <TouchableOpacity style={styles.btnMenu} onPress={() => navigation.navigate('SignIn')}>
                            <Ionicons name="exit" size={24} color="#1C1D21" />
                            <Text style={styles.btnMenuText}>Sair</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.developedBy}>
                            <Text style={styles.developedByText}> Developed by Dianthony Alves</Text>
                        </View>
                    </View>

                </SafeAreaView>

            </Modal>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => setOpenMenu(true)}>
                    <Ionicons name="menu" size={40} color="#F98402"/>
                </TouchableOpacity>
             <Image style={styles.logo} source={require('../../assets/logo.png')}/>
            </View>

            <View style={styles.register}>
                <Text style={styles.title}>CADASTRAR CLIENTE</Text>

                <View style={styles.registerForm}>
                    <View style={styles.bodyForm}>
                        <View style={styles.form}>
                            <Text style={styles.formText} >Nome</Text>
                            <TextInput style={styles.formInput} placeholder='Nome do Cliente' placeholderTextColor="#6B6967"/>
                        </View>
                        <View style={styles.form}>
                            <Text style={styles.formText}>Endereço</Text>
                            <TextInput style={styles.formInput}  placeholder='Endereço do Cliente' placeholderTextColor="#6B6967"/>
                        </View>
                        <View style={styles.form}>
                            <Text style={styles.formText}>Contato</Text>
                            <TextInput style={styles.formInput} placeholder='(XX) X.XXXX-XXXX' placeholderTextColor="#6B6967"/>
                        </View>
                        <View style={styles.form}>
                            <TouchableOpacity style={styles.formBtnSave}>
                                <Ionicons name="save" size={24} color="#1C1D21"/><Text style={styles.formBtnSaveText}>Salvar Cliente</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#1C1D21',
        padding:5
    },

    //SCREEN MENU STYLE
    modal:{
        backgroundColor:'#00000099',
        height: '100%'
    },

    menuContainer:{
        backgroundColor:'#F98402',
        width:'70%',
        height:'100%',
        borderRadius:5,
        paddingLeft:10,
        paddingRight:10,
    },
    menuHeader:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:15,
        paddingLeft:10,
        paddingRight:10
    },
    menuHeaderTitle:{
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center'
    },
    menuBody:{
        paddingTop: 100,
        gap:5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnMenu:{
        flexDirection:"row",
        alignItems:'center',
        gap:10,
        paddingLeft:15,
        paddingRight:30,
        paddingBottom:5,
        paddingTop:5,
        width:'90%',
        marginTop:10,
        borderWidth:1,
        borderColor: '#1C1D21',
        borderRadius:5
    },
    btnMenuText:{
        fontSize:20,
        color:"#1C1D21",
        fontWeight: 'bold'
    },
    menuFooter:{
        marginTop: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    developedBy:{
        marginTop: 50,
        alignItems:'center'
    },
    developedByText:{
        color:'#7D4F1B'
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

    // SCREEN BODY STYLE
    title:{
        marginTop:30,
        fontSize:25,
        fontWeight:'bold',
        color:"#fff",
        textAlign:'center'
    },
    bodyForm:{
        gap:15,
        paddingLeft:20,
        paddingRight:20,
        marginTop:30
    },
    form:{
        gap:5
    },
    formText:{
        color:'#FFF',
        fontSize:20,
        fontWeight: 'bold'
    },
    formInput:{
        width:'100%',
        padding:5,
        paddingLeft:20,
        borderWidth:1,
        borderColor: "#F98402",
        borderRadius: 5,
        color:'#F98402',
        fontSize:20,
        fontWeight: 'bold'
    },
    formBtnSave:{
        marginTop:20,
        flexDirection:'row',
        justifyContent:'center',
        textAlign:'center',
        gap:10,
        backgroundColor:'#F98402',
        padding:5,
        borderRadius:5
    },
    formBtnSaveText:{
        fontSize:20, 
        fontWeight:'bold'
    },

})
