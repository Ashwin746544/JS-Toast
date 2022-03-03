const showBtn = document.querySelector(".btn--show");
const toastContainer = document.querySelector(".toast__container");
// let nextToastNum = 0;
let arr = [];
let idArr = [];
let pendingCount = 0;

showBtn.addEventListener("click", function () {
  if (arr.length !== 3) {
    addToast();
  }
  else {
    if (pendingCount > 0) {
      console.log("pendingCount: ", pendingCount);
      let currentCount = pendingCount;
      pendingCount += 1;
      setTimeout(() => {
        removeToastInstant();
      }, currentCount * 300);
    } else {
      console.log("pendingCount: ", pendingCount);
      removeToastInstant();
    }
  }
});

//create and add Toast
function addToast() {
  let currentToastNum = arr.length % 3;
  const toastDiv = document.createElement("div");
  const toastClass = `toast-${currentToastNum}`;
  toastDiv.classList.add("toast", toastClass);
  toastDiv.setAttribute("data-toast-num", currentToastNum);
  toastDiv.innerHTML = `<p class="text">This is toast ${currentToastNum}.</p>
<span onClick="deleteToast(this)" data-toast-num="${currentToastNum}">&#10006;</span>`;
  toastContainer.insertBefore(toastDiv, toastContainer.firstChild);
  const toast = document.querySelector(`[data-toast-num="${currentToastNum}"]`);
  toast.style.animation = "slideIn 0.3s ease-in forwards";
  //   slideOutTost(currentToastNum, false);
  arr.push(currentToastNum);
  console.log("after adding", arr);
  console.log("after adding length", toastContainer.childElementCount);
  const id = setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease-in forwards";
    setTimeout(() => {
      toast.style.display = "none";
      toast.remove();
      arr.splice(0, 1);
      arr.forEach((toastNum, index) => {
        let btnsAndToasts = document.querySelectorAll(`[data-toast-num="${toastNum}"]`);
        btnsAndToasts.forEach(element => element.setAttribute("data-toast-num", arr[index] - 1));
        arr[index] = arr[index] - 1;
      });
      console.log("after current delete", arr);
      idArr.splice(0, 1);
      console.log("after current delete idArr:", idArr);
    }, 300);
  }, 3000);
  idArr.push(id);
  console.log("idArr", idArr);
}
// delete Toast On 'X' button click
function deleteToast(btn) {
  let toastNum = btn.getAttribute('data-toast-num');
  console.log("toastNum" + toastNum);
  let toast = btn.parentElement;
  toast.style.animation = "slideOut 0.3s ease-in forwards";
  setTimeout(() => {
    toast.style.display = "none";
    toast.remove();
    let i = arr.findIndex(toastNumber => toastNumber == toastNum);
    arr.splice(i, 1);
    arr.forEach((toastNum, index) => {
      if (index >= i) {
        let btnsAndToasts = document
          .querySelectorAll(`[data-toast-num="${toastNum}"]`);
        btnsAndToasts.forEach(element => element.setAttribute("data-toast-num", arr[index] - 1));
        arr[index] = arr[index] - 1;
      }
    });
    console.log("after current delete arr:", arr);
    clearTimeout(idArr[i]);
    idArr.splice(i, 1);
    console.log("after current delete idArr", idArr);
  }, 300);
}

// remove Toast instant before 3000s
function removeToastInstant() {
  clearTimeout(idArr[0]);
  const toastToRemove = document.querySelector(`[data-toast-num="${arr[0]}"]`);
  toastToRemove.style.animation = "slideOut 0.3s ease-in forwards";
  if (pendingCount == 0) { pendingCount += 1; }
  setTimeout(() => {
    toastToRemove.style.display = "none";
    toastToRemove.remove();
    arr.splice(0, 1);
    arr.forEach((toastNum, index) => {
      let btnsAndToasts = document.querySelectorAll(`[data-toast-num="${toastNum}"]`);
      btnsAndToasts.forEach(element => element.setAttribute("data-toast-num", arr[index] - 1));
      arr[index] = arr[index] - 1;
    });
    console.log("after current delete arr:", arr);
    idArr.splice(0, 1);
    console.log("after current delete idArr", idArr);
    //create Toast
    addToast();
  }, 300);
}