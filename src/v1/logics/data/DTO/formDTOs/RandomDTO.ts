type AttachmentDTO = {
  filename: string;
  s3Url: string;
  mimeType: string;
};

type FormDataDTO = {
  driverLicense: string;
  randomTesting: string;
  todayDate: string;
  companyName: string;
  companyName2: string;
  companyCode: string;
  driverFirstName: string;
  driverLastName: string;
  actualAlternative: string;
  expireDate1: string;
  expireDate2: string;
  selectedDate: string;
  signature: string;
  notice: string;
  collectionDate: string;
};

export type RandomDTO = {
  userId: string;
  formSubmissionId?: string | null;
  status?: number;
  formTypeId: string;
  formData: FormDataDTO;
  attachments: AttachmentDTO[];
};

