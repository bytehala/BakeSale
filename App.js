import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ajax from "./src/ajax";
import DealList from "./src/components/DealList";
import DealDetail from "./src/components/DealDetail";
import SearchBar from "./src/components/SearchBar";

class App extends React.Component {
  state = {
    deals: [],
    dealsFromSearch: [],
    searchTerm: '',
    currentDealId: null,
  };

  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals();
    this.setState({ deals });
  }

  searchDeals = async (searchTerm) => {
    let dealsFromSearch = [];
    if (searchTerm) {
      this.setState({searchTerm});
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
            deals={this.state.dealsFromSearch.length > 0 ? this.state.dealsFromSearch : this.state.deals}
            onItemPress={this.setCurrentDeal}
          />
        </View>
      );
    }
    return <Text style={styles.header}>BakeSale TM</Text>;
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },

  header: {
    fontSize: 40,
  },
});
