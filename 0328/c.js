"use strict";

let R = null; 
let chart = null; // for char object

let tbl2 = null; 


let b1 = document.querySelector("#b1");

async function sc()
{
    //fetch()
    // Swal.fire("OK");

    let url =`https://juxinglong.github.io/static/data/states.json`;

    let r = await fetch(url); // async function takes time to download data, so we need to wait here indicated by await
    let rj = await r.json(); 

    // get char container
    let cc = document.querySelector("#cc");
    let opts =
    {
        type: "pie", // can also be line or bar or pie
        data:
        {
            labels:rj.map(x=> x.st),
            datasets: [{
                data: rj.map(x => x.p),
                label: "Population",

            },],
        },

    };

    if (chart != null)
    {
        chart.destroy();
    }

    cc.innerHTML = ``;
    chart = new Chart(cc, opts); 

    //show table in sdiv

    let sdiv = document.querySelector("#sdiv"); 
    let p =
    {
        data: rj,
        pagination: { limit: 5 },
        sort: true,
        search: true,
        columns: [{ id: "st", name: "STATE", }, {id:"p", name:"POPULATION",},],
    };

    if (tbl2 != null) {
        tbl2.destroy();
    }
    sdiv.innerHTML = ``;

     tbl2 = new gridjs.Grid(p);
    tbl2.render(sdiv); 


   


    console.log(rj);
    R = rj; 
}

b1.addEventListener("click", sc); // do not add the function call (meaning function with parantheses),just the function name