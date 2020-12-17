import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

class DealItem extends React.Component {
  static propTypes = {
    deal: PropTypes.object.isRequired,
  };

  render() {
    const { deal } = this.props;

    return (
      <View>
        <Image
          source={{ uri: deal.media[0]}}
          style={styles.image} />
        <View>
          <Text>{deal.title}</Text>
          <Text>{deal.price}</Text>
          <Text>{deal.cause.name}</Text>
        </View>
      </View>
    )
  }
}

export default DealItem;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
  },
});