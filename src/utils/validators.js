// Validation helper functions
export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim() === '') {
    return `${fieldName} wajib diisi`;
  }
  return null;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Format email tidak valid';
  }
  return null;
};

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
  if (!phoneRegex.test(phone)) {
    return 'Format nomor WhatsApp tidak valid';
  }
  return null;
};

export const validateDate = (date, fieldName) => {
  if (!date) {
    return `${fieldName} wajib diisi`;
  }
  
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    return `${fieldName} tidak boleh kurang dari hari ini`;
  }
  
  return null;
};

export const validateDateRange = (startDate, endDate) => {
  if (new Date(endDate) <= new Date(startDate)) {
    return 'Tanggal kembali harus setelah tanggal pinjam';
  }
  return null;
};

export const validateFile = (file) => {
  if (!file) {
    return 'File wajib diunggah';
  }
  
  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return 'Ukuran file maksimal 5MB';
  }
  
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(file.type)) {
    return 'Tipe file harus JPG, PNG, atau PDF';
  }
  
  return null;
};

export const validateNumber = (value, fieldName, min = 1, max = 999) => {
  if (!value) {
    return `${fieldName} wajib diisi`;
  }
  
  const num = parseInt(value);
  if (isNaN(num) || num < min || num > max) {
    return `${fieldName} harus berupa angka antara ${min} - ${max}`;
  }
  
  return null;
};

// Form-specific validators
export const validatePeminjamanForm = (formData) => {
  const errors = {};
  
  // Required fields validation
  const requiredFields = [
    { key: 'nama', label: 'Nama' },
    { key: 'kelas', label: 'Kelas' },
    { key: 'nis', label: 'NIS' },
    { key: 'noWa', label: 'No. WhatsApp' },
    { key: 'namaAlat', label: 'Nama Alat' },
    { key: 'tanggalPinjam', label: 'Tanggal Pinjam' },
    { key: 'tanggalKembali', label: 'Tanggal Kembali' }
  ];
  
  requiredFields.forEach(field => {
    const error = validateRequired(formData[field.key], field.label);
    if (error) errors[field.key] = error;
  });
  
  // Specific validations
  if (formData.noWa) {
    const phoneError = validatePhoneNumber(formData.noWa);
    if (phoneError) errors.noWa = phoneError;
  }
  
  if (formData.jumlahAlat) {
    const numberError = validateNumber(formData.jumlahAlat, 'Jumlah Alat');
    if (numberError) errors.jumlahAlat = numberError;
  }
  
  if (formData.tanggalPinjam) {
    const dateError = validateDate(formData.tanggalPinjam, 'Tanggal Pinjam');
    if (dateError) errors.tanggalPinjam = dateError;
  }
  
  if (formData.tanggalKembali) {
    const dateError = validateDate(formData.tanggalKembali, 'Tanggal Kembali');
    if (dateError) errors.tanggalKembali = dateError;
  }
  
  if (formData.tanggalPinjam && formData.tanggalKembali) {
    const rangeError = validateDateRange(formData.tanggalPinjam, formData.tanggalKembali);
    if (rangeError) errors.tanggalKembali = rangeError;
  }
  
  if (formData.foto) {
    const fileError = validateFile(formData.foto);
    if (fileError) errors.foto = fileError;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateApprovalForm = (formData) => {
  const errors = {};
  
  const requiredFields = [
    { key: 'idPinjam', label: 'ID Pinjam' },
    { key: 'approver', label: 'Approver' },
    { key: 'statusPersetujuan', label: 'Status Persetujuan' }
  ];
  
  requiredFields.forEach(field => {
    const error = validateRequired(formData[field.key], field.label);
    if (error) errors[field.key] = error;
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validatePengembalianForm = (formData) => {
  const errors = {};
  
  const requiredFields = [
    { key: 'idPeminjaman', label: 'ID Peminjaman' },
    { key: 'kondisiAlat', label: 'Kondisi Alat' }
  ];
  
  requiredFields.forEach(field => {
    const error = validateRequired(formData[field.key], field.label);
    if (error) errors[field.key] = error;
  });
  
  if (formData.foto) {
    const fileError = validateFile(formData.foto);
    if (fileError) errors.foto = fileError;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
