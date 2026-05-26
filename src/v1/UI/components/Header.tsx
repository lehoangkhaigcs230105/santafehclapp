import { Feather, Ionicons } from '@expo/vector-icons'
import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { RoleEnum } from '@/configs/enums/roleEnum'
import { StackScreens } from '@/configs/navigations/screens'
import { AuthContext } from '@/v1/logics/contexts/AuthContext'
import { windowWidth } from '../../logics/utils/Dimensions'

interface HeaderTabsProps {
  title: string
  showBack?: boolean
  rightAction?: () => void
  fallbackRoute?: string
}

export default function HeaderTabs({
  title,
  showBack = false,
  rightAction,
  fallbackRoute = StackScreens.home,
}: HeaderTabsProps) {

  const navigation = useNavigation<any>()
  const authState = useContext(AuthContext)

  const resolveFallbackRoute = () => {
    if (!authState?.user) return StackScreens.login
    if (fallbackRoute !== StackScreens.home) return fallbackRoute
    if (authState.role === RoleEnum.admin) return StackScreens.adminHome
    if (authState.role === RoleEnum.subAdmin) return StackScreens.subAdminHome
    return StackScreens.home
  }

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
      return
    }

    const targetNavigation = navigation.getParent?.() ?? navigation

    targetNavigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: resolveFallbackRoute() }],
      })
    )
  }

  return (
    <View style={styles.wrapper}>

      {showBack && (
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        >
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
      )}

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

  backButton: {
    position: 'absolute',
    top: 35,
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
