import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import  SimonButton from './Views/Button'; 

const colors = ['red', 'green', 'yellow', 'blue']
var buttons_disabled = false

function renderButtons() {
  const randoms = [...Array(4)].map(() => getRandomInt(0, colors.length - 1))
  const [selected, setSelected] = useState(-1)
  const [randomSelected, setRandomSelected] = useState(randoms)
  const [randomSelectedIndex, setRandomSelectedIndex] = useState(0)

  const list = []
  var i = 0
  for (const color of colors) {
    list.push(<SimonButton
      disabled={buttons_disabled} 
      tapped={ (value) => 
        buttonTapped(value)
      } value={i}
      selected={selected == i}
    backgroundColor={color}/>)
    i++
  }

  useEffect(() => {
    const toggle = setInterval(() => {
      if (randomSelectedIndex < randomSelected.length) {
        const newIndex = randomSelectedIndex + 1
        setSelected(randomSelected[newIndex])
        setRandomSelectedIndex(newIndex)
      } else {
        clearInterval(toggle);
      }
    }, 1000);

    return () => clearInterval(toggle);
  });

  return list
}

function getRandomInt(min: number, max: number) : number {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; 
}

//update state -> get value -> store it globally -> return
function buttonTapped(index: number) {

}

//timer then begin game

function startGame() {
  const [countDownNum, setCountDownNum] = useState(3);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const toggle = setInterval(() => {
      if (countDownNum > 0) {
        setCountDownNum(value => value - 1);
      } else {
        setIsHidden(true);
      }
    }, 1000);

    return () => clearInterval(toggle);
  });

  if (isHidden) {
    return null;
  }

  return <View style={overlayStyles.container}><Text style={textStyles.container}
  >{countDownNum}</Text></View>
}

export default function App() {
  return (
    <View style={styles.container}>
      {/* {startGame()} */}
      {renderButtons()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1, 
     flexDirection: 'row',
     flexWrap: 'wrap', 
  }
});

const overlayStyles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0, left: 0, 
    right: 0, bottom: 0, 
    position: "absolute", 
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const textStyles = StyleSheet.create({
  container: {
    textAlign: "center", 
    fontFamily: "Arial", 
    fontSize: 170, 
    fontWeight: 'bold',
    color: "whitesmoke", 
    textShadowColor: "black", 
    textShadowRadius: 5,
  }
});
