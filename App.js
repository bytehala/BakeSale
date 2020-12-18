import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import ajax from "./src/ajax";
import DealList from "./src/components/DealList";
import DealDetail from "./src/components/DealDetail";
import SearchBar from "./src/components/SearchBar";

class App extends React.Component {
  titleXPos = new Animated.Value(0);

  state = {
    deals: [],
    dealsFromSearch: [],
    searchTerm: "",
    currentDealId: null,
  };

  animateTitle = (direction = 1) => {
    const width = Dimensions.get("window").width - 220;
    Animated.timing(this.titleXPos, {
      toValue: (width / 2) * direction,
      duration: 1000,
      easing: Easing.ease,
    }).start(({ finished }) => {
      if (finished) {
        // finished means animation finished successfully and was not interrupted
        this.animateTitle(-1 * direction);
      }
    });
  };

  async componentDidMount() {
    this.animateTitle();
    const deals = await ajax.fetchInitialDeals();
    this.setState({ deals });
  }

  searchDeals = async (searchTerm) => {
    let dealsFromSearch = [];
    if (searchTerm) {
      this.setState({ searchTerm });
      dealsFromSearch = await ajax.fetchDealSearchResults(searchTerm);
    }
    this.setState({ dealsFromSearch });
  };

  setCurrentDeal = (dealId) => {
    this.setState({ currentDealId: dealId });
  };

  unsetCurrentDeal = () => {
    this.setState({ currentDealId: null });
  };

  currentDeal = () => {
    return this.state.deals.find(
      (deal) => deal.key === this.state.currentDealId
    );
  };

  render() {
    if (this.state.currentDealId) {
      return (
        <DealDetail
          initialDealData={this.currentDeal()}
          onBackPressed={this.unsetCurrentDeal}
        />
      );
    }
    if (this.state.deals.length > 0) {
      return (
        <View style={styles.container}>
          <SearchBar searchDeals={this.searchDeals} />
          <DealList
            deals={
              this.state.dealsFromSearch.length > 0
                ? this.state.dealsFromSearch
                : this.state.deals
            }
            onItemPress={this.setCurrentDeal}
          />
        </View>
      );
    }
    return (
      <Animated.View style={[{ left: this.titleXPos }, styles.main]}>
        <Text style={styles.header}>BakeSale TM</Text>
      </Animated.View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 50,
  },

  header: {
    fontSize: 40,
    textAlign: "center",
  },

  main: {
    height: "100%",
    marginTop: "50%",
  },
});
