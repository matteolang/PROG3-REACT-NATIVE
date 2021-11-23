import React from "react";
import { NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator} from "@react-navigation/drawer";
import { StyleSheet} from "react-native"

import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register"
import { Component } from "react";
import { auth } from "../Firebase/config";
import MiPerfil from "../screens/miPerfil";
import Postform from "../screens/Postform"
import Buscador from "../screens/Buscador"


const Drawer = createDrawerNavigator()

class Menu extends Component{
    constructor(){
        super();
        this.state = {
            loggedIn: false,
            dataUser: '',
            dataErrorLogin: '',
            dataErrorRegister: '',
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged(usuario => {
            if(usuario){
            this.setState({
                loggedIn: true,
                dataUser: usuario
            })
        } 
        })
    }

    register(email, pass){
        auth.createUserWithEmailAndPassword(email, pass)
        .then(()=> this.navigation.navigate('Login'))
        .catch(error => this.setState({dataErrorRegister: error.message}))
    }

    login(email,pass){
        auth.signInWithEmailAndPassword(email, pass)
        .then((response)=>{
           
            this.setState({loggedIn: true, dataUser: response.user})
            console.log(this.state.dataUser);
        })
        .catch(error => 
            this.setState({dataErrorLogin: error.message})
            )
    }

    logout(){
        auth.signOut()
        .then(()=>this.setState({loggedIn: false, user: ""}))
        . catch(error => console.log(error))
    }

    render(){
        if(this.state.loggedIn === true) {
            return (
                <NavigationContainer>
                    <Drawer.Navigator>
                        <Drawer.Screen name='Home' component={()=><Home/>}/>
                        <Drawer.Screen name='Mi Perfil' component={()=><MiPerfil dataUsuario={this.state.dataUser} logout={()=>this.logout()}/>} />
                        <Drawer.Screen name="New Post" component={(drawerProps)=> <Postform drawerProps={drawerProps}/>}/>
                        <Drawer.Screen name='Buscar' component={()=><Buscador/>}/>
                    </Drawer.Navigator> 
                </NavigationContainer>
            )
            } else {
                return (
                    <NavigationContainer>
                        <Drawer.Navigator>
                            <Drawer.Screen name='Login' component={()=><Login login={(email, pass)=>this.login(email, pass)} error={this.state.dataErrorLogin}/>}/>
                            <Drawer.Screen name='Register' component={(drawerProps)=> <Register drawerProps={drawerProps} register={(email, pass)=>this.register(email, pass)} error={this.state.dataErrorRegister}/>}/>
                        </Drawer.Navigator> 
                    </NavigationContainer>
                )
            }
    }
}

const styles = StyleSheet.create({
    navigationContainer: {
        backgroundColor: "#006DB5",
        borderColor: "#006DB5"
    }
})

export default Menu; 

