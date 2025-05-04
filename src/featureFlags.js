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

  // 1111111111111111111111
  let pendingFetch = null;
  function getFeatureState2(featureName, defaultName) {
    const isCachePresent = Object.keys(Cache.features).length;
    const isExpired = Date.now() - Cache.timestamp > MAX_TTL;
    // Return cached data if available
    if (!isExpired && isCachePresent) {
      return Promise.resolve(cache);
    }

    // If a fetch is already in progress, return the pending promise
    if (pendingFetch) {
      return pendingFetch;
    }

    // Otherwise, start a new fetch
    pendingFetch = fetchAllFeatures()
      .then((data) => {
        Cache.features = data;
        Cache.timestamp = Date.now();
        return data.hasOwnProperty(featureName) ? data[featureName] : defaultName;
      })
      .finally(() => {
        pendingFetch = null; // Clear pendingFetch once the request completes
      });

    return pendingFetch;
  }

  // 22222222222222222222222
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

	isLoading = true;
	return fetchAllFeatures()
	  .then((data) => {
		Cache.features = data;
		Cache.timestamp = Date.now();
		return data.hasOwnProperty(featureName) ? data[featureName] : defaultName;
	  })
	  .finally(() => (isLoading = false));
  }

  getFeatureState2("show_dialog_box", false).then(function (isEnabled) {
    if (isEnabled) {
      console.log("show_dialog_box ENABLE 0");
    } else {
      console.log("show_dialog_box DISABLED 0");
    }
  });
