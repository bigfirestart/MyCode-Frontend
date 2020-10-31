import dateParser from "./dateParser";

export default function axiosParseWithDates(data) {
    console.log(data);
    return JSON.parse(data, dateParser);
}
