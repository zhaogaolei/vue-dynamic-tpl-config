import Upyun from './upyun'

// 生成文件名称
export function getPicPath2 (CommentID, picFlowNum, catID) {
  const datetime = new Date()
  const date = datetime.getDate()
  const hour = datetime.getHours()
  const minute = datetime.getMinutes()
  const second = datetime.getSeconds()
  return (CommentID === 0 ? '' : CommentID) + getTimeCount2Char(datetime.getYear()) + getTimeCount2Char(date) + getTimeCount2Char(hour) + getTimeCount2Char(minute) + getTimeCount2Char(second) + picFlowNum + catID
}

export function getTimeCount2Char (time) {
  if (time >= 60) {
    return time
  }
  const dic = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return dic.charAt(time)
}

export function getcontentSecret (num) {
  const dic = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const contentSecret = []
  for (let i = 1; i <= num; i++) {
    contentSecret.push(dic.charAt(Math.floor(Math.random() * 61)))
  }
  return contentSecret.join('')
}

export function uploadPic (file, callback) {
  const options = {
    notify_url: `${window.location.protocol}//upyun.com`,
    'content-secret': 'whhotels'
  }
  const config = {
    bucket: 'whphoto',
    expiration: parseInt((new Date().getTime() + 3600000) / 1000),
    form_api_secret: 'Mbu7g+t64a0dWPfPpkzEUEiKJHc='
  }
  const instance = new Upyun(config)
  instance.setOptions(options)
  const fileName = file.name
  // var ext = '.' + fileName.split('.').pop();
  const newPicName = getPicPath2(0, 0, getcontentSecret(2))
  const PhotoSURL = newPicName// + ext;
  const picPath = '/' + PhotoSURL
  // 上传图片
  instance.upload(picPath, file, callback)
}
