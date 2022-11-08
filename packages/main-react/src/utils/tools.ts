/**
 * @description 判断浏览器及终端
 * @param [u=window.navigator.userAgent] userAgent
 */
const os = (u = window?.navigator.userAgent) => {
  return {
    isMobile:
      !!u.match(/AppleWebKit.*Mobile/i) ||
      !!u.match(
        /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/
      ),
    isWechat: !!u.match(/MicroMessenger/i),
    isQQ: !!u.match(/QQ/i) && !u.match(/MQQBrowser/i),
    isIos: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    isAndroid: !!u.match(/(Android);?[\s/]+([\d.]+)?/),
    isiPhone: !!u.match(/(iPhone\sOS)\s([\d_]+)/),
    isSafari: !!u.match(/Safari/),
    isFirefox: !!u.match(/Firefox/),
    isOpera: !!u.match(/Opera/),
    isChrome:
      u.match(/Chrome/i) !== null &&
      u.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) === null,
    isPad: !!u.match(/(pad|pod|iPod|iPad)/i),
    isDeskTop: ((): boolean => {
      const AgentList: string[] = [
        'Android',
        'iPhone',
        'SymbianOS',
        'Windows Phone',
        'iPad',
        'iPod',
      ];
      return !AgentList.some((item) => u.includes(item));
    })(),
  };
};

export { os };
