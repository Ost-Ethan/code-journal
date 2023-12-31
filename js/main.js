const $photoUrl = document.querySelector('#photo-url');
const $image = document.querySelector('.image');
const $pNoEntries = document.querySelector('#no-entries');
const $buttonDeleteEntry = document.querySelector('#delete-entry');

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

  // Data parsing if it is not an edited form.
  if (data.editing === null) {
    const journalEntry = {
      title: $title.value,
      photoUrl: $photoUrl.value,
      notes: $notes.value,
      entryID: data.nextEntryId,
    };

    data.entries.unshift(journalEntry);
    data.nextEntryId++;
    // Resetting the form after parsing
    $journalForm.reset();
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');

    // Rendering the entry and prepending it to the list
    $ulDataViewEntries.prepend(renderEntry(journalEntry));
  }

  // if the entry is being edited:
  else if (data.editing !== null) {
    const editedJournalEntry = {
      title: $title.value,
      photoUrl: $photoUrl.value,
      notes: $notes.value,
      entryID: data.editing.entryID,
    };
    const $liArrayList = document.querySelectorAll('li');
    // This for loop looks through the data-entry-id of each li element to see if the entry id matches. it needs a -1 due to the starting number of the entryID in data.js, and then it replaces the child that matches in the ul element.
    for (let i = 0; i < $liArrayList.length; i++) {
      if (
        parseInt($liArrayList[i].getAttribute('data-entry-id')) ===
        editedJournalEntry.entryID
      ) {
        $ulDataViewEntries.replaceChild(
          renderEntry(editedJournalEntry),
          $liArrayList[i]
        );
        data.entries[i] = editedJournalEntry;
      }
    }
    $h1EditFormHeader.textContent = 'New Entry';
    data.editing = null;
    $journalForm.reset();
  }

  $journalForm.reset();
  viewSwap('entries'); // Using my parsed entries button here makes sure the argument i give the function matches what it is expecting.

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
  const $pencilIcon = document.createElement('i');

  $divRow.className = 'row';
  $divColumn.className = 'column-half';
  $divColumn2.className = 'column-half';
  $imgEntryImage.className = 'image';
  $imgEntryImage.setAttribute('src', entry.photoUrl);
  $imgEntryImage.setAttribute('alt', 'journal entry image');
  $h2EntryTitle.textContent = entry.title;
  $pNotes.textContent = entry.notes;
  $pencilIcon.setAttribute('class', 'fa-solid fa-pencil icon');
  $divTitleList.setAttribute('class', 'entry-title');
  $outerLI.setAttribute('data-entry-id', entry.entryID);

  $outerLI.appendChild($divRow);
  $divRow.appendChild($divColumn);
  $divRow.appendChild($divColumn2);
  $divColumn.appendChild($imgEntryImage);
  $divColumn2.appendChild($divTitleList);
  $divColumn2.appendChild($divNotesEntry);
  $divTitleList.appendChild($h2EntryTitle);
  $divNotesEntry.appendChild($pNotes);
  $divTitleList.appendChild($pencilIcon);

  /*  This function creates the following dom tree in which a journal entry's properties are displayed:
              <li data-entry-id>
              <div class ="row">
              <div class = "column half">
                <img
                  class="image"
                  src=""
                  alt="" />
                </div>
                <div class = "column-half">
                <div class = "entry-title">
                  <h2>title goes here</h2>
                  <i class="fa-solid fa-pencil"></i>
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

const $ulDataViewEntries = document.querySelector('#entry-list');

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
    $ulDataViewEntries.appendChild($renderedListItem);
  }

  toggleNoEntries();

  viewSwap(data.view);
}

function viewSwap(viewName) {
  // This function is called on when switching views. it is passed a view to switch to by the handler, and then switches the view accordingly.
  if (viewName === 'entries') {
    data.view = 'entries';
    $entryFormDataView.setAttribute('class', 'hidden');
    $entriesDataView.setAttribute('class', '');
    $journalForm.reset();
    data.editing = null;
    $h1EditFormHeader.textContent = 'New Entry';
  }

  if (viewName === 'entry-form') {
    data.view = 'entry-form';
    $entryFormDataView.setAttribute('class', '');
    $entriesDataView.setAttribute('class', 'hidden');
    if (data.editing !== null) {
      $buttonDeleteEntry.setAttribute('class', '');
    } else {
      $buttonDeleteEntry.setAttribute('class', 'hidden');
    }
  }
}

const $entryFormDataView = document.querySelector('#entry-form');
const $entriesDataView = document.querySelector('#entries');
const $newEntryButton = document.querySelector('.new-entry-button');
const $entriesButton = document.querySelector('.head-anchor');
$entriesButton.addEventListener('click', function () {
  viewSwap('entries');
});
$newEntryButton.addEventListener('click', function () {
  viewSwap('entry-form');
});

$ulDataViewEntries.addEventListener('click', handleEditClick);

const $h1EditFormHeader = document.querySelector('.edit-form-header');

function handleEditClick(event) {
  // this function is triggered on the ul element, with delegation, it looks to see if the element class clicked was the pencil icon, and then it find the closest li element and sets the data.editing tag to the selected li object. we then viewswap to the entry-form view, and place the entries values into the form, and finally it changes the header to say edit entry.

  if (event.target.className === 'fa-solid fa-pencil icon') {
    const $clickedEntry = event.target.closest('li');
    for (let i = 0; i < data.entries.length; i++) {
      if (
        parseInt($clickedEntry.getAttribute('data-entry-id')) ===
        data.entries[i].entryID
      ) {
        data.editing = data.entries[i];
        viewSwap('entry-form');
        $photoUrl.value = data.editing.photoUrl;
        $title.value = data.editing.title;
        $notes.value = data.editing.notes;
        $h1EditFormHeader.textContent = 'Edit Entry';
      }
    }
  }
}

const $viewDeleteModal = document.querySelector('#delete-modal');

$buttonDeleteEntry.addEventListener('click', deleteClickHandler);

function deleteClickHandler(event) {
  // if the delete entry button is clicked, display modal
  if (event.target.getAttribute('id', 'delete-entry')) {
    $viewDeleteModal.setAttribute('class', '');
  }
}

$viewDeleteModal.addEventListener('click', modalButtonHandler);

function modalButtonHandler(event) {
  // cancel button is clicked
  if (event.target.getAttribute('id') === 'cancel-button') {
    $viewDeleteModal.setAttribute('class', 'hidden');
  }

  // Delete button is clicked
  if (event.target.getAttribute('id') === 'confirm-delete') {
    // look through data model and remove the entry from the data model
    for (let i = 0; i < data.entries.length; i++) {
      if (data.editing.entryID === data.entries[i].entryID) {
        data.entries.splice(i, 1);
      }
    }
    // look through current li elements on the page and remove it from the page
    const $liArrayList = document.querySelectorAll('li');
    for (let i = 0; $liArrayList.length; i++) {
      if (
        data.editing.entryID ===
        Number($liArrayList[i].getAttribute('data-entry-id'))
      ) {
        $liArrayList[i].remove();
        break;
      }
    }

    // Reset view to entries, hide the modal, set data editing to null, and run toggleNoEntries to see if no entry text needs to be displayed
    $viewDeleteModal.setAttribute('class', 'hidden');
    toggleNoEntries();
    viewSwap('entries');
    data.editing = null;
  }
}
