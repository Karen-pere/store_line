import React, { Component, } from 'react';
import {
    Text,
    FlatList,
    Image,
    StyleSheet,
    Dimensions,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    VirtualizedList,
    SafeAreaView
} from 'react-native';
var { height, width } = Dimensions.get('window');
import Swiper from 'react-native-swiper'
import AsyncStorage from '@react-native-community/async-storage';
// import icons
import Icon from 'react-native-vector-icons/Ionicons';

export default class App extends Component {



    constructor(props) {
        super(props);
        this.state = {
            dataBanner: [],
            dataCategories: [],
            dataFood: [],
            selectCatg: 0
        }
    }



    componentDidMount() {
        const url = "http://tutofox.com/foodapp/api.json"
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataBanner: responseJson.banner,
                    dataCategories: responseJson.categories,
                    dataFood: responseJson.food
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }



    render() {

        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
                    <View style={{ width: width, alignItems: 'center' }} >
                        <Text
                            style={{
                                fontSize: 50,
                                color: "black",
                                fontWeight: '500',
                                letterSpacing: 1,
                                marginBottom: 10,
                                textAlign: 'center'
                            }}>
                            StoreLine
                        </Text>
                        <Swiper style={{ height: width / 2 }} showsButtons={false} autoplay={true} autoplayTimeout={2}>
                            {
                                this.state.dataBanner.map((itembann) => {
                                    return (
                                        <Image style={styles.imageBanner} resizeMode="contain" source={{ uri: itembann }} />
                                    )
                                })
                            }
                        </Swiper>
                        <View style={{ height: 20 }} />
                    </View>
                    <View style={{ width: width, borderRadius: 20, paddingVertical: 20, backgroundColor: 'white' }}>
                        <Text style={styles.titleCatg}>Categoria {this.state.selectCatg}</Text>

                        <FlatList
                            horizontal={true}
                            data={this.state.dataCategories}
                            renderItem={({ item }) => this._renderItem(item)}
                            keyExtractor={(item, index) => index.toString()}
                        />

                        <FlatList
                            data={this.state.dataFood}
                            numColumns={2}
                            renderItem={({ item }) => this._renderItemFood(item)}
                            keyExtractor={(item, index) => index.toString()}

                        />



                    </View>
                </View>
            </ScrollView>
        );
    }

    _renderItem(item) {
        return (
            <TouchableOpacity style={[styles.divCategorie, { backgroundColor: item.color }]}
                onPress={() => this.setState({ selectCatg: item.id })}>
                <Image
                    style={{ width: 100, height: 80 }}
                    resizeMode="contain"
                    source={{ uri: item.image }} />
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    _renderItemFood(item) {
        let catg = this.state.selectCatg
        if (catg == 0 || catg == item.categorie) {
            return (
                <TouchableOpacity style={styles.divFood}>
                    <Image
                        style={styles.imageFood}
                        resizeMode="contain"
                        source={{ uri: item.image }} />
                    <View style={{ height: ((width / 2) - 20) - 90, backgroundColor: 'transparent', width: ((width / 2) - 20) - 10 }} />
                    <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: "black" }}>
                        {item.name}
                    </Text>
                    <Text style={{ fontSize: 20, color: "green" }}>${item.price}</Text>
                    <TouchableOpacity
                        onPress={() => this.onClickAddCart(item)}
                        style={{
                            width: (width / 2) - 40,
                            backgroundColor: '#33c37d',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: "center",
                            borderRadius: 5,
                            padding: 4
                        }}>
                        <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>Comprar</Text>
                        <View style={{ width: 10 }} />
                        <Icon name="ios-add-circle" size={30} color={"white"} />
                    </TouchableOpacity>
                </TouchableOpacity>
            )
        }


    }
    onClickAddCart(data) {

        const itemcart = {
            food: data,
            quantity: 1,
            price: data.price
        }

        AsyncStorage.getItem('cart').then((datacart) => {
            if (datacart !== null) {
                // We have data!!
                const cart = JSON.parse(datacart)
                cart.push(itemcart)
                AsyncStorage.setItem('cart', JSON.stringify(cart));
            }
            else {
                const cart = []
                cart.push(itemcart)
                AsyncStorage.setItem('cart', JSON.stringify(cart));
            }
            alert("Add Cart")
        })
            .catch((err) => {
                alert(err)
            })
    }

}

const styles = StyleSheet.create({
    imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20
    },
    divCategorie: {
        backgroundColor: 'red',
        margin: 5, alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        color: "black"
    },
    titleCatg: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: "black"
    },
    imageFood: {
        width: ((width / 2) - 20) - 10,
        height: ((width / 2) - 20) - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -45
    },
    divFood: {
        width: (width / 2) - 20,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        shadowOpacity: 0.3,
        shadowRadius: 50,
        backgroundColor: 'white',
    }
});