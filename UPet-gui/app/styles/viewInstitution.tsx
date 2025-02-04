import { StyleSheet } from "react-native";

export const homeInstitutionsStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      marginTop: 20,
      alignItems: 'center',
    },
    headerArrow: {
      flexDirection: 'row',
      marginTop: 40,
      marginRight: 220,
    },
    headerText: {
      flexDirection: 'row',
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    content: {
      padding: 16,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 16,
      alignItems: 'center',
      marginBottom:8
    },
    text: {
      fontSize: 14,
      marginTop: 4,
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    ratingText: {
      fontSize: 16,
      marginLeft: 8,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 16,
      borderTopWidth: 1,
      borderColor: '#ccc',
    },
  });
  