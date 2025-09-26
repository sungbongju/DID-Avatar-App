import React from 'react';
import { StyleSheet, useWindowDimensions, Text, View, TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const AvatarPIP = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  // 컴포넌트 크기 및 화면 여백 설정
  const PIP_WIDTH = 180;
  const PIP_HEIGHT = 101;
  const MARGIN = 16;
  const SAFE_AREA_TOP = 40;
  const ESTIMATED_TAB_BAR_HEIGHT = 30;

  // 컴포넌트의 실제 위치를 저장하는 변수
  const offsetX = useSharedValue(screenWidth - PIP_WIDTH - MARGIN);
  const offsetY = useSharedValue(screenHeight - PIP_HEIGHT - MARGIN - ESTIMATED_TAB_BAR_HEIGHT);
  
  // 애니메이션에 사용될 시각적 위치를 별도로 관리합니다.
  const animatedX = useSharedValue(offsetX.value);
  const animatedY = useSharedValue(offsetY.value);

  const start = useSharedValue({ x: 0, y: 0 });
  const isExpanded = useSharedValue(false);
  const isVisible = useSharedValue(true);

  const animationConfig = { duration: 350 };

  // 닫기/열기 버튼 함수
  const closePip = () => {
    isVisible.value = false;
  };

  const openPip = () => {
    // 다시 열 때 위치를 우측 하단으로 초기화합니다.
    const initialX = screenWidth - PIP_WIDTH - MARGIN;
    const initialY = screenHeight - PIP_HEIGHT - MARGIN - ESTIMATED_TAB_BAR_HEIGHT;
    
    offsetX.value = initialX;
    offsetY.value = initialY;
    animatedX.value = initialX;
    animatedY.value = initialY;

    // 다시 열 때 항상 작은 PIP 창으로 시작하도록 확장 상태를 초기화합니다.
    isExpanded.value = false; 
    isVisible.value = true;
  };

  // 탭 제스처 로직을 변경하여 탭 위치를 확인합니다.
  const tapGesture = Gesture.Tap().onEnd((event, success) => {
    'worklet';
    if (!success) return;

    // 닫기 버튼의 좌표 영역 정의
    const closeButtonArea = {
        x_start: PIP_WIDTH - 24 - 8, // width - buttonWidth - rightMargin
        y_start: 4,                  // topMargin
        x_end: PIP_WIDTH - 8,        // width - rightMargin
        y_end: 4 + 24,               // topMargin + buttonHeight
    };

    // 탭한 위치가 닫기 버튼 영역 안인지 확인
    if (
        !isExpanded.value && // 작은 창일 때만 닫기 버튼 동작
        event.x > closeButtonArea.x_start &&
        event.x < closeButtonArea.x_end &&
        event.y > closeButtonArea.y_start &&
        event.y < closeButtonArea.y_end
    ) {
        // 'X' 버튼을 탭한 경우
        runOnJS(closePip)();
    } else {
        // 그 외 다른 곳을 탭한 경우
        isExpanded.value = !isExpanded.value;
        if (isExpanded.value) { // 확장될 때
            animatedX.value = withTiming(0, animationConfig);
            animatedY.value = withTiming(screenHeight / 2, animationConfig);
        } else { // 축소될 때
            animatedX.value = withTiming(offsetX.value, animationConfig);
            animatedY.value = withTiming(offsetY.value, animationConfig);
        }
    }
  });

  // 드래그 제스처
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      start.value = { x: offsetX.value, y: offsetY.value };
    })
    .onUpdate((e) => {
      offsetX.value = start.value.x + e.translationX;
      offsetY.value = start.value.y + e.translationY;
      animatedX.value = offsetX.value;
      animatedY.value = offsetY.value;
    })
    .onEnd(() => {
      const finalX = Math.max(MARGIN, Math.min(offsetX.value, screenWidth - PIP_WIDTH - MARGIN));
      const finalY = Math.max(MARGIN + SAFE_AREA_TOP, Math.min(offsetY.value, screenHeight - PIP_HEIGHT - MARGIN));
      offsetX.value = finalX;
      offsetY.value = finalY;
      animatedX.value = finalX;
      animatedY.value = finalY;
    });

  const composedGesture = Gesture.Race(panGesture, tapGesture);

  // PIP 창의 애니메이션 스타일
  const animatedPipStyle = useAnimatedStyle(() => {
    const opacity = withTiming(isVisible.value ? 1 : 0, animationConfig);
    const targetWidth = isExpanded.value ? screenWidth : PIP_WIDTH;
    const targetHeight = isExpanded.value ? screenHeight / 2 : PIP_HEIGHT;
    const targetBorderRadius = isExpanded.value ? 0 : 12;

    return {
      opacity,
      width: withTiming(targetWidth, animationConfig),
      height: withTiming(targetHeight, animationConfig),
      borderRadius: withTiming(targetBorderRadius, animationConfig),
      transform: [
        { translateX: animatedX.value },
        { translateY: animatedY.value },
      ],
      pointerEvents: isVisible.value ? 'auto' : 'none',
    };
  });

  // 다시 열기 버튼의 애니메이션 스타일
  const reopenButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isVisible.value ? 0 : 1, { duration: 300 }),
      transform: [{ scale: withTiming(isVisible.value ? 0 : 1) }],
      pointerEvents: isVisible.value ? 'none' : 'auto',
    };
  });

  return (
    <>
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.container, animatedPipStyle]}>
          <View style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </View>
          <Text style={styles.placeholderText}>PIP Mode</Text>
        </Animated.View>
      </GestureDetector>

      <Animated.View style={[styles.reopenButton, reopenButtonStyle]}>
        <TouchableOpacity onPress={() => runOnJS(openPip)()}>
          <Text style={styles.reopenButtonText}>▶</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#2c3e50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 4,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  reopenButton: {
    position: 'absolute',
    bottom: 30,
    right: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  reopenButtonText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 4,
  },
});

export default AvatarPIP;

