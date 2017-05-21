var serverCounter = 0;
var clientCounter = 0;

var data = {
    "name": "İstemci",
    "children": [{
        "name": "Load Balancer",
        "children": [{
            "name": serverCounter
        }]
    }]
};

var margin = {
        top: 0,
        right: 120,
        bottom: 20,
        left: 120
    },
    width = 1000 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;

var tree = d3.layout.tree().size([width, height]);

var canvas = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(50,50)");

function draw() {
    var tree = d3.layout.tree().size([width, height]);

    var canvas = d3.select("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(50,50)");

    var nodes = tree.nodes(data);
    var links = tree.links(nodes);

    var node = canvas.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate (" + d.x + "," + d.y + ")";
        })

    node.append("rect")
        .attr("width", 50)
        .attr("height", 50)
        .attr("fill", "steelblue");

    var i = 0;
    node.append("text")
        .attr("id","x")
        .text(function(d) {
            return d.name;
        }
        );


    var diagonal = d3.svg.diagonal()


    canvas.selectAll(".link")
        .data(links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("d", diagonal);
}


function addNewClient() {
    if (serverCounter < 9) {
        serverCounter++;
        document.getElementById("countServer").innerHTML = serverCounter;
        data.children[0].children.push({
            "name": serverCounter
        });
        refresh();
    } else {
        Materialize.toast('Sunucu sayısı sınırına ulaştınız!', 4000);
    }
}

function remove() {
    canvas.remove();
    d3.selectAll("g").remove();
}

function refresh() {
    remove();
    draw();
}

draw();

function clientCount() {
    var clientCounter = document.getElementById("clientCount").value;
    document.getElementsByTagName("text")[0].innerHTML = clientCounter;
    var serverPower = document.getElementById("serverPower").value;
    var serverPower = serverPower.split(',').map(function(item) {
        return parseInt(item, 10);
    });


    if (serverPower.length > serverCounter) {
        Materialize.toast('Sunucu gücü sayısı ekledğiniz sunucu sayısını aşıyor!', 4000);
    }
}