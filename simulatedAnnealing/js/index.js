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
        }
        else alert("valor invalido");
    });
    run = document.getElementById('btn-run');
    run.addEventListener('click', () => {
        paintCities(arrayCities, ctx, xFrame, yFrame, wFrame, hFrame);
    });
}

function cleanScreen(ctx, xFrame, yFrame, wFrame, hFrame) {
    ctx.fillStyle = "black";
    ctx.rect(xFrame, yFrame, wFrame, hFrame);
    ctx.fill();
}

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
    for (let i = 0; i < arrayCities.length; i++) {


        if (i == 0 || i == arrayCities.length - 1) { ctx.fillStyle = "white"; }
        else { ctx.fillStyle = "blue"; }
        ctx.beginPath();
        ctx.arc(arrayCities[i].X, arrayCities[i].Y, r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

    }

}

function CreateNodes(nCities) {

    let Nodes = [];
    const Max = 590;
    const Min = 10;
    let x, y = 0;

    for (let i = 0; i < nCities; i++) {
        x = Math.floor(Math.random() * (Max - Min) + Min)
        y = Math.floor(Math.random() * (Max - Min) + Min)
        Nodes.push({ X: 0, Y: 0 });
        Nodes[i].X = x;
        Nodes[i].Y = y;
        //console.log(Nodes[i].X, Nodes[i].Y,)
    }
    Nodes[nCities] = Nodes[0];
    console.log(Nodes);
    return Nodes;
}