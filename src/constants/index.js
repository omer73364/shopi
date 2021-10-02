
export const FakeProducts = [
    {
      id:'2',
      name: 'Not Today sweater',
      img: require('../assets/imgs/18.png'),
      background:'#f4f4f4',
      colors:[
        {
          color:'#18181a',
          img:require('../assets/imgs/18.png')
        },
        {
          color:'#ce1221',
          img:require('../assets/imgs/19.png')
        },
      ],
      sizes:['S','M','L','XL'],
      price: "39",
      saved: true
    },
    {
      id:'0',
      name: 'Name 1',
      img: require('../assets/imgs/1.png'),
      background:'#9f94922f',
      price: "12",
      colors:[
        {
          color:'#fff',
          img:require('../assets/imgs/1.png'),
        }
      ],
      sizes:['M','L'],
      saved: false
    },
    {
      id:'1',
      name: 'Name 2',
      img: require('../assets/imgs/2.png'),
      background:'#eee',
      price: "20",
      colors:[
        {
          color:'#1f1f27',
          img:require('../assets/imgs/2.png'),
        }
      ],
      sizes:['S','M','L'],
      saved: true
    },
    // {
    //   id:'3',
    //   name: 'Name 4',
    //   img: require('../assets/imgs/4.png'),
    //   background:'#efe6ee',
    //   colors:[
    //     {
    //       color:'#4e6496',
    //       img:require('../assets/imgs/4.png'),
    //     }
    //   ],
    //   sizes:['S','M'],
    //   price: "440",
    //   saved: false
    // },
]
  
export const fakeCollections = [
    {
      id:'0',
      name: 'Name 1',
      img: require('../assets/imgs/3.jpg'),
    },
    {
      id:'1',
      name: 'Name 2',
      img: require('../assets/imgs/4.jpg'),
    },
    {
      id:'2',
      name: 'Name 3',
      img: require('../assets/imgs/3.jpg'),
    },
    {
      id:'3',
      name: 'Name 4',
      img: require('../assets/imgs/4.jpg'),
    },
]