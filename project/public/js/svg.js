const SVG_ICONS = {}

// Stores floor number & handle to SVGJS data
class SVGFloor {
    constructor(buildingName, floorNumber, svgObject) {
        this.buildingName = buildingName;
        this.floorNumber = floorNumber;
        // Handle to unmodified SVGJS object
        this.svgSource = svgObject;
        // Composite SVGJS object
        this.rooms = {}
        this.svg = this.constructSVG();
        this.viewContainer = this.svg.find("#container")[0];
    }

    constructSVG() {
        console.info(`Applying styles to ${CONFIG.names[this.buildingName]}`);
        let debug = SVG().group();

        let scale = 1.0;
        if (this.buildingName === 'kaken') {
            scale *= CONFIG.kakenScale;
        }

        let src = this.svgSource.children()[0];
        let root = SVG();
        let container = SVG().attr('id', 'container');
        container.addTo(root);
        let defs = root.defs();
        SVG(STRIPE_PATTERN).addTo(defs);

        root.viewbox(src.viewbox());

        // Text styles
        let textElements = this.svgSource.find('text')
        this.#resetStyles(textElements);
        textElements.css(CONFIG.styles.text);
        textElements.css({'font-size': scale * CONFIG.textSize + 'px'});
        let text = SVG().group().attr('id', 'text');
        for (const t of textElements) {
            t.addTo(text);
            let bbox = t.bbox();
            this.rooms[t.text().toLowerCase()] = { 'x': bbox.x, 'y': bbox.y };

            // let c = debug.circle(10, 10).css({ 'stroke': 'red', 'stroke-width': '2px', 'fill': 'none' }).x(bbox.cx).y(bbox.y);
            // c.animate(CONFIG.animation.roomHighlight).attr({ 'r': 30, 'opacity': 0.0 }).step(20)
        }

        // Wall styles
        let walls = this.#assign_group(this.#getGroup('#väggar'), SVG().group().attr('id', 'walls'));
        this.#resetStyles(walls);
        walls.css(CONFIG.styles.walls);

        // Icon overlay candidates
        let trappor = this.#getGroup('#trappor');
        let studentfik = this.#getGroup('#studentfik');
        let hissar = this.#getGroup('#hissar');
        let studentkok = this.#getGroup('#studentkök');
        let toaletter = this.#getGroup('#toaletter');

        // Icon overlays
        let icons = SVG().group().attr('id', 'icons');
        this.#createIcons(trappor, icons, 'stairs', scale);
        this.#createIcons(studentfik, icons, 'food', scale);
        this.#createIcons(studentkok, icons, 'food', scale);
        this.#createIcons(hissar, icons, 'elevator', scale);
        this.#createIcons(toaletter, icons, 'restroom', scale);


        // Various room styles
        let rooms = SVG().group().attr('id', 'rooms');
        this.#assign_group(this.#getGroup('#salar'), rooms);
        this.#assign_group(this.#getGroup('#clinicum'), rooms);
        this.#assign_group(this.#getGroup('#digimaker'), rooms);
        this.#assign_group(this.#getGroup('#mötesrum'), rooms);
        this.#assign_group(this.#getGroup('#studentfik'), rooms);
        this.#assign_group(this.#getGroup('#labbsalar'), rooms);
        this.#assign_group(this.#getGroup('#trappan'), rooms);
        this.#assign_group(this.#getGroup('#rum'), rooms);
        this.#assign_group(this.#getGroup('#studenthälsan'), rooms);
        this.#assign_group(this.#getGroup('#it'), rooms);
        this.#assign_group(this.#getGroup('#infocenter'), rooms);
        this.#assign_group(toaletter, rooms);
        let stairs = this.#assign_group(trappor, SVG().group().attr('id', 'rooms'));
        let elevators = this.#assign_group(hissar, SVG().group().attr('id', 'elevators'));
        this.#assign_group(studentkok, rooms);
        this.#assign_group(studentfik, rooms);

        this.#resetStyles(rooms);
        rooms.css(CONFIG.styles.rooms);
        stairs.css(CONFIG.styles.stairs);
        elevators.css(CONFIG.styles.stairs);

        // Restricted areas
        let restricted = this.#getGroup('#restricted');
        this.#resetStyles(stairs);
        this.#resetStyles(elevators);
        this.#resetStyles(restricted);
        // restricted.css(CONFIG.styles.walls);
        restricted.css(CONFIG.styles.restricted);


        // Append groups to new root
        walls.addTo(container);
        rooms.addTo(container);
        restricted.addTo(container);
        debug.addTo(container);
        stairs.addTo(container);
        elevators.addTo(container);
        icons.addTo(container);
        text.addTo(container);

        return root;
    }

