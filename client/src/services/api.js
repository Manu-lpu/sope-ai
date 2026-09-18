const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001";

const createRequest = (baseUrl) => {
  return async (url, options = {}) => {
    console.log("API request started");

    const response = await fetch(`${baseUrl}${url}`, options);

    console.log("API response received");

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  };
};

const request = createRequest(API_BASE_URL);

export const api = {
  get: (url) => request(url),

  post: (url, body) =>
    request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),

  put: (url, body) =>
    request(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),

  delete: (url) =>
    request(url, {
      method: "DELETE",
    }),
};

// Function declaration hoisting
logApiReady();

function logApiReady() {
  console.log("SOPE API client is ready");
}

// Promise example
export const waitForReady = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("SOPE client is ready");
    }, 100);
  });
};

// Callback example
export const waitForReadyCallback = (callback) => {
  setTimeout(() => {
    callback("SOPE client is ready");
  }, 100);
};