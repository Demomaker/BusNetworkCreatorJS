
    const ZERO_VALUE = "0";
    const ONE_VALUE = "1";
    const TWO_VALUE = "2";
    const THREE_VALUE = "3";
    const FOUR_VALUE = "4";
    const FIVE_VALUE = "5";
    const SIX_VALUE = "6";
    const SEVEN_VALUE = "7";
    const EIGHT_VALUE = "8";
    const NINE_VALUE = "9";
    const DECIMAL_VALUE = ".";
    const SIGN_CHANGE_VALUE = "+/-";
    const PLUS_VALUE = "+";
    const MINUS_VALUE = "-";
    const MULTIPLICATION_VALUE = "*";
    const DIVISION_VALUE = "/";
    const DEFAULT_VALUE = "";

    const ElementEnum =
    {
        NONE: 0,
        ZERO: 1,
        ONE: 2,
        TWO: 3,
        THREE: 4,
        FOUR: 5,
        FIVE: 6,
        SIX: 7,
        SEVEN: 8,
        EIGHT: 9,
        NINE: 10,
        SIGN_CHANGE: 11,
        DECIMAL: 12,
        PLUS: 13,
        MINUS: 14,
        MULTIPLICATION: 15,
        DIVISION: 16
    }

    Object.freeze(ElementEnum);

    class ElementEvaluator
    {

        static EvaluateElement(element)
        {
            switch(element)
            {
                case ElementEnum.ZERO:
                    return ZERO_VALUE;
                case ElementEnum.ONE:
                    return ONE_VALUE;
                case ElementEnum.TWO:
                    return TWO_VALUE;
                case ElementEnum.THREE:
                    return THREE_VALUE;
                case ElementEnum.FOUR:
                    return FOUR_VALUE;
                case ElementEnum.FIVE:
                    return FIVE_VALUE;
                case ElementEnum.SIX:
                    return SIX_VALUE;
                case ElementEnum.SEVEN:
                    return SEVEN_VALUE;
                case ElementEnum.EIGHT:
                    return EIGHT_VALUE;
                case ElementEnum.NINE:
                    return NINE_VALUE;
                case ElementEnum.DECIMAL:
                    return DECIMAL_VALUE;
                case ElementEnum.SIGN_CHANGE:
                    return SIGN_CHANGE_VALUE;
                case ElementEnum.PLUS:
                    return PLUS_VALUE;
                case ElementEnum.MINUS:
                    return MINUS_VALUE;
                case ElementEnum.MULTIPLICATION:
                    return MULTIPLICATION_VALUE;
                case ElementEnum.DIVISION:
                    return DIVISION_VALUE;
                case ElementEnum.NONE:
                    return DEFAULT_VALUE;
                default:
                    return DEFAULT_VALUE;
            }
        }

        static EvaluateValue(value)
        {
            switch (value)
            {
                case ZERO_VALUE:
                    return ElementEnum.ZERO;
                case ONE_VALUE:
                    return ElementEnum.ONE;
                case TWO_VALUE:
                    return ElementEnum.TWO;
                case THREE_VALUE:
                    return ElementEnum.THREE;
                case FOUR_VALUE:
                    return ElementEnum.FOUR;
                case FIVE_VALUE:
                    return ElementEnum.FIVE;
                case SIX_VALUE:
                    return ElementEnum.SIX;
                case SEVEN_VALUE:
                    return ElementEnum.SEVEN;
                case EIGHT_VALUE:
                    return ElementEnum.EIGHT;
                case NINE_VALUE:
                    return ElementEnum.NINE;
                case DECIMAL_VALUE:
                    return ElementEnum.DECIMAL;
                case SIGN_CHANGE_VALUE:
                    return ElementEnum.SIGN_CHANGE;
                case PLUS_VALUE:
                    return ElementEnum.PLUS;
                case MINUS_VALUE:
                    return ElementEnum.MINUS;
                case MULTIPLICATION_VALUE:
                    return ElementEnum.MULTIPLICATION;
                case DIVISION_VALUE:
                    return ElementEnum.DIVISION;
                default:
                    return ElementEnum.NONE;
            }
        }


        static ElementIsNumber(element)
        {
            return this.ValueIsNumber(EvaluateElement(element));
        }

        static ValueIsNumber(value)
        {
            return !isNaN(value);
             
        }

        static ElementIsOperator(element)
        {
            return this.ValueIsOperator(EvaluateElement(element));
        }

        static ValueIsOperator(value)
        {
            return !this.ValueIsNumber(value) && value !== DECIMAL_VALUE && value !== SIGN_CHANGE_VALUE;
        }
    }
