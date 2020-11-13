/* util-class: 格式化工具 */

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

/**
 * 时间补0方法
 * @param params 如果数字小于10在前面补个0
 */
supplementZero(params) {
  return params < 10 ? "0" + params.toString() : params.toString()
}

/**
 * 时间格式化: 秒 -> 时间
 * @param second 秒
 */
getDuration(second) {
  var duration
  var days = this.supplementZero(Math.floor(second / 86400));
  var hours = this.supplementZero(Math.floor((second % 86400) / 3600));
  var minutes = this.supplementZero(Math.floor(((second % 86400) % 3600) / 60));
  var seconds = this.supplementZero(Math.floor(((second % 86400) % 3600) % 60));
  if (days > 0) duration = days + ":" + hours + ":" + minutes + ":" + seconds;
  else if (hours > 0) duration = hours + ":" + minutes + ":" + seconds;
  else if (minutes > 0) duration = minutes + ":" + seconds;
  else if (seconds > 0) duration = seconds;
  return duration;
}

/**
 * 格式化日期函数
 * @param {Date} dateParams 日期对象
 * @param {String} formatParams 年月日分隔符号
 */
dateFormat(dateParams, formatParams) {
  let year = dateParams.getFullYear()
  let month = dateParams.getMonth()
  let day = dateParams.getDate()
  return (year + formatParams + this.supplementZero(month + 1) + formatParams + this.supplementZero(day))
}
