import React, { useState, useMemo } from 'react';
import { View, Text } from 'react-native';

import Colors from '../../constants/Colors';

const TimeShow = props => {

    const [isTimeShow, setIsTimeShow] = useState(true);
    const checkTimeHours = new Date().getHours();

    useMemo(() => {
        if (checkTimeHours >= props.timeShowValues) {
            setIsTimeShow(false);
            console.log(`เลยเวลาแล้ว`);
        }
        else if (checkTimeHours < props.timeShowValues) {
            setIsTimeShow(true);
            console.log(`ยังไมถึงเวลาโว้ย`);
        }
    }, [checkTimeHours])

    return (
        <View>
            <Text style={{ color: !isTimeShow || !props.timeShowStatus ? Colors.textSecondary : Colors.primary }}>{`${props.timeShowValues}.00`} </Text>
        </View >
    )
};

export default TimeShow;
