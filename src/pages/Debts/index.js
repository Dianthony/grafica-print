import React from 'react';
import { useState, useEffect } from 'react';
import { View, 
         Text, 
         StyleSheet, 
         StatusBar, 
         TouchableOpacity,
         Modal,
         SafeAreaView, 
         Image, 
         ScrollView,
         TextInput } from 'react-native';

import { useNavigation } from "@react-navigation/native"
import axios from 'axios';
import config from "../../../config/config.json"

import Ionicons from '@expo/vector-icons/Ionicons';

export default function Debts({route}){

    const navigation = useNavigation();

    const[message, setMessage] = useState();

    const [edit, setEdit] = useState(false);
    const [debt, setDebt] = useState(false);

    const [listDebt, setListDebt] = useState([])
    const [customer, setCustomer] = useState([])

    const [newName, setNewName] = useState(null)
    const [newAddress, setNewAddress] = useState(null)
    const [newContact, setNewContact] = useState(null)

    const [debtTitle, setDebtTitle] = useState(null)
    const [debtDesc, setDebtDesc] = useState(null)
    const [debtValue, setDebtValue] = useState(null)
    const [debtDate, setDebtDate] = useState(null)

    

    useEffect(() =>{
        saerchCustomer();
    },[])

    async function saerchCustomer() {
        try{
            const reqs = await axios.get(config.urlRootPhp+'PROJETOS/grafica-print/debts.php?id='+route.params.id);

            if(reqs.data.sucess == true){
                setListDebt(reqs.data.result)
            } else {
                setListDebt([])
            }
            
            setCustomer(reqs.data.customer)
        } catch (err) {
            console.log(err)
        }
        
    }

    async function updateCustomer() {
        try{
            const reqs = await axios.get(config.urlRootPhp+'PROJETOS/grafica-print/updatecustomer.php?id='+route.params.id+'&newname='+newName+'&newaddress='+newAddress+'&newcontact='+newContact);
            saerchCustomer();
            setEdit(false)

            let ress = await reqs;

            if(ress){
                setMessage('Alterado com sucesso!')
                setTimeout(()=>{
                    setMessage(null)
                }, 3000)
            }else{
            setMessage('Erro desconhecido')
            setTimeout(()=>{
                setMessage(null)
            }, 3000)
            }
        } catch (err) {
            console.log(err)
        }

    }

    async function deleteCustomer() {
        try{
            const reqs = await axios.get(config.urlRootPhp+'PROJETOS/grafica-print/deletecustomer.php?id='+route.params.id);
            navigation.navigate('Home')

            let ress = await reqs;

            if(ress){
                setMessage('Deletado com sucesso!')
                setTimeout(()=>{
                    setMessage(null)
                }, 3000)
            }else{
            setMessage('Erro desconhecido')
            setTimeout(()=>{
                setMessage(null)
            }, 3000)
            }
        } catch (err) {
            console.log(err)
        }

    }

    async function addDebt() {
        try{
            const reqs = await axios.get(config.urlRootPhp+'PROJETOS/grafica-print/adddebt.php?id='+route.params.id+'&title='+debtTitle+'&desc='+debtDesc+'&value='+debtValue+'&date='+debtDate);
            saerchCustomer();
            setDebt(false)
        } catch (err) {
            console.log(err)
        }
        
    }

    async function daleteDebt(idDebt) {
        try{
            const reqs = await axios.get(config.urlRootPhp+'PROJETOS/grafica-print/deletedebt.php?iddebt='+idDebt);
            saerchCustomer();

            let ress = await reqs;

            if(ress){
                setMessage('Deletado com sucesso!')
                setTimeout(()=>{
                    setMessage(null)
                }, 3000)
            }else{
            setMessage('Erro desconhecido')
            setTimeout(()=>{
                setMessage(null)
            }, 3000)
            }
        } catch (err) {
            console.log(err)
        }

    }

    async function deleteAllDebts() {
        try{
            const reqs = await axios.get(config.urlRootPhp+'PROJETOS/grafica-print/deletealldebts.php?id='+route.params.id);
            saerchCustomer();

        let ress = await reqs;

        if(ress){
            setMessage('CONTA QUITADA!')
            setTimeout(()=>{
                setMessage(null)
              }, 3000)
        }else{
          setMessage('Erro desconhecido')
          setTimeout(()=>{
            setMessage(null)
          }, 3000)
        }
        } catch (err){
            console.log(err)
        }
    }
    
    const Render = () =>{
        if (listDebt.length != 0){
            return listDebt?.map(item  => (
                <View style={styles.register}>
                
                <View style={styles.customerRegister}>
                    <Text style={styles.customerRegisterTitle}>{item.title}</Text>
                    <View style={styles.customerRegisterActions}>
                        {/* BOTÃO PARA DELETAR O DÉBITO EM ESPECÍFICO E DESCONTAR DA SUA CONTA */}
                        <TouchableOpacity style={styles.bodyButton} key={item.id} onPress={() => daleteDebt(item.id)}>
                            <Ionicons name="trash-sharp" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* VIEW DE DADOS DOS DÉBITOS */}
                
                <View style={styles.customerRegisterInfo}>
                    <Text style={styles.primaryText}>{item.desc}</Text>
                    <Text style={styles.primaryText}>Valor: <Text style={styles.secondText}>R$ {item.value}</Text></Text>
                    <Text style={styles.primaryText}>Data: <Text style={styles.secondText}>{item.date}</Text></Text>
                </View>
            </View>
            
            ))
        } else if(listDebt.length == 0) {
            return<View style={styles.message}><Ionicons name="alert-circle-sharp" size={24} color="#F98402"/><Text style={styles.secondText}>Nenhum Registro Encontrado</Text></View>
        }
    }



    return( 
        <View style={styles.container}>
            <StatusBar backgroundColor={'#1C1D21'} barStyle={'light-content'} />

            {/* MODAL DE EDIÇÃO DE DADOS DO CLIENTE */}
            <Modal animationType="slide" transparent={true} visible={edit}>
                <SafeAreaView style={styles.modal}>
                    <View style={styles.containerModal}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Editar Cliente</Text>
                            <TouchableOpacity onPress={() => setEdit(false)}>
                            <Ionicons name="close" size={40} color="#F98402"/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalBody}>
                            {customer?.map(item =>(
                                <View style={styles.bodyForm}>
                                <View style={styles.form}>
                                    <Text style={styles.formText} >Nome</Text>
                                    <TextInput style={styles.formInput} onChangeText={(newName) => setNewName(newName)}><Text style={styles.formTextInput}>{item.name}</Text></TextInput>
                                </View>
                                <View style={styles.form}>
                                    <Text style={styles.formText} >Endereço</Text>
                                    <TextInput style={styles.formInput} onChangeText={(newAddress) => setNewAddress(newAddress)}><Text style={styles.formTextInput} >{item.address}</Text></TextInput>
                                </View>
                                <View style={styles.form}>
                                    <Text style={styles.formText} >Contato</Text>
                                    <TextInput style={styles.formInput} onChangeText={(newContact) => setNewContact(newContact)}><Text style={styles.formTextInput} >{item.contact}</Text></TextInput>
                                </View>
                            </View>
                            ))}
                        </View>
                        <View style={styles.modalFooter}>
                            <TouchableOpacity style={styles.editBtnSave} onPress={updateCustomer}>
                                <Ionicons name="save" size={24} color="#1C1D21"/><Text style={styles.editBtnSaveText}>Salvar Alterações</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.editBtnDelete} onPress={deleteCustomer}> 
                                <Ionicons name="trash-sharp" size={24} color="#F98402"/><Text style={styles.editBtnDeleteText}>Excluir Cliente</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>

            {/* MODAL DE REGISTRO DE NOVO DÉBITO */}
            <Modal animationType="slide" transparent={true} visible={debt}>
                <SafeAreaView style={styles.modal}>
                    <View style={styles.containerModal}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Novo Registro</Text>
                            <TouchableOpacity onPress={() => setDebt(false)}>
                            <Ionicons name="close" size={40} color="#F98402"/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalBody}>
                            
                            <View style={styles.bodyForm}>
                                <View style={styles.form}>
                                    <Text style={styles.formText} >Título</Text>
                                    <TextInput style={styles.formInput} onChangeText={(debtTitle => setDebtTitle(debtTitle))}></TextInput>
                                </View>
                                <View style={styles.form}>
                                    <Text style={styles.formText} >Descrição</Text>
                                    <TextInput style={styles.formInput} onChangeText={(debtDesc => setDebtDesc(debtDesc))} multiline placeholder='Descreva o serviço'  placeholderTextColor="#6B6967"></TextInput>
                                </View>
                                <View style={styles.form}>
                                    <Text style={styles.formText} >Valor</Text>
                                    <TextInput style={styles.formInput} onChangeText={(debtValue => setDebtValue(debtValue))} placeholder='R$ XX,XX'  placeholderTextColor="#6B6967"></TextInput>
                                </View>
                                <View style={styles.form}>
                                    <Text style={styles.formText} >Data</Text>
                                    <TextInput style={styles.formInput} onChangeText={(debtDate => setDebtDate(debtDate))} placeholder='XX/XX/XXXX'  placeholderTextColor="#6B6967"></TextInput>
                                </View>
                            </View>
                            <View style={styles.modalFooter}>
                            <TouchableOpacity style={styles.editBtnSave} onPress={addDebt}>
                                <Ionicons name="save" size={24} color="#1C1D21"/><Text style={styles.editBtnSaveText}>Salvar Alterações</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>

            {/* VIEW DESTINADA AO CABEÇALHO DA PÁGINA */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="arrow-back-sharp" size={40} color="#F98402"/>
                </TouchableOpacity>
             <Image style={styles.logo} source={require('../../assets/logo.png')}/>
            </View>

            {/* VIEW COM ROLAMENTO DO CORPO DA PÁGINA */}
            <ScrollView>
                {/* VIEW DE CABEÇALHO DO CORPO DA PÁGINA */}
                {customer?.map(item => (
                       <View style={styles.body}>
                        {message && (
                            <View style={styles.message}>
                            <Ionicons name="alert-circle-sharp" size={24} color="#F98402"/>
                            <Text style={styles.messageText}>{message}</Text>
                          </View>
                        )}
                    
                       <View style={styles.customer}>
                           <Text style={styles.customerName}>{item.name}</Text>
                           {/* BOTÃO PARA ABRIR MODAL DE EDIÇÃO DOS DADOS DO CLIENTE */}
                           <TouchableOpacity style={styles.bodyButton} onPress={() => setEdit(true)}>
                               <Ionicons name="pencil-sharp" size={24} color="black" />
                           </TouchableOpacity>
                       </View>
                       {/* VIEW QUE CONTÉM OS DADOS DO CLIENTE */}
                       <View style={styles.customerInfo}>
                           <Text style={styles.primaryText}>Endereço: <Text style={styles.secondText}>{item.address}</Text></Text>
                           <Text style={styles.primaryText}>Contato: <Text style={styles.secondText}>{item.contact}</Text></Text>
                       </View>
   
                       {/* VIEW DESTINADO AO REGISTRO DE DÉBITOS DO CLEINTE */}
                       <Text style={styles.customerRegisterText}>REGISTROS</Text>
                       <View style={styles.customerActions}>
                           {/* BOTÃO PARA DELETAR TODOS OS DÉBITOS DO CLIENTE E ZERAR SUA CONTA */}
                           <TouchableOpacity style={styles.btnAction} onPress={deleteAllDebts}>
                               <Ionicons name="remove-circle" size={24} color="black" />
                               <Text style={styles.btnActionText}>Apagar Registros</Text>
                           </TouchableOpacity>
                           {/* BOTÃO PARA ABRIR MODAL DE REGISTRO DE NOVOS DÉBITOS DO CLIENTE */}
                           <TouchableOpacity style={styles.btnAction} onPress={() => setDebt(true)}>
                               <Ionicons name="create" size={24} color="black"/>
                               <Text style={styles.btnActionText}>Novo Registro</Text>
                           </TouchableOpacity>
                       </View>
                       {/* VIEW DE DÉBITOS DO CLIENTE */}
   
                       <Render />
                       
                   </View> 
                    ))}
                
            </ScrollView>
        </View>
    );}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#1C1D21',
        padding:5
    },

    // MODAL STYLE
    modal:{
        backgroundColor:'#00000099',
        height: '100%',
    },

    containerModal:{
        backgroundColor: '#1C1D21',
        marginLeft:30,
        marginRight:30,
        marginTop:60,
        paddingBottom:30,
        padding:10,
        height:'auto',
        borderWidth:1,
        borderColor: "#F98402",
        borderRadius: 5,
    },
    modalHeader:{
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop:30,
    },
    modalTitle:{
        fontSize:25,
        fontWeight:'bold',
        color:"#fff",
        marginLeft:80
    },
    modalBody:{
        marginTop:40,
        marginLeft:20,
        marginRight:20,
    },
    bodyForm:{
        gap:15
    },
    form:{
        gap:5
    },
    formText:{
        color:'#FFF',
        fontSize:15,
        fontWeight: 'bold'
    },
    formInput:{
        width:'100%',
        padding:5,
        paddingLeft:10,
        borderWidth:1,
        borderColor: "#F98402",
        borderRadius: 5,
        color:'#F98402',
        fontSize:20,
        fontWeight: 'bold'
    },
    formTextInput:{
        color:'#F98402',
        fontSize:20,
        fontWeight: 'bold'
    },
    modalFooter:{
        marginTop:30,
        marginLeft:20,
        marginRight:20,
        gap:10
    },
    editBtnSave:{
        flexDirection:'row',
        justifyContent:'center',
        textAlign:'center',
        gap:10,
        backgroundColor:'#F98402',
        padding:5,
        borderRadius:5,
    },
    editBtnSaveText:{
        fontSize:20, 
        fontWeight:'bold'
    },
    editBtnDelete:{
        flexDirection:'row',
        justifyContent:'center',
        textAlign:'center',
        gap:10,
        borderWidth:1,
        borderColor: "#F98402",
        borderRadius: 5,
        padding:5,
        borderRadius:5,
    },
    editBtnDeleteText:{
        fontSize:20, 
        fontWeight:'bold',
        color:'#F98402'
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
