
import SparkMD5 from 'spark-md5'
import async from 'async'
import axios from 'axios'
import { message } from 'ant-design-vue'
message.config({ maxCount: 1 })

var _config = {
  api: `${window.location.protocol}//m0.api.upyun.com/`,
  chunkSize: 1024000
}

function _extend (dst, src) {
  for (var i in src) {
    dst[i] = src[i]
  }
}

function sortPropertiesByKey (obj) {
  var keys = []
  var sortedObj = {}
  for (var key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      keys.push(key)
    }
  }
  keys.sort()
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i]
    sortedObj[k] = obj[k]
  }
  return sortedObj
}

function calcSign (data, secret) {
  if (typeof data !== 'object') {
    return
  }
  var sortedData = sortPropertiesByKey(data)
  var md5Str = ''
  for (var key in sortedData) {
    if (key !== 'signature') {
      md5Str = md5Str + key + sortedData[key]
    }
  }
  var sign = SparkMD5.hash(md5Str + secret)
  return sign
}

function formatParams (data) {
  var arr = []
  for (var name in data) {
    arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
  }
  return arr.join('&')
}

function checkBlocks (arr) {
  var indices = []
  var idx = arr.indexOf(0)
  while (idx !== -1) {
    indices.push(idx)
    idx = arr.indexOf(0, idx + 1)
  }
  return indices
}

function upload (path, file, cbFn) {
  var self = this
  message.loading('上传中...', 0)
  uploadForOneFileList(path, file, self, cbFn)
}

function uploadForOneFileList (path, file, self, cbFn) {
  async.waterfall([
    function (callback) {
      var chunkInfo = {
        chunksHash: {}
      }
      // var files = document.getElementById('file').files;
      if (!file) {
        console.log('no file is selected')
        return
      }
      var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
      // var file = files[0];
      var chunkSize = _config.chunkSize
      var chunks = Math.ceil(file.size / chunkSize)
      var currentChunk = 0
      var spark = new SparkMD5.ArrayBuffer()
      var frOnload = function (e) {
        chunkInfo.chunksHash[currentChunk] = SparkMD5.ArrayBuffer.hash(e.target.result)
        spark.append(e.target.result)
        currentChunk++
        if (currentChunk < chunks) {
          loadNext()
        } else {
          chunkInfo.entire = spark.end()
          chunkInfo.chunksNum = chunks
          chunkInfo.file_size = file.size
          callback(null, chunkInfo)
        }
      }
      var frOnerror = function () {
        console.warn('oops, something went wrong.')
      }

      function loadNext () {
        var fileReader = new FileReader()
        fileReader.onload = frOnload
        fileReader.onerror = frOnerror
        var start = currentChunk * chunkSize
        var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
        var blobPacket = blobSlice.call(file, start, end)
        fileReader.readAsArrayBuffer(blobPacket)
      }
      loadNext()
    },
    function (chunkInfo, callback) {
      var options = {
        path: path,
        expiration: _config.expiration,
        file_blocks: chunkInfo.chunksNum,
        file_size: chunkInfo.file_size,
        file_hash: chunkInfo.entire
      }

      _extend(options, self.options)
      var signature
      if (self._signature) {
        signature = self._signature
      } else {
        signature = calcSign(options, _config.form_api_secret)
      }
      var policy = btoa(JSON.stringify(options))
      var paramsData = {
        policy: policy,
        signature: signature
      }
      var urlencParams = formatParams(paramsData)
      axios({
        method: 'post',
        url: _config.api + _config.bucket + '/',
        data: urlencParams,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        // console.log('第一步返回签名', res)
        if (res.status === 200) {
          if (res.data.status.indexOf(0) < 0) {
            return callback(new Error('file already exists'))
          }
          callback(null, chunkInfo, res.data)
        }
      }).catch(err => {
        message.destroy()
        message.info(err.message)
      })
    },
    function (chunkInfo, res, callback) {
      var chunkSize = _config.chunkSize
      var _status = res.status
      var result
      async.until(
        function test (cb) {
          console.log(_status + ' 判断分块是否Okay ' + file.name + ' ' + new Date().toString())
          cb(null, checkBlocks(_status).length <= 0)
        },
        function (callback) {
          var idx = checkBlocks(_status)[0]
          var start = idx * chunkSize
          var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
          var packet = file.slice(start, end)

          var options = {
            save_token: res.save_token,
            expiration: _config.expiration,
            block_index: idx,
            block_hash: chunkInfo.chunksHash[idx]
          }

          var signature = calcSign(options, res.token_secret)
          var policy = btoa(JSON.stringify(options))

          var formDataPart = new FormData()
          formDataPart.append('policy', policy)
          formDataPart.append('signature', signature)
          formDataPart.append('file', packet)
          axios({
            method: 'post',
            url: _config.api + _config.bucket + '/',
            data: formDataPart,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            // console.log('第二步返上传文件', res)
            if (res.status === 200) {
              _status = res.data.status
              result = res.data
              callback(null)
            }
          }).catch(err => {
            message.destroy()
            message.info(err.message)
          })
        },
        function (err) {
          if (err) {
            callback(err)
          }
          callback(null, chunkInfo, result)
        })
    },
    function (chunkInfo, res, callback) {
      var options = {
        save_token: res.save_token,
        expiration: _config.expiration
      }
      var signature = calcSign(options, res.token_secret)
      var policy = btoa(JSON.stringify(options))
      var formParams = {
        policy: policy,
        signature: signature
      }
      var formParamsUrlenc = formatParams(formParams)
      axios({
        method: 'post',
        url: _config.api + _config.bucket + '/',
        data: formParamsUrlenc,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        message.destroy()
        // console.log('第三步返回文件信息', res)
        if (res.status === 200) {
          cbFn(res.data.path, file.name)
          callback(null, res.data)
        }
      }).catch(err => {
        message.destroy()
        message.info(err.message)
      })
    }
  ], function (err, response) {
    if (err) {
      message.destroy()
      message.info(err + '网络故障上传失败')
      return false
    } else {}
  })
}

function Sand (config) {
  _extend(_config, config)

  if (config.signature) {
    this._signature = config.signature
  }

  this.setOptions = function (options) {
    this.options = options
  }

  this.upload = upload

  this.uploadForOneFileList = uploadForOneFileList
}
export default Sand
