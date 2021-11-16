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
        <Text>{this.state.usuarioActual.username}</Text>
        <Text>Email: {this.props.dataUsuario.email}</Text>

        <Text>Cantidad de posteos: {this.state.postsPropios.length}</Text>
        <FlatList data={this.state.postsPropios} keyExtractor={ post => post.id} renderItem={ ({item}) => <Post postData={item} >{item.data.texto}</Post>}/>

        <Text>Fecha de creacion del usuario: {this.props.dataUsuario.metadata.creationTime}</Text>
        <Text>Ultimo inicio de sesión: {this.props.dataUsuario.metadata.lastSignInTime}</Text>

       
        <TouchableOpacity style={styles.logout} onPress={()=>this.props.logout()}><Text>Log Out</Text></TouchableOpacity>
        </View>
        )
    }


}

const styles = StyleSheet.create ({
    logout: {
        textAlign: "center",
        backgroundColor: 'red',
        borderRadius: 5,
        padding: 5

    }
})

export default MiPerfil