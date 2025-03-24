export class UpdateApplicationDto {
  applicationId: string;
  status: 'approved' | 'rejected';
  rejectionReason?: string;
}
