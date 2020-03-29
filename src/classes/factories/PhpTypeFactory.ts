import PhpType from "@/classes/php-types/PhpType";
import StringType from "@/classes/php-types/StringType";
import ArrayType from "@/classes/php-types/ArrayType";
import PhpClass from "@/classes/dto/PhpClass";
import PhpClassType from "@/classes/php-types/PhpClassType";
import IntType from "@/classes/php-types/IntType";
import BooleanType from "@/classes/php-types/BooleanType";
import UnknownType from "@/classes/php-types/UnknownType";
import FloatType from "@/classes/php-types/FloatType";

export default class PhpTypeFactory {
    public static make(name: string, value: any): PhpType {
        if (typeof value === 'string') {
            return new StringType(name);
        } else if (typeof value === 'number') {
            if (value %  1 === 0) {
                return new IntType(name);
            }

            return new FloatType(name);
        } else if (Array.isArray(value)) {
            const type = PhpTypeFactory.make(name, value[0]);

            if (!(type instanceof UnknownType)) {
                return new ArrayType(name, type);
            }
        } else if (value instanceof PhpClass) {
            return new PhpClassType(name, value);
        } else if (typeof value === 'boolean') {
            return new BooleanType(name);
        }

        const unknownType = new UnknownType(name);

        if (value === null) {
            unknownType.setNullable(true);
        }

        return unknownType;
    }
}