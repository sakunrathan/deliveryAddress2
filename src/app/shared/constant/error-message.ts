export class ErrorMessage {
    public pleaseSelect: string = "กรุณาระบุ";
    public wrongFormat: string = "ผิดรูปแบบ";
    public unknowException: string = "ไม่สามารถทำรายการได้ กรุณาลองใหม่อีกครั้ง";


    // EN
    public pleaseSelectEn: string = "Please enter";
    public recheckSeatNo: string = "Please check seat no. again";
    public wrongFormatEn: string = "Invalid format";
    public onlyNumber: string = "Only number is allowed";
    public onlyAlphabet: string = "Only A-Z is allowed";
    public onlyAlphabetAndNumber: string = "Only A-Z, 0-9 is allowed";
    public pleaseSelectNidNoChoice: string = "Please select your ID / Passport Number."
    public idCardInvalid: string = "Invalid ID Card format.";
    public confirmCancel: string = "Data will not be saved. Do you want to cancel?";
    // public pleaseSelectEn: string = "กรุณาระบุ";

    // error code
    public dataNotFound = 40130;
    public nidNoDuplicate = 40131;
    public updateNotSuccess = 40132;
    public dataExpire = 40133;
    public dataInvalid = 40134;
    public overLimit = 40135;
}