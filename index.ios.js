'use strict';

var React = require('react-native');
var { TouchableOpacity, AppRegistry, StyleSheet, Image, Text, View } = React;

var MailItem = React.createClass({
	getInitialState() {
		return {
			hold: false,
			read: false,
			snoozed: false,
			offsetX: 0
		}
	},
	onMarkAsRead() {
		this.setState({read: true});
		setTimeout(this.setState.bind(this, {collapced: true}), 2000);
	},
	onMarkAsSnooze() {
		this.setState({snoozed: true});
		setTimeout(this.setState.bind(this, {collapced: true}), 2000);
	},
	render() {
		var props = {
			style: [
				styles.preview,
				{backgroundColor: this.state.hold ? '#e8f0fd' : 'white'},
			],
			onStartShouldSetResponder: e => true,
		   	onResponderMove: (e) => {
				var t = e.touchHistory.touchBank[1];
				var offsetX = t.currentPageX - t.startPageX;

				if (offsetX > 100) {
					this.onMarkAsRead();
				} else if (offsetX < -100) {
					this.onMarkAsSnooze();
				}
				this.setState({
					offsetX: offsetX,
					hold: false
				});
		   	},
			onResponderTerminationRequest(e) {
				var t = e.touchHistory.touchBank[1];
				return Math.abs(t.currentPageY - t.startPageY) > 20;
			},
			onResponderGrant: e => {
				this.setState({ hold: true });
			},
			onResponderTerminate(e) { props.onResponderRelease(e) },
			onResponderRelease: e => {
				this.setState({
					hold: false,
					offsetX: 0
				});
			}
		};
		if (this.state.collapced) {
			return null;
		}
		if (this.state.snoozed) {
			return <View style={[styles.preview, styles.previewSnoozed]}><Text>Snoozed</Text></View>;
		}
		if (this.state.read) {
			return <View style={styles.previewRead}><Text>Read</Text></View>;
		}
		return <View {...props} >
			<View style={[styles.marker, {backgroundColor: this.state.offsetX > 0 ? '#1e9c5a' : '#dc9d24'}]}/>
			<View style={[ styles.previewMovable, { left: this.state.offsetX} ]}>
				<Image
					style={styles.siteImage}
					source={{uri: this.props.mailLogo}}
				/>
				<View style={styles.previewRight}>
					<Text style={styles.subject}>{this.props.subject}</Text>
					<Text style={styles.subSubject}>{this.props.subSubject}</Text>
					<Text style={styles.previewText}>{this.props.message}</Text>
				</View>
			</View>
		</View>;
	}
});

var testItems = [
	{
		mailLogo: 'https://s-media-cache-ak0.pinimg.com/236x/9e/8d/6e/9e8d6e0b9932d32d751dc19849efaee1.jpg',
		subject: 'Unread messages in frontend-ua',
		subSubject: 'Gitter Notifications',
		message: 'You have under messages frontend-ua 9 undread messages'
	},
	{
		mailLogo: 'https://s-media-cache-ak0.pinimg.com/236x/9e/8d/6e/9e8d6e0b9932d32d751dc19849efaee1.jpg',
		subject: 'Unread messages in frontend-ua',
		subSubject: 'Gitter Notifications',
		message: 'You have under messages frontend-ua 9 undread messages'
	}
];

var Inbox = React.createClass({

	getInitialState() {
		return {items: testItems};
	},

	render() {
		return <View style={styles.container} onMoveShouldSetResponder={() => true}>
			<View style={styles.inboxHeader}>
				<Text style={styles.inboxHeaderText}>Today</Text>
			</View>
			<View>
				{this.state.items.map((item, index) =>
					<MailItem {...item} />
				 )}
			</View>
		</View>
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	inboxHeader: {
		padding: 10,
		paddingTop: 40,
		fontWeight: 'bold',
		backgroundColor: '#ededed',
		borderBottomWidth: 1,
		borderColor: '#e2e2e2'
	},
	inboxHeaderText: {
		color: '#767676'
	},
	preview: {
		position: 'relative',
		overflow: 'hidden',
		borderBottomWidth: 1,
		borderColor: '#e2e2e2'
	},
	marker: {
		height: 76,
		width: 500,
		left: 0,
		top: 0,
		position: 'absolute'
	},
	previewRead: {
		justifyContent: 'center',
		padding: 10,
		backgroundColor: '#1e9c5a',
		color: '#fff'
	},
	previewSnoozed: {
		justifyContent: 'center',
		padding: 10,
		backgroundColor: '#dc9d24'
	},
	previewMovable: {
		padding: 10,
		flex: 1,
		flexDirection: 'row',
	},
	previewRight: {
		paddingHorizontal: 10,
		overflow: 'hidden',
		fontFamily: 'Helvetica Neue',
		flex: 1,
		paddingLeft: 10
	},
	siteImage: {
		borderRadius: 20,
		height: 40,
		width: 40,
	},
	subject: {
		fontSize: 15
	},
	subSubject: {
		marginTop: 3,
		fontSize: 13
	},
	previewText: {
		marginTop: 3,
		flexWrap: 'nowrap',
		fontSize: 13,
		color: '#767676',
		width: 1000
	}
});

AppRegistry.registerComponent('KievjsDemo', () => Inbox);
