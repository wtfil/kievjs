var React = require('react-native');
var {
	ActivityIndicatorIOS,
	DatePickerIOS,

	MapView,
	PickerIOS,
	SegmentedControlIOS,
	ScrollView,
	SliderIOS,
	SwitchIOS,
	TabBarIOS,
	TextInput,
	WebView,
	TouchableOpacity,
	AppRegistry,
	StyleSheet,
	Image,
	Text,
	View
} = React;

var Examples = React.createClass({

	getInitialState() {
		return {
			date: new Date()
		};
	},
	onDateChange(date) {
		this.setState({date: date});
	},

	render() {
		return <ScrollView>

			<ActivityIndicatorIOS
				animating={true}
				style={[{height: 40}]}
				size='small'
			/>


			<View style={{height: 100, flexDirection: 'row'}}>
				<MapView style={{flex: 1, width: 200}} />
				<WebView style={{flex: 1, width: 200}} url="http://kyivjs.org.ua/"/>
			</View>

			<PickerIOS selectedValue='1'>
				<PickerIOS.Item
					value='0'
					label='bmw'
				/>
				<PickerIOS.Item
					value='1'
					label='volvo'
				/>
				<PickerIOS.Item
					value='2'
					label='mercedes'
				/>
			</PickerIOS>


			<TabBarIOS >

				<TabBarIOS.Item
					systemIcon="history"
					badge="3"
					selected={true} >
					<View style={styles.tabContent}>
						<Text style={styles.tabText}>Tab 1</Text>
					</View>
				</TabBarIOS.Item>

				<TabBarIOS.Item
					title="tab with title"
					selected={false}>

					<View style={styles.tabContent}>
						<Text style={styles.tabText}>Tab 1</Text>
					</View>
				</TabBarIOS.Item>

				<TabBarIOS.Item
					systemIcon="more"
					badge=":)"
					selected={false}>

					<View style={styles.tabContent}>
						<Text style={styles.tabText}>Tab 1</Text>
					</View>
				</TabBarIOS.Item>

			</TabBarIOS>

			<SegmentedControlIOS values={['One', 'Two', 'Three']} style={{marginVertical: 10}}/>

			<View style={{flexDirection: 'row'}}>
				<SliderIOS style={{width: 200}}/>
				<SwitchIOS style={{marginHorizontal: 30}}/>
				<SwitchIOS value={true}/>
			</View>
			<View style={{padding: 10, flexDirection: 'row'}}>
				<TextInput value='text input' style={{height: 30, borderWidth: 0.5, width: 200}}/>
				<Text>Text</Text>
			</View>

			<DatePickerIOS
				date={this.state.date}
				mode='datetime'
				timeZoneOffsetInMinutes={120}
				onDateChange={this.onDateChange}
			/>

		</ScrollView>
	}
});

var styles = StyleSheet.create({
	title: {
		textAlign: 'center'
	},
	map: {
		flex: 1,
		height: 100
	},
	tabContent: {
		flex: 1,
		height: 20,
		backgroundColor: 'red',
 		alignItems: 'center'
	},
	tabText: {
		margin: 50,
		color: 'black'
	}
});


module.exports = Examples;
