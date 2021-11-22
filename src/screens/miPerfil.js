import React, {Component} from 'react'
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput, Stylesheet} from 'react-native'
import { auth, db } from "../Firebase/config";
import Post from "../components/Post";

class MiPerfil extends Component {
    constructor(props){
        super(props)
        this.state = {
            posteos: [],
            postsPropios: [],
            usuarios: [],
            usuarioActual: {}
        }

    }
    componentDidMount(){
        db.collection('posts').onSnapshot(
            docs =>{
                let posts = []
                docs.forEach(doc =>  posts.push({ id: doc.id , data: doc.data()}))
                this.setState({posteos: posts})
                let posteosTotal = this.state.posteos.filter(post => this.props.dataUsuario.email == post.data.owner)
                let ordenados = posteosTotal.sort((a, b) => b.data.createdAt - a.data.createdAt)
                this.setState({postsPropios: ordenados})
            }

        )
        db.collection('users').onSnapshot(
            docs => {
                let usuarios = []
                docs.forEach(doc => 
                    usuarios.push({id: doc.id, data: doc.data()})
                );
                this.setState({usuarios: usuarios})
                let nombreUsuario = this.state.usuarios.filter( usuario => this.props.dataUsuario.email == usuario.data.email )
                this.setState({usuarioActual: nombreUsuario[0].data})
            }
        )
        
    }


    render(){
        return (
            <View>
        <Text style={styles.textosPerfil}>Nombre de usuario:<Text style={styles.labels}> {this.state.usuarioActual.username}</Text></Text>
        <Text style={styles.textosPerfil}>Email:<Text style={styles.labels}> {this.props.dataUsuario.email}</Text></Text>

        <Text style={styles.textosPerfil}>Cantidad de posteos:<Text style={styles.labels}> {this.state.postsPropios.length}</Text></Text>
        <FlatList data={this.state.postsPropios} keyExtractor={ post => post.id} renderItem={ ({item}) => <Post postData={item} >{item.data.texto}</Post>}/>

        <Text style={styles.textosPerfil}>Fecha de creacion del usuario:<Text style={styles.labels}> {this.props.dataUsuario.metadata.creationTime}</Text></Text>
        <Text style={styles.textosPerfil}>Ultimo inicio de sesión:<Text style={styles.labels}> {this.props.dataUsuario.metadata.lastSignInTime}</Text></Text>

       
        <TouchableOpacity style={styles.logout} onPress={()=>this.props.logout()}><Text>Log Out</Text></TouchableOpacity>
        </View>
        )
    }


}

const styles = StyleSheet.create ({
    logout: {
        textAlign: "center",
        backgroundColor: '#006DB5',
        borderRadius: 5,
        padding: 5

    },
    textosPerfil: {
        marginLeft: 5,
        marginVertical: 5
    },
    labels: {
        fontWeight: "bold",
        marginLeft: 5,
        color: "#001F3F"
    }
})

export default MiPerfil