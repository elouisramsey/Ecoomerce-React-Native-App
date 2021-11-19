import React from 'react'
import { Text } from 'react-native'

export const convertCurrency = (amount) => {
  const total = amount
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return (
    <Text>
      {'\u20A6'} {total}
    </Text>
  )
}
