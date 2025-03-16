/**
 * feature flag
 */

const FEATURE_FLAGS = ["", ""];

const fetchAllFeatureFlags = () => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(FEATURE_FLAGS));
	});
};

async function getFeatureFlag(feature, defaultValue) {
	const flags = await fetchAllFeatureFlags();
	if (flags.includes(feature)) {
		return true;
	}

	return defaultValue;
}

/**
 * bind
 */

/**
 * Analytics
 */

function debounce(func, delay = 3000) {
	let timer;

	return function (...args) {
		if (timer) {
			return;
		}
		timer = setInterval(() => {
			func.apply(this, args);
		}, delay);
	};
}

class Analytics {
	key = new WeakMap();
	eventsCache = [];

	get apiKey() {
		return this.key.get(this);
	}
}

class BrowserAnalytics extends Analytics {
	constructor(apiKey) {
		super();
		this.key.set(this, apiKey);
		this.debouncedFlush = debounce(this.flush.bind(this));
	}

	track(event) {
		this.eventsCache.push(event);

		this.debouncedFlush();
	}

	flush() {
		const currentLength = this.eventsCache.length;
		const dataForSumbit = this.eventsCache.splice(0, currentLength);
		console.log("flush", dataForSumbit);
	}
}

const analytics = new BrowserAnalytics("123");

function asyncPush() {
	setInterval(() => {
		const newData = Math.random(); // Simulate new data
		for (let i = 0; i < 10; i++) {
			analytics.track(i + "-" + newData);
		}
	}, 1000); // Push every second
}

/* asyncPush() */

console.log(analytics.apiKey);
