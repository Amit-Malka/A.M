const CV_PATH = `${process.env.PUBLIC_URL}/AmitMalka-CV.pdf`;

export const downloadCV = () => {
  const link = document.createElement('a');
  link.href = CV_PATH;
  link.download = 'Amit-Malka-CV.pdf';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
