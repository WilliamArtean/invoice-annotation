
'use strict';

function test() {
    function testCircle() {
        // then create layer
        let layer = new Konva.Layer();
        
        // create our shape
        let circle = new Konva.Circle({
            x: topMenuStage.width() / 2,
            y: topMenuStage.height() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
        });
        
        // add the shape to the layer
        layer.add(circle);
        console.log("circle created");
        
        // add the layer to the stage
        topMenuStage.add(layer);
        
        // draw the image
        layer.draw();
    }

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

            //fit image to browser height while keeping ratio
            let imageRatio = invoice.width() / invoice.height()
            console.log("image ratio : " + imageRatio);
            invoice.height(editorLayer.height());
            invoice.width(invoice.height() * imageRatio);

            //center image in the editor
            let leftMargin = (editorLayer.width() - invoice.width()) / 2;
            invoice.x(leftMargin);
            
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
        let buttonRectBlue = new Konva.Rect({
            x: 20,
            y: 20,
            width: 100,
            height: 50,
            stroke: 'blue',
            strokeWidth: 2,
        });
        let buttonRectRed = new Konva.Rect({
            x: 160,
            y: 20,
            width: 100,
            height: 50,
            stroke: 'red',
            strokeWidth: 2,
        });
        let buttonGreenCircle = new Konva.Circle({
            x: 20,
            y: 100,
            width: 16,
            height: 16,
            stroke: 'green',
            strokeWidth: 2,
        });

        paletteLayer.add(buttonRectBlue);
        paletteLayer.add(buttonRectRed);
        paletteLayer.add(buttonGreenCircle);

        buttonRectBlue.on('click', function() {
            createShape('blue rectangle');      //Penser à des meilleurs noms peut-être ?
        });
        buttonRectRed.on('click', function() {
            createShape('red rectangle');
        });
        buttonGreenCircle.on('click', function() {
            createShape('green circle');
        });

        paletteLayer.draw();
    }
    
    function buildEditor() {
        //Stage & layer set up
        let editorBorder = new Konva.Rect({
            width: stageWidth,
            height: stageHeight,
            stroke: 'black',
            strokeWidth: 2,
        });
        editorLayer.add(editorBorder);

        //Click events
        editorStage.on('click tap', (e) => {
            console.log("editor stage: stage click/tap event");

            if (e.target.id() !== 'shape') {
                console.log("event target was not a shape");
                clickOnStage(editorStage);
            } else {
                console.log("event target was shape: " + e.target.name());
                clickOnShape(e.target);
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
            case 'blue rectangle':
                createBlueRectangle();
                console.log("created blue rectangle");
                break;
            case 'red rectangle':
                createRedRectangle();
                console.log("created red rectangle");
                break;
            case 'green circle':
                createGreenCircle();
                console.log("created green circle");
                break;
            default:
                console.log("Invalid shape name: cannot create shape");
        }

        updateTree();
        editorLayer.draw();
    }


    function clickOnShape(shape) {
        shape.moveToTop();

        if (shape.getClassName() === 'Circle') {
            tr.nodes([]);
        } else {
            tr.moveToTop();
            tr.nodes([shape]);
        }

        editorLayer.draw();
    }

    function clickOnStage(stage) {
        tr.nodes([]);

        editorLayer.draw();
    }


    function updateTree() {
        let rects = editorStage.find('Shape');
        let images = editorStage.find('Image');

        let eol = '\n\t\t\t\t-';
        let imageList = '', shapeList = '';
        let shapesNames = ['blue rectangle', 'red rectangle', 'green circle'];
        
        images.each(function(img) {
            if (img.id() === 'image') {
                imageList += eol + img.name();
            } else {
                console.log("Invalid image id : " + img.id());
            }
        });

        rects.each(function(rect) {
            if (shapesNames.indexOf(rect.name()) !== -1) {
                shapeList += eol + rect.name();
            } else {
                console.log("Invalid shape name : " + rect.name());
            }
        });
        
        let treeText = 'Images' + imageList + '\n\n' + 'Shapes' + shapeList;
        treeLayer.findOne('#objectList').text(treeText);

        treeLayer.draw();
        console.log("Updated tree");
    }

    function createBlueRectangle() {
        let rectangleBlue = new Konva.Rect({
            name: 'blue rectangle',
            x: 8,
            y: 8,
            width: 100,
            height: 50,
            stroke: 'blue',
            strokeWidth: 2,
            draggable: 'true',
        });

        rectangleBlue.on('transform', () => {
            rectangleBlue.setAttrs({
                width: Math.max(rectangleBlue.width() * rectangleBlue.scaleX(), 8),
                height: Math.max(rectangleBlue.height() * rectangleBlue.scaleY(), 8),
                scaleX: 1,
                scaleY: 1,
            });
        });
        
        editorLayer.add(rectangleBlue);
    }
    function createRedRectangle() {
        let rectangleRed = new Konva.Rect({
            name: 'red rectangle',
            x: 8,
            y: 8,
            width: 100,
            height: 50,
            stroke: 'red',
            strokeWidth: 2,
            draggable: 'true',
        });

        rectangleRed.on('transform', () => {
            rectangleRed.setAttrs({
                width: Math.max(rectangleRed.width() * rectangleRed.scaleX(), 8),
                height: Math.max(rectangleRed.height() * rectangleRed.scaleY(), 8),
                scaleX: 1,
                scaleY: 1,
            });
        });
        
        editorLayer.add(rectangleRed);
    }
    function createGreenCircle() {
        let circleGreen = new Konva.Circle({
            name: 'green circle',
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
        
        editorLayer.add(circleGreen);
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

    //Add transformer
    var MIN_LENGTH = 8;
    var tr = new Konva.Transformer({
        resizeEnabled: true,
        rotateEnabled: false,
        keepRatio: false,
        boundBoxFunc: function (oldBoundBox, newBoundBox) {
            if (Math.abs(newBoundBox.width) < MIN_LENGTH || Math.abs(newBoundBox.height) < MIN_LENGTH) {
                return oldBoundBox;
            }
            return newBoundBox;
        },
    });
    editorLayer.add(tr);

    buildEditor();
}
