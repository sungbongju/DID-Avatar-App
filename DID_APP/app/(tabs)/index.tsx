import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AvatarPIP from '@/components/AvatarPIP'; // 경로가 맞는지 확인해주세요

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
    // 제스처가 동작하려면 전체 화면을 GestureHandlerRootView로 감싸야 합니다.
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TouchableOpacity 
        style={[styles.container, { backgroundColor: colors[currentColorIndex] }]}
        onPress={changeColor}
        activeOpacity={1} // 터치 시 깜빡임 효과 제거
      >
        <Text style={styles.text}>화면을 터치하세요!</Text>
      </TouchableOpacity>

      {/* 여기에 PIP 컴포넌트를 추가하면 화면 위에 떠 있게 됩니다. */}
      <AvatarPIP />
    </GestureHandlerRootView>
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
