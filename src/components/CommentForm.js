import React, {Component} from "react";
import {Text, View, TouchableOpacity, Touchable, TextInput} from "react-native"
import { StyleSheet} from "react-native"

class CommentForm extends Component{
    constructor(props){
        super(props)
        this.state ={
            comentario: "" ,
     
        }
    }
    onSubmit(){
        console.log(`El comentario es: ${this.state.comentario}`)

    }

    render(){
        return(
            <View >
                <TextInput style={styles.field} keyboardType="default" placeholder="Comentario..." onChangeText={texto => this.setState({comentario: texto})}/>
                <TouchableOpacity style={styles.boton} onPress={()=> this.onSubmit()}>
                <Text style={styles.textoBoton}>Comentar</Text>
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
        paddingBottom: 80,
        borderWidth: 1,
        borderStyle: "solid",
        height: 100,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 6,
        marginVertical: 15
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
export default CommentForm;

