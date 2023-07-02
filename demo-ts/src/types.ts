export interface PolicePicDTO {
  id: number;
  picType: string;
  picUrl: string;
  policeCode: string;
}
export interface Police {
  cardCode: string;
  caseCode: string;
  caseName: string;
  createPoliceCode: string;
  createPoliceName: string;
  createTime: string;
  enterAreaTime: string;
  entryMatters: string;
  flowUuid: string;
  id: number;
  outAreaTime: string;
  outReason: string;
  outRemark: string;
  policeCode: string;
  policeName: string;
  policePicDTOList: PolicePicDTO[];
  status: string;
}
export interface PoliceEnter {
  caseCode: string;
  caseName: string;
  entryMatters: string;
  policeList: Pick<Police, "cardCode" | "policeName" | "policeCode">[];
}

interface param {
  label: string;
  size: number;
}
function printLabel(labelledObj: param) {
  console.log(labelledObj.label);
}

let myObj = { label: "Size 10 Object" };
// printLabel(myObj);

let fun: object = () => {};

window.sayHello = () => {
  console.log("hello");
};