    #resetStyles(group) {
        for (const element of group.children()) {
            element.attr('style', '');
        }
    }

    #getGroup(groupName) {
        return this.svgSource.find(groupName);
    }

    #assign_group(elements, group) {
        for (const el of elements.children()) {
            el.addTo(group);
        }
        return group;
    }

    #createIcons(sourceGroup, targetGroup, iconName, scale) {
        if (sourceGroup[0] === undefined) { return }
        for (const el of sourceGroup[0].children()) {
            let bbox = el.bbox();

            let icon = SVG_ICONS[iconName].clone();
            icon.attr({ 'width': CONFIG.iconSize * scale, 'height': CONFIG.iconSize * scale, 'x': bbox.x, 'y': bbox.y});
            icon.addTo(targetGroup);
        }
    }
}

// Instantiates and stores Building objects
class BuildingsManager {
    constructor() {
        // Building objects
        this.buildings = {};
    }

    getRoom(roomName) {
        for (const buildingName in this.buildings) {
            const building = this.buildings[buildingName]
            for (const floorNumber in building) {
                const floor = building[floorNumber];
                roomName = roomName.toLowerCase();
                if (floor.rooms[roomName]) {
                    return {
                        'buildingName': buildingName,
                        'floorNumber': parseInt(floorNumber),
                        'position': floor.rooms[roomName],
                    }
                }
            }
        }
    }

    getFloor(buildingName, floorNumber) {
        for (const floor in this.buildings[buildingName]) {
            if (parseInt(floor) === floorNumber) {
                return this.buildings[buildingName][floor];
            }
        }
        return undefined;
    }

    getFloors(buildingName) {
        return this.buildings[buildingName];
    }

    // Fetch svg files, instantiate buildings objects
    async loadBuildings(files) {
        for (const file of CONFIG.icon_files) {
            const name = file.substring(file.lastIndexOf('/') + 1, file.lastIndexOf('.'))
            const response = await fetch(file);
            const svgContent = await response.text();
            const svgObject = SVG().svg(svgContent);
            SVG_ICONS[name] = svgObject.children()[0]
        }

        for (const file of files) {
            const filename = this.#parsePath(file);
            const name = filename.name;
            const number = filename.number;

            const response = await fetch(file);
            const svgContent = await response.text();

            if (this.buildings[name] === undefined) {
                this.buildings[name] = {};
            }
            const svgObject = SVG().svg(svgContent);
            const floor = new SVGFloor(name, number, svgObject);
            this.buildings[name][number] = floor;
            console.info(`Loaded "${file}"`)
        }
    }

    // Parse building name/floor number from svg filenames
    #parsePath(filepath) {
        const filename = filepath.substr(filepath.lastIndexOf('/') + 1);
        const sepIndex = filename.lastIndexOf('_');
        const extIndex = filename.lastIndexOf('.');
        const name = filename.substring(0, sepIndex);
        const number = parseInt(filename.substring(sepIndex + 1, extIndex));
        return { name, number };
    }
}

class SVGView {
    constructor(rootElement, manager) {
        this.rootElement = rootElement;
        this.manager = manager;
        this.activeFloor = null;
        this.posX = 0;
        this.posY = 0;
        this.zoom = CONFIG.defaultZoom;
        this.multitouch = false;
        this.ready = false;

        this.activeHighlight = null;
        this.#bindEvents();
    }

    displayFloor(buildingName, floorNumber, viewFilter) {


        console.info(`Displaying ${CONFIG.names[buildingName]} ${floorNumber}`);
        const floor = this.manager.getFloor(buildingName, floorNumber);

  
        if (this.activeFloor != null) {
            this.activeFloor.svg.remove();
        }

        this.activeFloor = floor;
        this.activeView = this.activeFloor.viewContainer;
        floor.svg.addTo(this.rootElement);
        this.#setZoom(this.zoom);
        this.#setPosition(this.posX, this.posY);
    }

    #bindEvents() {
        let click = false;

        this.rootElement.onmousedown = (event) => {
            click = true;
            this.x = event.clientX;
            this.y = event.clientY;
        };

        this.rootElement.onmouseup = (event) => { click = false; };
        // this.rootElement.onmouseleave = (event) => { click = false; };
        this.rootElement.onmousemove = (event) => {
            if (click) {
                let dx = event.clientX - this.x;
                let dy = event.clientY - this.y;
                this.x = event.clientX;
                this.y = event.clientY;
                this.#offsetPosition(dx / this.zoom, dy / this.zoom);
            }
        };

