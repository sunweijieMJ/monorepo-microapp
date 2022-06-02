import dayjs from 'dayjs';
import storage from './storage';

// 设置页面标题
const setPageTitle = (title: string): string => title;

// 判断浏览器及终端
const os = (u = window?.navigator.userAgent): Record<string, boolean> => {
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

// 时间补零
const fillZero = (n: string) => n.padStart(2, '0');

// 加
const add = (arg1: number, arg2: number): number => {
  let r1: number;
  let r2: number;

  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }

  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }

  const c: number = Math.abs(r1 - r2);
  const m: number = 10 ** Math.max(r1, r2);

  if (c > 0) {
    const cm: number = 10 ** c;
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''));
      arg2 = Number(arg2.toString().replace('.', '')) * cm;
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm;
      arg2 = Number(arg2.toString().replace('.', ''));
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''));
    arg2 = Number(arg2.toString().replace('.', ''));
  }

  return (arg1 + arg2) / m;
};
// 减
const subtract = (arg1: number, arg2: number): number => {
  let r1: number;
  let r2: number;

  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }

  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }

  const m: number = 10 ** Math.max(r1, r2);
  const n: number = r1 >= r2 ? r1 : r2;

  return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
};
// 乘
const multiply = (arg1: number, arg2: number): number => {
  let m = 0;
  const s1: string = arg1.toString();
  const s2: string = arg2.toString();

  try {
    m += s1.split('.')[1].length;
  } catch (e) {
    console.error(e);
  }

  try {
    m += s2.split('.')[1].length;
  } catch (e) {
    console.error(e);
  }

  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / 10 ** m;
};
// 除
const divide = (arg1: number, arg2: number): number => {
  let t1: number;
  let t2: number;

  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    t1 = 0;
  }

  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    t2 = 0;
  }

  const r1 = Number(arg1.toString().replace('.', ''));
  const r2 = Number(arg2.toString().replace('.', ''));

  return +(r1 / r2) * (10 ** t2 - t1);
};

/**
 * 生成uuid
 * @param {number} len 长度
 * @param {number} radix 进制
 */
