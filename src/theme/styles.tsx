import { Raleway_400Regular } from "@expo-google-fonts/raleway";
import {
    StyleSheet,
  } from "react-native";
import { mainColor, secondaryColor } from "./constant";


export default StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
        },
        h1: {
          fontFamily: "Raleway_400Regular",
          fontSize: 20,
          textAlign: "center",
          marginBottom: 10,
        },
        margingTop5: {
          marginTop: 10,
        },
        avatarImage:{
          resizeMode: 'contain',
          alignSelf: 'center',
          justifyContent: "center",
          borderRadius: 50,
          marginBottom: 20,
          alignItems: "center",
          textAlign: "center",
          width: 100,
          height: 100
        },
        buttonStyle: {
          alignItems: 'center',
          backgroundColor: '#DDDDDD',
          padding: 10,
          width: '100%',
          marginTop: 16,
        },
        title1: {
            textAlign: 'center',
            fontWeight: 'bold'
        },
        navigationBar: {
            justifyContent: 'center',
            flex: 1,
            padding: 0,
        },
        homeContainer: {
          justifyContent: 'center',
          flex: 1,
          padding: 30,
      },
      logoutBtn: {
        width: "90%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: mainColor,
        fontFamily: "Raleway_400Regular",
        color: "#fff"
      },
      contentText : {
        fontFamily : "Gudea_400Regular"
      }
    });

