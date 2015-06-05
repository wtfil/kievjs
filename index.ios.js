'use strict';

var React = require('react-native');
var { AppRegistry, ScrollView, Navigator, TabBarIOS } = React;

var Examples = require('./js/examples');
var Inbox = require('./js/inbox');


var routes = {
	examples: {
		component: Examples,
		title: 'examples'
	},
	inbox: {
		component: Inbox,
		title: 'inbox',
	}
};

var App = React.createClass({
	renderScene(currentRoute, navigator) {
		return <TabBarIOS>
			{Object.keys(routes).map(key => {
				var route = routes[key];

				return <TabBarIOS.Item
					systemIcon={route.icon}
					title={route.title}
					selected={currentRoute === route}
					onPress={() => {
						navigator.replace(route);
					}}
					>

					<route.component  {...navigator} />
				</TabBarIOS.Item>
			})}
		</TabBarIOS>
	},
	render() {
		return <Navigator
			style={{flex: 1}}
			initialRoute={routes.examples}
			renderScene={this.renderScene}
		/>
	}
});


AppRegistry.registerComponent('KievjsDemo', () => App);
