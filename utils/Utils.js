/**
 * 获取地址栏参数
 * @returns {Object} 返回一个地址栏参数对象
 */
export function getHttpQuery() {
  var query = window.location.search.substring(1);
  var vas = query.split("&");
  var param = {};
  for (const queryItem of vas) {
    var result = queryItem.split("=");
    param[result[0]] = result[1];
  }
  return param;
}
