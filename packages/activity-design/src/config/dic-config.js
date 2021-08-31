export const DIC = {
  adSource: [
    { label: '手动上传', value: 0 },
    { label: '广告', value: 1 }
  ],

  swiperType: [
    { label: '轮播广告', value: 0 },
    { label: '左右横滑', value: 1 }
  ],

  productSource: [
    { label: '指定券', value: 0 },
    { label: '指定酒店', value: 1 },
    { label: '券专辑', value: 2 },
    { label: '酒店专辑', value: 3 }
  ],

  listStyle: [
    { label: '大图模式', value: 0 },
    { label: '一行两个', value: 1 },
    { label: '左侧小图模式', value: 2 },
    { label: '一大N小', value: 3 },
    { label: '左右滑动', value: 4 }
  ],

  listStyleThumbnail: {
    0: 'http://p1.zmjiudian.com/121ZQuJ0_jupiter',
    1: 'http://p1.zmjiudian.com/121ZQuJ4_jupiter',
    2: 'http://p1.zmjiudian.com/121ZQuJ5_jupiter',
    3: 'http://p1.zmjiudian.com/121ZQuJ3_jupiter',
    4: 'http://p1.zmjiudian.com/121ZQuJ1_jupiter'
  },
  // 红包管理后台
  redEnvelopesManageUrl: 'http://bg.zmjiudian.com/Tools/TemplateSourceList?bizType=4',
  // 广告后台管理
  adManageUrl: 'http://bg.zmjiudian.com/ad/AdvList?type=',
  // 券专辑后台
  albumsManageUrl: 'http://bg.zmjiudian.com/Product/ProductAlbumsList?id=',

  // 瓷片区
  porcelainLayout: [
    { label: '左一右一', value: 0 },
    { label: '左一右二', value: 1 }
  ]
}
