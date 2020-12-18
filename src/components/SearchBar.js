import React, { Component } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { PropTypes } from "prop-types";
import debounce from "lodash.debounce";

export default class SearchBar extends Component {
  static propTypes = {
    searchDeals: PropTypes.func.isRequired,
  };

  state = {
    searchTerm: "",
  };

  debouncedSearchDeals = debounce(this.props.searchDeals, 300);

  handleChange = (searchTerm) => {
    this.setState({ searchTerm }, () => {
      this.debouncedSearchDeals(this.state.searchTerm);
    });
  };

  render() {
    return (
      <TextInput
        placeholder="Search All Deals"
        style={styles.input}
        onChangeText={this.handleChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    paddingHorizontal: 12,
  },
});
