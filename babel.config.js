module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // ← これだけでOK
    plugins: ["nativewind/babel"], // NativeWind用
  };
};
