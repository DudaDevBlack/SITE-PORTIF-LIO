const ESP32 = "http://192.168.0.100"; // MUDE

let grafico;

async function atualizar(){

  const r = await fetch(`${ESP32}/status`);
  const d = await r.json();

  document.getElementById("temp").innerText = d.temp + "°C";
  document.getElementById("umid").innerText = d.umid + "%";
  document.getElementById("tempoOnline").innerText = d.tempo;

  let perc = Math.min((d.nivel / 200) * 100, 100);

  document.getElementById("nivelBar").style.width = perc + "%";
  document.getElementById("nivelTxt").innerText = d.nivel + " cm";

  luzInt.checked = d.luzInt;
  luzExt.checked = d.luzExt;
  refletor.checked = d.refletor;
  piscina.checked = d.piscina;

  atualizarGrafico(d.temp);
}

function enviar(cmd){
  fetch(`${ESP32}/${cmd}`);
}

luzInt.onchange = ()=>enviar("int");
luzExt.onchange = ()=>enviar("ext");
refletor.onchange = ()=>enviar("ref");
piscina.onchange = ()=>enviar("pis");

function iniciarGrafico(){
  const ctx = document.getElementById("grafico");

  grafico = new Chart(ctx,{
    type:"line",
    data:{
      labels:[],
      datasets:[{
        label:"Temperatura",
        data:[]
      }]
    }
  });
}

function atualizarGrafico(temp){
  let t = new Date().toLocaleTimeString();

  grafico.data.labels.push(t);
  grafico.data.datasets[0].data.push(temp);

  if(grafico.data.labels.length > 10){
    grafico.data.labels.shift();
    grafico.data.datasets[0].data.shift();
  }

  grafico.update();
}

setInterval(atualizar,2000);
iniciarGrafico();
