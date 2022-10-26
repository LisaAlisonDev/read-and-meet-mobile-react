// Import React and Component
import React, { useState, createRef, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
    TouchableHighlight,
    Button,
    SafeAreaView,
    Alert,
} from 'react-native';
import requiredErrorText from '../components/Errors';
import { AxiosContext } from '../context/api/AxiosContext';
import styles from '../theme/styles';

type FormValues = {
    name: string;
    password: string;
    email: string;
};


const RegisterScreen = () => {
    const { handleSubmit, control, getValues, formState: { errors, isValid } } = useForm({
        defaultValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: ''
        }, mode: 'onBlur'
    });

    const { publicAxios } = useContext(AxiosContext);

    const onSubmit = async (data: any) => {
        try {
            const response = await publicAxios.post('/inscription', {
                "email": data.email,
                "name": data.name,
                "password": data.password,
            });

            // todo : add functionnality after register an user
        } catch (error) {
            console.log(error.response)
            Alert.alert("Erreur", error?.response?.data);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
              <Text style={styles.h1}>Bienvenue  !</Text>

            <Controller
                name='name'
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                    <View style={styles.inputView}>
                        <TextInput style={styles.TextInput} onChangeText={value => onChange(value)} value={value} placeholder="Entrez votre nom" onBlur={onBlur} />
                    </View>
                )}
                rules={{
                    required: true,
                }} />

            {errors?.name?.type == "required" && requiredErrorText()}

            <Controller
                name='email'
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                    <View style={styles.inputView}>
                        <TextInput style={styles.TextInput} onChangeText={value => onChange(value)} value={value} placeholder="Entrez votre email" onBlur={onBlur} />
                    </View>
                )}
                rules={{
                    required: true,
                    pattern: new RegExp(/[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g),
                }} />

            {errors?.email?.type == "pattern" && <Text> Ce champs doit être valide.</Text>}
            {errors?.email?.type == "required" && requiredErrorText()}

            <Controller
                name='password'
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                    <View style={styles.inputView}>
                        <TextInput style={styles.TextInput} onChangeText={value => onChange(value)} value={value} placeholder="Entrez votre mot de passe" onBlur={onBlur} />
                    </View>
                )}
                rules={{
                    required: true,
                }} />

            {errors?.password?.type == "required" && requiredErrorText()}
          
            <Controller
                name='confirmPassword'
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                    <View style={styles.inputView}>
                        <TextInput style={styles.TextInput} onChangeText={value => onChange(value)} value={value} placeholder="Confirmer votre mot de passe" onBlur={onBlur} />
                    </View>
                )}

                rules={{
                    required: true,
                    validate: value => value === getValues('password') || 'Password is not correct'
                }} />

            {errors?.confirmPassword?.type == 'required' && requiredErrorText()}
            {errors?.confirmPassword?.type == 'validate' && <Text style={styles.validationTextError}> Veuillez entrer des mots de passe identique.</Text>}

            <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.loginText}>CONFIRMER</Text>
          </TouchableOpacity>
    
        </SafeAreaView>
    )
}
export default RegisterScreen;
