// ۱. این متغیر را در ابتدای تابع مینت اضافه کن
const [file, setFile] = useState(null);
const [preview, setPreview] = useState(null); // برای نمایش عکس

// ۲. این تابع را برای انتخاب فایل اصلاح کن
const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  setFile(selectedFile);
  if (selectedFile) {
    setPreview(URL.createObjectURL(selectedFile)); // ساخت لینک موقت عکس
  }
};
