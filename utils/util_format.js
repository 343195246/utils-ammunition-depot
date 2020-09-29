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
