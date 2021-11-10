import { modifier } from 'ember-modifier';

export default modifier((element, [ file ])=> {
  const hasFile = file instanceof File;
  const isImage = element.tagName === 'IMG';

  if (!hasFile || !isImage) return;


  const reader = new FileReader();
  reader.onload = (event)=> {
   const data = event.target.result;

   element.setAttribute('src', data);
 };
 reader.readAsDataURL(file);
});
