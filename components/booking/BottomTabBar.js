import React from 'react'
import { BottomTabBar } from 'react-navigation-tabs'
import { View, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { StyleSheet } from 'react-native';

const TouchableWithoutFeedbackWrapper = ({
    onPress,
    onLongPress,
    testID,
    accessibilityLabel,
    ...props
}) => {
    if (props.focused) props.style.push(styles.tabBarStyle)
    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            onLongPress={onLongPress}
            testID={testID}
            hitSlop={{
                left: 15,
                right: 15,
                top: 5,
                bottom: 5,
            }}
            accessibilityLabel={accessibilityLabel}
        >
            <View {...props} />
        </TouchableWithoutFeedback>
    )
}

export default TabBarComponent = props => {
    return <BottomTabBar
        {...props}
        style={styles.bottomBarStyle}
        getButtonComponent={() => {
            return TouchableWithoutFeedbackWrapper
        }}
    />
}

const styles = StyleSheet.create({
    bottomBarStyle: {
        //if you need to style the whole bottom bar
    },
    tabBarStyle: {
        borderTopWidth: 1
    }
})