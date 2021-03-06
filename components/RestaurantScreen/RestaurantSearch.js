import * as React from 'react';
import { StyleSheet, View, Text as RNText } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from '../StyledText';
import { SearchBar } from 'react-native-elements';


export class RestaurantSearch extends React.Component {
    state = {
	search: '',
    };
    
    updateSearch = search => {
	this.setState({ search });
    };
    
    render() {
	const { search } = this.state;
	
	return (
		<SearchBar
            placeholder="Search Restaurants..."
            onChangeText={this.updateSearch}
	    containerStyle= {styles.containerStyle}
	    inputContainerStyle = {styles.inputContainerStyle}
	    inputStyle = {styles.inputStyle}
	    lightTheme = {true}
	    placeholderTextColor = {'#959595'}
	    round = {true}
            value={search}
		/>
	);
    }
}

const styles = StyleSheet.create({
    containerStyle: {
	backgroundColor: '#ffffff',
	borderWidth: 0
    },
    inputContainerStyle: {
	backgroundColor: '#f1f1f1'
    },
    inputStyle: {
	fontFamily: 'rubik',
	color: '#000000'
    }
	
    
});
    
