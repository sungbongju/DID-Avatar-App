# 🤖 D-ID AI Avatar PIP App

React Native와 Expo를 사용하여 D-ID AI 아바타를 화면 위에 떠 있는 PIP(Picture-in-Picture) 창 형태로 구현한 모바일 애플리케이션입니다. 사용자는 이 PIP 창의 크기를 조절할 수 있으며, 내장된 WebView를 통해 실시간으로 AI 아바타와 상호작용할 수 있습니다.

## ✨ 주요 기능

- **🖼️ PIP (Picture-in-Picture) 인터페이스**: 화면의 다른 콘텐츠 위에 항상 떠 있는 창을 제공합니다
- **📏 크기 조절**: PIP 창을 두 번 탭(더블 탭)하여 전체 화면의 절반 크기로 키우거나 다시 작게 만들 수 있습니다
- **🖼️ 화면 색깔 바꾸기**: 백그라운드 화면을 클릭할 때마다 화면의 색깔이 바뀝니다
- **🤖 AI 아바타 연동**: WebView를 통해 D-ID AI Agent 웹 페이지를 연동하여 아바타를 표시합니다
- **🎛️ PIP 창 제어**: 창 우측 상단의 'X' 버튼으로 PIP 창을 닫을 수 있으며, 닫힌 후 나타나는 재생 버튼(▶)으로 다시 열 수 있습니다
- **📱 스크롤 호환성**: PIP 창이 커지고 WebView가 활성화된 상태에서도 내부 콘텐츠를 정상적으로 스크롤할 수 있습니다

## 🚀 시작하기

이 프로젝트를 시작하는 가장 쉬운 방법은 GitHub Codespaces를 사용하는 것입니다. 별도의 개발 환경 설정 없이 웹 브라우저에서 바로 프로젝트를 실행할 수 있습니다.

### 방법 1: GitHub Codespaces 사용 (권장)

#### 1. 프로젝트 Fork 하기
이 GitHub 저장소의 우측 상단에 있는 `Fork` 버튼을 클릭하여 자신의 계정으로 프로젝트를 복사해오세요.

#### 2. Codespace 생성하기
- 자신의 계정으로 Fork된 저장소에서 녹색 `< > Code` 버튼을 클릭합니다
- `Codespaces` 탭을 선택하고, `Create codespace on main` 버튼을 클릭하여 새로운 개발 환경을 시작합니다
- ⏱️ 생성까지 1~2분 정도 소요될 수 있습니다

#### 3. 프로젝트 폴더로 이동
Codespace가 실행되면 터미널이 자동으로 열립니다. 아래 명령어를 입력하여 작업 폴더로 이동하세요.

```bash
cd DID_APP
```

#### 4. 의존성 패키지 설치
프로젝트에 필요한 라이브러리들을 설치합니다.

```bash
npm install
```

#### 5. Expo 서버 실행
아래 명령어로 개발 서버를 시작합니다. `--tunnel` 옵션은 외부 네트워크 환경에서도 안정적인 연결을 보장합니다.

```bash
npx expo start --tunnel
```

최초 실행 시, 터널링에 필요한 @expo/ngrok 패키지를 설치할지 묻는 메시지가 나타날 수 있습니다. 이때 Y를 입력하여 설치를 진행해주세요.

## 📱 Expo Go 앱 다운로드

앱을 테스트하려면 스마트폰에 Expo Go 앱이 필요합니다:

[![Download on the App Store](https://img.shields.io/badge/Download_on_the-App_Store-black?style=for-the-badge&logo=apple&logoColor=white)](https://apps.apple.com/app/expo-go/id982107779)
[![Get it on Google Play](https://img.shields.io/badge/Get_it_on-Google_Play-green?style=for-the-badge&logo=google-play&logoColor=white)](https://play.google.com/store/apps/details?id=host.exp.exponent)

#### 6. 앱 실행
- 서버가 실행되면 터미널에 QR 코드가 나타납니다
- 개인 스마트폰에 설치된 **Expo Go** 앱을 열고 이 QR 코드를 스캔하면, 앱이 휴대폰에서 실시간으로 실행됩니다
- 


---
