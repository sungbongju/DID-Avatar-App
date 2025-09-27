import React, { useState } from 'react';
// ✨ 추가: 사용자에게 알림을 띄우기 위한 Alert 임포트
import { StyleSheet, useWindowDimensions, Text, View, TouchableOpacity, Alert } from 'react-native';
import { WebView, WebViewPermissionRequest } from 'react-native-webview';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
// ✨ 추가: 마이크 권한 요청을 위한 Audio 임포트
import { Audio } from 'expo-av';

const AvatarPIP = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [showWebApp, setShowWebApp] = useState(false);

  // 컴포넌트 크기 및 화면 여백 설정
  const PIP_WIDTH = 180;
  const PIP_HEIGHT = 303;
  const MARGIN = 16;
  const SAFE_AREA_TOP = 40;
  const ESTIMATED_TAB_BAR_HEIGHT = 30;

  const STREAMLIT_URL = 'https://d-id-agents-dc48mx8mz3qfgguvlubpsr.streamlit.app/';

  const injectedJavaScript = `
    const style = document.createElement('style');
    style.innerHTML = \`
      /* Streamlit의 헤더와 툴바 숨기기 */
      header, .stToolbar { 
        display: none !important; 
      }
      /* 페이지 제목('D-ID AI Agent') 숨기기 */
      .stApp .main .block-container h1 {
        display: none !important;
      }
      /* 불필요한 여백 제거 */
      .stApp .main .block-container {
        padding: 0 !important;
        margin: 0 !important;
      }
      /* 전체 배경을 투명하게 만들기 */
      body, #root, .stApp {
        background-color: transparent !important;
        background-image: none !important;
      }
    \`;
    document.head.appendChild(style);
    true; // 스크립트가 반복 실행되도록 보장
  `;

  const offsetX = useSharedValue(screenWidth - PIP_WIDTH - MARGIN);
  const offsetY = useSharedValue(screenHeight - PIP_HEIGHT - MARGIN - ESTIMATED_TAB_BAR_HEIGHT);
  const animatedX = useSharedValue(offsetX.value);
  const animatedY = useSharedValue(offsetY.value);
  const start = useSharedValue({ x: 0, y: 0 });
  const isExpanded = useSharedValue(false);
  const isVisible = useSharedValue(true);

  const animationConfig = { duration: 350 };
  
  // ✨ 추가: 네이티브 마이크 권한을 요청하는 함수
  const requestMicrophonePermission = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    return status === 'granted';
  };

  const closePip = () => {
    setShowWebApp(false);
    isVisible.value = false;
  };

  const openPip = () => {
    const initialX = screenWidth - PIP_WIDTH - MARGIN;
    const initialY = screenHeight - PIP_HEIGHT - MARGIN - ESTIMATED_TAB_BAR_HEIGHT;
    offsetX.value = initialX;
    offsetY.value = initialY;
    animatedX.value = initialX;
    animatedY.value = initialY;
    isExpanded.value = false;
    isVisible.value = true;
  };

  // ✨ 수정: 아바타를 켜기 전에 권한을 확인하고 요청하는 로직으로 변경
  const toggleWebApp = async () => {
    // 이미 켜져있다면 그냥 끕니다.
    if (showWebApp) {
      setShowWebApp(false);
      return;
    }

    // 마이크 권한을 요청합니다.
    const hasPermission = await requestMicrophonePermission();

    // 권한이 있다면 웹뷰를 보여줍니다.
    if (hasPermission) {
      setShowWebApp(true);
    } else {
      // 권한이 없다면 사용자에게 알림을 띄웁니다.
      Alert.alert(
        "마이크 권한 필요",
        "아바타와 대화하려면 마이크 권한을 허용해야 합니다. 설정에서 권한을 변경할 수 있습니다.",
        [{ text: "확인" }]
      );
    }
  };

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      'worklet';
      isExpanded.value = !isExpanded.value;
      if (isExpanded.value) {
        animatedX.value = withTiming(0, animationConfig);
        animatedY.value = withTiming(screenHeight / 2, animationConfig);
      } else {
        animatedX.value = withTiming(offsetX.value, animationConfig);
        animatedY.value = withTiming(offsetY.value, animationConfig);
      }
    });

  const panGesture = Gesture.Pan()
    .failOffsetY([-5, 5])
    .onBegin(() => {
      'worklet';
      if (isExpanded.value) return;
      start.value = { x: offsetX.value, y: offsetY.value };
    })
    .onUpdate((e) => {
      'worklet';
      if (isExpanded.value) return;
      offsetX.value = start.value.x + e.translationX;
      offsetY.value = start.value.y + e.translationY;
      animatedX.value = offsetX.value;
      animatedY.value = offsetY.value;
    })
    .onEnd(() => {
      'worklet';
      if (isExpanded.value) return;
      const finalX = Math.max(MARGIN, Math.min(offsetX.value, screenWidth - PIP_WIDTH - MARGIN));
      const finalY = Math.max(MARGIN + SAFE_AREA_TOP, Math.min(offsetY.value, screenHeight - PIP_HEIGHT - MARGIN));
      offsetX.value = finalX;
      offsetY.value = finalY;
      animatedX.value = finalX;
      animatedY.value = finalY;
    });

  const composedGesture = Gesture.Exclusive(doubleTapGesture, panGesture);

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

  const webAppButtonStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isExpanded.value ? 0 : 1, { duration: 150 }),
    pointerEvents: isExpanded.value ? 'none' : 'auto',
  }));

  const reopenButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isVisible.value ? 0 : 1, { duration: 300 }),
      transform: [{ scale: withTiming(isVisible.value ? 0 : 1) }],
      pointerEvents: isVisible.value ? 'none' : 'auto',
    };
  });

  return (
    <>
      <Animated.View style={[styles.container, animatedPipStyle]}>
        <GestureDetector gesture={composedGesture}>
          {showWebApp ? (
            <WebView
              source={{ uri: STREAMLIT_URL }}
              style={styles.webview}
              containerStyle={styles.webviewContainer}
              backgroundColor="transparent"
              scrollEnabled={true}
              injectedJavaScript={injectedJavaScript}
              onMessage={() => {}}
              allowsInlineMediaPlayback={true} 
              mediaCapturePermissionGrantType={'grant'}
              onPermissionRequest={(request: WebViewPermissionRequest) => {
                request.grant(request.resources);
              }}
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>PIP Mode</Text>
              <Text style={styles.instructionText}>🌐 버튼으로 아바타 연결</Text>
            </View>
          )}
        </GestureDetector>

        <Animated.View style={[styles.webAppButton, webAppButtonStyle]}>
          <TouchableOpacity onPress={toggleWebApp} style={styles.touchableArea}>
            <Text style={styles.webAppButtonText}>🌐</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.closeButton}>
          <TouchableOpacity onPress={closePip} style={styles.touchableArea}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

      </Animated.View>

      <Animated.View style={[styles.reopenButton, reopenButtonStyle]}>
        <TouchableOpacity onPress={openPip}>
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
    overflow: 'hidden',
  },
  webviewContainer: {
     flex: 1,
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
    opacity: 0.99,
    backgroundColor: 'transparent',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  placeholderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instructionText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    textAlign: 'center',
  },
  webAppButton: {
    position: 'absolute',
    top: 4,
    left: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(52, 152, 219, 0.9)',
    zIndex: 10,
  },
  webAppButtonText: {
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 4,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
    textAlign: 'center',
  },
  touchableArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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