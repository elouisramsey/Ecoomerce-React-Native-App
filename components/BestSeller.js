import React from 'react'
import Showbtn from '../shared/ShowBtn'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView
} from 'react-native'
import tw from '../lib/tailwind'

const products = [
  {
    name: 'chaise lounge',
    id: 1,
    image: require('../assets/images/Chaise-Longue.png'),
    price: 140210,
    category: 'lounge',
    categories: [7],

    description:
      'You don’t have to go outside to be rugged. The Cigar rawhide sofa features a sturdy corner-blocked wooden frame and raw seams for that Malboro-person look. This brown leather sofa is cozy in a cottage, cabin, or a condo.',
    sku: 345,
    tags: ['#furniture', '#couch'],
    dimensions: '185 x 90 x 45 cm(L x W x H)',
    review: [
      {
        name: 'mans tacker',
        review: 'A really good couch, highly recommend',
        star: 4
      },
      {
        name: 'federick lack',
        review: 'A really good couch, highly recommend',
        star: 3
      },
      {
        name: 'obi emmanuel',
        review: 'A really good couch, highly recommend',
        star: 4
      },
      {
        name: 'jeremy lang',
        review: 'A really good couch, highly recommend',
        star: 4
      }
    ],
    'Additional Information':
      'This is just a place to add more info about the product you are selling'
  },
  {
    name: 'chaise burg',
    id: 2,
    image: require('../assets/images/couch8.png'),
    price: 154500,
    category: 'lounge',
    categories: [7, 1],
    description:
      'You don’t have to go to the gym. The Cigar rawhide sofa features a sturdy corner-blocked wooden frame and raw seams for that Malboro-person look. This brown leather sofa is cozy in a cottage, cabin, or a condo.',
    sku: 345,
    tags: ['#furniture', '#couch'],
    dimensions: '185 x 90 x 45 cm(L x W x H)',
    review: [
      {
        name: 'mans tacker',
        review: 'A really good couch, highly recommend',
        star: 4
      },
      {
        name: 'federick lack',
        review: 'A really good couch, highly recommend',
        star: 3
      },
      {
        name: 'obi emmanuel',
        review: 'A really good couch, highly recommend',
        star: 4
      },
      {
        name: 'jeremy lang',
        review: 'A really good couch, highly recommend',
        star: 4
      }
    ],
    'Additional Information':
      'This is just a place to add more info about the product you are selling'
  },
  {
    name: 'chaise hing',
    id: 3,
    image: require('../assets/images/Five-Seater-Sofa.png'),
    price: 114000,
    category: 'sofa',
    categories: [2, 7],
    description:
      'You don’t have to go outside to be rugged. The Cigar rawhide sofa features a sturdy corner-blocked wooden frame and raw seams for that Malboro-person look. This brown leather sofa is cozy in a cottage, cabin, or a condo.',
    sku: 345,
    tags: ['#furniture', '#couch'],
    dimensions: '185 x 90 x 45 cm(L x W x H)',
    review: [
      {
        name: 'mans tacker',
        review: 'A really good couch, highly recommend',
        star: 4
      },
      {
        name: 'federick lack',
        review: 'A really good couch, highly recommend',
        star: 3
      },
      {
        name: 'obi emmanuel',
        review: 'A really good couch, highly recommend',
        star: 4
      },
      {
        name: 'jeremy lang',
        review: 'A really good couch, highly recommend',
        star: 4
      }
    ],
    'Additional Information':
      'This is just a place to add more info about the product you are selling'
  },
  {
    name: 'chaise huia',
    id: 4,
    image: require('../assets/images/Futon-PNG-Transparent.png'),
    price: 170000,
    category: 'futon',
    categories: [3],
    description:
      'You dont need another companion. The Cigar rawhide sofa features a sturdy corner-blocked wooden frame and raw seams for that Malboro-person look. This brown leather sofa is cozy in a cottage, cabin, or a condo.',
    sku: 345,
    tags: ['#furniture', '#couch'],
    dimensions: '185 x 90 x 45 cm(L x W x H)',
    review: [
      {
        name: 'mans tacker',
        review: 'A really good couch, highly recommend',
        star: 4
      },
      {
        name: 'federick lack',
        review: 'A really good couch, highly recommend',
        star: 3
      },
      {
        name: 'obi emmanuel',
        review: 'A really good couch, highly recommend',
        star: 4
      },
      {
        name: 'jeremy lang',
        review: 'A really good couch, highly recommend',
        star: 4
      }
    ],
    'Additional Information':
      'This is just a place to add more info about the product you are selling'
  },
  {
    name: 'the gog',
    id: 5,
    image: require('../assets/images/Printed-Sofa-PNG-Image.png'),
    price: 154000,
    category: 'sofa',
    categories: [4],
    description:
      'You don’t have to go outside to be rugged. The Cigar rawhide sofa features a sturdy corner-blocked wooden frame and raw seams for that Malboro-person look. This brown leather sofa is cozy in a cottage, cabin, or a condo.',
    sku: 345,
    tags: ['#furniture', '#couch'],
    dimensions: '185 x 90 x 45 cm(L x W x H)',
    review: [
      {
        name: 'mans tacker',
        review: 'A really good couch, highly recommend',
        star: 4
      },
      {
        name: 'federick lack',
        review: 'A really good couch, highly recommend',
        star: 3
      },
      {
        name: 'obi emmanuel',
        review: 'A really good couch, highly recommend',
        star: 4
      },
      {
        name: 'jeremy lang',
        review: 'A really good couch, highly recommend',
        star: 4
      }
    ],
    'Additional Information':
      'This is just a place to add more info about the product you are selling'
  },
  {
    name: 'recliner deu',
    id: 6,
    image: require('../assets/images/Recliner-PNG-Transparent.png'),
    price: 254000,
    category: 'recliner',
    categories: [5],
    description:
      'You don’t have to go outside to be rugged. The Cigar rawhide sofa features a sturdy corner-blocked wooden frame and raw seams for that Malboro-person look. This brown leather sofa is cozy in a cottage, cabin, or a condo.',
    sku: 345,
    tags: ['#furniture', '#couch'],
    dimensions: '185 x 90 x 45 cm(L x W x H)',
    review: [
      {
        name: 'mans tacker',
        review: 'A really good couch, highly recommend',
        star: 4
      },
      {
        name: 'federick lack',
        review: 'A really good couch, highly recommend',
        star: 3
      },
      {
        name: 'obi emmanuel',
        review: 'A really good couch, highly recommend',
        star: 4
      },
      {
        name: 'jeremy lang',
        review: 'A really good couch, highly recommend',
        star: 4
      }
    ],
    'Additional Information':
      'This is just a place to add more info about the product you are selling'
  },
  {
    name: 'chaise magi',
    id: 7,
    image: require('../assets/images/Yellow-Sofa-PNG-File.png'),
    price: 164000,
    category: 'sofa',
    categories: [2, 4, 6],
    description:
      'You don’t have to go outside to be rugged. The Cigar rawhide sofa features a sturdy corner-blocked wooden frame and raw seams for that Malboro-person look. This brown leather sofa is cozy in a cottage, cabin, or a condo.',
    sku: 345,
    tags: ['#furniture', '#couch'],
    dimensions: '185 x 90 x 45 cm(L x W x H)',
    review: [
      {
        name: 'mans tacker',
        review: 'A really good couch, highly recommend',
        star: 4
      },
      {
        name: 'federick lack',
        review: 'A really good couch, highly recommend',
        star: 3
      },
      {
        name: 'obi emmanuel',
        review: 'A really good couch, highly recommend',
        star: 4
      },
      {
        name: 'jeremy lang',
        review: 'A really good couch, highly recommend',
        star: 4
      }
    ],
    'Additional Information':
      'This is just a place to add more info about the product you are selling'
  },
  {
    name: 'big guy',
    id: 8,
    image: require('../assets/images/Sleeper-Sofa-PNG-Transparent-Image.png'),
    price: 164000,
    category: 'recliner',
    categories: [7],
    description:
      'You don’t have to go outside to be rugged. The Cigar rawhide sofa features a sturdy corner-blocked wooden frame and raw seams for that Malboro-person look. This brown leather sofa is cozy in a cottage, cabin, or a condo.',
    sku: 345,
    tags: ['#furniture', '#couch'],
    dimensions: '185 x 90 x 45 cm(L x W x H)',
    review: [
      {
        name: 'mans tacker',
        review: 'A really good couch, highly recommend',
        star: 4
      },
      {
        name: 'federick lack',
        review: 'A really good couch, highly recommend',
        star: 3
      },
      {
        name: 'obi emmanuel',
        review: 'A really good couch, highly recommend',
        star: 4
      },
      {
        name: 'jeremy lang',
        review: 'A really good couch, highly recommend',
        star: 4
      }
    ],
    'Additional Information':
      'This is just a place to add more info about the product you are selling'
  },
  {
    name: 'big guy',
    id: 9,
    image: require('../assets/images/Yellow-Sofa-Transparent-PNG.png'),
    price: 103400,
    category: 'queens',
    categories: [8],
    description:
      'You don’t have to go outside to be rugged. The Cigar rawhide sofa features a sturdy corner-blocked wooden frame and raw seams for that Malboro-person look. This brown leather sofa is cozy in a cottage, cabin, or a condo.',
    sku: 345,
    tags: ['#furniture', '#couch'],
    dimensions: '185 x 90 x 45 cm(L x W x H)',
    review: [
      {
        name: 'mans tacker',
        review: 'A really good couch, highly recommend',
        star: 4
      },
      {
        name: 'federick lack',
        review: 'A really good couch, highly recommend',
        star: 3
      },
      {
        name: 'obi emmanuel',
        review: 'A really good couch, highly recommend',
        star: 4
      },
      {
        name: 'jeremy lang',
        review: 'A really good couch, highly recommend',
        star: 4
      }
    ],
    'Additional Information':
      'This is just a place to add more info about the product you are selling'
  },
  {
    name: 'big ben',
    id: 10,
    image: require('../assets/images/Recliner.png'),
    price: 103400,
    category: 'recliner',
    categories: [8],
    description:
      'You don’t have to go outside to be rugged. The Cigar rawhide sofa features a sturdy corner-blocked wooden frame and raw seams for that Malboro-person look. This brown leather sofa is cozy in a cottage, cabin, or a condo.',
    sku: 345,
    tags: ['#furniture', '#couch'],
    dimensions: '185 x 90 x 45 cm(L x W x H)',
    review: [
      {
        name: 'mans tacker',
        review: 'A really good couch, highly recommend',
        star: 4
      },
      {
        name: 'federick lack',
        review: 'A really good couch, highly recommend',
        star: 3
      },
      {
        name: 'obi emmanuel',
        review: 'A really good couch, highly recommend',
        star: 4
      },
      {
        name: 'jeremy lang',
        review: 'A really good couch, highly recommend',
        star: 4
      }
    ],
    'Additional Information':
      'This is just a place to add more info about the product you are selling'
  }
]
const Bestseller = ({ navigation }) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={tw`h-32 flex flex-row bg-white mb-5 w-full`}
        onPress={() => {
          navigation.navigate('Product', { item })
        }}
      >
        <View
          style={tw`w-32 h-32 flex items-center rounded justify-center bg-light px-4`}
        >
          <Image
            source={item.image}
            resizeMode='contain'
            style={tw`max-w-full flex`}
          />
        </View>
        <View
          style={tw`ml-4 w-full flex justify-center`}
        >
          <Text style={[tw`text-black font-bold text-xl`, styles.name]}>
            {item.name}
          </Text>

          <Text
            style={[tw`text-base font-light text-gray-500 mt-3`, styles.price]}
          >
            {'\u20A6'}
            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={[tw`mb-8 px-4`]}>
      <View style={[tw`mb-5 flex flex-row justify-between items-center`]}>
        <Text style={[tw`text-black text-xl font-bold`, styles.headers]}>
          Best Sellers
        </Text>
        <Showbtn />
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        {products.map(item => {
           return (
             <TouchableOpacity
             key={item.id}
               style={tw`h-32 flex flex-row bg-white mb-5 w-full`}
               onPress={() => {
                 navigation.navigate('Product', { item })
               }}
             >
               <View
                 style={tw`w-32 h-32 flex items-center rounded justify-center bg-light px-4`}
               >
                 <Image
                   source={item.image}
                   resizeMode='contain'
                   style={tw`max-w-full flex`}
                 />
               </View>
               <View style={tw`ml-4 w-full flex justify-center`}>
                 <Text style={[tw`text-black font-bold text-xl`, styles.name]}>
                   {item.name}
                 </Text>

                 <Text
                   style={[
                     tw`text-base font-light text-gray-500 mt-3`,
                     styles.price
                   ]}
                 >
                   {'\u20A6'}
                   {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                 </Text>
               </View>
             </TouchableOpacity>
           )
        })}
      </ScrollView>
    </View>
  )
}

export default Bestseller

const styles = StyleSheet.create({
  headers: {
    fontFamily: 'playfair'
  },
  price: {
    fontFamily: 'poppins'
  },
  name: {
    fontFamily: 'playfair',
    textTransform: 'capitalize'
  }
})
