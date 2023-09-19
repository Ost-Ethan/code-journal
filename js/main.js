const $photoUrl = document.querySelector('#photo-url');
const $image = document.querySelector('.image');
const $pNoEntries = document.querySelector('#no-entries');

$photoUrl.addEventListener('input', handlePhotoUrlInput);

function handlePhotoUrlInput(event) {
  // This function checks the input of the PhotoURL and will replace the placeholder with an image if given a valid link or filepath.

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

  // This parses the data input by the user, prepends it to the list of entries, and switches the view to the entries view.

  // Data parsing
  const journalEntry = {
    title: $title.value,
    photoUrl: $photoUrl.value,
    notes: $notes.value,
    entryID: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(journalEntry);

  // Resetting the form after parsing
  $journalForm.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');

  // Rendering the entry and prepending it to the list
  $divDataViewEntries.prepend(renderEntry(journalEntry));

  viewSwap($entriesButton); // Using my parsed entries button here makes sure the argument i give the function matches what it is expecting.

  toggleNoEntries();
}

function renderEntry(entry) {
  const $divRow = document.createElement('div');
  const $divColumn = document.createElement('div');
  const $divColumn2 = document.createElement('div');
  const $outerLI = document.createElement('li');
  const $imgEntryImage = document.createElement('img');
  const $divTitleList = document.createElement('div');
  const $h2EntryTitle = document.createElement('h2');
  const $divNotesEntry = document.createElement('div');
  const $pNotes = document.createElement('p');

  $divRow.className = 'row';
  $divColumn.className = 'column-half';
  $divColumn2.className = 'column-half';
  $imgEntryImage.className = 'image';
  $imgEntryImage.setAttribute('src', entry.photoUrl);
  $h2EntryTitle.textContent = entry.title;
  $pNotes.textContent = entry.notes;

  $outerLI.appendChild($divRow);
  $divRow.appendChild($divColumn);
  $divRow.appendChild($divColumn2);
  $divColumn.appendChild($imgEntryImage);
  $divColumn2.appendChild($divTitleList);
  $divColumn2.appendChild($divNotesEntry);
  $divTitleList.appendChild($h2EntryTitle);
  $divNotesEntry.appendChild($pNotes);

  /*  This function creates the following dom tree in which a journal entry's properties are displayed:
              <li>
              <div class ="row">
              <div class = "column half">
                <img
                  class="image"
                  src=""
                  alt="" />
                </div>
                <div class = "column-half">
                <div>
                  <h2>title goes here</h2>
                </div>
                <div>
                  <p>Notes go here</p>
                </div>
                </div>
              </li>
        */
  return $outerLI;
}

document.addEventListener('DOMContentLoaded', loadEntryListItems);

const $divDataViewEntries = document.querySelector('#entry-list');

function toggleNoEntries() {
  if (data.entries.length > 0) {
    $pNoEntries.setAttribute('class', 'hidden');
  } else {
    $pNoEntries.removeAttribute('class');
  }
}

function loadEntryListItems(event) {
  // This function sees if there are any entries in local storage and then renders them on the entries page.

  for (let i = 0; i < data.entries.length; i++) {
    const $renderedListItem = renderEntry(data.entries[i]);
    $divDataViewEntries.appendChild($renderedListItem);
  }

  toggleNoEntries();

  viewSwap(data.view);
}

function viewSwap(viewName) {
  // This function is called on when switching views. It looks to see what target clicked the button, and then changes data.view to reflect the anchor clicked. I gave the OR operator, as when we click the submit button, i pass the element "$entriesButton" itself as viewName. A bit backwards, but it works.
  if (viewName.target === $entriesButton || viewName === $entriesButton) {
    data.view = 'entries';
    $entryFormDataView.className = 'hidden';
  } else if (
    viewName.target === $newEntryButton ||
    viewName === $newEntryButton
  ) {
    data.view = 'entry-form';
  }
  if (data.view === 'entries') {
    $entryFormDataView.className = 'hidden';
    $entriesDataView.className = '';
  } else if (data.view === 'entry-form') {
    $entryFormDataView.className = '';
    $entriesDataView.className = 'hidden';
  }
}

const $entryFormDataView = document.querySelector('#entry-form');
const $entriesDataView = document.querySelector('#entries');
const $newEntryButton = document.querySelector('.new-entry-button');
const $entriesButton = document.querySelector('.head-anchor');
$entriesButton.addEventListener('click', viewSwap);
$newEntryButton.addEventListener('click', viewSwap);
toggleNoEntries();
