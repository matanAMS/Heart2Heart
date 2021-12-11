import React, {useEffect, useContext, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    StyleSheet,
    Alert,
    Button
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormButton from '../Components/FormButton';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const EditProfile = ({navigation}) => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [userData, setUserData] = useState(null);

    const getUser = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('user')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log('Error', e);
        }
    }
    useEffect(async () => {

        let user = await getUser();
        console.log('user:', user);
        setUserData(user);


    }, [])

    const handleUpdate = async () => {

        let user = await getUser();
        console.log('user is:' + user)
        const _user = {
            userId: user.userId,
            password: user.password,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            UserName: userData.userName,
            userImage: user.userImage,
            gender: user.gender,
            description: userData.description,
            userType: user.userType

        };
         
        console.log(_user);
        fetch("http://proj4.ruppin-tech.co.il/UpdateUser", {
            method: "POST",
            body: JSON.stringify(_user),
            headers: new Headers(
                {"Content-Type": "application/json; charset=UTF-8", Accept: "application/json; charset=UTF-8"}
            )
        }).then((res) => {

            return res.json();
        }).then((result) => {
            console.log("Post => ", JSON.stringify(result));
            alert('הפרופיל התעדכן!')

            if (result) 
                navigation.navigate("ProfileScreen");
             else {
                alert("אופס, הוכנסו פרטים שגויים, אנא נסה שוב");
            }
        }, (error) => {
            console.log("error Post= ", error);
        });
    };

    const pickImage = async () => {
        console.log('choose image from libary')
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [
                4, 3
            ],
            quality: 1
        });

        console.log(result);

        if (! result.cancelled) {
            setImage(result.uri);
        }
    };


    const renderInner = () => (
        <View style={
            styles.panel
        }>
            <View style={
                {alignItems: 'center'}
            }>
                <Text style={
                    styles.panelTitle
                }>Upload Photo</Text>
                <Text style={
                    styles.panelSubtitle
                }>Choose Your Profile Picture</Text>
            </View>
            <TouchableOpacity style={
                    styles.panelButton
                }
                onPress={pickImage}>
                <Text style={
                    styles.panelButtonTitle
                }>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity style={
                    styles.panelButton
                }
                onPress={
                    () => bs.current.snapTo(1)
            }>
                <Text style={
                    styles.panelButtonTitle
                }>Cancel</Text>
            </TouchableOpacity>
        </View>
    );

    const renderHeader = () => (
        <View style={
            styles.header
        }>
            <View style={
                styles.panelHeader
            }>
                <View style={
                    styles.panelHandle
                }/>
            </View>
        </View>
    );

    let bs = React.createRef();
    let fall = new Animated.Value(1);

    return (
        <View style={
            styles.container
        }>
            <BottomSheet ref={bs}
                snapPoints={
                    [330, -5]
                }
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}/>
            <Animated.View style={
                {
                    margin: 20,
                    opacity: Animated.add(0.1, Animated.multiply(fall, 1.0))
                }
            }>
                <View style={
                    {alignItems: 'center'}
                }>
                    <TouchableOpacity onPress={
                        () => bs.current.snapTo(0)
                    }>
                        <View style={
                            {
                                height: 100,
                                width: 100,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }
                        }>
                            <ImageBackground source={
                                    {
                                        uri: image ? image : userData ? userData.userImage || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                                    }
                                }
                                style={
                                    {
                                        height: 100,
                                        width: 100
                                    }
                                }
                                imageStyle={
                                    {borderRadius: 15}
                            }>
                                <View style={
                                    {
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }
                                }>
                                    <MaterialCommunityIcons name="camera"
                                        size={35}
                                        color="#fff"
                                        style={
                                            {
                                                opacity: 0.7,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderWidth: 1,
                                                borderColor: '#fff',
                                                borderRadius: 10
                                            }
                                        }/>
                                    
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <Text style={
                        {
                            marginTop: 10,
                            fontSize: 18,
                            fontWeight: 'bold'
                        }
                    }>
                        {
                        userData ? userData.firstName : ''
                    }
                        {
                        userData ? userData.lastName : ''
                    } </Text>
                    {/* <Text>{user.uid}</Text> */} </View>

                <View style={
                    styles.action
                }>
                    <FontAwesome name="user-o" color="#333333"
                        size={20}/>
                    <TextInput placeholder="שם פרטי" placeholderTextColor="#666666"
                        autoCorrect={false}
                        value={
                            userData ? userData.firstName : ''
                        }
                        onChangeText={
                            (txt) => setUserData({
                                ...userData,
                                firstName: txt, userName: txt + " " + userData.lastName
                            })
                        }
                        style={
                            styles.textInput
                        }/>
                </View>
                <View style={
                    styles.action
                }>
                    <FontAwesome name="user-o" color="#333333"
                        size={20}/>
                    <TextInput placeholder="שם משפחה" placeholderTextColor="#666666"
                        value={
                            userData ? userData.lastName : ''
                        }
                        onChangeText={
                            (txt) => setUserData({
                                ...userData,
                                lastName: txt,userName: userData.firstName + " " + txt
                            })
                        }
                        autoCorrect={false}
                        style={
                            styles.textInput
                        }/>
                </View>
                <View style={
                    styles.action
                }>
                    <Ionicons name="ios-clipboard-outline" color="#333333"
                        size={20}/>
                    <TextInput multiline
                        numberOfLines={3}
                        placeholder="קצת עליך"
                        placeholderTextColor="#666666"
                        value={
                            userData ? userData.description : ''
                        }
                        onChangeText={
                            (txt) => setUserData({
                                ...userData,
                                description: txt
                            })
                        }
                        autoCorrect={true}
                        style={
                            [
                                styles.textInput, {
                                    height: 40
                                }
                            ]
                        }/>
                </View>
                <View style={styles.action}>
                <Button title="בחר תמונה"onPress={pickImage}/>
                </View>
                <View style={
                    styles.action
                }>
                    <MaterialCommunityIcons name="map-marker-outline" color="#333333"
                        size={20}/>
                    <TextInput placeholder="עיר" placeholderTextColor="#666666"
                        autoCorrect={false}
                        value={
                            userData ? userData.city : ''
                        }
                        onChangeText={
                            (txt) => setUserData({
                                ...userData,
                                city: txt
                            })
                        }
                        style={
                            styles.textInput
                        }/>
                </View>
                <FormButton buttonTitle="עדכן פרטים"
                    onPress={handleUpdate}/>
            </Animated.View>
        </View>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        width: '100%'
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {
            width: -1,
            height: -3
        },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    panelHeader: {
        alignItems: 'center'
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10
    },
    panelTitle: {
        fontSize: 27,
        height: 35
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#2e64e5',
        alignItems: 'center',
        marginVertical: 7
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white'
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: 1,
        paddingLeft: 10,
        color: '#333333'
    }
});
