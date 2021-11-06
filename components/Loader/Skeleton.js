import React, { useState } from 'react'
import tw from '../../lib/tailwind'
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import Svg, { Circle, Rect } from 'react-native-svg'
import { View } from 'react-native'

export default function Skeleton() {
  return (
    <View style={tw`flex-row w-full flex-wrap justify-between`}>
      <View style={tw`w-1/2`}>
        <SvgAnimatedLinearGradient height={300}>
          <Rect x='0' y='4' rx='0' ry='5' width='150' height='290' />
        </SvgAnimatedLinearGradient>
      </View>
      <View style={tw`w-1/2`}>
        <SvgAnimatedLinearGradient height={300}>
          <Rect x='0' y='4' rx='0' ry='5' width='150' height='290' />
        </SvgAnimatedLinearGradient>
      </View>
      <View style={tw`w-1/2`}>
        <SvgAnimatedLinearGradient height={300}>
          <Rect x='0' y='4' rx='0' ry='5' width='150' height='290' />
        </SvgAnimatedLinearGradient>
      </View>
      <View style={tw`w-1/2`}>
        <SvgAnimatedLinearGradient height={300}>
          <Rect x='0' y='4' rx='0' ry='5' width='150' height='290' />
        </SvgAnimatedLinearGradient>
      </View>
      <View style={tw`w-1/2`}>
        <SvgAnimatedLinearGradient height={300}>
          <Rect x='0' y='4' rx='0' ry='5' width='150' height='290' />
        </SvgAnimatedLinearGradient>
      </View>
      <View style={tw`w-1/2`}>
        <SvgAnimatedLinearGradient height={300}>
          <Rect x='0' y='4' rx='0' ry='5' width='150' height='290' />
        </SvgAnimatedLinearGradient>
      </View>
      <View style={tw`w-1/2`}>
        <SvgAnimatedLinearGradient height={300}>
          <Rect x='0' y='4' rx='0' ry='5' width='150' height='290' />
        </SvgAnimatedLinearGradient>
      </View>
      <View style={tw`w-1/2`}>
        <SvgAnimatedLinearGradient height={300}>
          <Rect x='0' y='4' rx='0' ry='5' width='150' height='290' />
        </SvgAnimatedLinearGradient>
      </View>
      <View style={tw`w-1/2`}>
        <SvgAnimatedLinearGradient height={300}>
          <Rect x='0' y='4' rx='0' ry='5' width='150' height='290' />
        </SvgAnimatedLinearGradient>
      </View>
      <View style={tw`w-1/2`}>
        <SvgAnimatedLinearGradient height={300}>
          <Rect x='0' y='4' rx='0' ry='5' width='150' height='290' />
        </SvgAnimatedLinearGradient>
      </View>
      <View style={tw`w-1/2`}>
        <SvgAnimatedLinearGradient height={300}>
          <Rect x='0' y='4' rx='0' ry='5' width='150' height='290' />
        </SvgAnimatedLinearGradient>
      </View>
    </View>
  )
}
