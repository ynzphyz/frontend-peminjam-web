// API Base Configuration
export const API_BASE_URL = "http://localhost:8080";

// Helper function to get token
const getAuthHeaders = () => {
  let token = null;
  try {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    token = user?.token;
  } catch (e) {
    console.warn("Could not parse user from sessionStorage:", e);
  }
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Generic API call function with proper error handling
export const apiCall = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;

    // Get token from sessionStorage if available
    let token = null;
    try {
      const user = JSON.parse(sessionStorage.getItem("user") || "{}");
      token = user?.token;
    } catch (e) {
      console.warn("Could not parse user from sessionStorage:", e);
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    console.log(`📤 API Call: ${options.method || "GET"} ${endpoint}`);
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API Error (${response.status}):`, errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`
      );
    }

    const data = await response.json();
    console.log(`✅ API Success: ${endpoint}`, data);
    return data;
  } catch (error) {
    console.error("❌ API call failed:", error);
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

  try {
    console.log("📤 POST /pinjam with FormData");
    const response = await fetch(`${API_BASE_URL}/pinjam`, {
      method: "POST",
      body: data,
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `❌ Submit Peminjaman Error (${response.status}):`,
        errorText
      );
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log("✅ Peminjaman submitted successfully");
    return result;
  } catch (error) {
    console.error("❌ submitPeminjaman failed:", error);
    throw error;
  }
};

export const submitApproval = async (formData) => {
  return apiCall("/approve", {
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

  try {
    console.log("📤 POST /pengembalian with FormData");
    const response = await fetch(`${API_BASE_URL}/pengembalian`, {
      method: "POST",
      body: data,
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `❌ Submit Pengembalian Error (${response.status}):`,
        errorText
      );
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log("✅ Pengembalian submitted successfully");
    return result;
  } catch (error) {
    console.error("❌ submitPengembalian failed:", error);
    throw error;
  }
};

export const fetchHistory = async () => {
  console.log("📥 GET /history");
  return apiCall("/history", {
    method: "GET",
  });
};

export const fetchPeminjamData = async (id) => {
  console.log(`📥 GET /get-peminjam-data?id=${id}`);
  return apiCall(`/get-peminjam-data?id=${id}`, {
    method: "GET",
  });
};

export const deleteHistory = async (id) => {
  console.log(`🗑️ POST /delete-history with id=${id}`);
  return apiCall(`/delete-history`, {
    method: "POST",
    body: JSON.stringify({ id }),
  });
};

// Admin dashboard stats
export const fetchStats = async () => {
  console.log("📊 GET /stats");
  return apiCall("/stats", {
    method: "GET",
  });
};
