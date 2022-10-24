import Ionicons from '@expo/vector-icons/Ionicons';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { mainColor } from '../theme/constant';


type TabBarProps = {
  focused : boolean,
  color : string,
  size : number, 
  route : RouteProp<ParamListBase, string>
}

export const tabBarIcon = ({ focused, color, size, route} : TabBarProps) : JSX.Element  => {
    let iconName;
    color = mainColor
    if (route.name === 'Home') {
      iconName = focused
        ? 'home'
        : 'home-outline';
    } else if (route.name === 'Profile') {
      iconName = focused ? 'person-circle' : 'person-circle-outline';
    }else{
      iconName = focused ? 'settings' : 'settings-outline';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
}