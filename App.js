/**
 * App sonidos 
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View, Image, SectionList, ScrollView, ListView, Header} from 'react-native';
const Realm = require('realm');
export const sonidoPerro = require('./sounds/perro/Dog-barking-sound-big-dog.wav'); 
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
import Sound from 'react-native-sound';
//import  {Animals}  from "./Animals";

const Animals = {//pico pal que lee
  Perro : {
    Archivos : [
      {title: "1", sound : require('./sounds/perro/Dog-barking-sound-big-dog.wav')}, 
      {title: "2", sound : require('./sounds/perro/Dog-barking-sounds.wav')}, 
      {title: "3", sound : require('./sounds/perro/Dog-barking-sound-sheeps-baa-background.wav')}
    ]
  },
  Gato: {
    Archivos : [
      {title: "1", sound : require('./sounds/gato/Cat-sound.wav')}
    ]
  },
  Sergio : {
    Archivos : [
      {title: "1", sound : require('./sounds/sergio/dia-de-mierda.mp3')}, 
        {title: "2", sound : require('./sounds/sergio/mentiroso.mp3')}, 
        {title: "3", sound : require('./sounds/sergio/mini-cuerno.mp3')}, 
        {title: "4", sound : require('./sounds/sergio/mm-que-paja.mp3')}, 
        {title: "5", sound : require('./sounds/sergio/puerco-putero.mp3')}, 
        {title: "6", sound : require('./sounds/sergio/que-paja-esperar.mp3')}, 
        {title: "7", sound : require('./sounds/sergio/rosario.mp3')}
    ],
    Imagen:  require('./images/sergio.jpg')
  }
};
type Props = {};
export default class App extends Component<Props> {
  
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { 
      realm: null, 
      TextButton : "Play", 
      Sound  : null,
      Animales : {},
      CurrentKeyBtn: null,
      dataSource: ds.cloneWithRows(['row 1', 'row 2'])
    };
    this.playSound = this.playSound.bind(this);
  }

  componentWillMount() {
    Realm.open({
      schema: [{name: 'Dog', properties: {name: 'string'}}]
    }).then(realm => {
      realm.write(() => {
        realm.create('Dog', {name: 'Rex'});
      });
      this.setState({ realm });
    });
  }

  render() {
    var info = this.state.realm
      ? 'Number of dogs in this Realm: ' + this.state.realm.objects('Dog').length
      : 'Loading...';
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Sonidos Don Sergio
          </Text>
          <Image style={{width: 250, height: 250}} source={Animals.Sergio.Imagen}/>
          {
            Animals.Perro.Archivos.map((file, i) =>{
              return (
                <Button title={i == this.state.CurrentKeyBtn ? "Stop" : "Play"} key={i} onPress={() => {
                  return this.playSound(this, file, i);
                }}/>
              );

            })

          }
          
        </View>
        <View >
          <Text >
            Sonidos Don Sergio
          </Text>
          {
            Animals.Perro.Archivos.map((file, i) =>{
              return (
                <Button title={i == this.state.CurrentKeyBtn ? "Stop" : "Play"} key={i} onPress={() => {
                  return this.playSound(this, file, i);
                }}/>
              );

            })

          }
          <Text >
            Sonidos Perro
          </Text>
          {
            Animals.Perro.Archivos.map((file, i) =>{
              return (
                <Button title={i == this.state.CurrentKeyBtn ? "Stop" : "Play"} key={i} onPress={() => {
                  return this.playSound(this, file, i);
                }}/>
              );

            })

          }
        </View>
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData}</Text>}
          />
        </View>
      </ScrollView>
    );
  }
  playSound(component,item, key) {
    var random = Math.floor(Math.random() * (Animals.Sergio.Archivos.length )) ;
    var url = Animals.Sergio.Archivos[random].sound;
    if(key == this.state.CurrentKeyBtn){
      this.setState({ 
        CurrentKeyBtn : null
      });
      if(component.state.Sound.isPlaying)
        component.state.Sound.stop();
    }else{
      this.setState({ 
        CurrentKeyBtn : key
      });
      const sound = new Sound(url, error => { 
        component.setState({Sound : sound})
        component.state.Sound.play((success) => {
          if (success) {
            this.setState({ 
              CurrentKeyBtn : null
            });
          } 
        });
      });

    }

    

    
    
    
  }


}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


