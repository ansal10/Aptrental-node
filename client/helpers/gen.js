
export class Gen {
    static objectCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    static round(num) {
        return Math.round(num);
    }

    static getAvailableString(d1) {
        // d2 current date
        // d1 apartment date

        const d2 = Date.now();
        const d1parsed = Date.parse(d1);
        const diff = d1parsed - d2;
        if(diff<0) {
            return "available";
        } else {
            const month = d1.split("-")[1];
            return "available from " + Gen.getMonthFromNumber(month);
        }
    }

    static getMonthFromNumber(month) {
        switch(month) {
            case "01":
                return "Jan";
            case "02":
                return "Feb";
            case "03":
                return "Mar";
            case "04":
                return "Apr";
            case "05":
                return "May";
            case "06":
                return "June";
            case "07":
                return "July";
            case "08":
                return "Aug";
            case "09":
                return "Sep";
            case "10":
                return "Oct";
            case "11":
                return "Nov";
            case "12":
                return "Dec";
            default:
                return "-"
        }
    }
}