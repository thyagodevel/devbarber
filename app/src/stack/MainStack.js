import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Preload from "../screens/Preload";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="Preload" //Certifica a primeira tela a ser carregada
        screenOptions={{ //Esconde o conteudo da tela (Cabeçalho)
            headerShown: false //Desativa o cabeçalho da tela
        }}
    >
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
)