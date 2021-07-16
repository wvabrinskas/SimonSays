import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated, TouchableOpacity, View } from 'react-native';

interface Props {
    value: number;
    backgroundColor: string;
    tapped: (value: number) => void;
    disabled: boolean;
    selected?: boolean;
}

const SimonButton = (props: Props) => {
  const { value, disabled, selected, tapped, backgroundColor, width, height } = props;

  const [opacity, setOpacity] = useState(1.0)
  const [timer, setTimer] = useState<NodeJS.Timer>();

  if (selected && timer == undefined) {
    const newTimer = setInterval(() => {
      if (opacity == 1.0) {
        setOpacity(0.2)
      } else {
        setOpacity(1.0)
        clearInterval(newTimer)
        setTimer(undefined)
      }
    }, 300)
    setTimer(newTimer)
  }

  return (
    <TouchableOpacity
     disabled={disabled}
     onPress={() => tapped(value)}
     style={{...styles.container, backgroundColor, width, height, opacity: opacity}}
    >
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 100, 
    height: 100,
    opacity: 1.0
  },
  fadingContainer: {
  }
});

SimonButton.defaultProps = {
  value: 0,
  backgroundColor: "red",
  width: "50%", 
  height: "50%", 
  disabled: false
}

export default SimonButton;