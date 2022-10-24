import {
    StyleSheet,
  } from "react-native";
import { mainColor } from "./constant";

export default StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          padding: 30
        },
        image: {
          marginBottom: 40,
          position: "relative",
          marginHorizontal: "auto",
          alignItems: "center",
          textAlign: "center",
          width: 50,
          height: 50
        },
        h1: {
          fontSize: 18,
          textAlign: "center"
        },
      
        inputView: {
          backgroundColor: "#e8d0ff",
          borderRadius: 30,
          width: "70%",
          height: 45,
          marginBottom: 20,
          alignItems: "center",
        },
      
        TextInput: {
          height: 50,
          flex: 1,
          padding: 10,
          marginLeft: 20,
        },
      
        forgot_button: {
          height: 30,
          marginBottom: 30,
        },
      
        loginBtn: {
          width: "80%",
          borderRadius: 25,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
          backgroundColor: mainColor,
          color: "#fff"
        },
        loginText: {
          color: "#fff"
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
    });