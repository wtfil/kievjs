var React = require('react-native');
var { StyleSheet, Image, Text, View, ListView } = React;
var testData = require('./data');

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
			onResponderTerminate: e => {
				this.setState({
					hold: false,
					offsetX: 0
				});
			},
			onResponderRelease: e => {
				this.setState({
					open: this.state.offsetX === 0 && !this.state.open,
					hold: false,
					offsetX: 0
				});
			}
		};
		if (this.state.collapced) {
			return null;
		}
		if (this.state.snoozed) {
			return <View style={[styles.preview, styles.previewSnoozed]}>
				<Text>Snoozed</Text>
			</View>;
		}
		if (this.state.read) {
			return <View style={[styles.preview, styles.previewRead]}>
				<Text>Read</Text>
			</View>;
		}
		return <View {...props} >
			<View style={[styles.marker, {backgroundColor: this.state.offsetX > 0 ? '#1e9c5a' : '#dc9d24'}]}/>
			<View style={[styles.previewMovable, { left: this.state.offsetX} ]}>
				<Image
					style={styles.siteImage}
					source={{uri: this.props.mailLogo}}
				/>
				<View style={styles.previewRight}>
					<Text style={styles.subject}>{this.props.subject}</Text>
					<Text style={styles.subSubject}>{this.props.subSubject}</Text>
					<Text style={styles.previewText}>
						{this.state.open ?
							this.props.message :
							(this.props.message.replace(/\s/g, ' ').slice(0, 40) + '...')
						}
					</Text>
				</View>
			</View>
		</View>;
	}
});

var Inbox = React.createClass({

	getInitialState() {
		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		return {
			items: ds.cloneWithRows(testData)
		};
	},

	render() {
		return <View>
			<View style={styles.inboxHeader}>
				<Text style={styles.inboxHeaderText}>Today</Text>
			</View>
			<ListView
				dataSource={this.state.items}
				renderRow={data => <MailItem {...data} /> }
			/>
		</View>
	}
});

var styles = StyleSheet.create({
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
		fontSize: 13,
		color: '#767676'
	}
});

module.exports = Inbox;
