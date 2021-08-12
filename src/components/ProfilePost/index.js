import React, {useState, useCallback, useEffect} from 'react';
import {View, Alert, Text, TouchableWithoutFeedback, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import {Video } from 'expo-av';
import SlideVideo from '../Slide/slideVideo'
import styles from './styles';


//const CONTAINER_PADDING = Dimensions.get('window').width * .05
//const VIDEO_SIZE = Dimensions.get('window').width - (CONTAINER_PADDING * 2)
const VIDEO_SIZE = Dimensions.get('window').width/2 - 25


//import {API, graphqlOperation} from 'aws-amplify'
//import { deletePost } from '../../graphql/mutations';
//import {Storage} from 'aws-amplify';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Post = (props) => {
    const [post, setPost] = useState(props.post);
    //const [isLiked, setIsLiked] = useState(false);
    //const [paused, setPaused] = useState(false);   
    //const [isPlaying, setIsPlaying] = useState(true)        
    //const [videoUri, setVideoUri] = useState('');

    // const getVideoUri = async () => {
    //     console.log(post)
    //     console.log('profile')
    //     console.log(post.videos)
    //     if (post.videos.videoUri.startsWith('http')) {
    //       setVideoUri(post.videoUri);
    //       return;
    //     }
    //     //setVideoUri(await Storage.get(post.videoUri));
    //   };
    
    //   useEffect(() => {
    //     getVideoUri();
    //   },[]);


    // const onPlayPausePress = () => {
    //     console.log(paused)
    //     setPaused(!paused);
    // };

    const deleteVideo = async (post) => 
        Alert.alert(
        post.description,
        "Are you sure you want to delete this video?",
        [
            {
                text: "Cancel",
                onPress: () => console.log(post),
                style: "cancel",
            },
            {
                text: "Delete",
                //onPress: () => console.log(post.id),
                //onPress: () =>  API.graphql(graphqlOperation(deletePost, {input: {id:post.id}})),
                style: "cancel"
            }
        ],
        { cancelable: false }
    );

    //optimized renderItem
    const renderItem = useCallback(
        ({item, index}) => 
        //Renders slide video
        <SlideVideo index={index} videoUri={item.videoUri} videoSize={VIDEO_SIZE} />, []
        // <View style={styles.container}>
        //     {/* <TouchableWithoutFeedback onLongPress={() => deleteVideo(post)} onPress={onPlayPausePress} style={styles.videoPlayButton}> */}
        //     <TouchableWithoutFeedback onLongPress={() => deleteVideo(post)} style={styles.videoPlayButton}>
        //         <View>
        //             <Video
        //                 // source={{uri: post.item.videoUri}}
        //                 source={{uri: item.videoUri}}
        //                 style={styles.video}
        //                 onError={(e) => console.log(e)}
        //                 resizeMode= {'cover'}
        //                 isLooping = {true}
        //                 shouldPlay={false}
        //                 //paused={paused}
        //                 //shouldPlay={(props.currentIndex.current == props.index)}
        //             />

        //             {/* <View style={styles.uiContainer}> 
        //                 <Text style={styles.header1}>Title of Slide</Text>
        //                 <Text style={styles.header2}>8 days ago</Text>
        //             </View> */}

        //         </View>
        //     </TouchableWithoutFeedback>
            
        // </View>, []
    );
    
    //creates key for flatlist
    const keyExtractor = useCallback(
        (item) => item.id.toString(),[]
    );


    return (

        <View style={styles.container}>
            <FlatList
                data={post.videos}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                maxToRenderPerBatch={3}
                snapToInterval={VIDEO_SIZE + 20}
                snapToAlignment={'start'}
                decelerationRate={'fast'}
            />
            <Text style={styles.header1}>{post.slideTitle}</Text>
            <Text style={styles.header2}>{post.createdAt}</Text>
        </View>
    )
}

export default Post;