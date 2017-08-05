import React from 'react';
import {
    Body, Button, Card, CardItem, Container, Content, Icon, Left, List, ListItem, Right, Text,
    View
} from 'native-base';
import {Image, TouchableOpacity, Animated, LayoutAnimation, ScrollView, Modal, Picker} from "react-native";
import platform from "../../../../native-base-theme/variables/platform";
import ChesterIcon from "../../Common/ChesterIcon/index";
import {signStackStyle} from "../../../routers/SignStack";
import Collapsible from 'react-native-collapsible';
import SearchInput from "../common/SearchInput/index";
import CategoryList from "../Category/CategoryList";


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
        activeSection: null,
        results: null,
        isOpen: false,
        hour: 30
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

    _renderHeader(section, category) {
        return (
            <View>
                <TouchableOpacity


                    style={styles.listItem}
                    onPress={() => {


                        if (category) {
                            this.changeState(section.title)
                        }
                        else {
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


    onStartSearch(text) {
      
        let fake = [
            {
                name: "Салат греческий",
                id: 12,
                weight: 280,
                price: 240,
                fadeAnim: new Animated.Value(0),
            }, {
                name: "Руккола с беконом",
                id: 14,
                weight: 320,
                price: 340,
                fadeAnim: new Animated.Value(0),
            },
            {
                name: "Салат из баклажанов", id: 16, weight: 280, price: 300,
                fadeAnim: new Animated.Value(0),
            },
            {
                name: "Салат греческий",
                id: 119,
                weight: 280,
                price: 240,
                fadeAnim: new Animated.Value(0),
            }, {
                name: "Руккола с беконом",
                id: 20,
                weight: 320,
                price: 340,
                fadeAnim: new Animated.Value(0),
            },
            {
                name: "Салат из баклажанов", id: 21, weight: 280, price: 300,
                fadeAnim: new Animated.Value(0),
            }
        ];
        if (text.length > 0) {

            this.setState({
                text: text,
                results: fake.filter((item) => item.name.includes(text))
            });
        }
        else {
            this.setState({
                results: null
            })
        }

    }


    render() {

        return (

            <View style={styles.container}>


                <Container style={{flex: 1}}>
                    <Content keyboardShouldPersistTaps="always" style={{flex: 1, minHeight: '100%'}}>


                        <SearchInput onChangeText={(text) => {

                            this.onStartSearch(text)
                        }}/>


                        {this._renderList()}


                    </Content>
                </Container>
            </View>

        );
    }


    _renderList() {

        if (!this.state.results) {
            return SECTIONS.map((item, i) => {
                if (item.items) {
                    return (
                        <View key={i}>
                            {this._renderHeader(item, true)}
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

            });
        }
        else {
            if (this.state.results.length > 0) {
                return (<CategoryList data={this.state.results} navigation={this.props.navigation}/>)
            }
            else {
                return <View style={{alignItems: 'center', marginTop: 40}}>

                    <View style={{alignItems: 'center', width: 300}}>
                        <Text style={{
                            fontSize: 22,
                            lineHeight: 33,
                            textAlign:'center'
                        }}>Не найдено</Text>
                        <Text style={{
                            fontSize: 16,
                            lineHeight: 24,
                            textAlign:'center'
                        }}>Поиск «{this.state.text}» не дал результатов. Попытайтесь задать что-нибудь другое.</Text>


                    </View>

                </View>
            }

        }


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