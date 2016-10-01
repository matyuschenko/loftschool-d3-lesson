// VARIABLES
var w = 1100,
    h = 650,
    min_rad = 3,
    max_rad = w/30;


// PREPARE SVG
var svg = d3.select('.content').append('svg')
    .attr('width', w)
    .attr('height', h);


// LOAD DATA
d3.tsv('data/data.tsv', function(data) {

    console.log(data);


    // PROCESS DATA
    data.forEach(function(d) {
        d.area = +d['Area, sq. km'].replace(new RegExp(',', 'g'), '');
        d.life_exp = +d['Both sexes life expectancy (HALE)'];
        d.country = d.Country;
        d.gdp = d['GDP per capita, $'].replace(',', '')
    });


    // SCALES
    var x = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.life_exp; }))
        .range([max_rad, w-max_rad*2]);

    var y = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.gdp; }))
        .range([h-max_rad*2, max_rad]);

    var r = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return Math.sqrt(d.area); }))
        .range([min_rad, max_rad]);


    // ADD CIRCLES AND LABELS
    var nodes = svg.selectAll('.country-node')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', function(d) { return 'translate('+x(d.life_exp)+','+y(d.gdp)+')';});

    var circles = nodes.append('circle')
        .attr('class', 'country-circle')
        .attr('r', function(d) { return r(Math.sqrt(d.area)); })
        ;

    var labels = nodes.append('text')
        .attr('class', 'country-name')
        .attr('dy', '0.25em')
        .attr('x', function(d) { return r(Math.sqrt(d.area))+3; })
        .text(function(d) { return d.country; });


    // BEHAVIOR
    nodes.on('mouseover', function(d) {
        d3.select(this).select('.country-circle').classed('country-circle_hovered', true);
        d3.select(this).select('.country-name').classed('country-name_hovered', true);
    }).on('mouseout', function(d) {
        d3.select(this).select('.country-circle').classed('country-circle_hovered', false);
        d3.select(this).select('.country-name').classed('country-name_hovered', false);
    });

});