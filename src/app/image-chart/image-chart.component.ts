import {Component, ViewChild, ElementRef} from '@angular/core';
import { ImgsService } from '../services/imgs.service';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FiltersService } from '../services/filters.service';

@Component({
  selector: 'app-image-chart',
  templateUrl: './image-chart.component.html',
  styleUrls: ['./image-chart.component.scss']
})
export class ImageChartComponent{

  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  renderer = null;
  scene = null;
  camera = null;
  controls = null;
  manager = null;
  counterLoading: number;
  mouse = new THREE.Vector2();
  raycaster = new THREE.Raycaster();
  msgs = [];
  imgs = [];
  selectedPaintings = new Set();

  constructor(private imgsService: ImgsService, private filtersService: FiltersService) {
      this.counterLoading = 0;
  }

  ngAfterViewInit() {
    //AfterInit we can interact with the html

    //Get the canvas where the graph will be rendered
    //Resize it to match the div width and 500px for height
    let canvas = this.rendererContainer.nativeElement.querySelector("#canvas")
    canvas.width = this.rendererContainer.nativeElement.getBoundingClientRect().width
    canvas.height = 500
    canvas.style.width = canvas.width
    canvas.style.height = canvas.height
    this.renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
    this.renderer.setSize(canvas.width, canvas.height, false);
    //Camera initialisation
    this.camera = new THREE.OrthographicCamera( this.renderer.domElement.width / - 2, this.renderer.domElement.width / 2, this.renderer.domElement.height / 2, this.renderer.domElement.height / - 2, 1, 1000 );
    this.camera.position.z = 10;
    //Control initialisation (separate because too much long)
    this.initControl()
    //Scene initialisation
    this.scene = new THREE.Scene();
    //Load manager
    this.manager = new THREE.LoadingManager();
    this.manager.onStart = function () {
      console.log("Start Loading")
    };
    this.manager.onLoad  = () => {
      let loader = null
      loader = this.rendererContainer.nativeElement.querySelector("#loader")
      loader.classList.remove( 'loading' );
      console.log("Loading Complete")
    };
    this.manager.onProgress  = () => {
      let loader = null
      loader = this.rendererContainer.nativeElement.querySelector("#loader")
      loader.classList.add( 'loading' );
      console.log("Loading...")
    };
    //Each time user press submit it will trigger imgs update
    //and then scene update
    this.imgsService.imgs.subscribe(valeur => {
      this.imgs = valeur;
      if((this.imgs.length == 0) && (this.counterLoading > 0)){
        this.msgs.push({severity:'warn', summary:'Selection problem', detail:'No pictures for this selection'});
      }else{
        this.msgs = [];
      }
      this.selectedPaintings.clear()
      this.loadScene();
    });
    this.animate()
  }

  loadTexture(url) {
    return new Promise(resolve => {
      new THREE.TextureLoader( this.manager ).load(url, resolve);
    });
  }

  loadMeshes() {
    const meshList = [];
    /*For each image create a promise that on sucess will create a mesh that consist at a
    plan textured by the image*/
    const promises = Object.keys(this.imgs).map(key => {
      return this.loadTexture(this.imgs[key]["image"]).then(texture => {
          let geometry = new THREE.PlaneGeometry(20, (20*this.imgs[key].height)/this.imgs[key].width);
          let mapTexture = new Object()
          mapTexture["map"] = texture
          let material = new THREE.MeshBasicMaterial(mapTexture);
          let mesh = new THREE.Mesh(geometry, material)
          //Add specific attributes to mesh for selection
          mesh['paintingsId'] = this.imgs[key]['paintingsId']
          //Random z position to create a sort of layers of paintings
          const scaleFactor = Math.sqrt(this.imgsService.initialDensity/0.002)
          mesh.position.set(this.imgs[key].x * scaleFactor,this.imgs[key].y * scaleFactor, Math.random()*10)
          meshList.push(mesh);
        }
      ).catch(req => {console.log("Mesh = ", this.imgs[key]["image"], " : ", req)});
    });
    /*If all image load sucessfully will return the created mesh list*/
    return Promise.all(promises).then(() => {
      return meshList;
    });
  }

