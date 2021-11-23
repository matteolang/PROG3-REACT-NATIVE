import React, {Component} from "react";
import {Text, View, TouchableOpacity, Touchable, TextInput} from "react-native"
import { StyleSheet} from "react-native"
import { auth, db } from "../Firebase/config";

class Register extends Component{
    constructor(props){
        super(props)
        this.state ={
            email: "" , 
            loggedIn: false, 
            error: '',
            username: "",
            password: "", 
        }
    }
    

    submitUser(){
        db.collection('users').add({
            email: this.state.email,
            username: this.state.username,
            createdAt: Date.now(),
        })
        .then(()=>{
        
            this.props.register(this.state.email, this.state.password)
            
            this.setState({email: "" ,username: "",password: ""})
           
        }
        )
        .catch(error => console.log(error))
    }
    

    render(){
        return(
            <View>
            <TextInput
            style={styles.field}
            keyboardType='default'
            placeholder='username'
            onChangeText={ text => this.setState({username: text})}
            />
            <TextInput
            style={styles.field}
            keyboardType='email-address'
            placeholder='email'
            onChangeText={ text => this.setState({email: text})}
            />
            <TextInput
            style={styles.field}
            keyboardType='default'
            placeholder='password'
            secureTextEntry={true}
            onChangeText={ text => this.setState({password: text})}
            />
             <Text style={styles.error}>{this.props.error}</Text>
             { this.state.username != "" && this.state.email != "" && this.state.password != ""? 
             <TouchableOpacity onPress={()=> this.submitUser()}  style={styles.boton} >
                <Text style={styles.textoBoton}>Register</Text>
            </TouchableOpacity>
            : 
            <TouchableOpacity  style={styles.botonNo} >
                <Text style={styles.textoBoton}>Register</Text>
            </TouchableOpacity>}
            </View>
        )
    }
    

}
const styles = StyleSheet.create({
    formulario:{
        paddingHorizontal: 10,
        marginTop: 20
    },
    field:{
        borderColor: "#006DB5",
        paddingVertical: 15,
        borderWidth: 1,
        borderStyle: "solid",
        height: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 6,
        marginVertical: 15,
        marginLeft: 5,
        marginRight: 5,
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
        borderColor: "#006DB5",
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 15,

    },
    botonNo: {
        backgroundColor: "grey",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4 ,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "grey"
    },
    textoBoton: {
        color: "white"
    },
})
export default Register;