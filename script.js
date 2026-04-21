const ESP32 = "http://SEU_IP_AQUI";

async function atualizar(){
  const r = await fetch(`${ESP32}/status`);
  const d = await r.json();

  document.getElementById("temp").innerText = "Temp: " + d.temp;
  document.getElementById("umid").innerText = "Umid: " + d.umid;

  document.getElementById("int").checked = d.luzInt;
  document.getElementById("ext").checked = d.luzExt;
}

document.getElementById("int").onchange = ()=>{
  fetch(`${ESP32}/int`);
};

document.getElementById("ext").onchange = ()=>{
  fetch(`${ESP32}/ext`);
};

setInterval(atualizar,2000);
atualizar();
