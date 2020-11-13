/* util-class: 随机数工具类 */

/**
 * 取最小值与最大值 范围内的整数
 * @param {Number} min 取值范围: 最小
 * @param {Number} max 取值范围: 最大
 */
export function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}

/**
 * 生成32位随机流水号
 */
random32() {
  /*默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*/
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = chars.length;
  var pwd = '';
  for (let i = 0; i < 32; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd
}
