# DID-Avatar-App

#D-ID AI 아바타 PIP 앱
이 프로젝트는 React Native와 Expo를 사용하여 D-ID AI 아바타를 화면 위에 떠 있는 PIP(Picture-in-Picture) 창 형태로 구현한 모바일 애플리케이션입니다. 사용자는 이 PIP 창을 자유롭게 드래그하거나 크기를 조절할 수 있으며, 내장된 WebView를 통해 실시간으로 AI 아바타와 상호작용할 수 있습니다.

(이곳에 앱 실행 화면 스크린샷이나 GIF를 추가하면 좋습니다.)

#✨ 주요 기능
PIP (Picture-in-Picture) 인터페이스: 화면의 다른 콘텐츠 위에 항상 떠 있는 창을 제공합니다.

드래그 앤 드롭: 작은 PIP 창을 화면 내에서 자유롭게 드래그하여 위치를 옮길 수 있습니다.

크기 조절: PIP 창을 두 번 탭(더블 탭)하여 전체 화면의 절반 크기로 키우거나 다시 작게 만들 수 있습니다.

AI 아바타 연동: WebView를 통해 D-ID AI Agent 웹 페이지를 연동하여 아바타를 표시합니다.

PIP 창 제어: 창 우측 상단의 'X' 버튼으로 PIP 창을 닫을 수 있으며, 닫힌 후 나타나는 재생 버튼(▶)으로 다시 열 수 있습니다.

스크롤 호환성: PIP 창이 커지고 WebView가 활성화된 상태에서도 내부 콘텐츠를 정상적으로 스크롤할 수 있습니다.

#🚀 시작하기
이 프로젝트를 시작하는 가장 쉬운 방법은 GitHub Codespaces를 사용하는 것입니다. 별도의 개발 환경 설정 없이 웹 브라우저에서 바로 프로젝트를 실행할 수 있습니다.

방법 1: GitHub Codespaces 사용 (권장)
프로젝트 Fork 하기:

이 GitHub 저장소의 우측 상단에 있는 Fork 버튼을 클릭하여 자신의 계정으로 프로젝트를 복사해오세요.

Codespace 생성하기:

자신의 계정으로 Fork된 저장소에서 녹색 < > Code 버튼을 클릭합니다.

Codespaces 탭을 선택하고, Create codespace on main 버튼을 클릭하여 새로운 개발 환경을 시작합니다. (생성까지 1~2분 정도 소요될 수 있습니다.)

프로젝트 폴더로 이동:

Codespace가 실행되면 터미널이 자동으로 열립니다. 아래 명령어를 입력하여 작업 폴더로 이동하세요.

cd DID_APP

의존성 패키지 설치:

프로젝트에 필요한 라이브러리들을 설치합니다.

npm install

Expo 서버 실행:

아래 명령어로 개발 서버를 시작합니다. --tunnel 옵션은 외부 네트워크 환경에서도 안정적인 연결을 보장합니다.

npx expo start --tunnel

앱 실행:

서버가 실행되면 터미널에 QR 코드가 나타납니다.

개인 스마트폰에 설치된 Expo Go 앱을 열고 이 QR 코드를 스캔하면, 앱이 휴대폰에서 실시간으로 실행됩니다.

방법 2: 로컬 환경에서 직접 실행
로컬 컴퓨터에 개발 환경을 직접 구축하여 실행할 수도 있습니다.

사전 준비물
Node.js (LTS 버전 권장)

npm 또는 yarn

스마트폰에 Expo Go 앱 설치

설치 및 실행
프로젝트 복제(Clone):

git clone [https://github.com/sungbongju/DID-Avatar-App.git](https://github.com/sungbongju/DID-Avatar-App.git)

프로젝트 폴더로 이동:

cd DID-Avatar-App/DID_APP

의존성 패키지 설치:

npm install

Expo 서버 실행:

아래 명령어로 개발 서버를 시작합니다.

npx expo start --tunnel

앱 실행:

터미널에 표시된 QR 코드를 스마트폰의 Expo Go 앱으로 스캔하세요.

또는, 터미널에서 a를 누르면 Android 에뮬레이터에서, i를 누르면 iOS 시뮬레이터에서 앱이 실행됩니다.

🛠️ 기술 스택
React Native

Expo

TypeScript

React Native Gesture Handler: 복잡한 터치 및 제스처를 관리합니다.

React Native Reanimated: 부드러운 고성능 애니메이션을 구현합니다.

React Native WebView: 앱 내에 웹 콘텐츠를 표시합니다.
