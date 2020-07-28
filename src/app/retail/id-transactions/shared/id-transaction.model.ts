import {Invoice} from "../../../sales/invoices/shared/invoice.model";
import {IdScan} from "../../id-scans/shared/id-scan.model";

export class IdTransaction {
    invoice: Invoice;
    idScan: IdScan;

    get scanTimestamp() {
        return this.idScan ? this.idScan.eventTimestamp : "";
    }

    get orderTimestamp() {
        return this.invoice ? this.invoice.paymentDate : "";
    }

    get register() {
        return this.invoice ? this.invoice.register : this.idScan.register;
    }

    get associate() {
        return this.idScan ? this.idScan.associate : "";
    }

    get result() {
        return this.idScan ? this.idScan.result : "";
    }

    get age() {
        return this.idScan ? this.idScan.age : "";
    }

    get state() {
        return this.idScan ? this.idScan.state : "";
    }

    get birthDate() {
        if (this.invoice) {
            if (this.invoice.customerAddresses.length) {
                return this.invoice.customerAddresses[0].birthDate;
            }
        } else {
            return this.idScan.birthDate;
        }
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
        return "";
    }

    get bypassReason() {
        return this.idScan ? this.idScan.bypassReason : "";
    }
}
