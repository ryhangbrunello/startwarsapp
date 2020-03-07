import { Button, Card, Input, Text, Layout } from '@ui-kitten/components';
import React, { Component, } from 'react';
import { inject, observer } from 'mobx-react';

import HomeStore from '../../stores/home.store';
import { StyleSheet } from 'react-native';
import { ROUTES_NAMES } from '../../routes';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
    homeStore: HomeStore,
    navigation: any
}

@inject('homeStore')
@observer
export default class Home extends Component<Props> {

    async componentDidMount() {
        const{getFilms}=this.props.homeStore;
        await getFilms();
    }
    render() {
        const { films } = this.props.homeStore;
    
        const navigateScreen = (id: number) => {
          const { navigate } = this.props.navigation;
          navigate(ROUTES_NAMES.Film, { id });
        }
    
        return (<Layout style={{ flex: 1, backgroundColor: 'black' }}>
          <ScrollView>
            {films.map((film, index) => (
              <Card onPress={() => navigateScreen(film.id)} key={index}>
                <Text style={styles.title}>{film.title}</Text>
                <Text>Episode {film.episode_id.toString()}</Text>
              </Card>
            ))}
          </ScrollView>
        </Layout>);
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: '10',
      padding: 8,
    },
    title: {
      fontSize: 20,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });