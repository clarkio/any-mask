let allMasksEnabled = true;
const anyMaskCustomFieldsKey = 'any-mask-custom-fields';
const isMaskedKeyName = 'isAnyMaskEnabled';

let allMasksCheckbox = document.getElementById('toggle-all-masks');
allMasksCheckbox.addEventListener('click', toggleAllMasks);

// let addNewFieldButton = $('#add-new-field');
// addNewFieldButton.on('click', addCustomField);

chrome.tabs.executeScript(
  {
    code: "document.body.classList.contains('any-mask-enabled');",
    allFrames: false
  },
  results => {
    if (results) {
      allMasksEnabled = results[0];
      allMasksCheckbox.checked = allMasksEnabled;
    }
  }
);

function toggleAllMasks() {
  allMasksEnabled = !allMasksEnabled;
  chrome.storage.local.set({ [isMaskedKeyName]: allMasksEnabled }, () => {
    allMasksEnabled ? injectEnableAllMasks() : injectDisableAllMasks();
  });
}

function injectEnableAllMasks() {
  chrome.tabs.executeScript({
    code: "document.body.classList.add('any-mask-enabled');",
    allFrames: true
  });
}

function injectDisableAllMasks() {
  chrome.tabs.executeScript({
    code: "document.body.classList.remove('any-mask-enabled');",
    allFrames: true
  });
}

// function addCustomField() {
//   let customFieldDiv = $('#custom-fields');
//   console.log(customFieldDiv);
// }

// chrome.storage.local.get(anyMaskCustomFieldsKey, items => {
//   console.log(items);
// });
