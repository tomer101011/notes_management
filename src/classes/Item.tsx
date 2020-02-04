export class Item {
    name: string //name of item inside note 
    isChecked: boolean// is the item done- true or not done- false

    constructor(name: string, isChecked: boolean) {
        this.name = name;
        this.isChecked = isChecked;
    }
}