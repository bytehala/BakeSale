import React, { Component } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { PropTypes } from "prop-types";
import debounce from "lodash.debounce";

export default class SearchBar extends Component {
  static propTypes = {
    searchDeals: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
  };

  state = {
    searchTerm: this.props.searchTerm,
  };

  searchDeals = (searchTerm) => {
    this.props.searchDeals(searchTerm);
    this.inputElement.blur();
  }

  debouncedSearchDeals = debounce(this.searchDeals, 300);

  handleChange = (searchTerm) => {
    this.setState({ searchTerm }, () => {
      this.debouncedSearchDeals(this.state.searchTerm);
    });
  };

  render() {
    return (
      <TextInput
        value={this.state.searchTerm}
        ref={(inputElement) => {this.inputElement = inputElement;}}
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
