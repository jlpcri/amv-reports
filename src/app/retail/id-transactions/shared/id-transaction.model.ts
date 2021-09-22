import {Invoice} from '../../../shared/types/invoice';
import {IdScan} from '../../id-scans/shared/id-scan.model';
import * as moment from 'moment';

export class IdTransaction {
    invoice: Invoice;
    idScan: IdScan;

    get scanTimestamp() {
        return this.idScan ? this.idScan.eventTimestamp : '';
    }

    get orderTimestamp() {
        return this.invoice ? this.invoice.paymentDate : '';
    }

    get register() {
        return this.invoice ? this.invoice.register : this.idScan.register;
    }

    get associate() {
        if (this.idScan)
            return this.idScan.associate;
        if (this.invoice)
            return this.invoice.employee;
        return "";
    }

    get result() {
        if (this.idScan) {
            if (isNaN(this.idScan.age))
                return "";
            return this.idScan.result;
        }
        let age = this.age;
        if (age < 1)
            return "";
        if (age) {
            return age < 21 ? "minor" : "21+";
        }
        return "";
    }

    get age() {
        if (this.idScan)
            return this.idScan.age;
        if (this.posBirthDate) {
            let birthDate = moment(this.posBirthDate);
            if (birthDate.isValid()) {
                return moment(this.invoice.paymentDate).diff(birthDate, 'years')
            }
        }
        return ""
    }

    get state() {
        return this.idScan ? this.idScan.state : "";
    }

    get posBirthDate() {
        if (this.invoice && this.invoice.customerAddresses.length > 0) {
                return this.invoice.customerAddresses[0].birthDate;
        }
    }

    get scannedBirthDate() {
        if (this.idScan)
            return this.idScan.birthDate;
    }

    get invoiceId() {
        return this.invoice ? this.invoice.invoiceId : "";
    }

    get scannedName() {
        return this.idScan ? this.idScan.guestName : "";
    }

    get posName() {
        if (this.invoice) {
            if (this.invoice.customerAddresses.length) {
                let name = "";
                if (this.invoice.customerAddresses[0].firstName) {
                    name += this.invoice.customerAddresses[0].firstName + ' ';
                }
                if (this.invoice.customerAddresses[0].lastName) {
                    name += this.invoice.customerAddresses[0].lastName;
                }
                return name;
            }
        }
        return '';
    }

    get bypassReason() {
        return this.idScan ? this.idScan.bypassReason : "";
    }

    get transactionDelay() {
        if (this.invoice && this.idScan) {
            return moment(this.invoice.paymentDate).diff(moment(this.idScan.eventTimestamp),'second')
        }
    }

    get grandTotal() {
        return this.invoice ? this.invoice.grandTotal : 0.0;
    }

    get location() {
        return this.invoice ? this.invoice.location : '';
    }
}
