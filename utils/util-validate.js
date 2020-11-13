/**
 * 校验手机号格式
 * value:手机号
 */
function validatePhone(value) {
  const TEL_REGEXP = /^1[3456789]\d{9}$/
  return TEL_REGEXP.test(value)
}

/**
 * 校验密码
 */
function valifyPwd(str) {
  var regex = new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,12}')
  return regex.test(str)
}