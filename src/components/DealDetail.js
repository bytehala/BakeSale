import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";
import PropTypes from "prop-types";

import { priceDisplay } from "../util";
import ajax from "../ajax";

class DealDetail extends React.Component {

  imageXPos = new Animated.Value(0);

  imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      this.imageXPos.setValue(gs.dx);
    },
    onPanResponderRelease: (evt, gs) => {
      this.width = Dimensions.get('window').width;
      if (Math.abs(gs.dx) > this.width * 0.4) {
        const direction = Math.sign(gs.dx);
        // -1 for left, 1 for right
        Animated.timing(this.imageXPos, {
          toValue: direction * this.width,
          duration: 250,
        }).start(() => this.handleSwipe(-1 * direction));
      } else {
        Animated.spring(this.imageXPos, {
          toValue: 0
        }).start();
      }
    }
  });

  handleSwipe = (indexDirection) => {
    if (!this.state.deal.media[this.state.imageIndex + indexDirection]) {
      Animated.spring(this.imageXPos, {
        toValue: 0
      }).start();
      return;
    }
    this.setState((prevState) => ({
      imageIndex: prevState.imageIndex + indexDirection
    }), () => {
      // Next image animation
      this.imageXPos.setValue(indexDirection * this.width);
      Animated.spring(this.imageXPos, {
        toValue: 0
      }).start();
    });
  };


  static propTypes = {
    initialDealData: PropTypes.object.isRequired,
    onBackPressed: PropTypes.func.isRequired,
  };

  state = {
    deal: this.props.initialDealData,
    imageIndex: 0,
  };

  async componentDidMount() {
    const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
    this.setState({ deal: fullDeal });
    console.log(fullDeal);
  }

  backPressed = () => {
    this.props.onBackPressed();
  };

  render() {
    const { deal } = this.state;

    return (
      <View style={styles.dealDetail}>
        <TouchableOpacity style={styles.deal} onPress={this.backPressed}>
          <Text style={styles.backLink}>Back</Text>
        </TouchableOpacity>
        <View style={styles.deal}>
          <Animated.Image
            {...this.imagePanResponder.panHandlers}
            source={{ uri: deal.media[this.state.imageIndex] }}
            style={[{left: this.imageXPos}, styles.image]}
          />
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

export default DealDetail;

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
    color: "darkblue",
  },

  image: {
    width: "100%",
    height: 100,
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
