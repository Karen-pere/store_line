import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
var { width } = Dimensions.get("window")

// import Components
import Home from './screens/Home'
import Cart from './screens/Cart'
import Address from './screens/Address'
console.disableYellowBox = true;
// import icons
import Icon from 'react-native-vector-icons/Ionicons';

export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            module: 1,
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {
                    this.state.module == 1 ? <Home />
                        : this.state.module == 2 ? <Cart />
                            : <Address />

                }
                <View style={styles.bottomTab}>
                    <TouchableOpacity style={styles.itemTab} onPress={() => this.setState({ module: 1 })}>
                        <Icon name="md-restaurant" size={40} color={this.state.module == 1 ? "#900" : "gray"} />
                        <Text style={{ color: "black" }}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemTab} onPress={() => this.setState({ module: 2 })}>
                        <Icon name="md-basket" size={40} color={this.state.module == 2 ? "#900" : "gray"} />
                        <Text style={{ color: "black" }}>Carrito</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemTab} onPress={() => this.setState({ module: 3 })}>
                        <Icon name="md-map" size={40} color={this.state.module == 3 ? "#900" : "gray"} />
                        <Text style={{ color: "black" }}>Ubicacion</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    bottomTab: {
        height: 70,
        width: width,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 5,
        shadowOpacity: 0.3,
        shadowRadius: 50,
    },
    itemTab: {
        width: width / 4,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});