const uuid = (len: number, radix: number): string => {
  const chars: string[] =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuidArr: string[] = [];
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (let i = 0; i < len; i++) {
      uuidArr[i] = chars[0 | (Math.random() * radix)];
    }
  } else {
    // rfc4122, version 4 form
    let r: number;

    // rfc4122 requires these characters
    uuidArr[8] = '-';
    uuidArr[13] = '-';
    uuidArr[18] = '-';
    uuidArr[23] = '-';
    uuidArr[14] = '4';

    /*
     * Fill in random data.  At i===19 set the high bits of clock sequence as
     * per rfc4122, sec. 4.1.5
     */
    for (let i = 0; i < 36; i++) {
      if (!uuidArr[i]) {
        r = 0 | (Math.random() * 16);
        uuidArr[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuidArr.join('').toLowerCase();
};

// 价格格式化(分到元)
const priceFilter = (num: number | string): number => {
  if (!num) return 0;
  // 转类型
  num = +num;
  return +divide(num, 100).toFixed(2);
};

/*
 * 价格格式化
 * @number 原始数据
 * @decimals 保留几位小数，默认2
 * @decPoint 小数点号，默认'.'
 * @thousands 千分点号，默认','
 */
const decimalFormat = (
  number: number | string,
  decimals?: number,
  decPoint?: string,
  thousandsSep?: string
) => {
  number = `${number}`.replace(/[^0-9+-Ee.]/g, '');
  decimals = decimals === undefined ? 2 : decimals; // 默认保留2位
  decPoint = decPoint || '.'; // 默认是'.';
  thousandsSep = thousandsSep || ','; // 默认是',';
  const n = !Number.isFinite(+number) ? 0 : +number;
  const prec = !Number.isFinite(+decimals) ? 0 : Math.abs(decimals);
  const sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep;

  const dec = typeof decPoint === 'undefined' ? '.' : decPoint;
  let s: string[] = [];
  const toFixedFix = (n: number, prec: number): string => {
    const k = 10 ** prec;

    return `${
      parseFloat(
        Math.round(parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)
      ) / k
    }`;
  };
  s = (prec ? toFixedFix(n, prec) : `${Math.round(n)}`).split('.');
  const re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, `$1${sep}$2`);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
};

// 手机号隐藏
const phoneFilter = (phone: number | string): string => {
  if (!phone) return '';
  // 转类型
  const phoneStr = `${phone}`;
  return `${phoneStr.substring(0, 3)}****${phoneStr.substring(7)}`;
};

// 查看更多
const readMore = (text: string, length: number, suffix = ''): string => {
  if (!text) return text;
  return text.substring(0, length) + suffix;
};

// 解析url
const queryParse = (href: string): Record<string, string> => {
  if (!href) return {};
  const response: Record<string, string> = {};
  href = decodeURIComponent(href);
  const strs: string = href.split('?')[1];
  if (!strs) return response;
  const strArr = strs.split('&');
  for (let i = 0, LEN = strArr.length; i < LEN; i++) {
    response[strArr[i].split('=')[0]] = strArr[i].split('=')[1];
  }
  return response;
};

// url拼接
const queryConcat = (query: Record<string, string>): string => {
  let url = '';
  Object.keys(query).forEach((k) => {
    const value = query[k] !== undefined ? query[k] : '';
    url += `&${k}=${encodeURIComponent(value)}`;
  });
  return url ? url.substring(1) : '';
};

// 时间格式化
const dateFormat = (
  time: number | string,
  format = 'YYYY-MM-DD HH:mm'
): string | number => {
  if (!time) return '';
  const momentDate = dayjs(time);
  if (momentDate.isValid()) {
    return momentDate.format(format);
  }
  return time;
};

// 过滤空格
const trimEmpty = (value: string): string => value.replace(/\s+/g, '');

// 富文本转换
const textTohtml = (text: string): string => {
  const link = /(http|https):\/\/([\w.]+\/?)\S*/;
  const email = /([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})/;
  // 匹配http｜https链接
  let html: string = text.replace(link, ($1): string => {
    return `<a class="link" href="${$1}" target="_blank">${$1}</a>`;
  });
  // 匹配邮箱
  html = html.replace(email, ($1): string => {
    return `<a class="email" href="mailto:${$1}" target="_blank">${$1}</a>`;
  });
  // 匹配换行
  html = html.replace(/\r|\n/g, '<br>');
  return `<p>${html}</p>`;
};

// 图片转换
const handleImage = (url: string, mode: string[] = []): string => {
  if (!url) return url;
  if (Object.prototype.toString.call(url) !== '[object String]') {
    return url;
  }

  if (!url.includes('?x-oss-process=image')) {
    url += '?x-oss-process=image';
  }
  if (mode.length) {
    mode.forEach((item) => {
      url += `/${item}`;
    });
  }

  // 支持webp
  if (storage('localstorage').get('isWebp') === 'true') {
    url += '/format,webp';
  } else {
    url += '/quality,Q_80';
  }

  return url;
};

// 下载文件
// downloadFile(res, '导出文件名', 'xlsx')
enum DOWNLOAD_TYPE_MAP {
  xls = 'application/vnd.ms-excel',
  xlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  doc = 'application/msword',
  docx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pdf = 'application/pdf',
}
const downloadFile = (
  obj: ArrayBuffer | ArrayBufferView | Blob | string,
  name: string,
  suffix: keyof typeof DOWNLOAD_TYPE_MAP
) => {
  if (!DOWNLOAD_TYPE_MAP[suffix]) {
    throw new Error('请传入文件下载的格式后缀，eg：xls，xlsx，doc，docx，pdf');
  }
  const blob = new Blob([obj], {
    type: DOWNLOAD_TYPE_MAP[suffix],
  });
  const fileName = `${name}.${suffix}`;
  const link = document.createElement('a');
  document.body.appendChild(link);
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', fileName);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href); // 销毁url对象
};

const flattenObj = (obj: Record<string, any>) => {
  const result: Record<string, any> = {};

  function recurse(src: Record<string, any>, prop: string) {
    const toString = Object.prototype.toString;
    if (toString.call(src) === '[object Object]') {
      let isEmpty = true;
      for (const key in src) {
        if (Object.prototype.hasOwnProperty.call(src, key)) {
          isEmpty = false;
          recurse(src[key], prop ? `${prop}.${key}` : key);
        }
      }

      if (isEmpty && prop) {
        result[prop] = {};
      }
    } else if (toString.call(src) === '[object Array]') {
      const len = src.length;
      if (len > 0) {
        src.forEach((item: Record<string, any>, index: number) => {
          recurse(item, prop ? `${prop}.[${index}]` : `${index}`);
        });
      } else {
        result[prop] = [];
      }
    } else {
      result[prop] = src;
    }
  }
  recurse(obj, '');

  return result;
};

const unFlattenObj = (data: Record<string, string>) => {
  if (Object(data) !== data || Array.isArray(data)) {
    return data;
  }
  const result: Record<string, any> = {};
  let cur: Record<string, any>;
  let prop;
  let idx;
  let last;
  let temp;
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      cur = result;
      prop = '';
      last = 0;
      do {
        idx = key.indexOf('.', last);
        temp = key.substring(last, idx !== -1 ? idx : undefined);
        cur =
          cur[prop] ||
          (cur[prop] = !Number.isNaN(parseInt(temp, 10)) ? [] : {});
        prop = temp;
        last = idx + 1;
      } while (idx >= 0);
      cur[prop] = data[key];
    }
  }
  return result[''];
};

const encodeBase64 = (str: string) => {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(`0x${p1}`, 16));
    })
  );
};

const decodeBase64 = (str: string) => {
  return decodeURIComponent(
    atob(str)
      .split('')
      .map((c) => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join('')
  );
};

export {
  setPageTitle,
  os,
  fillZero,
  add,
  subtract,
  multiply,
  divide,
  uuid,
  phoneFilter,
  readMore,
  priceFilter,
  queryParse,
  queryConcat,
  dateFormat,
  trimEmpty,
  textTohtml,
  handleImage,
  decimalFormat,
  downloadFile,
  flattenObj,
  unFlattenObj,
  encodeBase64,
  decodeBase64,
};
