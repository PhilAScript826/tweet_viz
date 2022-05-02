/**
 * Welcome to the Looker Visualization Builder! Please refer to the following resources
 * to help you write your visualization:
 *  - API Documentation - https://github.com/looker/custom_visualizations_v2/blob/master/docs/api_reference.md
 *  - Example Visualizations - https://github.com/looker/custom_visualizations_v2/tree/master/src/examples
 **/

const visObject = {
	/**
	 * Configuration options for your visualization. In Looker, these show up in the vis editor
	 * panel but here, you can just manually set your default values in the code.
	 **/

	/**
	 * The create function gets called when the visualization is mounted but before any
	 * data is passed to it.
	 **/
	create: function (element, config) {
		// Create a container element to let us center the text.
		var container = element.appendChild(document.createElement("div"));
		container.className = "hello-world-vis";

		// this._container = container;

		var arr = [...Array(1).keys()];

		arr.forEach((i) => {
			div = document.createElement("div");
			div.className = `tweet-container-${i}`;
			container.appendChild(div);
			this._div = div;
		});

		window.twttr = (function (d, s, id) {
			var js,
				fjs = d.getElementsByTagName(s)[0],
				t = window.twttr || {};
			if (d.getElementById(id)) return t;
			js = d.createElement(s);
			js.id = id;
			js.src = "https://platform.twitter.com/widgets.js";
			fjs.parentNode.insertBefore(js, fjs);

			t._e = [];
			t.ready = function (f) {
				t._e.push(f);
			};

			return t;
		})(document, "script", "twitter-wjs");
	},

	/**
	 * UpdateAsync is the function that gets called (potentially) multiple times. It receives
	 * the data and should update the visualization with the new data.
	 **/
	updateAsync: function (data, element, config, queryResponse, details, done) {
		// window.twttr = (function (d, s, id) {
		// 	var js,
		// 		fjs = d.getElementsByTagName(s)[0],
		// 		t = window.twttr || {};
		// 	if (d.getElementById(id)) return t;
		// 	js = d.createElement(s);
		// 	js.id = id;
		// 	js.src = "https://platform.twitter.com/widgets.js";
		// 	fjs.parentNode.insertBefore(js, fjs);

		// 	t._e = [];
		// 	t.ready = function (f) {
		// 		t._e.push(f);
		// 	};

		// 	return t;
		// })(document, "script", "twitter-wjs");
		// Clear any errors from previous updates.
		this.clearErrors();

		// Throw some errors and exit if the shape of the data isn't what this chart needs.
		if (queryResponse.fields.dimensions.length == 0) {
			this.addError({
				title: "No Dimensions",
				message: "This chart requires dimensions.",
			});
			return;
		}

		console.log(data);
		// data = ["20", "1494058476141694978"];
		// var myString = `<blockquote class="twitter-tweet" data-lang="en">
		// <p lang="en" dir="ltr">just setting up my twttr</p>&mdash; Jack (@jack) <a href="https://twitter.com/jack/status/20">March 21, 2006</a>
		// </blockquote>`;
		// var parser = new DOMParser();
		// var doc = parser.parseFromString(myString, 'text/html');
		// this._div.appendChild(doc.documentElement)

		twttr.widgets.createTweet(
			data[0]['tweet_string']['value'], 
			element, 
			{
				theme: "dark",
			}
		);

		// twttr.widgets.createTweet(like, document.querySelector(`#vis`), {
		// 	theme: "dark",
		// });
		// console.log(data);
		// data.forEach((like, idx) => {
		// 	twttr.widgets.createTweet(like, document.querySelector(`#vis`), {
		// 		theme: "dark",
		// 	});
		// });
		// data.forEach((tweet, idx) => {
		// 	var id = tweet["tweet_string"]["value"];
		// 	console.log(id);
		// 	console.log(this._div);
		// 	console.log(twttr)
		// 	twttr.widgets.createTweetEmbed(
		// 		id,
		// 		this._div,
		// 		{
		// 			theme: "dark",
		// 		}
		// 	);
		// });

		done();
	},
};

looker.plugins.visualizations.add(visObject);
