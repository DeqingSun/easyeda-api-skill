const f=await eda.sch_ManufactureData.getNetlistFile('after');
const png=await eda.sch_ManufactureData.getPngFile('after',{width:1800});
return {components:await eda.sch_PrimitiveComponent.getAll(),wires:await eda.sch_PrimitiveWire.getAll(),netlist:await f.text(),png:await new Promise(resolve=>{const r=new FileReader();r.onload=()=>resolve(r.result.split(',')[1]);r.readAsDataURL(png);})};
