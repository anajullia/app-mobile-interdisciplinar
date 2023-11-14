import React, {useState,useEffect} from 'react';
import {StyleSheet, Text, View , Modal , 
    TouchableOpacity, SafeAreaView , 
    TextInput, ScrollView} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import axios from 'axios';

export default function App() {

    const api = 'http://10.68.36.102/pam2etim/interdisciplinar/';
    const [lista,setLista] = useState([]);
    const [nome,setNome] = useState('');
    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const [id,setId] = useState('');
    const [buscar,setBuscar] = useState('');
    const [abrir,setAbrir] = useState(false);
    const [abrirhome,setAbrirhome] = useState(false);

  async function add(){
        const obj = {nome,email,senha,id}

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
  return (
   <View style={estilos.container}>
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

    

          <Modal // MODAL HOME!
            
            visible={abrirhome}
          >
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
              </View>
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
    marginTop: 350,
    height: 50,
    width: 100
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
    width:100,
    height:100,
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
    marginTop: 15
  },

  legenda:{
    color:'#008D5C',
    fontSize: 20,
    marginTop: -200,
    marginLeft: 0,
    position: 'relative',
    textAlign: 'center'
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
    marginLeft: 0,
    position: 'relative',
    textAlign: 'center'
  },
});