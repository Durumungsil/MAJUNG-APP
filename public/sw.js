// 마중 서비스 워커
// 해시가 붙어 내용이 바뀌지 않는 정적 파일만 캐시함.
// 페이지·API·외부(cross-origin) 응답은 설문 응답 같은 민감 정보가 Cache Storage에
// 남을 수 있어 절대 캐시하지 않음 (AGENTS.md §8)

const CACHE_NAME = "majung-static-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // 이름이 바뀐 이전 버전 캐시를 정리함
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

function isCacheableRequest(request) {
  if (request.method !== "GET") return false;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return false;

  // /_next/static/ 은 파일명에 빌드 해시가 붙어 있어 오래 캐시해도 안전함
  return url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/");
}

self.addEventListener("fetch", (event) => {
  if (!isCacheableRequest(event.request)) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request);
      if (cached) return cached;

      const response = await fetch(event.request);
      if (response.ok) cache.put(event.request, response.clone());
      return response;
    }),
  );
});
