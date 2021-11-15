import React, {Component} from "react";
import {Text, View, TouchableOpacity, Touchable, TextInput, Image} from "react-native"
import { StyleSheet} from "react-native"
import {Camera} from 'expo-camera'
import {db, storage} from '../Firebase/config'

class MyCamera extends Component{

    constructor(props){
        super(props);
        this.state = {
            permission: false,
            photo: '',
            mostrarCamara: true
        }
        this.camera
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=>{
            this.setState({permission: true})
        })
        .catch(error=>{console.log(error)})
    }
    sacarFoto(){
        this.camera.takePictureAsync()
        .then((foto)=>{
            this.setState({
                photo: foto.uri,
                mostrarCamara: false
            })
        })
        .catch(error=> console.log(error))
    }
    eliminarFoto(){
        this.setState({
            photo: "",
            mostrarCamara: true
        })
    }
    guardarFoto(){
        fetch(this.state.photo)
        .then(res => res.blob())
        .then(data => 
         {
            const ref = storage.ref(`photos/${Date.now()}.jpg`)
            ref.put(data)
            .then(()=>{
                ref.getDownloadURL()
                .then(url=>{
                    this.props.imagenCargada(url)
                    this.setState({photo: ''})
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
         })
         .catch(error => console.log(error))
    }

    render(){

        return(
            <View style={styles.container}>
            { this.state.permission ?
            this.state.mostrarCamara ? 
            <View style={styles.container}>
             <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={reference=> this.camera = reference }/>
            <TouchableOpacity style={styles.boton} onPress={()=> this.sacarFoto()}><Text>Sacar Foto</Text></TouchableOpacity>
            </View>
             :
             <React.Fragment>
             <Image style={styles.image} source={{uri: this.state.photo}}/>
             <View>
                 <TouchableOpacity onPress={()=> this.eliminarFoto()}><Text>X</Text></TouchableOpacity>
                 <TouchableOpacity onPress={()=> this.guardarFoto()}><Text>SI</Text></TouchableOpacity>
             </View>
             </React.Fragment>
             :
             <Text>No tiene permisos</Text> 
              }
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camera: {
        flex: 7
    },
    boton: {
        flex: 1,
        justifyContent: "center"
        
    },
    image: {
        flex: 1
    }
})

export default MyCamera;