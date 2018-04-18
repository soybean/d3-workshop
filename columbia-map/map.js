var width = 1060, 
    height = 1160;

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

/* setup tooltip on hover, keep invisible for now */
var div = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

var path = d3.geoPath();

var url = "https://gist.githubusercontent.com/soybean/71bb234337d633b6a4cc39ce2f887b52/raw/7f548bb7e847d15ab693383a3990c7bdb115a4a9/columbia.json";

d3.json(url, function(error, data) {

    var projection = d3.geoMercator()
		.center([-73.96216034889221, 40.80765786061531106])
		.scale(10000000)
		.translate([(width)/6, height/1.5]);
    var path = d3.geoPath()
		.projection(projection);
    svg.selectAll("path")
	.data(data.features)
	.enter().append("path")
	.attr("d", path)
	.attr("transform", "rotate(-29.3)")
	.style('fill', getColor)
	.on("mouseover", mouseover)
	.on('mouseout', mouseout)
});

function getColor(d) {
    if (d.properties.year) {
	var normalized = Math.log((d.properties.year/2000))*-10;
	return d3.interpolateViridis(normalized);
    }
    return "#69a868";
}

function mouseover(d) {
    div.transition()
	.duration(200)
	.style('opacity', 0.9);
    var name = d.properties.name;
    var year = d.properties.year;
    if (name === "Northwest Corner Building") {
	div.style('height', '100px');
    }
    else {
	div.style('height', '60px');
    }
    if(!year) {
	year = "";
    }

    div.html(name + "<br/>" + year)
	.style("left", (d3.event.pageX) + "px")
	.style("top", (d3.event.pageY) + "px");
    d3.select(this).style('fill', 'grey');
}

function mouseout(d) {
    svg.selectAll('path')
	.style('fill', getColor);

    div.transition()
	.duration(500)
	.style('opacity', 0);
}
