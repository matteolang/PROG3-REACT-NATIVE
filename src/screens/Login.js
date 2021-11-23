import React, {Component} from "react";
import {Text, View, TouchableOpacity, Touchable, TextInput} from "react-native"
import { StyleSheet} from "react-native"

class Login extends Component{
    constructor(props){
        super(props)
        this.state ={
            loggedIn: false,
            email: "" ,
            password: ""       
        }
    }
    onSubmit(){
        console.log(`El email es ${this.state.email}`)
        console.log(`La contraseña es ${this.state.password}`)
    }

    render(){
        return(
            <View>
            <TextInput
            style={styles.field}
            keyboardType='email-address'
            placeholder='email'
            onChangeText={ (text) => this.setState({email: text})}
            />
            <TextInput
            style={styles.field}
            keyboardType='default'
            placeholder='password'
            secureTextEntry={true}
            onChangeText={ text => this.setState({password: text})}
            />
            <Text style={styles.error}>{this.props.error}</Text>
            { this.state.email != "" && this.state.password != "" ?
            <TouchableOpacity onPress={() => this.props.login(this.state.email, this.state.password)} style={styles.boton}>
                <Text style={styles.textoBoton}>Login</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.botonDesactivado}>
                <Text style={styles.textoBoton}>Login</Text>
            </TouchableOpacity>
             }

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
        borderColor: "grey",
        paddingVertical: 15,
        borderWidth: 1,
        borderStyle: "solid",
        height: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 6,
        marginVertical: 15,
        marginLeft: 5,
        marginRight: 5
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
    botonDesactivado: {
        backgroundColor: "grey",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4 ,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "grey",
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 15,
    },
    textoBoton: {
        color: "white"
    },
})
export default Login;