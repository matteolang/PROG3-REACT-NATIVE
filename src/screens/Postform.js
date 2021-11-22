import { NavigationContainer } from "@react-navigation/native";
import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image, FlatList, TextInput} from "react-native"
import { StyleSheet} from "react-native"
import { auth, db } from "../Firebase/config";
import MyCamera from "../components/MyCamera";

class Postform extends Component{
    constructor(props){
        super(props);
        this.state = {
          textoPost: "",
          mostrarCamara: true,
          url: ''
        }
    }
    submitPost(){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            texto: this.state.textoPost,
            createdAt: Date.now(),
            foto: this.state.url,
            likes: []
        })
        .then(()=>{
            this.setState({textoPost: ""})
            this.props.drawerProps.navigation.navigate('Home')
        }
        )
        .catch(error => console.log(error))
    }
    
    imagenCargada(url){
        console.log(url);
        this.setState({
            mostrarCamara: false,
            url: url
        })
    }
    render(){
        return(
            <View style={styles.wrap}>
                {this.state.mostrarCamara ?                 
                <MyCamera imagenCargada={(url) => this.imagenCargada(url)}/>
                :
                <View style={styles.container}>
                    <TextInput style={styles.input} onChangeText={(text)=> this.setState({textoPost: text})} placeholder="Descripción..." keyboardType="default" multiline/>
                    <TouchableOpacity style={styles.boton} onPress={()=> this.submitPost()}><Text style={styles.textoBoton}>Publicar</Text></TouchableOpacity>
                </View>  
            
            }
            </View>
        
        )
    }

}
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginRight: 50,
        marginLeft: 50,
        height: 40,
        paddingTop:10,
        alignItems: "center",
        fontWeight: "bold",
        
    },
    wrap: {
        flex: 1
    },
    input:{
        borderColor: "#006DB5",
        paddingVertical: 15,
        borderWidth: 1,
        borderStyle: "solid",
        height: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 6,
        marginVertical: 15
    },
    error: {
        color: 'red'
    },
    boton: {
        backgroundColor: "#006DB5",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4 ,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#006DB5"

    },
    textoBoton: {
        color: "white"
    },
})
export default Postform;