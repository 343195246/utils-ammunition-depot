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
