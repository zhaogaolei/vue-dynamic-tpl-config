export const basicsList = [
  {
    key: 1,
    type: 'ad',
    source: 0, // 手动
    adTypeId: 0,
    adList: [
      {
        imgUrl: '',
        actionUrl: ''
      }
    ],
    auto: false,
    loop: false,
    isFull: true,
    label: '广告'
  },
  {
    key: '',
    type: 'picture',
    imgUrl: '',
    actionUrl: '',
    isFull: true,
    label: '图片'
  },
  {
    key: '',
    type: 'coupon',
    cashCouponIds: '',
    getted: false,
    defaultImgUrl: '',
    gettedImgUrl: '',
    getCashCouponUrl: '',
    label: '优惠券'
  },
  {
    type: 'product',
    source: 2,
    productAlbumId: '',
    listStyle: 1,
    showCount: 0,
    productList: [],
    productIds: '', // 商品id字符串
    label: '商品'
  },
  {
    key: '',
    type: 'productGroup',
    groupList: [],
    label: '商品分组'
  },
  {
    key: '',
    type: 'emptyLine',
    label: '空行'
  },
  {
    key: '',
    type: 'customer',
    label: '微信客服',
    backgroundUrl: '', // 背景图
    description: '', // 添加文案
    qrcodeUrl: '', // 二维码
    isFull: true
  }
]
