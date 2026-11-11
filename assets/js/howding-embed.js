// Howding reports the event list's height as its contents change.
window.addEventListener('message', function(event) {
  if (event.origin !== 'https://howding.com' || !event.data ||
      event.data.type !== 'howding:embed-height') return;

  const frame = document.getElementById('howding-events');
  const height = event.data.height;
  if (frame && frame.contentWindow === event.source &&
      typeof height === 'number' && Number.isFinite(height) && height > 0) {
    frame.style.height = height + 'px';
  }
});
