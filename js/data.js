/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', storeData);

function storeData(event) {
  const dataModelStorage = JSON.stringify(data);

  localStorage.setItem('dataStored', dataModelStorage);
}

const dataStored = localStorage.getItem('dataStored');
if (dataStored !== null) {
  data = JSON.parse(dataStored);
}
