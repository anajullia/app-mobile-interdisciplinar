import React, {useState,useEffect} from 'react';
import {StyleSheet, Text, View , Modal , 
    TouchableOpacity, SafeAreaView , 
    TextInput, ScrollView} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import axios from 'axios';

export default function App() {

    const api = 'http://192.168.1.104/apireact/apireact/';
    const [lista,setLista] = useState([]);
    const [nome,setNome] = useState('');
    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const [tiposervico,setTiposervico] = useState('');
    const [intrucoes,setInstrucoes] = useState('');
    const [id,setId] = useState('');
    const [nomeservico,setNomeservico] = useState('');
    const [descricaoservico,setDescricaoservico] = useState('');
    const [precoservico,setPrecoservico] = useState('');
    const [buscar,setBuscar] = useState('');
    const [abrir,setAbrir] = useState(false);
    const [abrirhome,setAbrirhome] = useState(false);
    const [abrirservicos,setAbrirservicos] = useState(false);
    const [abrirperfil,setAbrirperfil] = useState(false);
    const [abrircadastro,setAbrircadastro] = useState(false);
    const mensagemDuplicidade = () =>
    Alert.alert(
      "Erro ao salvar",
      "Email já cadastrado",
      [
        {text: "OK", onPress : () => setAbrir(true)}
      ],
      {cancelable: true},
    )

    //Para verificar os dados cadastrados
    useEffect(() => {
      listarDados();
    },[])

    async function listarDados(){
        const res = await axios.get(api+ 'listar.php?busca=' + buscar );
        setLista(res.data.result);
    }

    function buscarDados(){
      listarDados();
    }

    async function add(){
        const obj = {nome,email,senha,id,tiposervico,instrucoes}

        if(id > 0){
          const res = await axios.post(api + 'editar.php', obj);
        }

        const res = await axios.post(api + 'add.php', obj);

        if(res.data.success === true)
        {
            limparCampos();
        }

        if(res.data.success === 'Email já Cadastrado!')
        {
            mensagemDuplicidade();
        }
        listarDados();
        setAbrir(false);
    }

    function mensagemDelete(id){
      Alert.alert(
        "Excluir registro",
        "Deseja excluir o registro?",
        [
          { 
            text: "Não" ,onPress :()=> console.log("cancel Pressed"),
            style: "cancel"
          },
          {
            text:"Sim",
            onpress: () => deleteItem(id)
          }
        ],
        {cancelable : true}
      )
    }

    async function getItem(id){
      const res= await axios.get(api + 'buscarId.php?id=' + id);
      setId(res.data.id);
      setNome(res.data.nome);
      setEmail(res.data.email);
      setSenha(res.data.senha);
      setTiposervico(res.data.tiposervico);
      setInstrucoes(res.data.intrucoes);
      setAbrir(true);
    }

    async function deleteItem(id){
      const res= await axios.get(api + 'buscarId.php?id=' + id);
      listarDados();
    }

    function limparCampos(){
        setNome('');
        setEmail('');
        setSenha('');
        setTiposervico('');
        setInstrucoes('');
        setId('0');
    }
  return (
   <View style={estilos.container}>
              <TextInput
                type="text"
                style={estilos.input}
                placeholder='Insira seu E-mail'
                value={email}
              >
              </TextInput>

              <TextInput
                type="text"
                style={estilos.input}
                placeholder='Insira sua Senha'
                value={senha}
                secureTextEntry={true}
              >
              </TextInput>


    <View style={estilos.containerprimeirosbotoes}>
      <TouchableOpacity style={estilos.botoes}>
        <Text style={estilos.textobotoes} onPress={() => setAbrirhome(true)}>Logar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={estilos.botoes}>
        <Text style={estilos.textobotoes} onPress={() => setAbrir(true)}>Criar cadastro</Text>
      </TouchableOpacity>
    </View>
    <Modal // MODAL PRIMEIRA TELA
            //colocar animação
            visible={abrir}
          >
            <SafeAreaView style={estilos.modal}>
              <View style={estilos.modalHeader}>
                 <TouchableOpacity
                   onPress={() => setAbrir(false)}
                 >
                  <Ionicons style={{marginLeft:5 , marginRight:5}}
                    name="md-arrow-back"
                    size={35}
                    color="#008D5C"
                  >
                  </Ionicons>
                 </TouchableOpacity>
                <Text style={estilos.textoModal}>
                    Inserir Usuário
                </Text>
              </View>
               <TextInput
                 type="text"
                 style={estilos.inputcadastro}
                 placeholder='Insira um Nome'
                 value={nome}
                 onChangeText={(nome) => setNome(nome)}
               >
               </TextInput>

               <TextInput
                 type="text"
                 style={estilos.inputcadastro}
                 placeholder='Insira seu E-mail'
                 value={email}
                 onChangeText={(email) => setEmail(email)}
               >
               </TextInput>

               <TextInput
                 type="text"
                 style={estilos.inputcadastro}
                 placeholder='Insira sua Senha'
                 value={senha}
                 onChangeText={(senha) => setSenha(senha)}
                 secureTextEntry={true}
               >
               </TextInput>

               <TouchableOpacity
                 style={estilos.botaoModal}
                 onPress={add}
               >
                 <Text style={estilos.textoBotaoModal}>Salvar</Text>
               </TouchableOpacity>

               

            </SafeAreaView>

          </Modal>

          <Modal
            //colocar animação
            visible={abrircadastro}
          >
            <SafeAreaView style={estilos.modal}>
              <View style={estilos.modalHeader}>
                 <TouchableOpacity
                   onPress={() => setAbrir(false)}
                 >
                  <Ionicons style={{marginLeft:5 , marginRight:5}}
                    name="md-arrow-back"
                    size={35}
                    color="#FFF"
                  >
                  </Ionicons>
                 </TouchableOpacity>
                <Text style={estilos.textoModal}>
                    Inserir Usuário
                </Text>
              </View>
               <TextInput
                 type="text"
                 style={estilos.input}
                 placeholder='Insira um Nome'
                 value={nome}
                 onChangeText={(nome) => setNome(nome)}
               >
               </TextInput>

               <TextInput
                 type="text"
                 style={estilos.input}
                 placeholder='Insira seu E-mail'
                 value={email}
                 onChangeText={(email) => setEmail(email)}
               >
               </TextInput>

               <TextInput
                 type="text"
                 style={estilos.input}
                 placeholder='Insira sua Senha'
                 value={senha}
                 onChangeText={(senha) => setSenha(senha)}
                 secureTextEntry={true}
               >
               </TextInput>

               <TouchableOpacity
                 style={estilos.botaoModal}
                 onPress={add}
               >
                 <Text style={estilos.textoBotaoModal}>Salvar</Text>
               </TouchableOpacity>

            </SafeAreaView>

          </Modal>

    

          <Modal visible={abrirhome}>
            <SafeAreaView style={estilos.modal}>
              <View style={estilos.modalHeader}>
              <TouchableOpacity
                   onPress={() => setAbrirhome(false)}
                 >
                  <Ionicons style={{marginLeft:5 , marginRight:5}}
                    name="md-arrow-back"
                    size={35}
                    color="#008D5C"
                  >
                  </Ionicons>
                 </TouchableOpacity>
                 <View style={estilos.containerbotoes}>
                  <View style={estilos.containerbtum}>
                    <Text style={estilos.legenda}>Agendar Serviço</Text>
                      <TouchableOpacity
                        style={estilos.botao}
                        onPress={() => setAbrirservicos(true)}
                      >
                      <Ionicons style={estilos.icones} name="cart" size={80} color="#008D5C" ></Ionicons>    
                      </TouchableOpacity>
                  </View>
                  <View style={estilos.containerbtdois}>
                    <Text style={estilos.legenda2}>Perfil</Text>
                      <TouchableOpacity
                        style={estilos.botao}
                        onPress={() => setAbrirperfil(true)}
                      >
                      <Ionicons style={estilos.icones} name="person-circle-outline" size={80} color="#008D5C" ></Ionicons>    
                      </TouchableOpacity>
                  </View>
                 </View>
              </View>
            </SafeAreaView>

          </Modal>

          <Modal // MODAL PRIMEIRA TELA
            //colocar animação
            visible={abrirperfil}
          >

              <SafeAreaView style={estilos.modal}>
              <View style={estilos.modalHeader}>
              <TouchableOpacity
                   onPress={() => setAbrirperfil(false)}
                 >
                  <Ionicons style={{marginLeft:5 , marginRight:5, marginTop:10}}
                    name="md-arrow-back"
                    size={35}
                    color="#008D5C"
                  >
                  </Ionicons>
                  <Ionicons></Ionicons>
                 </TouchableOpacity>
                 <Text style={estilos.textonav}> Bem-vindo(a)!</Text>
                 <Ionicons style={estilos.iconetopo} name="person-circle-outline" size={50} color="#008D5C" ></Ionicons>    
              </View>
              <View //BARRA DE BUSCA
               style={estilos.ViewinputBuscar}>
            <TextInput
              style={{marginLeft: 20, marginTop: 20}}
              placeholder="Buscar a conta cadastrada por email"
              value={buscar}
              onChangeText={(texto) => setBuscar(texto)}  // Correção aqui
            >
            </TextInput>

                <Ionicons style={{marginLeft:390 , marginRight:5, marginTop:-28}} name='ios-search' size={25} color='#008D5C'></Ionicons>
          </View>

          <ScrollView>
            <View style={estilos.grid}>
              {lista.map(item => (

                <View 
                style={estilos.griditem}
                key={item.id}
                >
                  <Text style={{color:'#585858'}} >{item.id}
                   - {item.nome} -aaaaa {item.email}</Text>   

                   <TouchableOpacity
                    style={estilos.gridbotaoEditar}
                    onPress={() => getItem}
                   >
                    <Ionicons name='ios-create' size={30} color="#50b9e1"></Ionicons>
                    
                   </TouchableOpacity>

                   <TouchableOpacity
                    style={estilos.gridbotaoExcluir}
                    onPress={() => getItem}
                   >
                    <Ionicons name='ios-create' size={30} color="#e15f50"></Ionicons>
                    
                   </TouchableOpacity>

                </View>
              ))}              
            </View>
          </ScrollView>
              </SafeAreaView>

            
          </Modal>

          <Modal visible={abrirservicos}>
            <SafeAreaView style={estilos.modal}>
              <View //NAVBAR!
              style={estilos.modalHeader}>
              <TouchableOpacity // botão voltar
                  onPress={() => setAbrirservicos(false)}
                >
                  <Ionicons style={{marginLeft:5 , marginRight:5, marginTop:10}}
                    name="md-arrow-back"
                    size={35}
                    color="#008D5C"
                  >
                  </Ionicons>
                </TouchableOpacity>
                <Text style={estilos.textonav}>Lista de Serviços</Text>  
              <TouchableOpacity // botão add
                onPress={() => setAbrircadastro(true)}
              >
              <Ionicons style={{marginLeft:390 , marginRight:5, marginTop:-40}}
                    name="ios-add"
                    size={35}
                    color="#008D5C"
                  >
                  </Ionicons>    

              </TouchableOpacity>
              </View>
              <View //BARRA DE BUSCA
               style={estilos.ViewinputBuscar}>
            <TextInput
              style={{marginLeft: 20, marginTop: 20}}
              placeholder="Buscar por serviço agendado"
              value={buscar}
              onChangeText={(texto) => setBuscar(texto)}  // Correção aqui
            >
            </TextInput>

                <Ionicons style={{marginLeft:390 , marginRight:5, marginTop:-28}} name='ios-search' size={25} color='#008D5C'></Ionicons>
          </View>

          <ScrollView // Adicione ou ajuste conforme necessário   
          >
            
          </ScrollView>

            </SafeAreaView>
          </Modal>
        
    

   </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  navbar:{
    width: 100,
    height:10,
    borderWidth: 2,
    borderColor: '#000',
    position: 'absolute'
  },

  containerbtum:{
      height:20,
      width: 100,
      position: 'absolute',
      marginLeft: -80
  },

  containerbtdois:{
    marginTop: 24,
    height:20,
    width: 100,
    marginLeft: 80
},

textoModal:{    
  color: '#008D5C',    
  marginLeft: 130,
  fontSize:25,
  margin: 30      
},

  containerbotoes:{
    marginTop: 430,
    height: 50,
    width: 100,
    marginLeft:140
  },

  containerprimeirosbotoes:{
    height: 100,
    width: 100,
    marginTop: 100,
    marginLeft: -215,
  },

  containerlogin:{
    height: 100,
    width: 100,
    marginTop: 300,
    marginLeft: -215,
  },

  botao:{
    width:150,
    height:150,
    backgroundColor: '#FFD100',
    borderColor: '#008D5C',
    borderWidth:6,
    borderRadius: 10,
    marginLeft: 0,
    marginTop: 0,
    paddingBottom: 5
  },

  botao2:{
    width:100,
    height:100,
    backgroundColor: '#FFD100',
    borderColor: '#008D5C',
    borderWidth:6,
    borderRadius: 10,
    marginLeft: 0,
    marginTop: 200,
    paddingBottom: 5
  },

  botoes:{
    width:300,
    height:60,
    backgroundColor: '#FFD100',
    borderColor: '#008D5C',
    borderWidth:5,
    borderRadius: 10,
    margin: 10
  },

  input:{
    backgroundColor: '#FFF',
    borderRadius: 5,
    margin: 8,
    padding: 8,
    color: '#000',
    fontSize:13,
    borderWidth: 3,
    borderColor: '#008D5C',
    width: 300,
    
  },

  textoBotaoModal:{
    margin: 11,
    fontSize: 20,
    color:'#008D5C',
    textAlign: 'center'
  },
  
  botaoModal:{
    width:300,
    height:60,
    backgroundColor: '#FFD100',
    borderColor: '#008D5C',
    borderWidth:5,
    borderRadius: 10,
    margin: 30,
    marginLeft: 55
  },

  botoes:{
    width:300,
    height:60,
    backgroundColor: '#FFD100',
    borderColor: '#008D5C',
    borderWidth:5,
    borderRadius: 10,
    margin: 10
  },

  inputcadastro:{
    backgroundColor: '#FFF',
    borderRadius: 5,
    margin: 8,
    padding: 8,
    color: '#000',
    fontSize:13,
    borderWidth: 3,
    borderColor: '#008D5C',
    width: 300,
    marginLeft: 55
  },

  icones:{
    textAlign:'center',
    marginTop: 27,
  },

  iconetopo:{
    textAlign:'center',
    marginTop: 0,
    marginLeft: 350,
    position: 'absolute'
  },


  legenda:{
    color:'#008D5C',
    fontSize: 20,
    marginTop: -200,
    marginLeft: 25,
    width:100,
    position: 'relative',
    textAlign: 'center'
  },

  textonav:{
    color:'#008D5C',
    marginLeft: 150,
    marginTop: 13,
    position: 'absolute',
    fontSize: 20,
  },

  textobotoes:{
color:'#008D5C',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 0,
    position: 'relative',
    textAlign: 'center'
  },

  legenda2:{
    color:'#008D5C',
    fontSize: 20,
    marginTop: -200,
    marginLeft: 25,
    width:100,
    position: 'relative',
    textAlign: 'center'
  },

  grid:{
    marginTop: 8,    
  },

  griditem:{
    padding: 11,
    borderBottomColor: "#",
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  modal:{
    flex: 1,
    backgroundColor:'#fff'    
  },
});