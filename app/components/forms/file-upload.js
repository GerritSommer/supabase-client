import Component             from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action }            from '@ember/object';
import { tracked }           from '@glimmer/tracking';
import { A as emberA }       from '@ember/array';
import { assert }            from '@ember/debug';
import { guidFor }           from '@ember/object/internals';

export default class FormsFileUploadComponent extends Component {
  @service store;
  @service storage;

  @tracked files = emberA([]);

  @tracked hovering             = false;
  @tracked dragging             = false;
  @tracked globalCounter = 0;

  constructor() {
    super(...arguments);
    window.addEventListener('dragenter', this.onGlobalDragEnter, false);
    window.addEventListener('dragleave', this.onGlobalDragLeave), false;
    window.addEventListener('dragover', this.onGlobalDragOver, false);
    window.addEventListener('drop', this.onGlobalDrop, false);

  }

  willDestroy() {
    super.willDestroy(...arguments);
    window.removeEventListener('dragenter', this.onGlobalDragEnter, false);
    window.removeEventListener('dragleave', this.onGlobalDragLeave, false);
    window.removeEventListener('dragover', this.onGlobalDragOver, false);
    window.removeEventListener('drop', this.onGlobalDrop, false);
  }

  get uniqueLabelId() {
    return `file-upload-label-id-${guidFor(this)}`;
  }

  @action
  onSelect(files=[]) {
    event.preventDefault();

    files.forEach((file)=> {
      this.files.pushObject({
        @tracked file:        file,
        @tracked error:       null,
        @tracked url:         null,
        @tracked isUploading: false
      });
    });

  }

  @action
  removeFile(fileObject) {
    this.files.removeObject(fileObject);
  }

  @action
  uploadAll(event) {
    event.preventDefault();
    this.files.forEach((fileObject)=> this.uploadFile(fileObject))
  }

  async upload(fileObject) {
    try {
      fileObject.isUploading = true;
      const { url, error }   = await this.storage.upload(fileObject.file, { path: 'public' });
      fileObject.error       = error;
      fileObject.url         = url;
    }
    catch(error) {
      console.log(error);
      fileObject.error = error;
    }
    finally {
      fileObject.isUploading = false;
    }
  }

  reset() {
    this.dragging = false;
    this.hovering = false;
    this.globalCounter = 0;
  }

  @action
  onFileSelect(clickEvent) {
    if (clickEvent.target?.files && clickEvent.target.files instanceof FileList) {
      this.onSelect([ ...clickEvent.target.files ]);
    }
  }


  /////////// LOCAL DRAG EVENTS ///////////
  @action
  onDrop(dragEvent) {
    // dragEvent.stopPropagation(); // stops the browser from redirecting (images or links)
    dragEvent.preventDefault();
    console.log('onDrop');
    this.reset();

    if (this.args.disabled) return true;

    if (event.dataTransfer?.items) {
      const files = [ ...event.dataTransfer.items ].map((item)=> item.getAsFile());
      this.onSelect(files);
    }

  }

  // Must be implement for Drag&Drop to work
  // as the event fires alot
  @action
  onDragover(dragEvent) {
    dragEvent.preventDefault();
    dragEvent.dataTransfer.dropEffect = "move";
  }

  @action
  onDragleave() {
    this.hovering = false;
    // if (!this.args.disabled) {
      // this.args.onDragLeave();
    // }
  }
  @action
  onDragenter(dragEvent) {
    // if (!this.args.disabled) {
      // this.args.onDragEnter(this.extractFiles(dragEvent).length);
    // }
  }



  /////////// GLOBAL DRAG EVENTS ///////////
  @action
  onGlobalDragEnter() {
    this.dragging = true;
    ++this.globalCounter;
  }

  @action
  onGlobalDragLeave() {
    if (--this.globalCounter == 0) {
      this.dragging = false;
    }
  }

  @action
  onGlobalDragOver(dragEvent) {
    dragEvent.preventDefault();
  }

  @action
  onGlobalDrop(dragEvent) {
    dragEvent.preventDefault();
    this.reset();
  }
}


// error: ""
// message: "duplicate key value violates unique constraint \"bucketid_objname\""
// statusCode: "23505"
