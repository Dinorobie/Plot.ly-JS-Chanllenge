function buildMetaData(sample){
    d3.json("samples.json").then((data)=>{
        var metaData = data.metadata; 
        var myarray = metaData.filter(x => x.id==sample);
        var myresult = myarray[0];
        var mypanel = d3.select("#sample-metadata");
        mypanel.html("");
        Object.entries(myresult).map(([key,value])=>{
            mypanel.append("h6").text(`${key}: ${value}`);
        });

    });
}



function init(){
    var myselect = d3.select("#selDataset")
    d3.json("samples.json").then((data)=>{
        var sampleNames = data.names;
        sampleNames.map((sample)=>{
            myselect.append("option")
            .text(sample)
            .property("value",sample);
        });
        console.log(data);
        var firstsample = sampleNames[0];
        buildMetaData(firstsample)
    });
}

function optionChanged(newsample){
    buildMetaData(newsample);
    
    otuIds.map(name => {
        otuIdsNames.push(`OTU ${name}`);
        otuIdsNames.reverse();
    });
}
init();

function builtChart(firstsample){
    console.log(firstsample)
}

function getOtuIds(sample){
	var otuIds;
    d3.json("samples.json").then((data)=>{
        var metaData = data.metadata; 
        var myarray = metaData.filter(x => x.id==sample);
        var myresult = myarray[0];
        Object.entries(myresult).map(([key,value])=>{
            mypanel.append("h6").text(`${key}: ${value}`);
        });
		
		Object.entries(myresult).map(([key,value])=>{
            otuIds.push(value);
        });
    });
	
	return otuIds;
}
// SET UP ARRAYS TO PLOT

var otuIds = buildMetaData.otu_ids;


    var otuIdsNames = [];

var sampleValues = testSubjectData.sample_values;

otuLabels = testSubjectData.otu_labels;

// BAR CHART
        var otuIdsNamesSliced = otuIdsNames.slice(0,10).reverse();
        var sampleValuesSliced = sampleValues.slice(0,10).reverse();

        var trace = {
            type: 'bar',
            y: otuIdsNamesSliced,
            x: sampleValuesSliced,
            text: otuLabels,
            orientation : "h"
          };
        
        var data = [trace]

        var layout = {
            title: {text: "Top 10 Bacteria Cultures Found",
            font: {size: 20,
                family: "Arial Black"},
            y : .85
              },
            xaxis: { title: "Sample Values", 
                automargin: true, },
            yaxis: { title: "OTU ID"},
            margin: { l: 100, r: 10, t: 100, b: 50 }
                 
          };
          
        
        Plotly.newPlot('bar', data, layout);
