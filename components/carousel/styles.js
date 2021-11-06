import { Dimensions, StyleSheet, Platform } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    paddingTop: 30
  },
  title: {
    fontSize: 20
  },
  item: {
    width: '100%',
    height: screenWidth - 20 //height will be 20 units less than screen width.
  },
  imageContainer: {
    flex: 1,
    // borderRadius: 5,
    // paddingHorizontal: '10%',
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginBottom: Platform.select({ ios: 0, android: 1 }) //handle rendering bug.
  },
  image: {
    // ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    alignSelf: 'center',
    // transform: [{ scale: 0.55 }],
    height: '100%',
    aspectRatio: 1,
    width: '100%',
    flex: 1
  },
  dotContainer: {
    backgroundColor: 'rgb(230,0,0)'
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black'
  },
  inactiveDotStyle: {
    backgroundColor: 'rgb(255,230,230)'
  }
})
export default styles