module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel"], // 👈 これだけ！他の書き方はNG
  };
};
