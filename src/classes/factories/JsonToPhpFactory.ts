import PhpClassFactory from "@/classes/factories/PhpClassFactory";
import PhpClass from "@/classes/dto/PhpClass";

export default class JsonToPhpFactory {
    public static make(content: string): PhpClass {
        let jsonObject;

        try {
            jsonObject = JSON.parse(content);
        } catch (e) {
            throw new Error('Unable to decode json content');
        }

        return PhpClassFactory.make(jsonObject, 'RootObject');
    }
}