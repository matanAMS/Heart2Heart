import React, { useState,useCallback,useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";


 const PostScreenAmuta = ({ navigation }) => {
// temporary data until i connect DB
const [posts,setPosts] = useState([
  
  {
    id: "1",
    name: "נתקס אקנין",
    text: "לגור ברופין זה העתיד שקוויתי לעצמי",
    timestamp: 1569109273726,
    like: true,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage1.jpg"),
  },
  {
    id: "2",
    name: "אסף סמיילי",
    text: "מה יש שיעור היום? קמתי עכשיו אבל",
    timestamp: 1569109273726,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage2.jpg"),
  },
  {
    id: "3",
    name: "מתן אמס",
    text: "ואת מסובבת סיבובים סיבובים ",
    timestamp: 1569109273726,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage3.jpg"),
  },
  {
    id: "4",
    name: "שקד אברג'ל",
    text: "מחפש את האחת שתסכים לעוד אחת",
    timestamp: 1569109273726,
    avatar: require("../assets/shaked.jpg"),
    image: require("../assets/tempImage4.jpg"),
  },
]);


const LikeButton = (post) => {
  let allPosts = posts;
    
  for(let i = 0; i < posts.length; i++) {
    let item = allPosts[i];
    if(item.id == post.id){
      item.like = (item.like == undefined || item.like == false) ? true : false;
      break;
    }
  }

console.log(allPosts);
setPosts(allPosts);

};
 
   const renderPost2 = (post) => {
     return(
         <View style={styles.feedItem}>
        <Image source={post.avatar} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{post.name}</Text>
                <Text > {post.like}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>

            <TouchableOpacity>
              <Ionicons
                name="ellipsis-horizontal-outline"
                size={24}
                color="#73788B"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.post}>{post.text}</Text>
          <Image
            source={post.image}
            style={styles.postImage}
            resizeMode="cover"
          />
          <View style={{ flexDirection: "row" }}   >
        
            <TouchableOpacity onPress={() => LikeButton(post)}>
            {post.like ? 
            <Ionicons
                name="heart"
                size={32}
                color="black"
              />
              :
              <Ionicons
                name="heart-outline"
                size={32}
                color="black"
              />
            }
              {/* <Ionicons
                name="heart-outline"
                size={24}
                color="#73788B"
                style={{ marginRight: 16 }}
              /> */}
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="chatbubble-outline" size={24} color="#73788B" />
            </TouchableOpacity>
          </View>
        </View>
          </View>
     )
   }
      
       useEffect(() => {
         
       }, [])

    return (

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>פיד</Text>
          
        </View>

        <FlatList
          style={styles.feed}
          data={posts}
          renderItem={({ item }) => renderPost2(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
    
       
      );
 };
  

export default PostScreenAmuta;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECF4",
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});
