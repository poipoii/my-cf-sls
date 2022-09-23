// https://www.npmjs.com/package/qrcode-generator
const qrcode = require("qrcode-generator");

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

function getUrlParameter(url, name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(url);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
/**
 * Respond with qrcode image
 * SearchParams: ?i=text
 * @param {Request} request
 */
async function handleRequest(request) {
  const uri = new URL(request.url);
  const searchParams = uri.search.trim();
  if (!searchParams) {
    return new Response("", { status: 400 });
  }
  const typeNumber = 4;
  const errorCorrectionLevel = "L";
  const qr = qrcode(typeNumber, errorCorrectionLevel);
  qr.addData(getUrlParameter(searchParams, "i"));
  qr.make();
  const img = Buffer.from(
    qr.createDataURL(4, 4).replace(/^data:image\/gif;base64,/, ""),
    "base64"
  );
  return new Response(img, {
    headers: { "content-type": "image/jpeg", "Content-Length": img.length },
  });
}
