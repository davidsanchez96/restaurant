import React from 'react';
import {
    Body, Button, Card, CardItem, Container, Content, Icon, Left, List, ListItem, Right, Text,
    View
} from 'native-base';
import {FlatList, Image, ListView, RefreshControl, TouchableOpacity} from "react-native";
import platform from "../../../../native-base-theme/variables/platform";
import ChesterIcon from "../../Common/ChesterIcon/index";
import {signStackStyle} from "../../../routers/SignStack";
import OneNews from "../OneNews/index";
import {getNews} from "../../../actions/news";
import {connect} from "react-redux";

class News extends React.Component {

    state = {};

    componentWillMount() {
        this.props.getNews();
    }

    _onRefresh = () => {
        this.props.getNews();
    };

    render() {

        let news = [
            {name: 'Открытие'}
        ];
        return (
            <Image source={require('../../../../assets/images/background/background.png')} style={signStackStyle}>

                <View style={styles.container}>


                    <FlatList
                        ListHeaderComponent={() => {
                            return <Text style={styles.header}>
                                Новости и акции
                            </Text>
                        }}
                        data={this.props.news}
                        renderItem={(rowData) => <View style={{marginBottom: 25}}>
                            <OneNews data={rowData.item}/>
                        </View>}
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
        getNews: () => {
            return dispatch(getNews());
        }
    };
}
const mapStateToProps = state => ({
    news: state.news.news,
    isPending: state.news.getNewsPending
});
const NewsSwag = connect(mapStateToProps, bindAction)(News);
export default NewsSwag;

const styles = {
    container: {
        flex: 1,
    },
    header: {
        color: platform.brandWarningAccent,
        fontFamily: platform.fontFamily,
        fontSize: 28,
        lineHeight: 40,
        marginBottom: 14,
        marginTop: 15,
        paddingHorizontal: 16
    },

};