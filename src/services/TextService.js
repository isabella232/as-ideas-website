const TextService = {};

TextService.getEncodedSummaryMax256Chars = (s) => {
  TextService.encodeURI(this.trimTo256(s));
  return '';
};

TextService.trimTo256 = (s) => {
  return (s && s.length > 256) ?
    s.substring(0, 256 - 3) + '...' :
    s;
};

exports.TextService = TextService;
