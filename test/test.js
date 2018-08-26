import { Vector3, Quaternion } from "three"

const quat = new Quaternion();

quat.setFromAxisAngle(new Vector3(0,0,1), 90);

const v0 = new Vector3(0,1,0);
const v1 = new Vector3(1,0,0);

v0.applyQuaternion(quat);
v1.applyQuaternion(quat);


console.log(v0,v1, v0.dot(v1));
