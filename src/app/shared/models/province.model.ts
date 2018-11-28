export class ProvinceModel {
    Province: Province[];
    Tumbon: Tumbon[];
    Amphur: Amphur[];
    ZipCode: ZipCode[];
}
interface Province {
    provinceCode: string;
    nameLocal: string;
}
interface Tumbon {
    provinceCode: string;
    nameLocal: string;
    amphurCode: string;
    tumbonCode: string;
}
interface Amphur {
    provinceCode: string;
    nameLocal: string;
    amphurCode: string;
}
interface ZipCode {
    provinceCode: string;
    amphurCode: string;
    tumbonCode: string;
    postCode: string;
}
