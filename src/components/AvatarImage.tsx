import React from 'react';
import { Image, Button, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Profile } from '../core/@types/profile';
import styles from '../theme/styles';

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

  if (!canEdit) {
    return <Image style={styles.avatarImage} source={{ uri: avatar }} />
  } else {
    return <View style={{ marginBottom: 10 }}>
      <Image style={styles.avatarImage} source={{ uri: avatar }} />
      <TouchableOpacity style={{ backgroundColor: "lightgrey", padding: 10 }}>
        <Text style={{ textAlign : "center"}}>Modifier</Text>
      </TouchableOpacity></ View>
  }



};

export default AvatarImage;