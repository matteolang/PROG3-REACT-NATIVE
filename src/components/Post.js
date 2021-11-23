import React, { Component, useDebugValue } from 'react';
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
           usuarioActual: [],
           postPropio: false, 
           botonHabilitado: false
        }
    }
    componentDidMount(){
        if(auth.currentUser.email == this.props.postData.data.owner){
            this.setState({postPropio: true})
        }
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
                
                this.setState({usuarioActual: nombreUsuario[0].data.username})
            }
        )
    }
    
    darLike(){
        let likeador = this.state.usuarios.filter(usuario => usuario.data.email == auth.currentUser.email)
        
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(likeador[0].data.username)
        })
        .then(()=>{
            this.setState({likes: this.props.postData.data.likes.length, myLike: true})
        })

        
    }
    sacarLike(){
        let likeador = this.state.usuarios.filter(usuario => usuario.data.email == auth.currentUser.email)
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(likeador[0].data.username)
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
        let comentarista = this.state.usuarios.filter(usuario => usuario.data.email == auth.currentUser.email)
        console.log(comentarista);
        let unComentario = {
            author: comentarista[0].data.username,
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
    borrarPost(){
        if(auth.currentUser.email == this.props.postData.data.owner){
            this.setState({postPropio: true})
            alert("Eliminaste la publicación.")
            
            db.collection("posts").doc(this.props.postData.id).delete()
            .then(() => {
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
        
        
       
    }

    funcionComent(text){
       
       if(this.state.comentario == ""){
         this.setState({botonHabilitado: true})
       } else (
        this.setState({botonHabilitado: false})
       )
    }

    render(){
        return(
            <View style={styles.contanier}>
                <Text style={styles.parteDeArriba}>
            <Text style={styles.username}>{this.state.usuarioActual} </Text>  
            {this.state.postPropio ?   <TouchableOpacity onPress={()=> this.borrarPost()}><Text style={styles.cruz}>X</Text></TouchableOpacity> : <Text></Text>}
            </Text>

             <Image  style={styles.image} source={{uri: this.props.postData.data.foto}}/>
             <View style={styles.textosPost}>
             <Text><Text style={styles.usernamePost}>{this.state.usuarioActual}:</Text> {this.props.postData.data.texto}</Text>
             <Text style={styles.bloqueLikes}>
            {this.state.myLike == false ? <TouchableOpacity onPress={()=>this.darLike()}>
                 <Text style={styles.botonMeGusta}>Me gusta</Text>
             </TouchableOpacity> : <TouchableOpacity onPress={()=>this.sacarLike()}>
                 <Text style={styles.botonMeGusta}>No me gusta</Text>
             </TouchableOpacity> }
             
            {this.props.postData.data.likes.length == 0 ? <Text>No le gusta a nadie</Text>: 
            this.props.postData.data.likes.length == 1 ? <Text>Solo le gusta a <Text style={styles.username}>{this.props.postData.data.likes[0]}</Text></Text> : <Text> Le gusta a <Text style={styles.username}>{this.props.postData.data.likes[0]}</Text> y a <Text style={styles.username}>{this.props.postData.data.likes.length - 1} personas más</Text> </Text>}
            
            </Text>
             
             { this.state.showModal ?  
             <Modal style={styles.modalContainer} visible={this.state.showModal} animationType="slide" transparent={false}>
                    <View>
                    <TouchableOpacity style={styles.closeButton} onPress={()=> this.ocultarComentarios()}>
                        <Text style={styles.cruz}>x</Text>
                     </TouchableOpacity>                    
                         <FlatList data={this.props.postData.data.comentarios} keyExtractor={ coment => coment.createdAt.toString()} renderItem={ ({item}) => <Text><Text style={styles.username}>{item.author}:</Text> {item.comentario}</Text>}/>           
                        <TextInput placeholder="Dejá tu comentario..." keyboardType="default" multiline onChangeText={text => this.setState({comentario: text})} value={this.state.comentario}/>
                        {this.state.comentario != "" ? 
                        <TouchableOpacity style={styles.botonMeGusta} onPress={()=>this.comentar()}><Text style={styles.botonMeGusta}>Publicar comentario</Text></TouchableOpacity> : 
                        <TouchableOpacity style={styles.botonNo}><Text style={styles.botonNo}>Publicar comentario</Text></TouchableOpacity>}

                    </View>

            </Modal>
              :
                <TouchableOpacity onPress={()=> this.showModal()}>
                 {this.props.postData.data.comentarios ? this.props.postData.data.comentarios.length == 1 ? <Text style={styles.botonMeGusta}>Ver el único comentario...</Text> : <Text style={styles.botonMeGusta}>Ver los {this.props.postData.data.comentarios.length} comentarios...</Text>: <Text style={styles.botonMeGusta}>No hay comentarios aún...</Text>}
                </TouchableOpacity>
             }  
             </View>     
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
        marginTop: 5,
        borderColor: "#006DB5"
    },
    closeButton: {
        padding: 5,
        alignSelf: "flex-end",
        borderRadius: 4,
        paddingHorizontal: 8
    },
    cruz: {
        color: "white",
        backgroundColor: "#006DB5",
        borderRadius: 15,
        width: 20,
        textAlign: "center",
        marginBottom: 5,
        marginRight: 5
    },
    image: {
        width: '97%',
        padding: 5,
        alignSelf: "center",
        height: 400,
        borderRadius: 5,
        marginBottom: 5
    },
    username: {
        fontWeight: "bold",
        marginLeft: 5,
        marginBottom: 5,
        color: "#001F3F"
    },
    textosPost: {
        marginLeft: 5,
        marginTop: 5,

    },
    usernamePost: {
        fontWeight: "bold",
        color: "#001F3F"
    },
    botonMeGusta: {
        marginRight: 5,
        color: "white",
        backgroundColor: "#006DB5",
        borderRadius: 10,
        padding: 5,
        paddingRight: 5,
        textAlign: "center"
    },
    bloqueLikes: {
        marginVertical: 5
    },
    parteDeArriba: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 5
    },
    botonNo: {
        
            marginRight: 5,
            color: "white",
            backgroundColor: "grey",
            borderRadius: 10,
            padding: 5,
            paddingRight: 5,
            textAlign: "center"
    
    }
})

export default Post;