const KeyName = 'tao'

// 设置个人信息
export const setUserInfo = (info) => {
  localStorage.setItem(KeyName, JSON.stringify(info))
}

// 获取个人信息

export const getUerInfo = () => {
  const res = localStorage.getItem(KeyName)
  return res ? JSON.parse(res) : { token: '', userId: '' }
}

// 移除个人信息

export const removeUserInfo = () => {
  localStorage.removeItem(KeyName)
}

const HISTORY_KEY = 'TAO_HISTORY'

// 获取历史数据
export const getHistoryRecord = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}

// 存储历史数据

export const setHistory = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
