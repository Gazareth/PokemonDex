import axios from "axios";

// Create a new instance.
const service = axios.create({
  delay: 0 // use this custom option to allow overrides
});

service.interceptors.request.use(config => {
  if (config.delay > 0) {
    return new Promise(resolve =>
      setTimeout(() => resolve(config), config.delay)
    );
  }
  return config;
});

export default service;
