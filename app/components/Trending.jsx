import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { useState } from "react";
import icons from "../../constants/icons";
import EmptyState from "./EmptyState";
import { useVideoPlayer, VideoView, video } from "expo-video";
import { StyleSheet } from "react-native";
import { ResizeMode, Video } from "expo-av";
import WebView from "react-native-webview";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  //console.log(`item is ${item.video}`);
  const player = useVideoPlayer({ uri: item.video }, (player) => {
    player.loop = true;
    player.staysActiveInBackground = true;
  });
  const finalString = item.video + ".mp4";
  const finalUri = encodeURI(finalString);
  //  console.log(`final uri is: ${finalUri}`);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <View
          className="h-72 w-52  mt-3 bg-black/10"
          style={{
            borderRadius: 150,
          }}
        >
          {/* <VideoView
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            startsPictureInPictureAutomatically
            style={{
              width: "90%",
              height: "90%",
              position: "relative",
              top: 0,
              left: 0,
              marginTop: "10",
              borderRadius: 30,
            }}
            contentFit="fill"
          /> */}
          <WebView
            source={{ uri: item.video + ".mp4" }}
            // style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsFullscreenVideo={true}
            className="rounded-3xl "
            //resize container
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 60,
              // borderRadius: "30px",
              //add border radius 30px
              backgroundColor: "black",
            }}
          />
          {/* <Video
            source={{ uri: finalUri }}
            resizeMode={ResizeMode.CONTAIN}
            className="w-52 h-72 rounded-xl mt-3"
          /> */}
        </View>
      ) : (
        //</View>
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            setPlay(true);
            player.play();
          }}
        >
          <ImageBackground
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            source={{ uri: item.thumbnail }}
          />
          <Image
            source={icons.play}
            className="h-12 w-12 items-center justify-center absolute"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const filteredPosts = posts.filter((item) => item != undefined);

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={filteredPosts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      horizontal
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
      ListEmptyComponent={() => (
        <EmptyState
          title="No Videos Found"
          subtitle="Be the first one to upload a video"
        />
      )}
    />
  );
};

export default Trending;
