import React from 'react';
import {
    Body, Button, Card, CardItem, Container, Content, Icon, Left, List, ListItem, Right, Text,
    View
} from 'native-base';
import {Image, TouchableOpacity} from "react-native";
import platform from "../../../../native-base-theme/variables/platform";
import ChesterIcon from "../../Common/ChesterIcon/index";
import {signStackStyle} from "../../../routers/SignStack";
import Collapsible from 'react-native-collapsible';
import SearchInput from "../common/SearchInput/index";
const SECTIONS = [
    {
        title: 'Мясо'
    },
    {
        title: 'Салаты'
    },
    {
        title: 'Гарниры'

    },
    {
        title: 'Десерты'
    },
    {
        title: 'Бар',
        items: [
            {
                title: 'Апперитивы и биттеры'
            },
            {
                title: 'Игристые вина'
            },
            {
                title: 'Вина белые'
            }
        ]
    }
];
export default class Menu extends React.Component {

    state = {
        activeSection: null
    };


    changeState(item) {

        if (this.state.activeSection === item) {
            this.setState({
                activeSection: null
            })
        }
        else {
            this.setState({
                activeSection: item
            })
        }

    }


    _renderHeader(section,category) {
        return (
            <View>
                <TouchableOpacity


                    style={styles.listItem}
                    onPress={() => {


                        if(category)
                        {
                            this.changeState(section.title)
                        }
                        else
                        {
                            this.props.navigation.navigate('Category', {name: section.title})
                        }


                    }}>


                    <Text style={styles.listItemText}>{section.title}</Text>

                    <View>
                        {
                            this.state.activeSection === section.title ?
                                <Icon style={styles.listItemIcon} name="arrow-up"/>
                                : <Icon style={styles.listItemIcon} name="arrow-forward"/>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    _renderContent(section) {

        return (
            <List dataArray={section.items}
                  renderRow={(item) =>
                      <View>
                          <TouchableOpacity


                              style={styles.subListItem}
                              onPress={() => {

                                  this.props.navigation.navigate('Category', {name: item.title})

                              }}>

                              <View style={styles.subListItemBody}>
                                  <ChesterIcon size={6} name="bullet" color={platform.brandDivider}/>
                                  <Text style={styles.subListItemText}>{item.title}</Text>
                              </View>


                              <View>
                                  <Icon style={styles.subListItemIcon} name="arrow-forward"/>
                              </View>
                          </TouchableOpacity>
                      </View>

                  }>
            </List>
        );
    }


    render() {

        return (

            <View style={styles.container}>
                <Container>
                    <Content>


                        <SearchInput onChangeText={() => {

                        }}/>
                        {SECTIONS.map((item, i) => {

                            if (item.items) {
                                return (
                                    <View key={i}>
                                        {this._renderHeader(item,true)}
                                        <Collapsible collapsed={this.state.activeSection !== item.title}>
                                            {this.state.activeSection === item.title ? this._renderContent(item) :
                                                <View/>}
                                        </Collapsible>

                                    </View>)
                            }
                            else {
                                return (
                                    <View key={i}>
                                        {this._renderHeader(item)}
                                    </View>)
                            }


                        })}


                    </Content>
                </Container>
            </View>

        );
    }
}


const styles = {
    container: {
        flex: 1,
        backgroundColor: '#2B3034',
        paddingTop: 7,
        zIndex: 1
    },
    listItem: {
        height: 52,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: platform.brandDivider,
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingHorizontal: 16

    },
    listItemText: {
        fontFamily: platform.fontFamily,
        fontSize: 18,
        lineHeight: 20
    },
    listItemIcon: {
        fontSize: 16,
        color: platform.brandListItem,

    },

    subListItem: {
        height: 52,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: platform.brandDivider,
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingHorizontal: 16

    },
    subListItemBody: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    subListItemText: {
        marginLeft: 10,
        fontFamily: platform.fontFamily,
        fontSize: 18,
        lineHeight: 20,
        color: platform.brandListItem,
    },
    subListItemIcon: {
        fontSize: 16,
        color: platform.brandListItem,

    }

};