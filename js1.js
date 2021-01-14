
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
            stroke: '#e03834',
            strokeWidth: 2,
        });
        let buttonPOI = new Konva.Circle({
            x: 70,
            y: 180,
            width: 16,
            height: 16,
            stroke: 'green',
            strokeWidth: 2,
        });
        let buttonRow = new Konva.Rect({
            x: 20,
            y: 210,
            width: 100,
            height: 30,
            stroke: '#0103a9',
            strokeWidth: 1,
        });
        let buttonTextROIRegion = new Konva.Text({
            x: 123,
            y: 27,
            text: "ROI Region",
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: 'black',
            padding: 8,
            align: 'left',
            id: 'objectList',
        });
        let buttonTextROI = new Konva.Text({
            x: 123,
            y: 107,
            text: "ROI",
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: 'black',
            padding: 8,
            align: 'left',
            id: 'objectList',
        });
        let buttonTextPOI = new Konva.Text({
            x: 123,
            y: 162,
            text: "POI",
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: 'black',
            padding: 8,
            align: 'left',
            id: 'objectList',
        });
        let buttonTextRow = new Konva.Text({
            x: 123,
            y: 207,
            text: "Line",
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: 'black',
            padding: 8,
            align: 'left',
            id: 'objectList',
        });

        paletteLayer.add(buttonROIRegion);
        paletteLayer.add(buttonROI);
        paletteLayer.add(buttonPOI);
        paletteLayer.add(buttonRow);
        paletteLayer.add(buttonTextROIRegion);
        paletteLayer.add(buttonTextROI);
        paletteLayer.add(buttonTextPOI);
        paletteLayer.add(buttonTextRow);

        buttonROIRegion.on('click', function() {
            createShape('ROIRegion');
        });
        buttonTextROIRegion.on('click', function() {
            createShape('ROIRegion');
        });
        buttonROI.on('click', function() {
            createShape('ROI');
        });
        buttonRow.on('click', function() {
            createShape('Row');
        });
        buttonTextROI.on('click', function() {
            createShape('ROI');
        });
        buttonPOI.on('click', function() {
            createShape('POI');
        });
        buttonTextPOI.on('click', function() {
            createShape('POI');
        });
        buttonTextRow.on('click', function() {
            createShape('Row');
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
                //console.log("click event target was not a valid shape : " + e.target.name());
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
            case 'Row':
                createRow();
                console.log("created Row");
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
                //console.log("Invalid shape name : " + s.name());
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
            stroke: '#e03834',
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
        
        shapeInfos.addShape(new ShapeInfo(roi));
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
        
        shapeInfos.addShape(new ShapeInfo(roiRegion));
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
        
        shapeInfos.addShape(new ShapeInfo(poi));
        editorLayer.add(poi);
    }
    function createRow() {
        let row = new Konva.Rect({
            name: 'Row',
            x: 8,
            y: 8,
            width: 120,
            height: 30,
            stroke: '#0103a9',
            strokeWidth: 1,
            draggable: 'true',
            strokeScaleEnabled: false,
        });
        row.on('transform', () => {
            row.setAttrs({
                width: Math.max(row.width() * row.scaleX(), 8),
                height: Math.max(row.height() * row.scaleY(), 8),
                scaleX: 1,
                scaleY: 1,
            });
            updateTree();
        });
        row.on('dragmove', function() {
            moveShape(this);
        })
        
        shapeInfos.addShape(new ShapeInfo(row));
        editorLayer.add(row);
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

    //Declaration of list of shapes informations
    var shapeInfos = {
        list : new Array(),

        addShape : function (shapeInfo) {
            shapeInfos.list.push(shapeInfo);
            console.log("Added shapeInfo. Name: " + shapeInfo.name());
        },
        removeShape : function (shapeInfo) {
            for (const i in list) {
                if (shapeInfo.list[i].id() === shapeInfo.id()) {
                    shapeInfos.list.splice(i, );
                }
            }
        },
        size : function () {
            return shapeInfos.list.length;
        },
        findByID : function (id) {
            for (const i in shapeInfos.list) {
                if (shapeInfos.list[i].id() === id) {
                    return shapeInfos.list[i];
                }
            }
            return undefined;
        },
    }


    //Class declarations
    const POIUsage = {
        NONE : 0,
        //header bloc
        HEADER_COMPANY_NAME : 1,
        HEADER_INVOICE_ID : 2,
        HEADER_CLIENT_ID : 3,
        HEADER_LAST_DATE : 4,   
        HEADER_LOCATION : 5,
        HEADER_CREATION_DATE : 6,
        //invoice table items bloc
        PRODUCT_ID : 7,
        PRODUCT_ISSUE_DATE : 8,
        PRODUCT_PAYMENT_MODE : 9,
        PRODUCT_DUE_DATE : 10,
        PRODUCT_LABEL : 11,
        PRODUCT_CATEGORY : 12,
        PRODUCT_DEBIT : 13,
        PRODUCT_CREDIT : 14,
        PRODUCT_VAT : 15,
        PRODUCT_VAT0000 : 16,
        PRODUCT_VAT0210 : 17,
        PRODUCT_VAT0550 : 18,
        PRODUCT_VAT1000 : 19,
        PRODUCT_VAT2000 : 20,
        PRODUCT_VATINDEX : 21,
        PRODUCT_SUMMARY : 22,
        // vat table items bloc
        VAT_LABEL : 23,
        VAT_RATE : 24,
        VAT_INDEX : 25,
        //common
        AMOUNT_VAT_EXCLUDED : 26,
        AMOUNT_VAT : 27,
        AMOUNT_VAT_INCLUDED : 28,
        AMOUNT_DUE_DATE : 29,
        // compound date
        DATE_DAY_PART : 30,
        DATE_MONTH_PART : 31,
        DATE_YEAR_PART : 32,
    };
    Object.freeze(POIUsage);

    const ROIRegionUsage = {
        NONE : 0,
        // main bloc
        HEADER : 1,
        PRODUCT_TABLE : 2,
        PRODUCT_SUMMARY_TABLE : 3,  
        VAT_TABLE : 4,
        VAT_SUMMARY_TABLE : 5,
        SUMMARY : 6,
    };
    Object.freeze(ROIRegionUsage);

    const RowUsage = {
        NONE : 0,
        // product table content
        PRODUCT_LINE : 1,
        PRODUCT_LINE_CATEGORY : 2,
        PRODUCT_LINE_SUBTOTAL : 3,
        PRODUCT_LINE_SUMMARY : 4,
        PRODUCT_LINE_INFO : 5,
        PRODUCT_LINE_SKIPPABLE : 6,
        // vat table content
        VAT_LINE : 7,
        VAT_LINE_LABELS : 8,
        VAT_LINE_SUMMARY : 9,
    };
    Object.freeze(RowUsage);

    const ShapeType = {
        ROIREGION : 0,
        ROI : 1,
        POI : 2,
        ROW : 3,
    };

    let ShapeInfo = class {
        constructor(shape) {
            this.shape = shape;
            switch (shape.name()) {
                case 'ROIRegion':
                    this.shapeType = ShapeType.ROIREGION;
                    break;
                case 'ROI':
                    this.shapeType = ShapeType.ROI;
                    break;
                case 'POI':
                    this.shapeType = ShapeType.POI;
                    break;
                case 'Row':
                    this.shapeType = ShapeType.LINE;
                    break;
            }
            this.usage = POIUsage.NONE;
        };
        name() { return this.shape.name() };
    };

    //Declaration of valid shape names
    var shapesNames = ['ROI', 'ROIRegion', 'POI', 'Row'];

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
