const toggles = document.querySelectorAll(".bi-toggle-on, .bi-toggle-off");
const bgm = parent.document.getElementById('bgm-audio');
const tapsound = new Audio('/tap.wav');

let soundOn = true;

document.addEventListener('click',()=>{
   if(soundOn){
      tapsound.currentTime=0;
      tapsound.play();
   }
}); 

document.addEventListener('click', () => {
   if(bgm)bgm.play();
});
toggles.forEach(icon => {
    icon.addEventListener('click', () => {
          if(icon.classList.contains('bi-toggle-on')){
            icon.classList.remove('bi-toggle-on');
            icon.classList.add('bi-toggle-off');
         }else{
            icon.classList.remove('bi-toggle-off');
            icon.classList.add('bi-toggle-on');
         }
         if(icon.id === 'music'&& bgm){
   bgm.muted= icon.classList.contains('bi-toggle-off');
}
   if(icon.id === 'sound'){
   soundOn = icon.classList.contains('bi-toggle-on');
}
    });
});

function chooseImage() {
   document.getElementById('imageInput').click();
}

document.getElementById('imageInput').addEventListener('change', (e) => {
   let file = e.target.files[0];
   if (!file) return;
   const reader = new FileReader();
   reader.onload = function () {
      document.getElementById('person').src = reader.result;
   };
   reader.readAsDataURL(file);
});

const savedimage = localStorage.getItem('profileImage');
if (savedimage) {
   document.getElementById('person').src = savedimage;
}

const fields = [
   { id: 'username', label: 'Username' },
   { id: 'age', label: 'Age' }
];

const form = document.getElementById('profileForm');
const usernameInput = document.getElementById('usernameInput');
const ageInput = document.getElementById('ageInput');
const usernameEl = document.getElementById('username');
const ageEl = document.getElementById('age');

function setfields(field, value) {
   const element = document.getElementById(field.id);
   element.textContent = field.label + ' : ' + value;
   element.dataset.value = value;
}

function openForm() {
   usernameInput.value = usernameEl.dataset.value || '';
   ageInput.value = ageEl.dataset.value || '';
   usernameEl.hidden = true;
   ageEl.hidden = true;
   form.hidden = false;
   usernameInput.focus();
}

function closeForm() {
   form.hidden = true;
   usernameEl.hidden = false;
   ageEl.hidden = false;
}

fields.forEach(field => {
   document.getElementById(field.id).addEventListener('click', openForm);
   const saved = localStorage.getItem(field.id);
   if (saved) setfields(field, saved);
});

form.addEventListener('submit', (e) => {
   e.preventDefault();
   setfields(fields[0], usernameInput.value.trim());
   setfields(fields[1], ageInput.value);
   closeForm();
});

const saveBtn = document.getElementById('profile');

saveBtn.addEventListener('click', () => {
   if (!form.hidden) {
      if (!usernameInput.value.trim() || !ageInput.value) {
         form.reportValidity(); 
         return;
      }
      setfields(fields[0], usernameInput.value.trim());
      setfields(fields[1], ageInput.value);
      closeForm();
   }

   fields.forEach(f => {
      const value = document.getElementById(f.id).dataset.value;
      if (value) localStorage.setItem(f.id, value);
   });

   const img = document.getElementById('person').src;
   if (img.startsWith('data:')) {
      try {
         localStorage.setItem('profileImage', img);
      } catch (err) {
         console.error('Image too large to save');
      }
   }

   saveBtn.textContent = 'Saved ✓';
   setTimeout(() => { saveBtn.textContent = 'Save Profile'; }, 1500);
});

if (!localStorage.getItem('username')) openForm();

const contents = document.querySelectorAll('.content');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const counts = document.getElementById('count');
let currentIndex = 0;

function show(i){
contents.forEach(c=>c.classList.remove('active'));
contents[i].classList.add('active');
counts.textContent= (i+1) + '/' + contents.length;
}

nextBtn.addEventListener('click',()=>{
   currentIndex++;
   if(currentIndex >= contents.length){
       currentIndex =0;
}
show(currentIndex);
});

prevBtn.addEventListener('click',()=>{
   currentIndex--;
   if(currentIndex < 0){
       currentIndex= contents.length - 1;
}
show(currentIndex);
});

show(0);