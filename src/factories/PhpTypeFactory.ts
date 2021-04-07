import PhpType from '@/php-types/PhpType';
import StringType from '@/php-types/StringType';
import ArrayType from '@/php-types/ArrayType';
import PhpClass from '@/dto/PhpClass';
import PhpClassType from '@/php-types/PhpClassType';
import IntType from '@/php-types/IntType';
import BooleanType from '@/php-types/BooleanType';
import UnknownType from '@/php-types/UnknownType';
import FloatType from '@/php-types/FloatType';
import NullType from '@/php-types/NullType';

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