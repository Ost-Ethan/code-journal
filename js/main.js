const $photoUrl = document.querySelector('#photo-url');
const $image = document.querySelector('.image');

$photoUrl.addEventListener('input', handlePhotoUrlInput);

function handlePhotoUrlInput(event) {
  if ($photoUrl.value === '') {
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else {
    $image.setAttribute('src', $photoUrl.value);
  }
}

const $journalForm = document.querySelector('.journal-entry');
const $title = document.querySelector('#title');
const $notes = document.querySelector('#notes');

$journalForm.addEventListener('submit', addButtonHandler);

function addButtonHandler(event) {
  event.preventDefault();
  const journalEntry = {
    title: $title.value,
    photoUrl: $photoUrl.value,
    notes: $notes.value,
    entryID: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(journalEntry);

  $journalForm.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
}
