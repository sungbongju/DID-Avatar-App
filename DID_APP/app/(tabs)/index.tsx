import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  // 사용할 색상들
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
  
  // 현재 색상의 위치를 기억하는 변수
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  // 터치했을 때 색상 변경하는 함수
  const changeColor = () => {
    setCurrentColorIndex((prevIndex) => 
      (prevIndex + 1) % colors.length
    );
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors[currentColorIndex] }]}
      onPress={changeColor}
    >
      <Text style={styles.text}>화면을 터치하세요!</Text>
    </TouchableOpacity>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});