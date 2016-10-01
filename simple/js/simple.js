var dataset = [25, 100, 17, 8, 9, 60];

console.log(dataset);

var bars = d3.select('.content').selectAll('.bar')
    .data(dataset)
    .enter()
    .append('p')
    .attr('class', 'bar')
    .style('height', '20px')
    .style('width', function(d) { return d + 'px'; })
    .style('background-color', 'blue');

var labels = bars.append('span')
    .attr('class', 'bar__label')
    .text(function(d) { return d; });

function sortBars() {
    dataset.sort(function(a, b) {
        return a - b;
    });

    bars = d3.select('.content').selectAll('.bar')
        .data(dataset)
        .style('height', '20px')
        .style('width', function(d) { return d + 'px'; })
        .style('background-color', 'blue');

    labels.data(dataset).text(function(d) { return d; });
}

function removeLast() {
    dataset.pop();

    bars = d3.select('.content').selectAll('.bar')
        .data(dataset)
        .exit()
        .remove();
}

function addRandom() {
    dataset.push(Math.round(Math.random()*100));
    
    console.log(dataset);

    bars = d3.select('.content').selectAll('.bar')
        .data(dataset)
        .enter()
        .append('p')
        .attr('class', 'bar')
        .style('height', '20px')
        .style('width', function(d) { return d + 'px'; })
        .style('background-color', 'blue');

    var labels = bars.append('span')
        .attr('class', 'bar__label')
        .text(function(d) { return d; });
}


d3.select('.button_action_sort').on('click', function() {
    sortBars();
});

d3.select('.button_action_add').on('click', function() {
    addRandom();
});

d3.select('.button_action_remove').on('click', function() {
    removeLast();
});