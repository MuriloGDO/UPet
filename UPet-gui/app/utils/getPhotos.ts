import * as ImagePicker from 'expo-image-picker';


export const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
      base64:true
    });
    if (!result.canceled) {
        return result.assets[0].base64
    }
  };