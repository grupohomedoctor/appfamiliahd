import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const ContactCard = props => {
  return (
    <View style={{ ...styles.card, ...styles.row }}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarCharacter}>{props.contactInitials}</Text>
        </View>
      </View>
      <View style={styles.contactInformation}>
        <View style={styles.row}>
          <Text style={{ ...styles.nunito, ...styles.contactDescription }}>
            {props.contactName}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={{ ...styles.nunito, ...styles.contactDescription2 }}>
            {props.contactNumber}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ContactCard;
