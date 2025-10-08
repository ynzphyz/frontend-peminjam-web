// Date and text formatting utilities

// Format date to Indonesian format
export const formatDate = (date, options = {}) => {
  if (!date) return "-";

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return "-";

  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  };

  return dateObj.toLocaleDateString("id-ID", defaultOptions);
};

// Format date to short format (DD/MM/YYYY)
export const formatDateShort = (date) => {
  if (!date) return "-";

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return "-";

  return dateObj.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Format date for input field (YYYY-MM-DD)
export const formatDateForInput = (date) => {
  if (!date) return "";

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return "";

  return dateObj.toISOString().split("T")[0];
};

// Format time
export const formatTime = (date, options = {}) => {
  if (!date) return "-";

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return "-";

  const defaultOptions = {
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  };

  return dateObj.toLocaleTimeString("id-ID", defaultOptions);
};

// Format date and time
export const formatDateTime = (date) => {
  if (!date) return "-";

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return "-";

  return `${formatDate(date)} ${formatTime(date)}`;
};

// Get relative time (e.g., "2 hari yang lalu")
export const getRelativeTime = (date) => {
  if (!date) return "-";

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return "-";

  const now = new Date();
  const diffInMs = now - dateObj;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInDays > 0) {
    return `${diffInDays} hari yang lalu`;
  } else if (diffInHours > 0) {
    return `${diffInHours} jam yang lalu`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} menit yang lalu`;
  } else {
    return "Baru saja";
  }
};

// Format phone number
export const formatPhoneNumber = (phone) => {
  if (!phone) return "-";

  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // Format Indonesian phone number
  if (cleaned.startsWith("62")) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith("0")) {
    return `+62${cleaned.slice(1)}`;
  } else {
    return `+62${cleaned}`;
  }
};

// Format text to title case
export const formatTitleCase = (text) => {
  if (!text) return "";

  return text
    .toLowerCase()
    .replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
};

// Format text to sentence case
export const formatSentenceCase = (text) => {
  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 50) => {
  if (!text) return "";

  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength) + "...";
};

// Format currency (Indonesian Rupiah)
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return "-";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format number with thousand separators
export const formatNumber = (number) => {
  if (!number && number !== 0) return "-";

  return new Intl.NumberFormat("id-ID").format(number);
};

// Format percentage
export const formatPercentage = (value, decimals = 1) => {
  if (!value && value !== 0) return "-";

  return `${value.toFixed(decimals)}%`;
};

// Format file name for display
export const formatFileName = (fileName, maxLength = 30) => {
  if (!fileName) return "";

  const extension = fileName.split(".").pop();
  const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf("."));

  if (fileName.length <= maxLength) return fileName;

  const truncatedName = nameWithoutExt.substring(
    0,
    maxLength - extension.length - 4
  );
  return `${truncatedName}...${extension}`;
};
