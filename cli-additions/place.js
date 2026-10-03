const lib='0819f05c4eef4c71ace90d822a990e87';
const plan=[['R1','b369dfa5dc6b4e19b2b71ef8a6565926',310,105],['R2','b369dfa5dc6b4e19b2b71ef8a6565926',310,25],['R3','b369dfa5dc6b4e19b2b71ef8a6565926',100,105],['LED2','9a2c81c7c711447282ed038dcac46c66',390,25],['SW1','c5f8ce05d7ee4344ad3ba0a193a9ac37',180,105]];
const out=[];
for(const [ref,uuid,x,y] of plan){const c=await eda.sch_PrimitiveComponent.create({libraryUuid:lib,uuid},x,y);if(!c)throw Error('Create failed '+ref); const id=c.getState_PrimitiveId(); const props=(await eda.sch_PrimitiveComponent.get(id)).getState_OtherProperty();if(ref.startsWith('R'))props.Value='10K';await eda.sch_PrimitiveComponent.modify(id,{designator:ref,otherProperty:props});out.push({ref,id,pins:await eda.sch_PrimitiveComponent.getAllPinsByPrimitiveId(id)});}
return out;
