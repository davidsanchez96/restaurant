import React from 'react';
import {Body, Button, Card, CardItem, Container, Content, Icon, Left, Right, Text, View} from 'native-base';
import {FlatList, Image, RefreshControl, TouchableOpacity} from "react-native";
import platform from "../../../../native-base-theme/variables/platform";
import ChesterIcon from "../../Common/ChesterIcon/index";
import RestaurantLocation from "../common/RestaurantLocation/index";
import {connect} from "react-redux";
import {signStackStyle} from "../../../routers/SignStack";
import {LinearGradient} from "expo";
import TimeService from "../../../services/TimeService";
import {Drawer} from 'native-base';
import {CustomNavigationDrawerSwag} from "../../../routers/NavigationDrawer";
import {getRestaurants} from "../../../actions/restaurant";
class Restaurants extends React.Component {

    updateSchedule() {

        if (this.props.restaurants) {
            Object.keys(this.props.restaurants).map((key, i) => {
                let item = this.props.restaurants[key];

                let service = new TimeService();
                this.days = service.getTimesheet(item.schedule);
                item.currentDay = this.days.find((item) => item.isCurrent);

            });
        }


    }


    _renderItem = ({item}) => {
        return <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('Restaurant', {key: item.id})
        }}>


            <Card style={{...styles.card, ...styles.cardTransparent}}>
                <CardItem cardBody style={styles.cardTransparent}>
                    <Image source={{uri: item.photos[0].url}}
                           style={styles.image}/>
                    <LinearGradient
                        colors={['#000', 'transparent']}
                        start={[0.5, 1]}
                        end={[0.5, 0]}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: 80,
                        }}
                    >


                    </LinearGradient>
                </CardItem>
                <CardItem style={styles.info}>

                    <Text
                        style={styles.infoHeader}>{item.title_short}</Text>


                    <RestaurantLocation restaurant={item}/>

                    <View style={styles.infoLine}>
                        <ChesterIcon name="time-16" size={16}
                                     color={platform.brandWarning}/>
                        <Text
                            style={styles.time}>{item.currentDay.isOpen ? 'Открыто' : "Закрыто"}</Text>
                    </View>

                </CardItem>


            </Card>

        </TouchableOpacity>
    }

    render() {
        this.updateSchedule();
        return (
            <Image source={require('../../../../assets/images/background/background.png')} style={signStackStyle}>


                <View style={styles.container}>


                    <FlatList

                        data={Object.keys(this.props.restaurants).map((key) => this.props.restaurants[key])}
                        renderItem={this._renderItem}
                        extraData={this.state}
                        keyExtractor={item => item.id}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.isPending}
                                onRefresh={this._onRefresh}
                                tintColor="#fff"
                                titleColor="#fff"
                            />
                        }
                    >

                    </FlatList>


                </View>

            </Image>
        );
    }
}
function bindAction(dispatch) {
    return {
        getRestaurants: () => {
            return dispatch(getRestaurants());
        }
    };
}
const mapStateToProps = state => ({
    restaurants: state.restaurant.restaurants,
    isPending: state.restaurant.getDataPending
});
const RestaurantsSwag = connect(mapStateToProps, bindAction)(Restaurants);
export default RestaurantsSwag;

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    content: {},
    card: {
        marginVertical: 30,
        marginTop: 30,
        marginLeft: 0,
        marginRight: 0,

        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {width: 0, height: 12},
        shadowOpacity: 0,
        shadowRadius: 13


    },

    cardTransparent: {
        backgroundColor: "transparent",
        borderWidth: 0,
        borderColor: 'transparent'
    },
    info: {
        paddingLeft: 16,
        backgroundColor: "transparent",
        borderWidth: 0,
        borderColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'column',
        alignItems: "flex-start"
    },
    infoHeader: {
        fontFamily: platform.fontFamily,
        fontSize: 30,
        lineHeight: 43
    },
    infoLine: {
        flexDirection: 'row',
        alignItems: "center"
    },
    time: {
        paddingLeft: 5,
        fontSize: 14,
        lineHeight: 20
    },
    image: {
        height: 160,
        width: null,
        flex: 1
    }
}