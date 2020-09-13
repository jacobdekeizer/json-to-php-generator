import PhpType from "@/classes/php-types/PhpType";
import StringType from "@/classes/php-types/StringType";
import ArrayType from "@/classes/php-types/ArrayType";
import PhpClass from "@/classes/dto/PhpClass";
import PhpClassType from "@/classes/php-types/PhpClassType";
import IntType from "@/classes/php-types/IntType";
import BooleanType from "@/classes/php-types/BooleanType";
import UnknownType from "@/classes/php-types/UnknownType";
import FloatType from "@/classes/php-types/FloatType";
import NullType from '@/classes/php-types/NullType';

export default class PhpTypeFactory {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    public static make(value: any): PhpType {
        if (typeof value === 'string') {
            return new StringType();
        } else if (typeof value === 'number') {
            if (value % 1 === 0) {
                return new IntType();
            }

            return new FloatType();
        } else if (Array.isArray(value)) {
            const arrayType = new ArrayType();

            for (const v of value) {
                arrayType.addType(PhpTypeFactory.make(v));
            }

            return arrayType;
        } else if (value instanceof PhpClass) {
            return new PhpClassType(value);
        } else if (typeof value === 'boolean') {
            return new BooleanType();
        } else if (value === null) {
            return new NullType();
        }

        return new UnknownType();
    }
}