import React, {Component} from 'react'
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput, Stylesheet} from 'react-native'


class MiPerfil extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return (
            <View>
        <Text>Email: {this.props.dataUsuario.email}</Text>
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