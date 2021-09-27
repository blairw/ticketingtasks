class MyUtilities {
    // adapted from https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
    public static generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    // Adapted from https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
    public static pad(n: string, width: number, z: string) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    // Adapted from https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
    public static daysBetween(earlierDate: Date, laterDate: Date): number {
        // To calculate the time difference of two dates
        var Difference_In_Time = laterDate.getTime() - earlierDate.getTime();
        
        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        return Difference_In_Days;
    }


    public static isBeforeToday(proposedTime: Date): boolean {
        let proposedDateStr = MyUtilities.getLocalyyyymmdd(proposedTime);
        let todayDateStr = MyUtilities.getLocalyyyymmdd(new Date());

        let proposedDate = new Date(proposedDateStr);
        let todayDate = new Date(todayDateStr);

        return (proposedDate < todayDate);
    }


    public static isSameDay(date1: Date, date2: Date): boolean {
        let preparedReturn = true;

        if (
            MyUtilities.getLocalyyyymmdd(date1) != MyUtilities.getLocalyyyymmdd(date2)
        ) {
            preparedReturn = false;
        }

        return preparedReturn;
    }

    public static getLocalyyyymmdd(dateObject: Date): string {
        return dateObject.getFullYear()
            + "-"
            + MyUtilities.pad(dateObject.getMonth().toString(), 2, "0")
            + "-"
            + MyUtilities.pad(dateObject.getDate().toString(), 2, "0");
    }

    public static getPreferredLocalString(dateObject: Date): string {
        return dateObject.toLocaleString('en-AU', {
            year: 'numeric', month: 'short', day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            weekday: 'short'
        });
    }
}