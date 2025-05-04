/**
 * feature flag
 */

const SAMPLE_FEATURE = {
	show_dialog_box: true,
	enable_new_pricing: true,
  };

  const Cache = {
	features: {},
	timestamp: null,
  };

  const MAX_TTL = 10000;

  function fetchAllFeatures() {
	console.log("CALL BACKEND");
	return new Promise((resolve) => {
	  setTimeout(() => resolve(SAMPLE_FEATURE), 500);
	});
  }

  let isLoading = false;

  function getFeatureState(featureName, defaultName) {
	const isCachePresent = Object.keys(Cache.features).length;
	const isExpired = Date.now() - Cache.timestamp > MAX_TTL;

	if (!isExpired && isCachePresent) {
	  console.log("hit the cache");
	  const value = Cache.features.hasOwnProperty(featureName)
		? Cache.features[featureName]
		: defaultName;
	  return Promise.resolve(value);
	}

	// no cache hitted
	//   console.log("no cache hitted");
	isLoading = true;
	return fetchAllFeatures()
	  .then((data) => {
		Cache.features = data;
		Cache.timestamp = Date.now();
		return data.hasOwnProperty(featureName) ? data[featureName] : defaultName;
	  })
	  .finally(() => (isLoading = false));
  }


/**
 * bind
 */

// Override console.log directly
console.log = function(...args) {
	const timestamp = new Date().toISOString();
	originalLog.call(console, `[${timestamp}]`, ...args);
  };

const originalLog = console.log;
Object.defineProperty(console, "log", {
  configurable: true,
  writable: true,
  value: function (...args) {
    const timestamp = new Date().toLocaleTimeString();
    originalLog.call(console, `[${timestamp}]`, ...args);
  },
});

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
