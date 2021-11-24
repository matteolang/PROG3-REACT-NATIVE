import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image, FlatList, TextInput} from "react-native"
import { StyleSheet} from "react-native"
import { auth, db } from "../Firebase/config";
import Post from "../components/Post";


class Buscador extends Component{
    constructor(props){
        super(props);
        this.state = {
           buscado: "",
           posteos: [],
           posteosBuscados: [],
           resultados: false
        }
    }

    componentDidMount(){
        db.collection('posts').onSnapshot(
            docs => {
                let posts = []
                docs.forEach(doc =>  posts.push({ id: doc.id , data: doc.data()}))
                this.setState({posteos: posts})
            }
        )
    }

    componentDidUpdate(){
       
                let posteosBuscados = this.state.posteos.filter(post => post.data.owner.toLowerCase().includes(this.state.buscado.toLowerCase()) )
                if(posteosBuscados.length > 0){
                this.setState({posteosBuscados: posteosBuscados, resultados: true})
                } else {
                    this.setState({resultados: false})
                }
            

        
        
    }
 

 
    render(){
        return(
            <View >
                <TextInput
            style={styles.field}
            keyboardType='default'
            placeholder='Buscar...'
            secureTextEntry={false}
            onChangeText={ text => this.setState({buscado: text})}
            />

           {this.state.resultados ? 
           
           <FlatList data={this.state.posteosBuscados} keyExtractor={ post => post.id} renderItem={ ({item}) => <Post postData={item}></Post>}/>

           : 

           <Text>No se encontraron publicaciones del usuario que estas buscando.</Text>

        }

            
            </View>
        )
    }

}

const styles = StyleSheet.create ({
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
})

export default Buscador;