import React from 'react';
import { useState, useEffect } from 'react';
import { View, 
         Text, 
         StyleSheet, 
         StatusBar, 
         SafeAreaView, 
         TouchableOpacity, 
         Image, 
         Modal,
         ScrollView } from 'react-native';

import { useNavigation } from "@react-navigation/native"
import axios from 'axios';
import config from "../../../config/config.json"

import Ionicons from '@expo/vector-icons/Ionicons';

let renderCounter = 0;

export default function Home(){

    const navigation = useNavigation();
    

    const [openMenu, setOpenMenu] = useState(false)
    const [customer, setCustomer] = useState([])

    useEffect(() =>{
        const focus = navigation.addListener('focus', () =>{
            listCustomer();
            console.log('Deu CErto essa poha')
        })
        return focus    
    },[navigation])

    async function listCustomer() {
        try{
            const reqs = await axios.get(config.urlRootPhp+'PROJETOS/grafica-print/customer.php');
            console.log(reqs)
            if(reqs.data.sucess == true){
                setCustomer(reqs.data.result)
            } else {
                setCustomer([])
            }
        } catch(err) {
            console.log(err)
        }
        
        
    }

    async function infoCustomer(idCustomer, nameCustomer, addressCustomer, contactCustomer){
        navigation.navigate("Debts", {id: idCustomer, name: nameCustomer, address: addressCustomer, contact:contactCustomer})
    }

    function toggleMenu(){
        if(openMenu == false){
            setOpenMenu(true);
        } else {
            setOpenMenu(false)
        }
    }

    console.log({render:renderCounter++})


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
                            <TouchableOpacity style={styles.btnMenu}>
                            <Ionicons name="home-sharp" size={24} color="#1C1D21" />
                                <Text style={styles.btnMenuText}>Home</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnMenu} onPress={() => navigation.navigate('Customer')}>
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
                <TouchableOpacity onPress={() => toggleMenu()}>
                    <Ionicons name="menu" size={40} color="#F98402"/>
                </TouchableOpacity>
             <Image style={styles.logo} source={require('../../assets/logo.png')}/>
            </View>

            <Text style={styles.title}>MEUS CLIENTES</Text>

            <ScrollView>
                <View style={styles.body}>
                    
                    {customer.length != 0 ? customer.map(item =>(
                        <View style={styles.bodyBox} key={item.id}>
                        <Text style={styles.bodyText}>{item.name}</Text>
                        <TouchableOpacity style={styles.bodyButton}  onPress={() => infoCustomer(item.id, item.name, item.address, item.contact)}>
                        <Ionicons name="folder-open-sharp" size={24} color="black" />
                        </TouchableOpacity>
                        </View>
                    )):<View style={styles.message}>
                    <Ionicons name="alert-circle-sharp" size={24} color="#F98402"/>
                    <Text style={styles.messageText}>Nenhum cliente cadastrado!</Text>
                  </View>}

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#1C1D21',
        padding:5
    },

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