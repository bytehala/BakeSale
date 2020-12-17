import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import { priceDisplay } from "../util";
import ajax from "../ajax";

class DealItem extends React.Component {
  static propTypes = {
    initialDealData: PropTypes.object.isRequired,
  };

  state = {
    deal: this.props.initialDealData,
  };

  async componentDidMount() {
    const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
    this.setState({ deal: fullDeal });
    console.log(fullDeal);
  }

  render() {
    const { deal } = this.state;

    return (
      <View style={styles.deal}>
        <Image source={{ uri: deal.media[0] }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{deal.title}</Text>
          <View style={styles.footer}>
            <Text style={styles.cause}>{deal.cause.name}</Text>
            <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
          </View>
        </View>

        {deal.user && (
          <View>
            <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
            <Text>{deal.user.name}</Text>
          </View>
        )}
        <View>
          <Text>{deal.description}</Text>
        </View>
      </View>
    );
  }
}

export default DealItem;

const styles = StyleSheet.create({
  deal: {
    marginHorizontal: 12,
    marginTop: 12,
  },

  image: {
    width: "100%",
    height: 150,
  },

  title: {
    fontWeight: "bold",
    fontSize: 16,
  },

  info: {
    padding: 10,
    borderColor: "#bbb",
    borderWidth: 1,
    borderTopWidth: 0,
    backgroundColor: "white",
  },

  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  cause: {
    flex: 2,
  },

  price: {
    flex: 1,
    textAlign: "right",
  },

  avatar: {
    width: 60,
    height: 60,
  },
});
