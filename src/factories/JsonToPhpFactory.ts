import PhpClassFactory from '@/factories/PhpClassFactory';
import PhpClass from '@/dto/PhpClass';
import Settings from '@/dto/Settings';

export default class JsonToPhpFactory {
    public static make(content: string, settings: Settings): PhpClass {
        let jsonObject;

        try {
            jsonObject = JSON.parse(content);
        } catch (e) {
            throw new Error('Unable to decode json content');
        }

        return PhpClassFactory.make(jsonObject, settings.rootClassName);
    }
}