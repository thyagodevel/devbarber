import React, { useState } from "react";
import { Platform } from "react-native"; // Informacoes da plataforma
import { useNavigation } from "@react-navigation/native"; // navegar entre as telas
import { request, PERMISSIONS } from "react-native-permissions"; // pedir permissoes
import Geolocation from "@react-native-community/geolocation"; // pegar localizacao

import {
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    SearchButton,

    LocationArea,
    LocationInput,
    LocationFinder,

    loadingIcon,
    LoadingIcon,

} from "./styles";

import SearchIcon from "../../assets/search.svg";
import MyLocationIcon from "../../assets/my_location.svg";


export default () => {

    const navigation = useNavigation();

    const [locationText, setLocationText] = useState("");
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    const handleLocationFinder = async () => {
        setCoords(null);

        let result = await request(
            Platform.OS === "ios" ?
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                :
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );

        if (result == "granted") {
            setLoading(true);
            setLocationText("");
            setList([]);

            Geolocation.getCurrentPosition((info) => {
                setCoords(info.coords);
                getBarbers();
            });
        }
    }

    const getBarbers = async () => {
        
    }

    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTitle>
                    <SearchButton onPress={() => navigation.navigate("Search")}>
                        <SearchIcon width="26" height="26" fill="#FFFFFF" />
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText= {t=>setLocationText(t)}
                    />
                    <LocationFinder onPress={handleLocationFinder } >
                        <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
                    </LocationFinder>
                </LocationArea>

                {loading &&
                    <LoadingIcon  size="large" color="#FFFFFF" />
                }
                
                 
            </Scroller>
        </Container>
    );
}