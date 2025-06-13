import './style.scss';

const commentsLoadForm = document.querySelector('form')!;
commentsLoadForm.videoId = commentsLoadForm.querySelector('input')!;
commentsLoadForm.submitButton = commentsLoadForm.querySelector('button')!;
const iframe = document.querySelector('iframe')!;

//---------------
// Form Controls
//---------------

const buttonJudgement = () =>
  (commentsLoadForm.submitButton.disabled = !commentsLoadForm.checkValidity());

commentsLoadForm.addEventListener('input', buttonJudgement);

commentsLoadForm.addEventListener(
  'submit',
  async (e) => {
    e.preventDefault();
    const inputedStr = commentsLoadForm.videoId.value;
    if (!inputedStr) {
      iframe.src = '';
      return;
    }
    commentsLoadForm.submitButton.disabled = true;
    commentsLoadForm.submitButton.textContent = '読み込み中...';
    const cutStart = inputedStr.lastIndexOf('/') + 1;
    const cutEnd = inputedStr.includes('?')
      ? inputedStr.indexOf('?')
      : undefined;
    const videoId = inputedStr.slice(cutStart, cutEnd);
    commentsLoadForm.videoId.value = videoId;
    iframe.src = `https://ext.nicovideo.jp/thumb/${videoId}`;
    commentsLoadForm.submitButton.disabled = false;
    commentsLoadForm.submitButton.textContent = '表示';
  },
  { passive: false }
);
