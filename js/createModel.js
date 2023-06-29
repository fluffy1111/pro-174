AFRAME.registerComponent("Model", {
    init: async function() {
        var tawns = await this.getTawn();
        var barcodes = Object.keys(tawns);

        barcodes.map(barcode => {
            var element = tawns[barcode];

            this.createAtoms(element);
        });
    },
    getTawn: function () {
        return fetch("js/list.json")
        .then(res => res.json())
        .then(data => data);
    },
    createModel: function(model) {
        var barcodeValue = model.barcode_value;
        var modelUrl = model.model_url;
        var modelName = model.model_name;

        var scene = document.querySelector("a-scene");
        var marker = document.createElement("a-maker");

        marker.setAttribute("id", `marker-${modelName}`);
        marker.setAttribute("type", "barcode");
        marker.setAttribute("model_name", modelName);
        marker.setAttribute("value", barcodeValue);
        marker.setAttribute("markerhandler", {});
        scene.appendChild(marker);

        if (barcodeValue === 0) {
            var modelEl = document.createElement("a-entity");
            modelEl.setAttribute("id", `${modelName}`);
            modelEl.setAttribute("geometry", {
                primitive: "box",
                width: model.width,
                height: model.height
            });
            modelEl.setAttribute("position", model.position);
            modelEl.setAttribute("rotation", model.rotation);
            modelEl.setAttribute("material", {
                color: model.color
            });
            marker.appendChild(modelEl);
        } else {
            var modelEl = document.createElement("a-entity");
            modelEl.setAttribute("id", `${modelName}`);
            modelEl.setAttribute("gltf-model", `url(${modelUrl})`);
            modelEl.setAttribute("scale", model.scale);
            modelEl.setAttribute("postion", model.position);
            modelEl.setAttribute("rotation", model.rotation);
            marker.appendChild(modelEl);
        }
    }
})