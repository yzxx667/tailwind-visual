import instance from '../utils/http/request'

// 获取数据
export const getData = () => {
  return instance.get<any>('/visualization')
}
