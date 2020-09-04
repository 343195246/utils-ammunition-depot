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

/**
 * 日期格式化函数
 * @param {Date} date 日期函数
 */
function getFormatTime(date) {
  const formatTime = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return (
      [year, month, day].map(formatNumber).join("-") +
      " " +
      [hour, minute, second].map(formatNumber).join(":")
    );
  };

  const formatNumber = (n) => {
    n = n.toString();
    return n[1] ? n : "0" + n;
  };
}
