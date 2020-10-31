// функция, преобразующая все строковые значения, которые могут быть датой - в даты
// https://weblog.west-wind.com/posts/2014/jan/06/javascript-json-date-parsing-and-real-dates
export default function dateParser(key, value) {
    const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
    const reMsAjax = /^\/Date\((d|-|.*)\)[/|\\]$/;

    if (typeof value === "string") {
        let a = reISO.exec(value);

        if (a) {
            return new Date(value);
        }
        a = reMsAjax.exec(value);
        if (a) {
            const b = a[1].split(/[-+,.]/);
            return new Date(b[0] ? +b[0] : 0 - +b[1]);
        }
    }

    return value;
}
