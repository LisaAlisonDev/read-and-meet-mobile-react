import React from 'react';
import {Image,  Button, StyleSheet, Text, View } from 'react-native';
import { Profile } from '../@types/profile';
import styles from '../theme/styles';

export type Props = {
  canEdit: boolean;
  profile: Profile;
};

const AvatarImage: React.FC<Props> = ({
  canEdit  = false,
  profile,
}) => {
  const [isOnEditingState, setEditing] = React.useState(canEdit);
  const profileImage = React.useState<Profile>(profile);

  return (
      <Image style={styles.avatarImage} source={{ uri: profile.avatar }} />   
  );
};

export default AvatarImage;