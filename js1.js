
'use strict';

function test() {
    function loadImage(imageObj) {
        var imageObj = new Image();
        imageObj.src = 'img/invoice.gif';

        imageObj.onload = function () {
            var invoice = new Konva.Image({
                name: "invoice",
                //x: 50,
                //y: 50,
                image: imageObj,
                id: 'image',
            });

            //fit image to browser width while keeping ratio
            let imageRatio = invoice.width() / invoice.height()
            console.log("image ratio : " + imageRatio);
            invoice.width(editorLayer.width());
            invoice.height(invoice.width() / imageRatio);
            //increase canvas height
            document.getElementById('topmenu').y = invoice.height();
            editorStage.height(invoice.height());

            //center image in the editor
            //let leftMargin = (editorLayer.width() - invoice.width()) / 2;
            //invoice.x(leftMargin);
            
            // add the shape to the layer
            editorLayer.add(invoice);
            invoice.moveToBottom();
            
            updateTree();
            editorLayer.draw();
        };
    };

    function buildMenu(stageWidth, stageHeight) {
        let topMenuBorder = new Konva.Rect({
            width: stageWidth,
            height: 50,
            stroke: 'black',
            strokeWidth: 2,
        });
        topMenuLayer.add(topMenuBorder);
        
        var buttonFile = new Konva.Text({
            x: 5,
            y: 5,
            text:
                "File",
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: 'black',
            width: 100,
            height: topMenuLayer.height() - 10,
            align: 'center',
            verticalAlign: 'middle',
        });

        var buttonEdit = new Konva.Text({
            x: 115,
            y: 5,
            text:
                "Edit",
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: 'grey',
            width: 100,
            height: topMenuLayer.height() - 10,
            align: 'center',
            verticalAlign: 'middle',
        });
        var buttonHelp = new Konva.Text({
            x: 225,
            y: 5,
            text:
                "Help",
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: 'grey',
            width: 100,
            height: topMenuLayer.height() - 10,
            align: 'center',
            verticalAlign: 'middle',
        });

        buttonFile.on('click', function() {
            //console.log("clicked on File");
            loadImage();
        });

        topMenuLayer.add(buttonFile);
        topMenuLayer.add(buttonEdit);
        topMenuLayer.add(buttonHelp);

        console.log(topMenuLayer);
        topMenuLayer.draw();
        
    }

    function buildPalette() {
        let paletteBorder = new Konva.Rect({
            width: stageWidth,
            height: stageHeight,
            stroke: 'black',
            strokeWidth: 2,
        });
        paletteLayer.add(paletteBorder);

        //Buttons that create shapes
        let buttonROIRegion = new Konva.Rect({
            x: 20,
            y: 20,
            width: 100,
            height: 50,
            stroke: '#468499',
            strokeWidth: 4,
            cornerRadius: 10,
        });
        let buttonROI = new Konva.Rect({
            x: 20,
            y: 100,
            width: 100,
            height: 50,
            stroke: 'blue',
            strokeWidth: 2,
        });
        let buttonPOI = new Konva.Circle({
            x: 20,
            y: 180,
            width: 16,
            height: 16,
            stroke: 'green',
            strokeWidth: 2,
        });

        paletteLayer.add(buttonROIRegion);
        paletteLayer.add(buttonROI);
        paletteLayer.add(buttonPOI);

        buttonROIRegion.on('click', function() {
            createShape('ROIRegion');
        });
        buttonROI.on('click', function() {
            createShape('ROI');
        });
        buttonPOI.on('click', function() {
            createShape('POI');
        });

        paletteLayer.draw();
    }
    
    function buildEditor() {
        //Stage & layer set up

        //Click events
        editorStage.on('click tap', (e) => {
            console.log("editor stage: click/tap event");

            if (shapesNames.indexOf(e.target.name()) !== -1) {
                console.log("click event target was shape: " + e.target.name());
                clickOnShape(e.target);
            } else {
                console.log("click event target was not a valid shape : " + e.target.name());
                clickOnStage(editorStage);
            }
        });

        editorLayer.draw();
    }

    function buildTree() {
        //Stage & layer set up
        let treeBorder = new Konva.Rect({
            width: stageWidth,
            height: stageHeight,
            stroke: 'black',
            strokeWidth: 2,
        });
        treeLayer.add(treeBorder);

        var objectList = new Konva.Text({
            x: 0,
            y: 0,
            text:
                "none",
            fontSize: 18,
            fontFamily: 'Calibri',
            fill: 'black',
            width: treeLayer.width(),
            height: treeLayer.height(),
            padding: 8,
            align: 'left',
            id: 'objectList',
        });

        treeLayer.add(objectList);
        
        updateTree;
    }

    function createShape(shapeName) {
        switch(shapeName) {
            case 'ROIRegion':
                createROIRegion();
                console.log("created ROI Region");
                break;
            case 'ROI':
                createROI();
                console.log("created ROI");
                break;
            case 'POI':
                createPOI();
                console.log("created POI");
                break;
            default:
                console.log("Invalid shape name: cannot create shape");
        }

        updateTree();
        editorLayer.draw();
    }



    //Click events

    function clickOnShape(shape) {
        if (shape.getClassName() === 'Rect') {
            console.log("clicked on rectangle");
            shape.moveToTop();
            tr.moveToTop();
            tr.nodes([shape]);
        } else {
            tr.nodes([]);
            if (shape.getClassName() !== 'Image') {
                shape.moveToTop();
            }
        }

        editorLayer.draw();
    }

    function clickOnStage(stage) {
        tr.nodes([]);

        editorLayer.draw();
    }

    function moveShape(shape) {
        //Called when a shape is being moved around
        //When the shape descriptions in the tree will be fragmented, they will be redrawn individually, without redrawing the whole tree
        updateTree();
    }


    function updateTree() {
        let shapes = editorStage.find('Shape');
        let images = editorStage.find('Image');

        let eol = '\n\t\t\t\t-';
        let imageList = '', shapeList = '';
        
        images.each(function(img) {
            if (img.id() === 'image') {
                imageList += eol + img.name();
            } else {
                console.log("Invalid image id : " + img.id());
            }
        });

        shapes.each(function(s) {
            if (shapesNames.indexOf(s.name()) !== -1) {
                let shapeDescription = eol + s.name();
                shapeDescription += " (x:" + Math.trunc(s.x()) + " y:" + Math.trunc(s.y()) + ")";
                //shapeDescription += " (w:" + s.width() + " h:" + s.height() + ")";
                //shapeDescription += " (scaleX:" + s.scaleX() + " scaleY:" + s.scaleY() + ")";
                //shapeDescription += " (offsetX:" + s.offsetX() + " offsetY:" + s.offsetY() + ")";
                shapeList += shapeDescription;
            } else {
                console.log("Invalid shape name : " + s.name());
            }
        });
        
        let treeText = 'Images' + imageList + '\n\n' + 'Shapes' + shapeList;
        treeLayer.findOne('#objectList').text(treeText);

        treeLayer.batchDraw();
        console.log("Updated tree");
    }

    function createROI() {
        let roi = new Konva.Rect({
            name: 'ROI',
            x: 8,
            y: 8,
            width: 100,
            height: 50,
            stroke: 'blue',
            strokeWidth: 2,
            draggable: 'true',
            strokeScaleEnabled: false,
        });

        roi.on('transform', () => {
            roi.setAttrs({
                width: Math.max(roi.width() * roi.scaleX(), 8),
                height: Math.max(roi.height() * roi.scaleY(), 8),
                scaleX: 1,
                scaleY: 1,
            });
            updateTree();
        });
        roi.on('dragmove', function() {
            moveShape(this);
        })
        
        editorLayer.add(roi);
    }
    function createROIRegion() {
        let roiRegion = new Konva.Rect({
            name: 'ROIRegion',
            x: 8,
            y: 8,
            width: 100,
            height: 50,
            stroke: '#468499',
            strokeWidth: 4,
            cornerRadius: 10,
            draggable: 'true',
            strokeScaleEnabled: false,
        });

        roiRegion.on('transform', () => {
            roiRegion.setAttrs({
                width: Math.max(roiRegion.width() * roiRegion.scaleX(), 8),
                height: Math.max(roiRegion.height() * roiRegion.scaleY(), 8),
                scaleX: 1,
                scaleY: 1,
            });
            updateTree();
        });
        roiRegion.on('dragmove', function() {
            moveShape(this);
        })
        
        editorLayer.add(roiRegion);
    }
    function createPOI() {
        let poi = new Konva.Circle({
            name: 'POI',
            x: 8,
            y: 8,
            width: 8,
            height: 8,
            fill: 'green',
            stroke: 'green',
            strokeWidth: 1,
            draggable: 'false',
            opacity: 0.7,
        });

        poi.on('dragmove', function() {
            moveShape(this);
        })
        
        editorLayer.add(poi);
    }

    //Declaration of Stages and Layers
    //Top Menu
    let stageX = document.getElementById('topmenu').x;
    let stageY = document.getElementById('topmenu').y;
    let stageWidth = document.getElementById('topmenu').clientWidth;
    let stageHeight = document.getElementById('topmenu').clientHeight;
    let topMenuStage = new Konva.Stage({
        container: 'topmenu',   // id of container <div>
        x: stageX,
        y: stageY,
        width: stageWidth,
        height: 50
    });
    var topMenuLayer = new Konva.Layer({
    });
    topMenuStage.add(topMenuLayer);
    buildMenu(stageWidth, stageHeight);

    //Palette
    stageX = document.getElementById('palette').x;
    stageY = document.getElementById('palette').y;
    stageWidth = document.getElementById('palette').clientWidth;
    stageHeight = document.getElementById('palette').clientHeight;
    var paletteStage = new Konva.Stage({
        container: 'palette',
        x: stageX,
        y: stageY,
        width: stageWidth,
        height: stageHeight
    });
    var paletteLayer = new Konva.Layer();
    paletteStage.add(paletteLayer);
    buildPalette();

    //Tree
    stageX = document.getElementById('tree').x;
    stageY = document.getElementById('tree').y;
    stageWidth = document.getElementById('tree').clientWidth;
    stageHeight = document.getElementById('tree').clientHeight;
    var treeStage = new Konva.Stage({
        container: 'tree',
        x: stageX,
        y: stageY,
        width: stageWidth,
        height: stageHeight
    });
    var treeLayer = new Konva.Layer();
    treeStage.add(treeLayer);
    buildTree();

    //Editor
    stageX = document.getElementById('editor').x;
    stageY = document.getElementById('editor').y;
    stageWidth = document.getElementById('editor').clientWidth;
    stageHeight = document.getElementById('editor').clientHeight;
    var editorStage = new Konva.Stage({
        container: 'editor',
        x: stageX,
        y: stageY,
        width: stageWidth,
        height: stageHeight
    });
    var editorLayer = new Konva.Layer();

    editorStage.add(editorLayer);

    //Declaration of valid shape names
    var shapesNames = ['ROI', 'ROIRegion', 'POI'];

    //Add transformer
    var MIN_SIZE = 8;
    var tr = new Konva.Transformer({
        resizeEnabled: true,
        rotateEnabled: false,
        keepRatio: false,
        ignoreStroke: true,
        boundBoxFunc: function (oldBoundBox, newBoundBox) {
            if (Math.abs(newBoundBox.width) < MIN_SIZE || Math.abs(newBoundBox.height) < MIN_SIZE) {
                return oldBoundBox;
            }
            return newBoundBox;
        },
    });
    editorLayer.add(tr);

    buildEditor();
}
