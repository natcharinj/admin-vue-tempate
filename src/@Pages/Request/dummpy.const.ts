export interface RequestRegistration {
  name: string;
  code: string;
  createDate: string;
  verifyBy: string;
  verifyDate: string;
  status: string;
  statusName?: string;
}

export const STATUS_VERIFY = 'ตรวจสอบความถูกต้อง';
export const STATUS_IN_REVIEW = 'พิจารณาเอกสาร';
export const STATUS_REGISTER = 'ขึ้นทะเบียน';
export const STATUS_PUBLISH_DOC = 'ออกเอกสาร';
export const STATUS_MODIFY = 'แก้ไข';

export type StatusRequest =
  | 'ตรวจสอบความถูกต้อง'
  | 'พิจารณาเอกสาร'
  | 'ขึ้นทะเบียน'
  | 'ออกเอกสาร'
  | 'แก้ไข';

export const defaultTabList: StatusRequest[] = [
  'ตรวจสอบความถูกต้อง',
  'พิจารณาเอกสาร',
  'ขึ้นทะเบียน',
  'ออกเอกสาร',
  'แก้ไข',
];

export const tabIndexClassName = {
  ตรวจสอบความถูกต้อง: 'z-[5]',
  พิจารณาเอกสาร: 'z-[4]',
  ขึ้นทะเบียน: 'z-[3]',
  ออกเอกสาร: 'z-[2]',
  แก้ไข: 'z-[1]',
};

export const statusClassName = {
  ตรวจสอบความถูกต้อง: 'bg-blue-400',
  พิจารณาเอกสาร: 'z-[4]',
  ขึ้นทะเบียน: 'bg-green-700',
  ออกเอกสาร: 'z-[2]',
  แก้ไข: 'bg-yellow-600',
};

export const defaultColumn = [
  { header: 'ชื่อหน่วยงาน', accessorKey: 'name' },
  { header: 'รหัสหน่วยงาน', accessorKey: 'code' },
  { header: 'วันที่ขึ้นทะเบียน', accessorKey: 'createDate' },
  { header: 'ชื่อผู้ตรวจสอบ', accessorKey: 'verifyBy' },
  { header: 'วันที่ตรวจสอบ', accessorKey: 'verifyDate' },
  { header: 'สถานะ', accessorKey: 'status' },
];

export const getStatusButtonClassName = (status: string): StatusRequest => {
  return (
    defaultTabList.find((key) => status.search(key) !== -1) ??
    'ตรวจสอบความถูกต้อง'
  );
};
