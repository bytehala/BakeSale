import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import {priceDisplay} from '../util';

class DealItem extends React.Component {
  static propTypes = {
    deal: PropTypes.object.isRequired,
  };

  render() {
    const { deal } = this.props;

    return (
      <View style={styles.deal}>
        <Text>Detail:</Text>
        <Image
          source={{ uri: deal.media[0]}}
          style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{deal.title}</Text>
          <View style={styles.footer}>
            <Text style={styles.cause}>{deal.cause.name}</Text>
            <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default DealItem;

const styles = StyleSheet.create({
  deal: {
    marginHorizontal: 12,
    marginTop: 12,
  },

  image: {
    width: '100%',
    height: 150,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  info: {
    padding: 10,
    borderColor: '#bbb',
    borderWidth: 1,
    borderTopWidth: 0,
    backgroundColor: 'white',
  },

  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  cause: {
    flex: 2
  },

  price: {
    flex: 1,
    textAlign: 'right'
  },
});