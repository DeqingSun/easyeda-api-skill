const out=[];
for(const [name,line,net] of [
['R1 to existing LED1 wire',[330,105,350,105],'N$3'],
['R1 supply',[290,105,270,105,270,145],'+5V'],
['P3.3 to R2',[250,25,290,25],'P3.3'],
['R2 to LED2 anode',[330,25,370,25],undefined],
['LED2 cathode to ground',[410,25,430,25],'GND'],
['USB_D+ to R3',[40,105,80,105],'USB_D+'],
['R3 to button pin1',[120,105,130,105,130,125,140,125],undefined],
['Button top pair',[140,125,140,155,220,155,220,125],undefined],
['Button bottom pair',[140,85,140,65,220,65,220,85],'+5V'],
['Button supply',[220,85,240,85,240,145],'+5V']
]){const w=await eda.sch_PrimitiveWire.create(line,net);if(!w)throw Error('Wire failed '+name);out.push({name,id:w.getState_PrimitiveId()});}
for(const [type,net,x,y] of [['Power','+5V',270,145],['Power','+5V',240,145],['Ground','GND',430,25]]){const c=await eda.sch_PrimitiveComponent.createNetFlag(type,net,x,y);if(!c)throw Error('Flag failed '+net);out.push({flag:net,id:c.getState_PrimitiveId()});}
await eda.sch_Document.save();return out;
