export interface OrganizationUser {
    userId: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    organizationId: number;
    password: string;
    timeZoneId: number;
    currencyId: number;
    isDeleted: boolean;
    parentUserID: number;
    permissionID: number;
    isInvitationAccepted: boolean;
}