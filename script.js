const btn = document.getElementById("downloadBtn");
const result = document.getElementById("result");

const apis = [

  (url) =>
    `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`,

  (url) =>
    `https://tikdown.org/getAjax?url=${encodeURIComponent(url)}&lang=en`

];

btn.addEventListener("click", async () => {

  const url = document.getElementById("url").value.trim();

  if (!url) {
    result.innerHTML = "ضع رابط TikTok";
    return;
  }

  result.innerHTML = "جاري التحميل...";

  for (const api of apis) {

    try {

      const response = await fetch(api(url));
      const data = await response.json();

      if (data.data && data.data.play) {

        result.innerHTML = `
          <a
            class="download-btn"
            href="${data.data.play}"
            target="_blank"
          >
            تحميل الفيديو
          </a>
        `;

        return;
      }

    } catch (e) {
      console.log(e);
    }

  }

  result.innerHTML = "فشل تحميل الفيديو";

});
