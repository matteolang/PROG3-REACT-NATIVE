import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image, FlatList} from "react-native"
import { StyleSheet} from "react-native"
import { auth, db } from "../Firebase/config";
import Post from "../components/Post";


class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
           posteos: []
        }
    }
    componentDidMount(){
        db.collection('posts').onSnapshot(
            docs =>{
                let posts = []
                docs.forEach(doc =>  posts.push({ id: doc.id , data: doc.data()}))
                
                let ordenados = posts.sort((a, b) => b.data.createdAt - a.data.createdAt)
                this.setState({posteos: ordenados})
            }

        )
    }
 
    render(){
        return(
            <View style={styles.posts}>
        <FlatList data={this.state.posteos} keyExtractor={ post => post.id} renderItem={ ({item}) => <Post postData={item}>{item.data.texto}</Post>}/>

            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginRight: 50,
        marginLeft: 50,
        height: 40,
        paddingTop:10,
        alignItems: "center",
        fontWeight: "bold"
    },
    touchable: {
        backgroundColor: "grey",
        marginTop: 10,
        marginRight: 50,
        marginLeft: 50,
        height: 40,
        paddingTop:10,
        borderRadius: 5,
        alignItems: "center"
    },

    texto: {
        fontWeight: "bold"
    },

    posts: {
        margin: 5
    }
    
})
export default Home;