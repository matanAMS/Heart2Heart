import React, {useEffect} from "react";
import { View, StyleSheet, Image, Dimensions, Alert,Text,TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import UserImage from "./UserImage";
import {InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
  PostImg, PostText
} from '../styles/feedStyles';


///////// תמונות פרופיל שונות
/////לבדוק מחיקה ועריכה לפוסטים
//בדיקה של יוזר מול הפוסט, בפרופיל לא תקין
const PostCard = ({
post,
DeletePost,
reload,
user,

}) => {


let commentText='';
  if (post.comments == 1) {
    commentText = '1 תגובה';
  } else if (post.comments > 1) {
    commentText = post.comments + ' תגובות';
  } else {
    commentText = 'תגובה';
  }


console.log('user', user)

const DeletePostFunc = ()=>{
 DeletePost(post.postId);
 console.log(`test`, reload)
 reload();
}
 
    return(
        <View style={styles.feedItem}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                <Image source={{uri: post.userImage ? post.userImage || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
       style={styles.avatar} /> 
       
       </TouchableOpacity>
             {/* <UserImage user={{userImage,userID}} /> */}
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={styles.name}>{post.user_Name}</Text>
                            <Text style={styles.timestamp}>{(post.uploadDate)}</Text>
                        </View>
                        
                        <Ionicons name="ellipsis-vertical-outline" size={24} color="#73788B" />
                      
                    </View>
                    <PostText style={styles.post}>{post.description}</PostText>
               {post.postImage != "" ? <PostImg source={{uri: post.postImage}} /> : <Divider />}
                     <InteractionWrapper>
        <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <InteractionText>{commentText}</InteractionText>
        </Interaction>
        {user.userId == post.userId ? (
          <Interaction  onPress={() =>
              Alert.alert(`🚨`, `תרצה להסיר פוסט זה?`, [
                {
                  text: "לא",
                  style: "cancel",
                },
                {
                  text: "כן",
                  onPress: () => {
                  DeletePostFunc();
                  },
                },
              ])}>
          
            <Ionicons name="md-trash-bin" size={25} />
          </Interaction>
        ) : null}
      </InteractionWrapper>
                    {/* <View style={{ flexDirection: "row" }}>
                        <Ionicons name="heart-outline" size={24} color="#73788B" style={{ marginRight: 16 }} onPress={() =>{name="heart"} }/>
                        <Ionicons name="chatbox-outline" size={24} color="#73788B" />
                    </View> */}
                </View>
            </View> 
        
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECF4",
  },
  header: {
   
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

export default PostCard;