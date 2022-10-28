import Ionicons from '@expo/vector-icons/Ionicons';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { mainColor, secondaryColor } from '../../theme/constant';


type TabBarProps = {
  focused : boolean,
  color : string,
  size : number, 
  route : RouteProp<ParamListBase, string>
}

export const tabBarIcon = ({ focused, color, size, route} : TabBarProps) : JSX.Element  => {
    let iconName;
    let top;
    size = focused ?  50 : 20;
    top = focused ?  -20 : 10;
    let offSetTop = focused ?  -18 : 10;
    if (route.name === 'Home') {
      iconName = focused
        ? 'home'
        : 'home-outline';
    } else if (route.name === 'Profile') {
      iconName = focused ? 'person-circle' : 'person-circle-outline';
    }else{
      iconName = focused ? 'settings' : 'settings-outline';
    }

    return <><Ionicons style={{
      overflow: 'visible', position: 'absolute', top: top,
    }} name={iconName} size={size} color={color} /><Ionicons style={{
      overflow: 'visible', position: 'absolute', top: offSetTop, zIndex:-1
    }} name={iconName} size={size} color={secondaryColor} /></>
  ;
}