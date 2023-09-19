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

function renderEntry(entry) {
  const $divRowListItem = document.createElement('div');
  const $divColumnFullListItem = document.createElement('div');
  const $ulEntry = document.createElement('ul');
  const $liEntry = document.createElement('li');
  const $imgEntryImage = document.createElement('img');
  const $divTitleList = document.createElement('div');
  const $h2EntryTitle = document.createElement('h2');
  const $divNotesEntry = document.createElement('div');
  const $pNotes = document.createElement('p');

  $divRowListItem.className = 'row';
  $divColumnFullListItem.className = 'column-full';
  $imgEntryImage.className = 'image';
  $imgEntryImage.setAttribute('src', entry.photoUrl);
  $h2EntryTitle.textContent = entry.title;
  $pNotes.textContent = entry.notes;

  $divRowListItem.appendChild($divColumnFullListItem);
  $divColumnFullListItem.appendChild($ulEntry);
  $ulEntry.appendChild($liEntry);
  $liEntry.appendChild($imgEntryImage);
  $liEntry.appendChild($divTitleList);
  $liEntry.appendChild($divNotesEntry);
  $divTitleList.appendChild($h2EntryTitle);
  $divNotesEntry.appendChild($pNotes);

  /*  This function creates the following dom tree in which a journal entry's properties are displayed:
          <div class="row">
          <div class="column-full">
            <ul>
              <li>
                <img
                  class="image"
                  src=""
                  alt="" />
                <div>
                  <h2>title goes here</h2>
                </div>
                <div>
                  <p>Notes go here</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        */
  // console.log("DOM Tree template with list entry:", $divRowListItem);
}

const testEntry = {
  title: 'Burger',
  photoUrl: 'BurgerURL',
  notes: 'Notes go here',
  entryID: 1,
};

renderEntry(testEntry);
