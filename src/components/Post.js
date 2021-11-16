import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList, Image} from 'react-native';
import { auth,db } from '../Firebase/config';
import firebase from 'firebase';

class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
           likes: 0,
           myLike:false,
           showModal: false,
           comentario: "",
           usuarios: [],
           usuarioActual: []
        }
    }
    componentDidMount(){
        if(this.props.postData.data.likes){
            this.setState({
                likes: this.props.postData.data.likes.length,
                myLike: this.props.postData.data.likes.includes(auth.currentUser.email)
            })
        }
        db.collection('users').onSnapshot(
            docs => {
                let usuarios = []
                docs.forEach(doc => 
                    usuarios.push({id: doc.id, data: doc.data()})
                );
                this.setState({usuarios: usuarios})
                let nombreUsuario = this.state.usuarios.filter( usuario => this.props.postData.data.owner == usuario.data.email )
                this.setState({usuarioActual: nombreUsuario})
            }
        )
    }
    
    darLike(){
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({likes: this.props.postData.data.likes.length, myLike: true})
        })

        
    }
    sacarLike(){
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({likes: this.props.postData.data.likes.length, myLike: false})
        })
    }
    showModal(){
        this.setState({showModal: true})
    }
    ocultarComentarios(){
        this.setState({showModal: false})
    }
    comentar(){
        let unComentario = {
            author: auth.currentUser.email,
            comentario: this.state.comentario,
            createdAt: Date.now()
        }
        db.collection('posts').doc(this.props.postData.id).update({
            comentarios: firebase.firestore.FieldValue.arrayUnion(unComentario)
        })
        .then(()=>{
            this.setState({comentario: ""})
        }
        )
    }

    render(){
        return(
            <View style={styles.contanier}>
             <Text>Texto del post: {this.props.postData.data.texto}</Text>
             <Image  style={styles.image} source={{uri: this.props.postData.data.foto}}/>
             
             <Text>user: {this.props.postData.data.owner}, {this.state.usuarioActual[0].username} </Text>  
                         
            {this.state.myLike == false ? <TouchableOpacity onPress={()=>this.darLike()}>
                 <Text>Me gusta</Text>
             </TouchableOpacity> : <TouchableOpacity onPress={()=>this.sacarLike()}>
                 <Text>No me gusta</Text>
             </TouchableOpacity> }
             
            {this.props.postData.data.likes.length == 0 ? <Text>No le gusta a nadie</Text>: 
            this.props.postData.data.likes.length == 1 ? <Text>Solo le gusta a {this.props.postData.data.likes[0]}</Text> : <Text> Le gusta a {this.props.postData.data.likes[0]} y a {this.props.postData.data.likes.length - 1} personas más </Text>}
            

             
             { this.state.showModal ?  
             <Modal style={styles.modalContainer} visible={this.state.showModal} animationType="slide" transparent={false}>
                    <View>
                    <TouchableOpacity style={styles.closeButton} onPress={()=> this.ocultarComentarios()}>
                        <Text style={styles.cruz}>x</Text>
                     </TouchableOpacity>                    
                         <FlatList data={this.props.postData.data.comentarios} keyExtractor={ coment => coment.createdAt.toString()} renderItem={ ({item}) => <Text>{item.author}: {item.comentario}</Text>}/>           
                        <TextInput placeholder="Comentá este post" keyboardType="default" multiline onChangeText={text => this.setState({comentario: text})} value={this.state.comentario}/>
                        <TouchableOpacity onPress={()=>this.comentar()}><Text>Comentar</Text></TouchableOpacity>
                    </View>

            </Modal>
              :
                <TouchableOpacity onPress={()=> this.showModal()}>
                 {this.props.postData.data.comentarios ? this.props.postData.data.comentarios.length == 1 ? <Text>Ver el único comentario</Text> : <Text>Ver los {this.props.postData.data.comentarios.length} comentarios</Text>: <Text>No hay comentarios aún</Text>}
                </TouchableOpacity>
             }       
            </View>
        )
    }

}


const styles = StyleSheet.create({
    contanier:{
        marginBottom: 20,
        borderRadius:4,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
        flex: 1
    },
    modalContainer: {
        width: "97%",
        borderRadius: 4,
        padding: 5,
        alignSelf: "center",
        boxShadow: "rgb(204 204 204) 0px 0px 9px 7px",
        marginBottom: 5,
        marginTop: 5
    },
    closeButton: {
        padding: 5,
        backgroundColor: "#dc3545", 
        alignSelf: "flex-end",
        borderRadius: 4,
        paddingHorizontal: 8
    },
    cruz: {
        color: "white"
    },
    image: {
        width: '97%',
        padding: 5,
        alignSelf: "center",
        height: 400
    }
})

export default Post;