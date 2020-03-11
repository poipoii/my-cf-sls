const APPID = OPENWEATHERMAP_APPID || '';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

function getUrlParameter(url, name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(url);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
/**
 * Respond with current weather data
 * https://openweathermap.org/current
 * SearchParams: ?q=London
 * @param {Request} request
 */
async function handleRequest(request) {
  const uri = new URL(request.url);
  const searchParams = uri.search.trim();
  if (!searchParams) {
    return new Response('', {status: 400});
  }
  const appid = searchParams.includes('appid=') ? getUrlParameter(searchParams, 'appid') : APPID;
  const response = await fetch(`${API_URL}${searchParams}&appid=${appid}`);
  return new Response(response.body, {
    headers: { 'content-type': 'application/json' },
  });
};
