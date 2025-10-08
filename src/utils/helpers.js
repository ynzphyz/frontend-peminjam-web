// General utility helper functions

// Generate unique ID for peminjaman
export const generatePeminjamanId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `PJ${timestamp}${random.toString().padStart(3, "0")}`;
};

// Reset form to initial state
export const resetFormData = (initialData) => {
  return { ...initialData };
};

// Convert file to base64
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Scroll to top of page
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Debounce function for search inputs
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Copy text to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

// Check if object is empty
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Capitalize first letter
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Filter array by search term
export const filterBySearchTerm = (array, searchTerm, searchFields) => {
  if (!searchTerm) return array;

  const term = searchTerm.toLowerCase();
  return array.filter((item) =>
    searchFields.some(
      (field) =>
        item[field] && item[field].toString().toLowerCase().includes(term)
    )
  );
};

// Sort array by field
export const sortByField = (array, field, direction = "asc") => {
  return [...array].sort((a, b) => {
    let aVal = a[field];
    let bVal = b[field];

    // Handle date strings
    if (typeof aVal === "string" && aVal.match(/^\d{4}-\d{2}-\d{2}/)) {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }

    if (direction === "asc") {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });
};

// Get status color class
export const getStatusColorClass = (status) => {
  const statusColors = {
    Dipinjam: "bg-green-200 text-green-900",
    Disetujui: "bg-green-200 text-green-900",
    Dikembalikan: "bg-blue-100 text-blue-800",
    "Menunggu Persetujuan": "bg-yellow-100 text-yellow-800",
    Ditolak: "bg-red-100 text-red-800",
  };

  return statusColors[status] || "bg-gray-100 text-gray-800";
};