  loadScene() {
    //Save initial state, or reset at new loading to retrieve inital camera
    if(this.counterLoading == 0){
      this.controls.saveState()
    } else{
      this.controls.reset()
    }
    //Delete ancient mesh from scene
    while(this.scene.children.length > 0){
      this.scene.remove(this.scene.children[0]);
    }
    //If loadMeshes sucess will add new objects to the scene
    this.loadMeshes().then(meshList => {
      for (var i = 0; i < meshList.length; i++) {
        this.scene.add( meshList[i] );
      }
      this.renderer.render(this.scene, this.camera)
      this.counterLoading = this.counterLoading + 1
      this.filtersService.set_IsgetImageDisabled(false)
    }).catch(req => {console.log("Scene : ", req)});
  }

  animate() {
    //this.resizeCanvasToDisplaySize()
    requestAnimationFrame( this.animate.bind(this) );
    this.controls.update();
    this.renderer.render( this.scene, this.camera );
  }

  onClickMe(event: any){
    //Convert mouse position into position in the renderer
    this.mouse.x = ( event.offsetX / this.renderer.domElement.width ) * 2 - 1;
    this.mouse.y = - ( event.offsetY / this.renderer.domElement.height ) * 2 + 1;

    // Launch a raycaste from the click to detect objects
    this.raycaster.setFromCamera( this.mouse, this.camera );
    var intersections = this.raycaster.intersectObjects( this.scene.children, true );

    // If detect one or more object take the first one (first encounter by the raycast)
    if(intersections.length >= 1){
      let object = intersections[0].object
      // If click in a unselected object select this object
      // If click in a selected object unselect this object
      if(this.selectedPaintings.has(object["paintingsId"])){
        object['material'].color.set(0xffffff);
        this.selectedPaintings.delete(object["paintingsId"])
      } else{
        object['material'].color.set(0x1e90ff);
        this.selectedPaintings.add(object["paintingsId"])
      }
      this.imgsService.updateSelectPaintings(this.selectedPaintings)
    }
  }

  onTouchMe(event: any){
    //Convert mouse position into position in the renderer
    var bcr = event.target.getBoundingClientRect();
    var x = event.targetTouches[0].clientX - bcr.x;
    var y = event.targetTouches[0].clientY - bcr.y;
    this.mouse.x = (x / this.renderer.domElement.width) * 2 - 1
    this.mouse.y = -(y / this.renderer.domElement.height) * 2 + 1;

    // Launch a raycaste from the click to detect objects
    this.raycaster.setFromCamera( this.mouse, this.camera );
    var intersections = this.raycaster.intersectObjects( this.scene.children, true );

    // If detect one or more object take the first one (first encounter by the raycast)
    if(intersections.length >= 1){
      let object = intersections[0].object
      // If click in a unselected object select this object
      // If click in a selected object unselect this object
      if(this.selectedPaintings.has(object["paintingsId"])){
        object['material'].color.set(0xffffff);
        this.selectedPaintings.delete(object["paintingsId"])
      } else{
        object['material'].color.set(0x1e90ff);
        this.selectedPaintings.add(object["paintingsId"])
      }
      this.imgsService.updateSelectPaintings(this.selectedPaintings)
    }
  }

  resizeCanvasToDisplaySize() {
    const canvas = this.renderer.domElement;
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    // adjust displayBuffer size to match
    if (canvas.width !== width || canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      // update any render target sizes here
    }
  }

  initControl(){
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    //Create inertia when moving
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    //Camera move in a plan paralel to the vieuw
    this.controls.screenSpacePanning = true;
    //default controls put PAN in RIGHT and ROTATE in LEFT
    this.controls.mouseButtons = {
      RIGHT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      LEFT: THREE.MOUSE.PAN
    }
    this.controls.touches = {
      ONE: THREE.TOUCH.PAN,
      TWO: THREE.TOUCH.DOLLY_PAN
    }
    this.controls.zoomSpeed = 3;
    this.controls.minDistance = 100;
    this.controls.maxDistance = 500;
    this.controls.maxPolarAngle = Math.PI / 2;
  }

}
