import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import { priceDisplay } from "../util";
import ajax from "../ajax";

class DealItem extends React.Component {
  static propTypes = {
    initialDealData: PropTypes.object.isRequired,
    onBackPressed: PropTypes.func.isRequired,
  };

  state = {
    deal: this.props.initialDealData,
  };

  async componentDidMount() {
    const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
    this.setState({ deal: fullDeal });
    console.log(fullDeal);
  }

  backPressed = () => {
    this.props.onBackPressed();
  }

  render() {
    const { deal } = this.state;

    return (
      <View style={styles.dealDetail}>
        <TouchableOpacity style={styles.deal} onPress={this.backPressed}>
          <Text style={styles.backLink}>Back</Text>
        </TouchableOpacity>
        <View style={styles.deal}>
          <Image source={{ uri: deal.media[0] }} style={styles.image} />
          <Text style={styles.title}>{deal.title}</Text>
          <View style={styles.info}>
            <View style={styles.footer}>
              <View style={styles.metadata}>
                <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
                <Text style={styles.cause}>{deal.cause.name}</Text>
              </View>
              {deal.user && (
                <View style={styles.author}>
                  <Image
                    source={{ uri: deal.user.avatar }}
                    style={styles.avatar}
                  />
                  <Text style={styles.authorName}>{deal.user.name}</Text>
                </View>
              )}
            </View>

            <View style={styles.description}>
              <Text>{deal.description}</Text>
            </View>
          </View>
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

  dealDetail: {
    marginHorizontal: 12,
    marginTop: 50,
  },

  backLink: {
    color: 'darkblue'
  },

  image: {
    width: "100%",
    height: 150,
  },

  title: {
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "rgba(237, 149, 45, 0.4)",
    padding: 10,
  },

  info: {
    padding: 10,
    borderColor: "#bbb",
    borderWidth: 1,
    borderTopWidth: 0,
    backgroundColor: "white",
  },

  description: {
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#eee",
  },

  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  metadata: {
    flex: 1,
  },

  author: {
    flex: 1,
  },

  cause: {
    textAlign: "center",
  },

  price: {
    textAlign: "center",
    fontWeight: "bold",
  },

  avatar: {
    width: 60,
    height: 60,
    alignSelf: "center",
    borderRadius: 30,
  },

  authorName: {
    textAlign: "center",
  },
});
