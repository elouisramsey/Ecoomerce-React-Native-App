import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
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
import Showbtn from '../shared/ShowBtn'
import { useCartContext } from '../context/CartProvider'

const productsData = [
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

const categoryData = [
  { id: 1, name: 'couch' },
  { id: 2, name: 'sofa' },
  { id: 3, name: 'recliner', id: 4, name: 'futon' },
  { id: 5, name: 'seater', id: 6, name: 'daddies' },
  {
    id: 7,
    name: 'lounge'
  },
  {
    id: 8,
    name: 'queens'
  },
  { id: 9, name: 'recliner' }
]

export const Categories = ({ navigation }) => {
  const [categories, setCategories] = React.useState(categoryData)
  const [products, setProducts] = React.useState(productsData)
  const [productLists, setProductLists] = React.useState(productsData)
  const [selectedCategory, setSelectedCategory] = React.useState(null)
  const [numberOfitems, updateNumberOfItems] = React.useState(1)
  const { addToCart } = useCartContext()

  function onSelectCategory(category) {
    let productList = productLists.filter((product) =>
      product.categories.includes(category.id)
    )
    setProducts(productList)
    setSelectedCategory(category)
  }

  function addProductToCart(product) {
    product['quantity'] = numberOfitems
    addToCart(product)
  }

  return (
    <View style={[tw`flex bg-white py-2`]}>
      <View style={[tw`px-2 mb-5 flex flex-row justify-between items-center`]}>
        <Text style={[tw`text-black text-xl font-bold`, styles.headers]}>
          Categories
        </Text>
        <Showbtn />
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={tw`px-2`}
      >
        {categories.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={tw`pb-5 flex items-center justify-center mr-5`}
              onPress={() => onSelectCategory(item)}
            >
              <Text
                style={[
                  tw`text-base pb-3 ${
                    selectedCategory?.id === item.id
                      ? 'text-black border-b border-solid border-gray-600'
                      : 'text-gray-400'
                  }`,
                  styles.name
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`flex-row flex-wrap w-full`}
      >
        {products ? (
          products.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  tw`rounded-sm shadow-xl my-4 pb-4 flex h-64 flex-row bg-white mx-2`, {width: '45%'}
                ]}
                onPress={() => {
                  navigation.navigate('Product', { item })
                }}
              >
                <View>
                  <View
                    style={tw`w-full h-3/5 flex items-center justify-center px-4`}
                  >
                    <Image
                      source={item.image}
                      resizeMode='contain'
                      style={tw`max-w-full`}
                    />
                  </View>
                  <View style={tw`px-3 py-2`}>
                    <Text
                      style={[tw`text-black font-bold text-base`, styles.name]}
                    >
                      {item.name}
                    </Text>

                    <Text
                      style={[tw`text-gray-400 text-xs py-3`]}
                      numberOfLines={1}
                    >
                      {item.description}
                    </Text>

                    <View style={tw`flex flex-row w-full items-center`}>
                      <Text
                        style={[tw`text-lg font-bold text-base`, styles.price]}
                      >
                        {'\u20A6'}
                        {item.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </Text>

                      <TouchableOpacity
                        style={tw`bg-black items-center justify-center h-6 w-6 rounded-full absolute right-0`}
                        onPress={() => {
                          addProductToCart(item)
                        }}
                      >
                        <Ionicons
                          name='add-outline'
                          style={tw`text-white text-base`}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        ) : (
          <Text style={[tw`text-center py-2`, styles.price]}>
            Nothing to display at the moment
          </Text>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  headers: {
    fontFamily: 'playfair'
  },
  price: {
    fontFamily: 'poppins'
  },
  name: {
    fontFamily: 'poppins',
    textTransform: 'capitalize'
  }
})
