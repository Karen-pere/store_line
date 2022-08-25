import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import MapView from 'react-native-maps';

export default class Address extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: "",
            latitude: 19.341353114677098,
            longitude: -99.47773340740021

        };
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "white" }}>
                <View style={{ height: 20 }} />
                <Text style={{ fontSize: 32, fontWeight: "bold", color: "#33c37d" }}>UBICACIÓN</Text>
                <View style={{ height: 10 }} />
                <Text style={{ color: "black" }}>DONDE NOS UBICAMOS</Text>

                <MapView
                    style={{ width: 350, height: 550 }}
                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.0042,
                        longitudeDelta: 0.0121,
                    }}
                />

            </View>
        );
    }
}