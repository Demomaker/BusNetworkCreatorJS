
    const DEFAULT_FLOAT_VALUE = 0;
    const DEFAULT_STRING_VALUE = "";
    class NumberBuilder
    {
        static NumberAsString = DEFAULT_STRING_VALUE;

        static NewNumber()
        {
            this.NumberAsString = DEFAULT_STRING_VALUE;
        }

        static GetNumberFromString()
        {
            var conversionPossible = ElementEvaluator.ValueIsNumber(this.NumberAsString);
            if (conversionPossible) return parseFloat(this.NumberAsString);
            var numberWithoutDecimal = this.NumberAsString.slice(0,this.NumberAsString.indexOf(ElementEvaluator.EvaluateElement(ElementEnum.DECIMAL)));
            conversionPossible = ElementEvaluator.ValueIsNumber(numberWithoutDecimal);
            if (conversionPossible) return parseFloat(numberWithoutDecimal);
            return DEFAULT_FLOAT_VALUE;
        }

        static Append(addedCharacters)
        {
            if (ElementEvaluator.ValueIsOperator(addedCharacters)) return;
            if (ElementEvaluator.EvaluateValue(addedCharacters) == ElementEnum.DECIMAL && this.NumberAsString.includes(ElementEvaluator.EvaluateElement(ElementEnum.DECIMAL)))
                return;

            var multiplication = 1;
            var tempAddedCharacters = addedCharacters;
            for(var i = 0; i < tempAddedCharacters.length; i++)
            {
                if(tempAddedCharacters.includes(ElementEvaluator.EvaluateElement(ElementEnum.SIGN_CHANGE)))
                {
                    multiplication *= -1;
                    var foundIndex = tempAddedCharacters.indexOf(ElementEvaluator.EvaluateElement(ElementEnum.SIGN_CHANGE));
                    var foundLength = ElementEvaluator.EvaluateElement(ElementEnum.SIGN_CHANGE).length;
                    tempAddedCharacters = tempAddedCharacters.slice(0,foundIndex);
                }
            }

            this.NumberAsString += tempAddedCharacters;
            var temp = this.NumberAsString;
            this.NumberAsString = (multiplication * this.GetNumberFromString()).toString();
            if (temp !== this.NumberAsString)
            {
                if (this.NumberAsString.includes("-"))
                {
                    var signChanged = "-" + temp;
                    if (signChanged !== this.NumberAsString)
                        this.NumberAsString += ".";
                }
                else if (temp.includes("-"))
                {
                    var tempNumberAsString = "-" + this.NumberAsString;
                    if (temp !== tempNumberAsString)
                        this.NumberAsString += ".";
                }
                else
                {
                    this.NumberAsString += ".";
                }

            }
        }

        static BuildNumber()
        {
            return this.GetNumberFromString();
        }

    }
