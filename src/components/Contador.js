import React, {Component} from "react";
import {Text, View, TouchableOpacity, Touchable} from "react-native"
import { StyleSheet} from "react-native"

class Contador extends Component{
    constructor(props){
        super(props)
        this.state ={
            valor: 0,
            
        }
    }
    incrementar(){
        this.setState({
            valor: this.state.valor + 1,
        })
    }

    render(){
        return(
            <View >
                  <Text style={styles.texto}>Cantidad de clicks: {this.state.valor}</Text>
                <TouchableOpacity style={styles.clickeable} onPress={()=> this.incrementar()}>
                    <Text>Click aquí para contar</Text>
                    </TouchableOpacity>
              
            </View>
        )
    }

}
const styles = StyleSheet.create({
    clickeable: {
        backgroundColor: "lime",
        marginTop: 10,
        marginRight: 50,
        marginLeft: 50,
        height: 40,
        paddingTop:10,
        alignItems: "center",
        borderRadius: 5
    },
    texto: {
        marginTop: 40,
        height: 40,
        paddingTop:10,
        textAlign: "center"
    }
})
export default Contador;