        this.rootElement.onwheel = (event) => {
            event.preventDefault();
            const delta = Math.sign(event.deltaY);
            this.zoom += delta * -0.2;
            this.zoom = Math.min(Math.max(0.75, this.zoom), 40);
            this.#setZoom(this.zoom);
        };

        this.rootElement.ontouchstart = (event) => {
            this.x = event.touches[0].clientX;
            this.y = event.touches[0].clientY;
            if (event.touches.length == 2) {
                this.dist = Math.hypot(
                    this.x - event.touches[1].clientX,
                    this.y - event.touches[1].clientY);
            }
        };
        this.rootElement.onmouseup = (event) => { click = false; };
        this.rootElement.onmouseleave = (event) => { click = false; };

        const info = document.getElementById('info')
        
        this.rootElement.ontouchend = (event) => {
            if(event.touches.length == 0) {
                this.multitouch = false;
                info.innerHTML = this.multitouch
            }
        };
        this.rootElement.ontouchmove = (event) => {
            info.innerHTML = this.multitouch
            event.preventDefault();
            if (!this.multitouch && event.touches.length == 1) {
                // console.log(event.touches[0])
                let dx = event.touches[0].clientX - this.x;
                let dy = event.touches[0].clientY - this.y;
                this.x = event.touches[0].clientX;
                this.y = event.touches[0].clientY;
                this.#offsetPosition(
                    dx, /// (this.zoom * CONFIG.touchPanSensitvity), 
                    dy /// (this.zoom * CONFIG.touchPanSensitvity)
                );
            } else if (event.touches.length == 2) {
                this.multitouch = true
                const dx = event.touches[0].pageX - event.touches[1].pageX;
                const dy = event.touches[0].pageY - event.touches[1].pageY;
                const dist = Math.hypot(dx, dy);
                this.zoom += (dist - this.dist) / CONFIG.touchZoomSensitvity;
                this.zoom = Math.min(Math.max(0.75, this.zoom), 40);
                this.#setZoom(this.zoom);
            }
            // info.innerHTML = event.touches.length;
        };


    }

    #resetPosition() {
        this.posX = 0.0;
        this.posY = 0.0;
        this.activeView.move(0, 0);
    }

    #resetZoom() {
        this.zoom = 1.0;
        this.activeView.transform({
            scaleX: 1.0,
            scaleY: 1.0,
        });
    }

    #setPosition(x, y) {
        this.activeView.move(x, y);
    }

    #setPositionSmooth(x, y) {
        let bbox = this.activeView.bbox();
        // this.activeView.animate(CONFIG.animation.position).attr({'x':x, 'y':y});
        this.zoom = CONFIG.zoomLevel;
        this.posX = x;
        this.posY = y;
        this.activeView.animate(CONFIG.animation.smoothPosition).transform({
            scaleX: CONFIG.zoomLevel,
            scaleY: CONFIG.zoomLevel,
            originX: bbox.cx,
            originY: bbox.cy
        }).move(x, y);
    }

    #offsetPosition(dx, dy) {
        let x = this.activeView.x();
        let y = this.activeView.y();

        this.posX = x + dx;
        this.posY = y + dy;

        this.activeView.move(this.posX, this.posY);
    }

    #setZoom(zoom) {
        let bbox = this.activeView.bbox();

        this.activeView.transform({
            scaleX: zoom,
            scaleY: zoom,
            // originX: 0,
            // originY: 0
            originX: bbox.cx,
            originY: bbox.cy
            // originX: this.rootElement.clientWidth,
            // originY: this.rootElement.clientHeight
        });
    }

    goToRoom(roomName) {
        const room = this.manager.getRoom(roomName);
        if (!((room.floorNumber == this.activeFloor.floorNumber) &&
            (room.buildingName == this.activeFloor.buildingName))) {

            view.displayFloor(room.buildingName, room.floorNumber)
            // return;
        }
        const bbox = this.activeView.bbox();

        const dx = (bbox.w / 2 - room.position.x);
        const dy = (bbox.h / 2 - room.position.y);
        // this.#setPosition(dx, dy)
        this.#setZoom(2.0)
        this.#setPositionSmooth(dx, dy)
    }

    resetMap(){
        this.#setPositionSmooth(0,0)
        this.#setZoom(0)
    }
}

window.SVGView = SVGView;
window.BuildingsManager = BuildingsManager;