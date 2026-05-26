import { Feather, Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { windowWidth } from '../../logics/utils/Dimensions'

interface HeaderTabsProps {
  title: string
  showBack?: boolean
  rightAction?: () => void
}

export default function HeaderTabs({
  title,
  showBack = false,
  rightAction,
}: HeaderTabsProps) {

  const navigation = useNavigation<any>()

  return (
    <View style={styles.wrapper}>

      {/* 🔥 BACK BUTTON (FLOATING) */}
      {showBack && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        >
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
      )}

      {/* 🔥 HEADER */}
      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>{title}</Text>

        {rightAction && (
          <TouchableOpacity onPress={rightAction} style={styles.rightButton}>
            <Feather name="plus" size={22} color="#000" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },

  headerContainer: {
    height: windowWidth * 0.13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',

    zIndex: 1,
  },

  textHeader: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },

  /* 🔥 BACK BUTTON RIÊNG */
  backButton: {
    position: 'absolute',
    top: 35,      // 👉 chỉnh lên/xuống tùy UI
    left: 16,
    zIndex: 9999,
    elevation: 50,

    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightButton: {
    position: 'absolute',
    right: 16,
    top: 15,
  },
})