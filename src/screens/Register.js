import React, {Component} from "react";
import {Text, View, TouchableOpacity, Touchable, TextInput} from "react-native"
import { StyleSheet} from "react-native"

class Register extends Component{
    constructor(props){
        super(props)
        this.state ={
            email: "" , 
            loggedIn: false, 
            error: '',
            username: "",
            password: ""       
        }
    }

    render(){
        return(
            <View>
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
            <TouchableOpacity onPress={() => this.props.register(this.state.email, this.state.password)} style={styles.boton}>
                <Text style={styles.textoBoton}>Register</Text>
            </TouchableOpacity>
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
        marginVertical: 15
    },
    error: {
        color: 'red'
    },
    boton: {
        backgroundColor: "#28a745",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4 ,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#28a745"

    },
    textoBoton: {
        color: "white"
    },
})
export default Register;