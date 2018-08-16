/**
 * App sonidos 
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';
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
var soundPerro1 = require('./sounds/perro/Dog-barking-sound-big-dog.wav');
var soundPerro2 = require('./sounds/perro/Dog-barking-sounds.wav');
var soundPerro3 = require('./sounds/perro/Dog-barking-sound-sheeps-baa-background.wav');
var soundGato1 = require('./sounds/gato/Cat-sound.wav');
var soundSergio1 = require('./sounds/sergio/dia-de-mierda.mp3');
var soundSergio2 = require('./sounds/sergio/mentiroso.mp3');
var soundSergio3 = require('./sounds/sergio/mini-cuerno.mp3');
var soundSergio4 = require('./sounds/sergio/mm-que-paja.mp3');
var soundSergio5 = require('./sounds/sergio/puerco-putero.mp3');
var soundSergio6 = require('./sounds/sergio/que-paja-esperar.mp3');
var soundSergio7 = require('./sounds/sergio/rosario.mp3');

const Animals = {//pico pal que lee
  Perro : {
    //Archivos : [{title: "1", sound : require('./sounds/perro/Dog-barking-sound-big-dog.wav')}, {title: "2", sound : require('./sounds/perro/Dog-barking-sound-big-dog.wav')}, {title: "3", sound : require('./sounds/perro/Dog-barking-sound-big-dog.wav')}]
    Archivos : [{title: "3", sound : require('./sounds/perro/Dog-barking-sound-big-dog.wav')}]
  },
  Gato: {
    Archivos : [soundGato1]
  },
  Sergio : {
    Archivos : [{title: "1", sound : soundSergio1}, {title: "2", sound : soundSergio2}, {title: "3", sound : soundSergio3}, {title: "4", sound : soundSergio4}, {title: "5", sound : soundSergio5}, {title: "6", sound : soundSergio6}, {title: "7", sound : soundSergio7}]
  }
};
type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { 
      realm: null, 
      TextButton : "Play", 
      Sound  : null,
      Animales : {},
      CurrentKeyBtn: null
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
      <View style={styles.container}>
        <Text style={styles.welcome}>
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
       
      </View>
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
    flex: 1,
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


