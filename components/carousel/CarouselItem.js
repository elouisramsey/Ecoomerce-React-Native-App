import React from 'react'
import { ParallaxImage } from 'react-native-snap-carousel'
import styles from './styles'
import tw from '../../lib/tailwind'

export default function CarouselItem({ item, index }, parallaxProps) {
  return (
    <ParallaxImage
      source={ item.source } /* the source of the image */
      containerStyle={styles.imageContainer}
      style={styles.image}
      parallaxFactor={0.4}
      {...parallaxProps} /* pass in the necessary props */
    />
  )
}
