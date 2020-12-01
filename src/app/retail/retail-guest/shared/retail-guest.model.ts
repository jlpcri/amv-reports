export class RetailGuest {

    get firstName() {
        for (const addr of this.addresses) {
            if (addr.firstName) {
                return addr.firstName;
            }
        }
        return '';
    }

    get lastName() {
        for (const addr of this.addresses) {
            if (addr.lastName) {
                return addr.lastName;
            }
        }
        return '';
    }

    get phone() {
        for (const addr of this.addresses) {
            if (addr.phone) {
                return addr.phone;
            }
        }
        return '';
    }

    id: number;
    sourceId: string;
    sourceSystemName: string;
    sourceSystemDescription: string;
    sourceSystemType: string;
    email: string;
    firstVisitDate?: string;
    firstVisitLocation?: string;
    lastVisitDate?: string;
    lastVisitLocation?: string;
    addresses: RetailGuestAddress[];
}

export class RetailGuestAddress {
    id: number;
    addressType: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    line1: string;
    line2: string;
    city: string;
    region: string;
    postalCode: string;
}
