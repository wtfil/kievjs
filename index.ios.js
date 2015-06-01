/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  TouchableOpacity,
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
} = React;

var MailItem = React.createClass({
	render() {
		return <View style={styles.preview}>
			<Image
				style={styles.siteImage}
				source={{uri: this.props.mailLogo}}
			/>
			<View style={styles.previewRight}>
				<Text style={styles.subject}>{this.props.subject}</Text>
				<Text style={styles.subSubject}>{this.props.subSubject}</Text>
				<Text style={styles.previewText}>{this.props.message}</Text>
			</View>
		</View>;
	}
});

var Inbox = React.createClass({
	render() {
		return <View style={styles.container}>
			<View style={styles.inboxHeader}>
				<Text style={styles.inboxHeaderText}>Today</Text>
			</View>
			<MailItem
				mailLogo='https://s-media-cache-ak0.pinimg.com/236x/9e/8d/6e/9e8d6e0b9932d32d751dc19849efaee1.jpg'
				subject='Unread messages in frontend-ua'
				subSubject='Gitter Notifications'
				message='You have under messages frontend-ua 9 undread messages'
			/>
			<MailItem
				mailLogo='https://s-media-cache-ak0.pinimg.com/236x/9e/8d/6e/9e8d6e0b9932d32d751dc19849efaee1.jpg'
				subject='Unread messages in frontend-ua'
				subSubject='Gitter Notifications'
				message='You have under messages frontend-ua 9 undread messages'
			/>
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
		padding: 10,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderColor: '#e2e2e2'
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
