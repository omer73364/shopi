
const Products = [
    {
      id:'2',
      name: 'Not Today Sweater Today Sweater',
      img: require('../assets/imgs/18.png'),
      background:'#f4f4f49f',
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
    },
    {
      id:'0',
      name: 'I Am Busy',
      img: require('../assets/imgs/1.png'),
      background:'#9f94921f',
      price: "12",
      colors:[
        {
          color:'#fff',
          img:require('../assets/imgs/1.png'),
        }
      ],
      sizes:['M','L'],
    },
    {
      id:'1',
      name: 'Black Turkish Shirt',
      img: require('../assets/imgs/2.png'),
      background:'#eeeeee4f',
      price: "20",
      colors:[
        {
          color:'#1f1f27',
          img:require('../assets/imgs/2.png'),
        }
      ],
      sizes:['S','M','L'],
    },
    {
      id:'4',
      name: 'Pink Dress',
      img: require('../assets/imgs/5.png'),
      background:'#e7d3df4f',
      price: "14",
      colors:[
        {
          color:'#e7d3df',
          img:require('../assets/imgs/5.png'),
        }
      ],
      sizes:['S','M'],
    },
    {
      id:'5',
      name: 'Pink Dress',
      img: require('../assets/imgs/6.png'),
      background:'#fd518b11',
      price: "14",
      colors:[
        {
          color:'#393d63',
          img:require('../assets/imgs/6.png'),
        }
      ],
      sizes:['S','M'],
    },
]

export const fakeCollections = [
    {
      id:'0',
      name: 'Men',
      img: require('../assets/imgs/men.jpg'),
    },
    {
      id:'1',
      name: 'Women',
      img: require('../assets/imgs/women.jpg'),
    },
    {
      id:'2',
      name: 'Kids',
      img: require('../assets/imgs/kids.png'),
    },
]

const newarrival = [
  Products[0],
  Products[1],
  Products[3]
]

const men = [
  Products[0],
  Products[1],
  Products[2]
]

const women = []

const kids = [
  Products[3],
  Products[4],
]

export const FakeProducts = {
  newarrival,
  men,
  women,
  kids
}