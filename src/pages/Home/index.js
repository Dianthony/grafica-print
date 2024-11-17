/* IMPORTAÇÕES DA PÁGINA */
import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';

import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';

import config from "../../../config/config.json";
import axios from 'axios';

/* COMPONENTE HOME */
export default function Home(){

    const navigation = useNavigation();
    
    const [openMenu, setOpenMenu] = useState(false)
    const [customer, setCustomer] = useState([])

    /* USEEFFECT QUE ATUALIZA A LISTA DE CLIENTES SEMPRE QUE A PAGINA RECEBE O EVENTO 'FOCUS' */
    useEffect(() =>{
        const focus = navigation.addListener('focus', () =>{
            listCustomer();
            setOpenMenu(false)
        })
        return focus    
    },[navigation])

    /* FUNÇÃO QUE FAZ A REQUISÃO À API PARA LISTAR OS CLIENTES CADASTRADOS NA EMPRESA */
    async function listCustomer() {
        try{
            /* CHAMANDO A API */
            const reqs = await axios.get(config.urlRootPhp+'PROJETOS/grafica-print/customer.php');
            
            if(reqs.data.sucess == true){
                /* SE A API RETORNAR ALGUM VALOR VERDADEIRO, ENTÃO O SETCOSTUMER, QUE É UM ARRAY VAZIO, SERÁ PREENCHIDO COM OS DADOS VINDOS DA API */
                setCustomer(reqs.data.result)
            } else {
                /* SE A API RETRONAR ALGUM VALOR FALSO, ENTÃO O SETCOSTUMER PERMANECERÁ COMO ARRAY VAZIO */
                setCustomer([])
            }
        } catch(err) {
            console.log(err)
        } 
    }

    /* FUNÇÃO QUE DIRECIONA O ADMIN PARA A PÁGINA DE DÉBITOS DO CLIENTE SELECIONADO, ENVIANDO SUAS INFORMAÇÕES PARA A PÁGINA REFERIDA */
    async function infoCustomer(idCustomer, nameCustomer, addressCustomer, contactCustomer){
        navigation.navigate("Debts", {id: idCustomer, name: nameCustomer, address: addressCustomer, contact:contactCustomer})
    }

    return( 
        /* VIEW PRINCIPAL DA PÁGINA */
        <View style={styles.container}>

            <StatusBar backgroundColor={'#1C1D21'} barStyle={'light-content'} />

            {/* MODAL DE MENU, INICIALMENTE ESCONDIDA POR OPENMENU(FALSE) E APRESENTADA QUANDO OPENMENU(TRUE) */}
            <Modal animationType="slide" transparent={true} visible={openMenu}>

                <SafeAreaView style={styles.modal}>
                    {/* VIEW CABEÇALHO MENU E BOTÃO DE FECHAR MENU */}
                    <View style={styles.menuContainer}>
                        <View style={styles.menuHeader}>
                            <Text style={styles.menuHeaderTitle}>Menu</Text>

                            <TouchableOpacity style={styles.btnMenuClose} onPress={() => setOpenMenu(false)}>
                                <Ionicons name="close" size={40} color="#1C1D21" />
                            </TouchableOpacity>
                        </View>
                        {/* VIEW DE CORPO DO MENU */}
                        <View style={styles.menuBody}>
                            {/* BOTÃO QUE REDIRECIONA PARA A PÁGINA HOME */}
                            <TouchableOpacity style={styles.btnMenu}>
                            <Ionicons name="home-sharp" size={24} color="#1C1D21" />
                                <Text style={styles.btnMenuText}>Home</Text>
                            </TouchableOpacity>
                            {/* BOTÃO QUE REDIRECIONA PARA A PÁGINA CUSTOMER */}
                            <TouchableOpacity style={styles.btnMenu} onPress={() => navigation.navigate('Customer')}>
                                <Ionicons name="person-add-sharp" size={24} color="#1C1D21" />                        
                                <Text style={styles.btnMenuText}>Cadastrar Cliente</Text>
                            </TouchableOpacity>
                        </View>
                        {/* BOTÃO DE LOGOUT QUE REDIRECIONA PARA A PÁGINA SIGNIN */}
                        <View style={styles.menuFooter}>
                            <TouchableOpacity style={styles.btnMenu} onPress={() => navigation.navigate('SignIn')}>
                            <Ionicons name="exit" size={24} color="#1C1D21" />
                            <Text style={styles.btnMenuText}>Sair</Text>
                            </TouchableOpacity>
                        </View>
                        {/* VIEW DESENVOLVEDOR*/}
                        <View style={styles.developedBy}>
                            <Text style={styles.developedByText}> Developed by Dianthony Alves</Text>
                        </View>
                    </View>

                </SafeAreaView>

            </Modal>

            {/* VIEW DE CABEÇALHO DA PÁGINA COM BOTÃO DE ABRIR MENU E LOGO DA EMPRESA */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setOpenMenu(true)}>
                    <Ionicons name="menu" size={40} color="#F98402"/>
                </TouchableOpacity>
             <Image style={styles.logo} source={require('../../assets/logo.png')}/>
            </View>

            {/* TÍTULO DA PÁGINA */}
            <Text style={styles.title}>MEUS CLIENTES</Text>

            <ScrollView>
                {/* VIEW BODY DA PÁGINA */}
                <View style={styles.body}>

                    {/* PREENCHIMENTO DA LISTA */}
                    {customer.length != 0 ? customer.map(item =>(
                        /* CASO A LISTA RETORNE ALGUM VALOR, SERÁ APRESENTADO A VIEW A BAIXO COM O BOTÃO QUE REDIRECIONA PARA A PÁGINA DE DÉBITO COM AS INFORMAÇÕES DO CLIENTE */
                        <View style={styles.bodyBox} key={item.id}>
                            <Text style={styles.bodyText}>{item.name}</Text>
                            <TouchableOpacity style={styles.bodyButton}  onPress={() => infoCustomer(item.id, item.name, item.address, item.contact)}>
                            <Ionicons name="folder-open-sharp" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    )):/* CASO A LISTA SEJA UM ARRAY VAZIO, APARECERÁ A MENSAGEM ABAIXO */
                    <View style={styles.message}>
                        <Ionicons name="alert-circle-sharp" size={24} color="#F98402"/>
                        <Text style={styles.messageText}>Nenhum cliente cadastrado!</Text>
                    </View>}

                </View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    // ESTILO DA PAGINA
    container:{
        flex:1,
        backgroundColor: '#1C1D21',
        padding:5
    },

    //ESTILO DA MODAL MENU
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

    //ESTILO DA VIEW DE CABEÇALHO
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

    //ESTILO DA VIEW DO BODY
    body:{
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        marginTop:30,
        fontSize:25,
        fontWeight:'bold',
        color:"#fff",
        textAlign:'center'
    },
    bodyBox:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:30,
        paddingRight:30,
        paddingBottom:5,
        paddingTop:5,
        width:'90%',
        marginTop:10,
        borderWidth:1,
        borderColor: '#F98402',
        borderRadius:5
    },
    bodyText:{
        fontSize:20,
        color:"#FFF",
    },
    bodyButton:{
        backgroundColor: "#F98402",
        width:35, 
        height:35,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
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