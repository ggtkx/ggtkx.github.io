function organizeNotes (_) {
  const notes = document.querySelectorAll('#sidebar > .footnotes > ol > li')
  if (window.innerWidth < 768) {
    notes.forEach(function (note) {
      note.style.position = 'inherit'
      note.style.top = ''
    })
    return
  }
  const superscripts = document.querySelectorAll('#content sup')
  notes.forEach(function (note, index) {
    const superscript = superscripts[index]
    note.style.position = 'absolute'
    note.style.top = superscript.offsetTop + 'px'
  })
}
window.addEventListener('load', function (event) {
  const footnotes = document.querySelector('.footnotes')
  footnotes.parentNode.removeChild(footnotes)
  document.getElementById('sidebar').appendChild(footnotes)
  organizeNotes(event)
})
window.addEventListener('resize', organizeNotes)
