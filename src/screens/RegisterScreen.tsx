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
} from 'react-native';


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

    const onSubmit = (data: any) => console.log(data)


    const onChange = arg => {
        return {
            value: arg.nativeEvent.text,
        };
    };


    console.log('errors', errors);
    let emailInput = ''

    return (
        <SafeAreaView >
            <Controller
                name='email'
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                    <TextInput style={{ padding: 30, }} onChangeText={value => onChange(value)} value={value} placeholder="Entrez votre email" onBlur={onBlur} />
                )}
                rules={{
                    required: true,
                    pattern: new RegExp(/[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g),
                }} />

            {errors?.email?.type == "pattern" && <Text> Ce champs doit être valide.</Text>}
            {errors?.email?.type == "required" && <Text> Ce champs est requis.</Text>}


            <Controller
                name='name'
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                    <TextInput style={{ padding: 30, }} onChangeText={value => onChange(value)} value={value} placeholder="Entrez votre nom" onBlur={onBlur} />
                )}
                rules={{
                    required: true,
                }} />

            {errors?.name?.type == "required" && <Text> Ce champs est requis.</Text>}


            <Controller
                name='password'
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                    <TextInput style={{ padding: 30, }} onChangeText={value => onChange(value)} value={value} placeholder="Entrez votre mot de passe" onBlur={onBlur} />
                )}
                rules={{
                    required: true,
                }} />

            {errors?.password?.type == "required" && <Text> Ce champs est requis.</Text>}

            <Controller
                name='confirmPassword'
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                    <TextInput style={{ padding: 30, }} onChangeText={value => onChange(value)} value={value} placeholder="Confirmer votre mot de passe" onBlur={onBlur} />
                )}

                rules={{
                    required: true,
                    validate: value => value === getValues('password') || 'Password is not correct'
                }} />

            {errors?.confirmPassword?.type == 'validate' && <Text style={{ padding: 30, }}> Veuillez entrer des mots de passe identique.</Text>}


            <Button title='Confirmer' onPress={handleSubmit(onSubmit)} />
        </SafeAreaView>
    )
}
export default RegisterScreen;

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});