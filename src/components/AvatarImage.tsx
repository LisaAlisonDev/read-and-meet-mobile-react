import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Button, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Profile } from '../core/@types/profile';
import { screenProp } from '../core/@types/routes.stack';
import styles from '../theme/styles';
import CameraComponents from '../screens/CameraScreen';

export type Props = {
  canEdit: boolean;
  avatar: Profile["avatar"];
};

const AvatarImage: React.FC<Props> = ({
  canEdit,
  avatar,
}) => {
  const [isOnEditingState, setEditing] = React.useState(canEdit);
  const profileImage = React.useState<Profile["avatar"]>(avatar);
  const navigation = useNavigation<screenProp>();


  if (!canEdit) {
    return <Image style={styles.avatarImage} source={{ uri: avatar }} />

    
  } else {
    return <><View >
      <Image style={styles.avatarImage} source={{ uri: avatar }} />  
      </View></>
  }



};

export default AvatarImage;