import React from 'react';
import {connect} from "react-redux";
import {signStackStyle} from "../../../routers/SignStack";
import {FlatList, Image, ScrollView} from "react-native";

import {Text, View, Icon, Button} from "native-base";

import platform from "../../../../native-base-theme/variables/platform";
import HistoryShortInfo from "../common/HistoryShortInfo/index";
import FieldValue from "../common/FieldValue/index";
import historyStyles from "../common/historyStyle";


export default class BookTablePage extends React.Component {

    static navigationOptions = ({navigation, screenProps}) => ({
        title: navigation.state.params.name
    });

    state = {};

    componentWillMount() {

    }

    componentWillUnmount() {

    }


    render() {

        let history = this.props.navigation.state.params.history;


        return (<Image source={require('../../../../assets/images/background/background.png')} style={signStackStyle}>

            <ScrollView >
                <View style={historyStyles.scrollContainer}>

                    <HistoryShortInfo info={history}/>

                    <View style={styles.body}>
                        <FieldValue name="Имя и фамилия" value={history.name}/>
                        <FieldValue name="Телефон" value={history.phone}/>
                        <FieldValue name="Комментарий к заказу" value={history.comment}/>
                    </View>


                    <View style={styles.buttonBlock}>

                        <View style={{
                            width: '50%', paddingRight: 7,
                        }}>
                            <Button success full rounded
                                    style={{
                                        justifyContent: 'center'
                                    }}
                                    onPress={() => {

                                    }}

                            >
                                <Text>Отменить</Text>
                            </Button>
                        </View>

                        <View style={{
                            width: '50%', paddingLeft: 7,
                        }}>
                            <Button warning full rounded style={{
                                flex: 1,
                                marginLeft: 7,
                                justifyContent: 'center',
                                paddingLeft: 10,
                                paddingRight: 10,
                                overflow: 'hidden'
                            }}
                                    onPress={() => {

                                    }}>
                                <Text>Сохранить чек</Text>
                            </Button>
                        </View>
                    </View>
                </View>


            </ScrollView>
        </Image>)
    }
}


const styles = {
    container: {
        flex: 1,
    },
    body: {
        paddingHorizontal: 16,
        paddingVertical: 8,

    },
    buttonBlock: {
        marginTop: 'auto',
        marginBottom: 30,
        flexDirection: 'row',
        paddingHorizontal: 16,
        justifyContent: 'space-between'
    }
};