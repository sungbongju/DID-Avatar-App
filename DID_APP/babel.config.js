module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // react-native-reanimated 플러그인을 여기에 추가합니다.
      // 이 플러그인은 항상 마지막에 위치해야 합니다.
      "react-native-reanimated/plugin",
    ],
  };
};