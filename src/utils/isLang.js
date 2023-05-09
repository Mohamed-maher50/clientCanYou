function checkLang(text) {
  var arabic = /[\u0600-\u06FF]/;
  var string = text;

  return arabic.test(string);
}
export { checkLang };
