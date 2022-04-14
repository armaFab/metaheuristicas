window.onload = function () {
    let frame = document.getElementById('frame');
    let ctx = frame.getContext('2d');
    let arrayCities;
    let run;
    let wFrame = 600;
    let hFrame = 600;
    let xFrame = 0;
    let yFrame = 0;
    let set = document.getElementById('set-cities');

    frame.setAttribute("width", wFrame);
    frame.setAttribute("height", hFrame);
    cleanScreen(ctx, xFrame, yFrame, wFrame, hFrame);

    set.addEventListener('click', () => {
        let nCities = document.getElementById('n-cities').value;
        if (nCities) {
            arrayCities = CreateNodes(nCities);
            paintCities(arrayCities, ctx, xFrame, yFrame, wFrame, hFrame);
        }
        else alert("valor invalido");
    });
    run = document.getElementById('btn-run');
    run.addEventListener('click', () => {
        
        simulatedAnnealing(arrayCities, ctx, xFrame, yFrame, wFrame, hFrame);
    });
}
//clean screem
function cleanScreen(ctx, xFrame, yFrame, wFrame, hFrame) {
    ctx.fillStyle = "black";
    ctx.rect(xFrame, yFrame, wFrame, hFrame);
    ctx.fill();
}
//draw  nodes
function paintCities(arrayCities, ctx, xFrame, yFrame, wFrame, hFrame) {
    let r = 5;
    cleanScreen(ctx, xFrame, yFrame, wFrame, hFrame);

    for (let i = 0; i < arrayCities.length; i++) {

        for (let j = 1; j < arrayCities.length - 1; j++) {
            ctx.beginPath()
            ctx.strokeStyle = "green";
            ctx.moveTo(arrayCities[i].X, arrayCities[i].Y);
            ctx.lineTo(arrayCities[j].X, arrayCities[j].Y);
            ctx.closePath();
            ctx.stroke();

        }

    }
    for (let i = 0; i < arrayCities.length - 1; i++) {


        if (i == 0 || i == arrayCities.length - 1) { ctx.fillStyle = "white"; }
        else { ctx.fillStyle = "blue"; }
        ctx.beginPath();
        ctx.arc(arrayCities[i].X, arrayCities[i].Y, r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath()
        ctx.strokeStyle = "white";
        ctx.moveTo(arrayCities[i].X, arrayCities[i].Y);
        ctx.lineTo(arrayCities[(i + 1)].X, arrayCities[(i + 1)].Y);
        ctx.closePath();
        ctx.stroke();

    }

}
//create nodes radomly
function CreateNodes(nCities) {

    let Nodes = [];
    const Max = 590;
    const Min = 10;
    let x, y = 0;

    for (let i = 0; i < nCities; i++) {
        x = Math.floor(Math.random() * (Max - Min) + Min)
        y = Math.floor(Math.random() * (Max - Min) + Min)
        Nodes.push({ X: 0, Y: 0, Node: i });
        Nodes[i].X = x;
        Nodes[i].Y = y;
        //console.log(Nodes[i].X, Nodes[i].Y,)
    }
    Nodes[nCities] = Nodes[0];
    console.log(Nodes);
    console.log("dis: " + DistanceCuadratic(Nodes));
    return Nodes;
}

function simulatedAnnealing(initialSolution, ctx, xFrame, yFrame, wFrame, hFrame) {
    let T0 = 200 ;   //initial temperature
    let a = 0.1;    //cosnt [a,b]
    let t = 100;     //iterations 
        
    let newSolution = [];
    let S = initialSolution;
    let costOld = 0;
    let costNew = 0;
    let P = 0;
    let lisTSolution = [];
    costOld = DistanceCuadratic(S)
    console.log("costOld-----1: ",costOld)
    while (T0 > 100) {
        console.log("ciclo1")
        for (let i = 0; i < t; i++) {
            console.log("ciclo 2")
            newSolution = GeneratedSolution(S);
            costOld = DistanceCuadratic(S)
            costNew = DistanceCuadratic(newSolution);
            console.log("costOld: ",costOld)
            console.log("costNew: ",costNew)
            
            if (costNew < costOld) {
                S = newSolution;
                lisTSolution.push({solution: newSolution, cost: costNew});
            }
            else {
                P = Math.exp((-1) * (Math.abs(costNew - costOld) / T0));
                if (Math.random() < P) {
                    S = newSolution;
                    lisTSolution.push({solution: newSolution, cost: costNew});

                }

            }
        }
        T0  =T0 - a * t;    //  decrease temperature

    }
    
     let top = 1000000;
     let bestSolution = [];
     let bestCost;
     lisTSolution.forEach(best => {
          if(best.cost < top ) {
               
              bestSolution = best.solution;
              top =  best.cost; 
              bestCost = top;
          }
     });
     paintCities(bestSolution, ctx, xFrame, yFrame, wFrame, hFrame);
      
 
     console.log("solution: "+ bestSolution + " \ncost:" + bestCost);
      


}
function GeneratedSolution(S) {
    let newS = S;
    let a = 0;
    let b = 0;
    let Max = S.length-1;
    let Min = 1;
     
    let nodeAux;

    a = Math.floor(Math.random() * (Max - Min) + Min);
    b = Math.floor(Math.random() * (Max - Min) + Min);
     
    while (a == b) {
        b = Math.floor(Math.random() * (Max - Min) + Min);
    }
    nodeAux = S[a];
    S[a] = S[b];
    S[b] = nodeAux;
   /* S.forEach(pos => {
        console.log(pos.Node);
    });
    console.log("new cost: " ,DistanceCuadratic(S));
    */
   return newS;

}
function DistanceCuadratic(Neighborhood) {
    let Distance = 0;
    let X = 0, Y = 0;

    for (let i = 0; i < Neighborhood.length - 1; i++) {
        X = Math.pow(Neighborhood[i + 1].X - Neighborhood[i].X, 2);
        Y = Math.pow(Neighborhood[i + 1].Y - Neighborhood[i].Y, 2);
        Distance += Math.sqrt((X + Y));
    }
    return Distance;
}