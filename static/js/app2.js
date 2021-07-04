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
        var firstsample = sampleNames[0];
        buildMetaData(firstsample)
    });
}

var otuIdsNames = [];
var otuIds = [];
	
function optionChanged(newsample){
	buildMetaData(newsample)
	getOtuIds(newsample)
	
	otuIdsNames = otuIds.reverse()
    builtChart(newsample)
}

function getOtuIds(sample){
    d3.json("samples.json").then((data)=>{
        var samples = data.samples; 
        var myarray = samples.filter(x => x.id==sample);
		otuIds = myarray[0].otu_ids;
    });
}

init();

function builtChart(firstsample){
    d3.json("samples.json").then(data => {
	    var testSubjectData = data.samples.find(testSubject => testSubject.id == firstsample);
        var sampleValues = testSubjectData.sample_values;
        var otuLabels = testSubjectData.otu_labels;
       
        var otuIdsNames = [];
        otuIds.map(name => {
            otuIdsNames.push(`OTU ${name}`);
            otuIdsNames.reverse();
        });

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
            title: {text: "Bacteria Cultures Found",
            font: {size: 20,
                family: "Arial Black"},
            y : .85
        },
        
        margin: { l: 100, r: 10, t: 100, b: 50 }
            
    };
    
    Plotly.newPlot('bar', data, layout);
    }); 
}
