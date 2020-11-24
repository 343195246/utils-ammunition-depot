/**
 * 解决if判断地狱
 */

export default {
  /**
   * 解决if嵌套地狱 --- 遍历任务队列
   * @param {Array} queueIf 任务队列
   */
  queueList(queueIf) {
    var validateState = { condition: true, context: "" }
    for (const iterator of queueIf) {
      if (!iterator.condition) {
        validateState = { condition: false, context: iterator.context }
        return validateState
      }
    }
    return validateState
  },

}

submit() {

  // 要进行判断的任务队列
  const queueIf = [
    // 判断---是否填写了密码
    { condition: password.value, context: "请输入新密码" },
    // 判断---首次输入密码校验是否通过
    { condition: this.data.fristPwdRule, context: "新密码不符合规则", },
    // 判断---是否填写了确认密码框
    { condition: repeatPassword.value, context: "请输入确认密码" },
    // 判断---确认密码校验是否通过
    { condition: this.data.lastPwdRule, context: "确认密码不符合规则" },
    // 判断---两次输入的密码是否相等
    { condition: password.value === repeatPassword.value, context: "两次输入的密码不一致" },
  ]

  // 解决if嵌套地狱-- - 遍历任务队列
  const hellIf = hell.queueList(queueIf)
  if (hellIf.condition) {
    this.triggerEvent("submitSetPwd")
  } else {
    wx.showToast({
      title: hellIf.context,
      icon: "none",
      duration: 2000
    })
  }

}