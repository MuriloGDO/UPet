import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const Loading = () => {
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const spinning = useSelector((state: RootState) => state.UiSlice.loading)

    useEffect(() => {
    const startRotation = () => {
        Animated.loop(
        Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 1000, 
            easing: Easing.linear,
            useNativeDriver: true,
        })
        ).start();
    };

    startRotation();
    }, [rotateAnim]);

    const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
    });

    return (
      <View style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: 0.8,
        position: 'absolute',
        zIndex: 1,
        elevation: spinning ? 5 : 0, 
        display: spinning ? 'flex' : 'none', 
        justifyContent: "center",
        alignItems: 'center',
      }}>
        <Animated.View style={{backgroundColor: "white", width:20, height:20, transform: [{ rotate: rotateInterpolate }],}} />
      </View>
    );
  };