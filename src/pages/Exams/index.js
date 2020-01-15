import React, { useState, useEffect } from 'react';
import { View, Image, Alert, Platform, BackHandler, Text } from 'react-native';
import styles from './styles';
import SolicitationHeader from '../../components/SolicitationHeader';
import GradientButton from '../../components/GradientButton';
import ImagePicker from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as dbConnectionActions } from '../../store/ducks/dbConnection';
import documentIcon from '../../assets/icons/document-icon.png';
import { Component } from 'react';

const Exams = props => {
  const [medicalPrescription, setMedicalPrescription] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector(state => state.dbConnection.loading);
  const userName = useSelector(state => state.asyncStorage.userName);
  const IDAdmission = useSelector(state => state.asyncStorage.IDAdmission);

  const submitHandle = () => {
    if (!medicalPrescription) {
      Alert.alert('Faltam alguns dados!', 'Por favor escolha uma imagem!', [
        { text: 'Ok', style: 'destructive', onPress: null },
      ]);
    } else {
      dispatch(
        dbConnectionActions.Post(
          IDAdmission,
          'SP',
          403,
          null,
          userName,
          medicalPrescription.file,
        ),
      );
    }
  };

  const imagePickerOptions = {
    title: 'Anexar pedido médico (guia)',
    cancelButtonTitle: 'Cancelar',
    takePhotoButtonTitle: 'Tirar foto...',
    chooseFromLibraryButtonTitle: 'Escolher no álbum...',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const uploadImageHandle = () => {
    ImagePicker.showImagePicker(imagePickerOptions, response => {
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (!response.didCancel) {
        const file = new FormData();
        const [prefix, suffix] = response.fileName.split('.');
        const ext = suffix.toLowerCase() === 'heic' ? 'jpg' : suffix;

        file.append('file', {
          uri:
            Platform.OS === 'android'
              ? response.uri
              : response.uri.replace('file://', ''),
          type: response.type,
          name: `${prefix}.${ext}`,
        });

        const base64Source = {
          uri: 'data:image/jpeg;base64,' + response.data,
          file,
        };

        setMedicalPrescription(base64Source);
      }
    });
  };

  return (
    <View style={styles.form}>
      <SolicitationHeader
        style={styles.headerContainer}
        pathToGoBackTo="Home"
        headerTitle="Solicitação de Exames"
      />

      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={uploadImageHandle}>
          <Image
            resizeMode="center"
            style={styles.image}
            source={medicalPrescription ? medicalPrescription : documentIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <GradientButton
          buttonTitle={
            medicalPrescription
              ? 'Enviar pedido'
              : 'Anexar um pedido médico (guia)'
          }
          buttonWidth={330}
          onPress={medicalPrescription ? submitHandle : uploadImageHandle}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default Exams;
