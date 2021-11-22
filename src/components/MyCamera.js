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
        this.setState({
            photo: "",
            mostrarCamara: true
        })
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
            <TouchableOpacity style={styles.boton} onPress={()=> this.sacarFoto()}><Text style={styles.sacarFoto}>Sacar Foto</Text></TouchableOpacity>
            </View>
             :
             <React.Fragment>
             <Image style={styles.image} source={{uri: this.state.photo}}/>
             <View style={styles.containerSiNo}>
                 <TouchableOpacity style={styles.botonNo} onPress={()=> this.eliminarFoto()}><Text style={styles.guardarBorrar}>Borrar</Text></TouchableOpacity>
                 <TouchableOpacity style={styles.botonSi} onPress={()=> this.guardarFoto()}><Text style={styles.guardarBorrar}>Guardar</Text></TouchableOpacity>
             </View>
             </React.Fragment>
             :
             <Text style={styles.permisos}>No tiene permisos.</Text> 
              }
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    guardarBorrar: {
        color: "white"
    },
    botonNo: {
        backgroundColor: "#006DB5",
        borderRadius: 10,
        textAlign: "center",
        padding: 5
    },
    botonSi: {
        backgroundColor: "#006DB5",
        borderRadius: 10,
        textAlign: "center",
        padding: 5
    },
    containerSiNo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 20
    },
    sacarFoto: {
        color: "white"
    },
    camera: {
        flex: 7,
    },
    boton: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        borderRadius: 5,
        backgroundColor: "#006DB5",
        marginTop: 20,
        width: 100,
        marginHorizontal: 140    
    },
    image: {
        flex: 1
    },
    permisos: {
        textAlign: "center",
        marginTop: 20
    }
})

export default MyCamera;