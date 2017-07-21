import React from 'react';
import ChesterWithRedux from './src/setup'
import {AppLoading, Font} from 'expo';
import cacheAssetsAsync from "./utilities/cacheAssetsAsync";
require('moment/locale/ru');

export default class App extends React.Component {

    state = {
        appIsReady: false,
    };

    render() {
        if (this.state.appIsReady) {
            return (
                <ChesterWithRedux/>
            );
        }
        else {
            return <AppLoading>

            </AppLoading>
        }

    }

    componentWillMount() {
        this._loadAssetsAsync();
    }

    async _loadAssetsAsync() {
        try {
            await cacheAssetsAsync({
                images: [
                    require('./assets/images/login&registration/login-bg.png'),
                    require('./assets/images/login&registration/login-logo.png'),
                    require('./assets/images/login&registration/russia-flag.png'),
                    require('./assets/images/navigation/nav-bg.png'),
                    require('./assets/images/background/background.png'),
                    require('./assets/images/cafe-1.png'),
                ],
                fonts: [
                    {  'Lumberjack': require('./assets/fonts/lumberjack.otf') },
                    {  'Mozzart-sketch': require('./assets/fonts/MozzartSketch/MozzartSketch-ExtraBold.otf') },

                ],
            });
        } catch (e) {
            console.warn(
                'There was an error caching assets (see: main.js), perhaps due to a ' +
                'network timeout, so we skipped caching. Reload the app to try again.'
            );
            console.log(e.message);
        } finally {
            this.setState({appIsReady: true});
        }
    }
}


