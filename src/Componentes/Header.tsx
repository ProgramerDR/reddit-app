import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeaderStyles } from '../Styles/HeaderStyles';

interface Props {
  usuario?: string;
}

const Header: React.FC<Props> = ({ usuario }) => {
  const navigation = useNavigation<any>();

  return (
    <View style={HeaderStyles.container}>
      

      <TouchableOpacity
        style={HeaderStyles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={HeaderStyles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={HeaderStyles.title}>Share App</Text>
      
      <View style={HeaderStyles.right}>
        
        <TouchableOpacity
          style={HeaderStyles.mainButton}
          onPress={() => navigation.navigate('Principal')}
        >
          <Text style={HeaderStyles.mainText}>Principal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={HeaderStyles.profileButton}
          onPress={() => navigation.navigate('Perfil')}
        >
          <Image
            
            style={HeaderStyles.avatar}
          />
          <Text style={HeaderStyles.profileText}>
            {usuario ? usuario : 'Mi perfil'}
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default Header;
