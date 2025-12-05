// API Base Configuration
export const API_BASE_URL = "http://localhost:8080";

// Generic API call function
export const apiCall = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

// Specific API functions
export const submitPeminjaman = async (formData) => {
  const data = new FormData();
  Object.keys(formData).forEach((key) => {
    if (formData[key] !== null && formData[key] !== undefined) {
      data.append(key, formData[key]);
    }
  });

  return fetch(`${API_BASE_URL}/peminjaman`, {
    method: "POST",
    body: data,
  });
};

export const submitApproval = async (formData) => {
  return apiCall("/approval", {
    method: "POST",
    body: JSON.stringify(formData),
  });
};

export const submitPengembalian = async (formData) => {
  const data = new FormData();
  Object.keys(formData).forEach((key) => {
    if (formData[key] !== null && formData[key] !== undefined) {
      data.append(key, formData[key]);
    }
  });

  return fetch(`${API_BASE_URL}/pengembalian`, {
    method: "POST",
    body: data,
  });
};

export const fetchHistory = async () => {
  return apiCall("/history");
};

export const fetchPeminjamData = async (id) => {
  return apiCall(`/peminjaman/${id}`);
};

// Admin dashboard stats
export const fetchStats = async () => {
  return apiCall("/stats");
};
